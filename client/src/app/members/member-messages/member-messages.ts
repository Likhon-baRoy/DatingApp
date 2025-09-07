import { Component, inject, input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages implements OnInit {
  private messageService = inject(MessageService);
  username = input.required<string>();
  messages: Message[] = [];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username()).subscribe({
      next: messages => this.messages = messages
    })
  }
}
