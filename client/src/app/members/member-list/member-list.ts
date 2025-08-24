import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { MemberCard } from "../member-card/member-card";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, PaginationModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  memberService = inject(Members);
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }
}
