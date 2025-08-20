import { Component, input } from '@angular/core';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-photo-editor',
  imports: [],
  templateUrl: './photo-editor.html',
  styleUrl: './photo-editor.css'
})
export class PhotoEditor {
  member = input.required<Member>();
}
