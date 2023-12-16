import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../person/person.entity';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Dieser Component ist dafür da die Daten einer neuen Person einzutragen oder
 * die alle Daten einer Person anzuzeigen oder um Daten einer Person zu ändern.
 * Kann von dem ListComponent aufgerufen werden, indem der Add Button das Event dafür auslöst, um eine neue Person
 * in die Liste hinzuzufügen. Außerdem wird dieser Component vom list-item Component aufgerufen,
 * um sich entweder alle Daten einer Person anzeigen zulassen oder die Daten einer Person zu verändern.
 */

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  @Input() editable:boolean = false; //true wenn der Component vom ListComponent ausgerufen wird, false wenn der Component vom listItemComponent aufgerufen wird
  @Input() newPerson:boolean = false; //true wenn der Component vom ListComponent ausgerufen wird, false wenn der Component vom listItemComponent aufgerufen wird
  @Input() person:Person = {} as Person; //nur initialisiert wenn der Component vom listItemComponent aufgerufen wird
  @Input() updatePerson!:EventEmitter<Person> //nur initialisiert wenn der Component vom listItemComponent aufgerufen wird
  @Output() addPerson = new EventEmitter<Person>() //wird nut weitergegeben wenn der Component vom ListComponent ausgerufen wird
  @Output() cancelForm = new EventEmitter() //wird zurückgegeben um den PersonFormComponent wieder verschwinden zulassen

  error:boolean = false
  errorMessage:string = ""
  
  onSubmit(formData:NgForm):boolean{
    if(formData.value.Vorname === "" || formData.value.Nachname === "" || formData.value.EmailAdresse === "") { //Stellt sicher, dass alle Werte gesetzt werden
      this.error = true
      this.errorMessage = "not all fields are filled out"
      return false;
    } 
    const person = {
        Vorname: formData.value.vorname,
        Nachname: formData.value.nachname,
        EmailAdresse: formData.value.emailAdresse
      } as Person
    if(this.newPerson) { 
      this.addPerson.emit(person)
    }
    else { 
      person.id = this.person.id
      this.cancelForm.emit()
      this.updatePerson.emit(person)
    }
    return true;
  }
  triggerEdit():void{this.editable = true;}
  triggerCancelForm():void{this.cancelForm.emit();}
  setEditable():void{this.editable = true;}
}
