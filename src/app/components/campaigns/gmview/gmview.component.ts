import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Character,
  Companion,
  NonplayerCharacter,
  PlayerCharacter,
} from 'types/character';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Campaign } from 'types/campaign';
import { CampaignService } from 'src/app/data/campaign.service';
import { CharacterService } from 'src/app/data/character.service';
import { DefendService } from 'src/app/actions/defend/defend.service';
import { InitiativeService } from 'src/app/actions/initiative/initiative.service';
import { Roll } from 'types/event';

type ActionType = 'initiative' | 'defend' | 'zoom';
interface UiEvent {
  type: ActionType;
  character?: Character;
  event: MouseEvent;
}

@Component({
  selector: 'campaign-gmview',
  templateUrl: './gmview.component.html',
  styleUrls: ['./gmview.component.scss'],
})
export class GmviewComponent implements OnInit, OnDestroy {
  campaign: Observable<Campaign>;
  openCharacter: Observable<Character>;
  allCharacters: Observable<Character[]>;
  rolls: Observable<Roll[]>;
  actionTrigger = new Subject<UiEvent>();
  action = this.actionTrigger.asObservable();
  destroyingSubject = new Subject<boolean>();
  destroying = this.destroyingSubject
    .asObservable()
    .pipe(filter((v) => v === true));

  constructor(
    private campaignService: CampaignService,
    private initiativeService: InitiativeService,
    private characterService: CharacterService,
    private defendService: DefendService,
    private route: ActivatedRoute,
    private auth: AngularFireAuth
  ) {}

  ngOnDestroy(): void {
    this.destroyingSubject.next(true);
  }

  ngOnInit(): void {
    this.campaign = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.campaignService.get(params.get('id'))
      ),
      publishReplay(1),
      refCount()
    );
    this.allCharacters = this.campaign.pipe(
      switchMap(({ id, characters }) =>
        this.campaignService.characters({ id, characters })
      ),
      map((characters) =>
        characters.sort((a, b) => {
          if (a.initiative >= 0 && b.initiative >= 0) {
            return a.initiative - b.initiative;
          } else {
            return a.name.localeCompare(b.name);
          }
        })
      )
    );
    this.rolls = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.campaignService.listRolls(params.get('id'))
      ),
      publishReplay(1),
      refCount()
    );
    this.openCharacter = this.action.pipe(
      filter((a) => a.type === 'zoom'),
      distinctUntilChanged(),
      switchMap(({ character }) => this.characterService.get(character.id)),
      tap((v) => console.log(v))
    );

    combineLatest([this.campaign, this.allCharacters, this.action])
      .pipe(
        distinctUntilChanged((a, b) => a[2] === b[2]),
        takeUntil(this.destroying)
      )
      .subscribe(([campaign, characters, event]) => {
        if (event.type === 'initiative') {
          this.initiativeService.trigger(characters, campaign.id);
        } else if (event.type === 'defend') {
          this.defendService.trigger(event.character, campaign.id);
        }
      });
  }

  trackById(_: number, item: { id: string }) {
    return item.id;
  }

  initiative(event: MouseEvent) {
    this.actionTrigger.next({ event, type: 'initiative' });
  }

  defend(event: MouseEvent, character: Character) {
    this.actionTrigger.next({ event, character, type: 'defend' });
  }

  zoom(event: MouseEvent, character: Character) {
    this.actionTrigger.next({ event, character, type: 'zoom' });
  }
}