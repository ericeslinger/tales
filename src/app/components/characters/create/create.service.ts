import { CharacterService } from 'src/app/components/characters/character.service';
import { CreateComponent } from './create.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesService } from 'src/app/data/rules.service';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  constructor(
    private rulesService: RulesService,
    private dialog: MatDialog,
    private characterService: CharacterService
  ) {}

  async createCharacter(options: { inCampaign?: string } = {}) {
    const [templates, result] = await combineLatest([
      this.rulesService.templates(),
      this.dialog.open(CreateComponent).afterClosed(),
    ])
      .pipe(take(1))
      .toPromise();
    if (result) {
      const created = await this.characterService.create(
        {
          ...templates[result.type],
          name: result.name,
        },
        options
      );
      return created;
    } else {
      return null;
    }
  }
}
