import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../_services/admin';
import { User } from '../../_models/user';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  private adminService = inject(Admin);
  users: User[] = [];

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
