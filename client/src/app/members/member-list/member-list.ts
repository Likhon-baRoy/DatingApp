import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { MemberCard } from "../member-card/member-card";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Account } from '../../_services/account';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  memberService = inject(Members);
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }

  resentFilets() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any): void {
    this.memberService.userParams().pageNumber = event.page;
    this.loadMembers();
  }
}
