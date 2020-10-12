import { BehaviorSubject, Subject } from 'rxjs';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { distinctUntilKeyChanged, filter, takeUntil } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { CampaignId } from 'types/idtypes';
import { ChatService } from '../chat.service';
import { User } from 'types/user';

@Component({
  selector: 'framesystem-chat-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit, OnDestroy {
  @ViewChild('msgInput') input: ElementRef;
  @Input('campaign') campaign: CampaignId;
  @Input('user') user: User;

  sendImage = false;

  msgStream = new Subject<{ event: Event; text: string }>();
  msg = this.msgStream.asObservable().pipe(
    distinctUntilKeyChanged('event'),
    filter((e) => !!e.text && e.text.length > 0)
  );

  destroyingSubject = new BehaviorSubject<boolean>(false);
  destroying = this.destroyingSubject.asObservable().pipe(filter((v) => !!v));

  constructor(
    private auth: AngularFirestore,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.msg.pipe(takeUntil(this.destroying)).subscribe(({ text }) => {
      this.input.nativeElement.value = '';
      this.chatService.send(
        {
          sender: this.user,
          type: 'text',
          text: text,
          date: new Date(),
        },
        this.campaign
      );
    });
  }

  ngOnDestroy() {
    this.destroyingSubject.next(true);
  }

  send(event: MouseEvent) {
    this.msgStream.next({ event, text: this.input.nativeElement.value });
  }

  enter(event: KeyboardEvent) {
    return;
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.isComposing) {
      return;
    } else {
      this.msgStream.next({ event, text: this.input.nativeElement.value });
    }
  }
}
