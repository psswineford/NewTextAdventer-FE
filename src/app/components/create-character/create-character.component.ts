import { Component } from '@angular/core';
import { Character } from 'src/app/Data/Character';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent {
  name: string = ''
  type: string = ''
  description: string = ''
  hitPoints: number = 0
  armorPoints: number = 0

  constructor(public uiservice: UiService){}

 
}
