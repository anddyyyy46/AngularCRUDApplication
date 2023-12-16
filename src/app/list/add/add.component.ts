import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Button um ein Event im ListComponent auszulösen, dass den PersonFormComponent aufruft um eine neue Person in die
 * Liste hinzuzufügen
 */

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  @Output() showForm = new EventEmitter()
  
  triggerForm():void{this.showForm.emit()}
}
