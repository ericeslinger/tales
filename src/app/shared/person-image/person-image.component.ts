import { Component, Input, OnInit } from '@angular/core';

import { Person } from 'types/idtypes';

@Component({
  selector: 'framesystem-person-image',
  templateUrl: './person-image.component.html',
  styleUrls: ['./person-image.component.scss'],
})
export class PersonImageComponent implements OnInit {
  @Input('person') person: Person;
  @Input('size') private size_: number = 100;
  @Input('monogramLength') monogramLength: number = 2;
  constructor() {}

  ngOnInit(): void {}

  get monogramText(): string {
    return (this.person?.name || 'Framesystem Roleplaying')
      .split(' ')
      .map((word: string) => word.charAt(word.search(/[A-Z]/)))
      .join('')
      .slice(0, this.monogramLength);
  }

  get monogramColor(): string {
    return `hsl(${hashHue(
      this.person?.name || 'Framesystem Roleplaying'
    )}, 30%, 80%)`;
  }

  get size(): string {
    return `${this.size_}px`;
  }
}

function hashHue(input: string): number {
  return [...input].reduce(
    (acc, curr: string) => ((acc << 3) ^ curr.charCodeAt(0)) % 360,
    0
  );
}
