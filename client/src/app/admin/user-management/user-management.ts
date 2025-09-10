import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../_services/admin';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModal } from '../../modals/roles-modal/roles-modal';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  private adminService = inject(Admin);
  private modalService = inject(BsModalService);
  users: User[] = [];

  bsModalRef: BsModalRef<RolesModal> = new BsModalRef<RolesModal>();


  ngOnInit(): void {
    this.getUserWithRoles();
  }

  openRolesModal() {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        list: ['Admin', 'Moderator', 'Member']
      }
    }
    this.bsModalRef = this.modalService.show(RolesModal, initialState);
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
