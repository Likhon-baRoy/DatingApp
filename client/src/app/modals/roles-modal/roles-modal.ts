import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  imports: [],
  templateUrl: './roles-modal.html',
  styleUrl: './roles-modal.css'
})
export class RolesModal {
  bsModalRef = inject(BsModalRef);
  title = '';
  list: string[] = [];
}
