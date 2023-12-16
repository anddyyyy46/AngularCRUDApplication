import { Component, EventEmitter, Input, Output , OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '../../person/person.entity';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../person-form/person-form.component';


/**
 * Dieser Component kümmert sich um die einfache Anzeige einer einzelnen Person.
 * Die detailliertere Ansicht und die Edit Ansicht ist in den person-form Component ausgelagert
 * Durch das auslagern an ein anderen Component bleibt es etwas übersichtlicher.
 */
@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatIconModule, CommonModule, PersonFormComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})

export class ListItemComponent {
  @Input() formIsVisible!:boolean; //Wenn es auf true ist, wird der person-form Component aufgerufen 
  @Input() person = {} as Person; //Die übergebene Person vom ListComponent
  @Output() deletePerson = new EventEmitter<Person>() //Löst im ListComponent aus das löschen der Person aus
  @Output() updatePerson = new EventEmitter<Person>() //Wird an den person-form Component übergeben um dort ausgelöst zu werden und im ListComponent Person Daten zu bearbeiten

  triggerForm():void{this.formIsVisible = true;}
  triggerDeletePerson():void{this.deletePerson.emit(this.person);}
  cancelForm():void{this.formIsVisible = false;}
}
