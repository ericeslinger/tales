import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkilledCharacter } from 'types/character';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Attribute } from 'types/attribute';

@Component({
  selector: 'framesystem-wound',
  templateUrl: './wound.component.html',
  styleUrls: ['./wound.component.scss'],
})
export class WoundComponent implements OnInit {
  attributeSelector = new FormControl('', [Validators.required]);
  attributes: Attribute[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public character: SkilledCharacter,
    public matDialogRef: MatDialogRef<WoundComponent>
  ) {}
  ngOnInit(): void {
    this.attributes = Object.values(this.character.attributes).sort((a, b) =>
      (a.name as String).localeCompare(b.name)
    );
  }

  validate() {
    if (
      this.attributes
        .map((a) => a.name)
        .includes(this.attributeSelector.value) &&
      this.attributes[this.attributeSelector.value].wound === false
    ) {
      return null;
    } else {
      return { err: 'Select an unwounded attribute' };
    }
  }
  ok() {
    this.matDialogRef.close({ attribute: this.attributeSelector.value });
  }
}
