import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  merge,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  publishReplay,
  refCount,
  scan,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MarkdownComponent } from 'ngx-markdown';
import { MatSidenav } from '@angular/material/sidenav';
import { Page } from 'types/page';
import { PageId } from 'types/idtypes';

interface ContentsElement {
  index: number;
  text: string;
  inView: boolean;
}

@Component({
  selector: 'tales-page-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input('pageId') _pageId?: PageId;
  @ViewChild('content') md: MarkdownComponent;
  @ViewChild('content') scrollRoot: ElementRef;
  @ViewChild('drawer') drawer: MatSidenav;

  idSubject = new BehaviorSubject<PageId>(null);
  page: Observable<Page>;
  markdown: Observable<string>;
  narrow: Observable<boolean>;
  activeHeaderSubject = new BehaviorSubject<
    Record<string, { header: string; inView: boolean }>
  >({});
  activeHeaders = this.activeHeaderSubject.asObservable().pipe(
    scan((acc, curr) => ({ ...acc, ...curr }), {}),
    map((entries: Record<string, { header: string; inView: boolean }>) =>
      Array.from(
        new Set(
          Object.entries(entries)
            .filter(([, { inView }]) => inView)
            .map(([, { header }]) => header)
        )
      )
    ),
    filter((list) => list.length > 0),
    distinctUntilChanged(
      (a, b) => a.length === b.length && a.every((item) => b.includes(item))
    ),
    map((list) => Object.fromEntries(list.map((item) => [item, true]))),
    startWith({}),
    publishReplay(1),
    refCount()
  );

  destroyingSubject = new BehaviorSubject<boolean>(false);
  destroying = this.destroyingSubject.asObservable().pipe(filter((s) => s));

  contentsSubject = new BehaviorSubject<ContentsElement[]>([]);
  contents = this.contentsSubject.asObservable();
  currentToc = new BehaviorSubject<HTMLHeadingElement[]>([]);

  zoomSubject = new Subject<{ event: MouseEvent; el: HTMLElement }>();

  constructor(
    private firestore: AngularFirestore,
    private breakpoint: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.page = this.idSubject.asObservable().pipe(
      distinctUntilChanged(),
      filter((v) => !!v),
      switchMap((id) =>
        this.firestore
          .doc<Page>(`/pages/${id.collectionId}/pages/${id.pageId}`)
          .valueChanges()
          .pipe(map((v) => ({ ...v, ...id })))
      )
    );
    this.narrow = this.breakpoint.observe('(max-width: 750px)').pipe(
      map(({ matches }) => matches),
      publishReplay(1),
      refCount()
    );
    combineLatest([this.narrow, this.zoomSubject.asObservable()])
      .pipe(
        distinctUntilChanged((a, b) => a[1] == b[1]),
        takeUntil(this.destroying)
      )
      .subscribe(([narrow, { el }]) => {
        if (narrow) {
          this.drawer.close();
        }
        el.scrollIntoView({ behavior: 'smooth' });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._pageId) {
      this.idSubject.next(this._pageId);
    }
  }

  ngOnDestroy() {
    this.destroyingSubject.next(true);
  }

  calculateContents() {
    const observer = new IntersectionObserver(
      (c) => {
        this.activeHeaderSubject.next(
          Object.fromEntries(
            c.map((item) => [
              item.target.getAttribute('data-seq'),
              {
                header: item.target.getAttribute('data-toc'),
                inView: item.isIntersecting,
              },
            ])
          )
        );
      },
      {
        root: this.scrollRoot.nativeElement,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    const headers = [];
    Array.from(this.md.element.nativeElement.children).reduce(
      (acc, curr, idx) => {
        if (curr.tagName === 'H1') {
          curr.setAttribute('data-toc', `${idx}`);
          curr.setAttribute('data-seq', `${idx}`);
          observer.observe(curr);
          headers.push({ inView: false, text: curr.textContent, index: idx });
          return idx;
        } else {
          curr.setAttribute('data-toc', `${acc}`);
          curr.setAttribute('data-seq', `${idx}`);
          observer.observe(curr);
          return acc;
        }
      },
      0
    );
    this.contentsSubject.next(headers);
    this.cdr.detectChanges();
  }

  scrollTo(index: string, event: MouseEvent) {
    this.zoomSubject.next({
      event,
      el: this.md.element.nativeElement.querySelector(`[data-toc="${index}"]`),
    });
  }

  ngAfterViewInit() {
    this.md.ready
      .pipe(takeUntil(this.destroying))
      .subscribe(() => this.calculateContents());
  }
}
