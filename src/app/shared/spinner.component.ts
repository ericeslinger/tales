import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  publishReplay,
  refCount,
  scan,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { Character } from 'types/character';
import { CharacterId } from 'types/idtypes';
import { CharacterService } from '../components/characters/character.service';

@Component({
  selector: 'framesystem-spinner',
  template: `
    <div class="spinner">
      <button mat-icon-button (click)="emit(-1)">
        <mat-icon>remove_circle_outline</mat-icon>
      </button>
      <div class="value">{{ current | async }}</div>
      <button mat-icon-button (click)="emit(1)">
        <mat-icon>add_circle_outline</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .spinner {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1 0 auto;
        min-width: 100px;
        justify-content: space-between;
      }
    `,
  ],
})
export class SpinnerComponent implements OnInit, OnDestroy, OnChanges {
  @Input('max') max: number = Number.POSITIVE_INFINITY;
  @Input('min') min: number = 0;
  @Input('initial') initial: number;

  destroying_ = new BehaviorSubject<boolean>(false);
  destroying = this.destroying_.asObservable().pipe(filter((v) => v));
  eventStream = new Subject<number>();
  current: Observable<number>;

  constructor(private characterService: CharacterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes.initial.firstChange &&
      changes.initial.currentValue !== changes.initial.previousValue
    ) {
      this.eventStream.next(0);
    }
  }

  ngOnDestroy(): void {
    this.destroying_.next(true);
  }

  ngOnInit(): void {
    this.current = this.eventStream.asObservable().pipe(
      scan((acc: number, curr: number) => {
        if (curr === 0) {
          return clamp(this.initial || 0, this.min, this.max);
        } else {
          return clamp(acc + curr, this.min, this.max);
        }
      }, clamp(this.initial || 0, this.min, this.max)),
      startWith(clamp(this.initial || 0, this.min, this.max)),
      publishReplay(1),
      refCount()
    );
  }

  emit(v: number) {
    this.eventStream.next(v);
  }
}

function clamp(
  v: number,
  min: number = Number.NEGATIVE_INFINITY,
  max: number = Number.POSITIVE_INFINITY
) {
  return Math.max(Math.min(v, max), min);
}
