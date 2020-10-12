import { Component, Input, OnInit } from '@angular/core';

import { Message } from 'types/chat';

@Component({
  selector: 'framesystem-chat-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  @Input('msg') msg: Message;

  constructor() {}
}
