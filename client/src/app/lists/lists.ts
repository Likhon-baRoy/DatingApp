import { Component, inject, OnInit } from '@angular/core';
import { Likes } from '../_services/likes';
import { Member } from '../_models/member';
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { FormsModule } from '@angular/forms';
import { MemberCard } from "../members/member-card/member-card";

@Component({
  selector: 'app-lists',
  imports: [ButtonsModule, FormsModule, MemberCard],
  templateUrl: './lists.html',
  styleUrl: './lists.css'
})
export class Lists implements OnInit {
  private likesService = inject(Likes);
  members: Member[] = [];
  predicate = 'liked';

  ngOnInit(): void {
    this.loadLikes();
  }

  getTitle() {
    switch (this.predicate) {
      case 'liked': return 'Members you like';
      case 'likedBy': return 'Members who like you'
      default: return 'Mutual'
    }
  }

  loadLikes() {
    this.likesService.getLikes(this.predicate).subscribe({
      next: members => this.members = members
    })
  }
}
