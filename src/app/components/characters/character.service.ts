import { CampaignId, CharacterId, UserId } from 'types/idtypes';
import { Character, SkilledCharacter } from 'types/character';
import { publishReplay, refCount, switchMap } from 'rxjs/operators';

import { AclType } from 'types/acl';
import { Action } from 'types/action';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cost } from 'types/cost';
import { Effect } from 'types/effect';
import { Injectable } from '@angular/core';
import { Item } from 'types/item';
import { Observable } from 'rxjs';
import { SkillType } from 'types/skill';
import { addId } from '../../data/rxutil';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  async resetOne(character: SkilledCharacter) {
    const patch = Object.entries(character.attributes).reduce(
      (acc, [attrName, attrVal]) => ({
        ...acc,
        [`attributes.${attrName}.current`]: attrVal.pool,
        [`attributes.${attrName}.wound`]: false,
      }),
      {
        initiative: 0,
      }
    );
    await this.update(character, patch);
  }

  async reset(characters: Character[]) {
    await Promise.all(
      characters
        .filter((c) => c.subtype !== 'nonplayer')
        .map((character: SkilledCharacter) => this.resetOne(character))
    );
  }

  async restOne(character: SkilledCharacter) {
    const patch = Object.entries(character.attributes).reduce(
      (acc, [attrName, attrVal]) => ({
        ...acc,
        [`attributes.${attrName}.current`]: Math.min(
          attrVal.pool,
          attrVal.current + Math.ceil(attrVal.pool / 5)
        ),
      }),
      {
        initiative: 0,
      }
    );
    await this.update(character, patch);
  }

  actions(character: SkilledCharacter): Action[] {
    const undepletedAbilities = character.equipped.flatMap((item) =>
      item.abilities
        .filter((ability) => ability.type === 'activate')
        .filter(
          (ability) =>
            !item.depleted ||
            ability.costs.every((cost) => cost.type !== 'depletion')
        )
    );
    const characterAbilities = character.abilities.filter(
      (ability) => ability.type === 'activate'
    );
    return [...undepletedAbilities, ...characterAbilities];
  }

  replacements(character: SkilledCharacter): Action[] {
    const undepletedAbilities = character.equipped.flatMap((item) =>
      item.abilities
        .filter((ability) => ability.type === 'replace')
        .filter(
          (ability) =>
            !item.depleted ||
            ability.costs.every((cost) => cost.type !== 'depletion')
        )
    );
    const characterAbilities = character.abilities.filter(
      (ability) => ability.type === 'replace'
    );
    return [...undepletedAbilities, ...characterAbilities];
  }

  passives(
    character: SkilledCharacter,
    filter: { skills: string[] } | { category: SkillType }
  ): { items: Item[]; effects: Effect[]; costs: Cost[] } {
    const undepletedItems: Item[] = character.equipped.filter((item) =>
      item.abilities.some((ability) =>
        itemEffect(ability, item, { ...filter, type: 'automatic' })
      )
    );

    const itemActions: Action[] = undepletedItems.flatMap((item) =>
      item.abilities.filter((ability) =>
        itemEffect(ability, item, { ...filter, type: 'automatic' })
      )
    );

    const characterPassives = character.abilities.filter(
      (ability) => ability.type === 'automatic' && applyFilter(ability, filter)
    );

    return {
      items: undepletedItems,
      effects: [
        ...itemActions.flatMap((action) => action.effects),
        ...characterPassives.flatMap((action) => action.effects),
      ],
      costs: [
        ...itemActions.flatMap((action) => action.costs),
        ...characterPassives.flatMap((action) => action.costs),
      ],
    };
  }

  withs(
    character: SkilledCharacter,
    filter: { skills: string[] } | { category: SkillType }
  ): Item[] {
    return character.equipped.filter((item) =>
      item.abilities.some((ability) =>
        itemEffect(ability, item, { ...filter, type: 'with' })
      )
    );
  }

  async rest(characters: Character[]) {
    await Promise.all(
      characters
        .filter((c) => c.subtype !== 'nonplayer')
        .map((character: SkilledCharacter) => this.restOne(character))
    );
  }

  private containerAddress(id: UserId | CampaignId): string {
    if (id.type === 'user') {
      return `/users/${id.userId}/characters`;
    } else {
      return `/campaigns/${id.campaignId}/characters`;
    }
  }

  private characterAddress(id: CharacterId): string {
    return `/campaigns/${id.campaignId}/characters/${id.characterId}`;
  }

  list(id: CampaignId): Observable<Character[]>;
  list(id: CampaignId, acl: AclType[]): Observable<Character[]>;
  list(id: CampaignId, acl?: AclType[]): Observable<Character[]> {
    return this.auth.user.pipe(
      switchMap((user) =>
        this.firestore
          .collection<Character>(this.containerAddress(id), (query) =>
            acl && acl.length > 0
              ? query.where(`acl.${user.uid}`, 'in', acl)
              : query
          )
          .valueChanges({ idField: 'characterId' })
      )
    );
  }

  get(id: CharacterId): Observable<Character> {
    return this.firestore
      .doc<Character>(this.characterAddress(id))
      .snapshotChanges()
      .pipe(addId('characterId'), publishReplay(1), refCount());
  }

  update(id: CharacterId, character: Partial<Character>) {
    return this.firestore.doc(this.characterAddress(id)).update(character);
  }

  setInitiative(id: CharacterId, initiative: number) {
    return this.update(id, { initiative });
  }
}

function applyFilter(
  ability: Action,
  filter: { skills: string[] } | { category: SkillType }
): boolean {
  if ('category' in filter) {
    return filter.category === ability.category;
  } else {
    return filter.skills.some((skill) => ability.skills?.includes(skill));
  }
}

function itemEffect(
  ability: Action,
  item: Item,
  filter: { type: string } & ({ skills: string[] } | { category: SkillType })
): boolean {
  return (
    ability.type === filter.type &&
    applyFilter(ability, filter) &&
    (!item.depleted || ability.costs.every((cost) => cost.type !== 'depletion'))
  );
}
