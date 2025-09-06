import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../_services/message';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  messageService = inject(MessageService);
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
