import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.css'
})
export class InviteComponent {
@Input('id') InviteId!: string;

}
