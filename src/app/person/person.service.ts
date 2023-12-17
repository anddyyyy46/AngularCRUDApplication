import { Injectable } from '@angular/core';
import { Person } from './person.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Der personService macht alle CRUD Operations an den json-server, dabei bekommt man genau wie in einem echten Backend 
 * JSON Responses, welche als Observable im weiterverarbeitet werden.
 */

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = "http://localhost:3000/persons"
  constructor(private http:HttpClient) { }

  getPersons():Observable<Person[]>{
    return this.http.get<Person[]>(this.url)
  }
  addPerson(person: Person):Observable<Person>{
    return this.http.post<Person>(this.url, person)
  }
  updatePerson(person: Person):Observable<Person>{
    return this.http.put<Person>(this.url + "/" + person.id, person)
  }
  deletePerson(person:Person):Observable<Person>{
    return this.http.delete<Person>(this.url + "/" + person.id)
  }
}
