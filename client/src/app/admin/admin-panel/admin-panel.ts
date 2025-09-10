import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HasRole } from "../../_directives/has-role";
import { UserManagement } from "../user-management/user-management";
import { PhotoManagement } from "../photo-management/photo-management";

@Component({
  selector: 'app-admin-panel',
  imports: [TabsModule, HasRole, UserManagement, PhotoManagement],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

}
