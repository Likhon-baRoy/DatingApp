import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-detail',
  imports: [],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private memberService = inject(Members);
  private route = inject(ActivatedRoute);
  member?: Member;


  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    })
  }
}
