import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';
import { CharacterId } from 'types/idtypes';
import { CharacterService } from '../../components/characters/character.service';
import { SpinnerComponent } from 'src/app/shared/spinner.component';

@Component({
  selector: 'framesystem-adjust-character',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.scss'],
})
export class AdjustComponent implements AfterViewInit, OnDestroy {
  @Input('path') path: string;
  @Input('max') max: number;
  @Input('initial') initial: number;
  @Input('character') character: CharacterId;
  @ViewChild('spinner') spinner: SpinnerComponent;

  destroying_ = new BehaviorSubject<boolean>(false);
  destroying = this.destroying_.asObservable().pipe(filter((v) => v));

  color = 'accent';

  constructor(private characterService: CharacterService) {}
  ngOnDestroy(): void {}

  ngAfterViewInit() {
    this.spinner.current
      .pipe(
        debounceTime(500),
        filter((v) => v !== this.initial),
        map((v) => ({ [this.path]: v })),
        takeUntil(this.destroying)
      )
      .subscribe((v) => {
        console.log(v);
        this.characterService.update(this.character, v);
      });
  }
}
