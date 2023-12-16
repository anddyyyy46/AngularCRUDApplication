import { Component, OnInit } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { Person } from '../person/person.entity';
import { AddComponent } from './add/add.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonService } from '../person/person.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * Der ListComponent interagiert mit dem Mock Backend.
 * Dabei wird am Anfang einmal das Person Array initialisiert, dafür benutzt man den Lifecycle hook ngOnInit.
 * Da dieser vorm Konstruktor bevorzugt wird, wenn es um die Angular Architektur geht.
 */

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, CommonModule, AddComponent, PersonFormComponent, HttpClientModule],
  providers: [PersonService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

    persons!: Person[]; 
    formIsVisible: boolean = false;

    constructor(private personService:PersonService) {}
    ngOnInit():void{ this.personService.getPersons().subscribe((persons)=>this.persons = persons) }

    addPerson(person:Person):void{
      this.formIsVisible = false;
      this.personService.addPerson(person).subscribe(
        (newPerson) => this.persons.push(newPerson)) //mit dem zurückgegebenen Objekt kann die Liste an Personen bzw. das Array direkt geupdated werden und es ist keine extra get Request an den Server nötig
    }

    updatePerson(person:Person):void{
      this.persons[person.id-1] = person //Bei einer nicht sequenzieller id müsste man durch das persons Array um dann das Objekt mit der gleichen id bearbeiten
      this.personService.updatePerson(person).subscribe()
    }

    deletePerson(person:Person):void{
      this.personService.deletePerson(person).subscribe(
          () => this.persons = this.persons.filter(
            (p)=> p.id !== person.id));
    }

    showForm():void{
      this.formIsVisible = true;
    }

    cancelForm():void{
      this.formIsVisible = false;
    }

}
