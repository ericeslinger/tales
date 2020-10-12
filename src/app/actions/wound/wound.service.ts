import { Character } from 'types/character';
import { CharacterService } from 'src/app/components/characters/character.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WoundComponent } from './wound.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WoundService {
  constructor(
    private dialogService: MatDialog,
    private characterService: CharacterService
  ) {}

  async triggerWound(character: Character) {
    const result = await this.dialogService
      .open(WoundComponent, { data: character, disableClose: true })
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    const patch = {};
    patch[`attributes.${result.attribute}.wound`] = true;
    patch[`attributes.${result.attribute}.current`] = 0;
    await this.characterService.update(character, patch);
    return result.attribute;
  }
}
