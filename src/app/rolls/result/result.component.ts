import { Character, SkilledCharacter } from 'types/character';
import { Component, Input, OnInit } from '@angular/core';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { CharacterService } from 'src/app/components/characters/character.service';
import { CharacterSkill } from 'types/skill';
import { Observable } from 'rxjs';
import { RollResult } from 'types/roll';

@Component({
  selector: 'framesystem-roll-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input('result') result: RollResult;
  character: Observable<SkilledCharacter>;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.character = this.characterService
      .get(this.result.character)
      .pipe(publishReplay(1), refCount()) as Observable<SkilledCharacter>;
  }
}
