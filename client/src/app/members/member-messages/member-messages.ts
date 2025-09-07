import { Component, inject, input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages {
  username = input.required<string>();
  messages = input.required<Message[]>();
}
