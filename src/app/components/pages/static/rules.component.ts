import { Component, OnInit } from '@angular/core';

import { PageId } from 'types/idtypes';

@Component({
  selector: 'tales-page-rules',
  template: `<tales-page-view [pageId]="basicPage"></tales-page-view>`,
  styles: [],
})
export class RulesComponent implements OnInit {
  constructor() {}
  basicPage: PageId = { pageId: 'basic', collectionId: 'rules', type: 'page' };

  ngOnInit(): void {}
}
