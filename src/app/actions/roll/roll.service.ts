import {
  AttackRequest,
  AttackResult,
  DefenseRequest,
  DefenseResult,
  HealthRequest,
  HealthResult,
  InitiativeRequest,
  InitiativeResult,
  NoncombatRequest,
  NoncombatResult,
  RollRequest,
  RollResult,
} from 'types/roll';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RollComponent } from './roll.component';
import { SkilledCharacter } from 'types/character';
import { take } from 'rxjs/operators';

interface DialogInput {
  roll: RollRequest;
  character: SkilledCharacter;
}

@Injectable({
  providedIn: 'root',
})
export class RollService {
  constructor(private dialogService: MatDialog) {}

  async trigger(
    request: AttackRequest,
    character: SkilledCharacter
  ): Promise<AttackResult>;
  async trigger(
    request: DefenseRequest,
    character: SkilledCharacter
  ): Promise<DefenseResult>;
  async trigger(
    request: InitiativeRequest,
    character: SkilledCharacter
  ): Promise<InitiativeResult>;
  async trigger(
    request: HealthRequest,
    character: SkilledCharacter
  ): Promise<HealthResult>;
  async trigger(
    request: NoncombatRequest,
    character: SkilledCharacter
  ): Promise<NoncombatResult>;
  async trigger<REQ extends RollRequest, RES extends RollResult>(
    request: REQ,
    character: SkilledCharacter
  ): Promise<RES> {
    const result = await this.dialogService
      .open<RollComponent, DialogInput, RES>(RollComponent, {
        data: { roll: request, character },
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    return result;
  }
}
