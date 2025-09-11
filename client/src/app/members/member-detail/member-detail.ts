import { Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessages } from "../member-messages/member-messages";
import { MessageService } from '../../_services/message';
import { Presence } from '../../_services/presence';
import { Account } from '../../_services/account';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessages],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: false }) memberTabs?: TabsetComponent;
  private messageService = inject(MessageService);
  private accountService = inject(Account);
  presenceService = inject(Presence);
  private route = inject(ActivatedRoute);
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;

   ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
        })
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        if (params['tab']) {
          this.selectTab(params['tab']);
        }
      }
    });
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if (messageTab) {
        setTimeout(() => {
          messageTab.active = true;
        });
      }
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;

    if (this.activeTab.heading === 'Messages' && this.member) {
      this.loadMessages();
    } else {
      this.messageService.stopHubConnection();
    }
  }

  loadMessages() {
    const user = this.accountService.currentUser();
    if (!user || !this.member) return;
    this.messageService.createHubConnection(user, this.member.username);
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}