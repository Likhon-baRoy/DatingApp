import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessages } from "../member-messages/member-messages";
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message';
import { take } from 'rxjs';
import { Presence } from '../../_services/presence';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessages],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit, AfterViewInit {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  private messageService = inject(MessageService);
  presenceService = inject(Presence);
  private route = inject(ActivatedRoute);
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    });
  }

  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if (messageTab) messageTab.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
      this.messageService.getMessageThread(this.member.username).pipe(take(1)).subscribe({
        next: messages => this.messages = messages
      });
    }
  }
}