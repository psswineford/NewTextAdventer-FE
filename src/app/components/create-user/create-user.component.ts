import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userName: string = ''
  userEmail: string = ''
  password: string = ''
  firstName: string = ''
  lastName: string = ''
  constructor(public uiservice: UiService){}
}
