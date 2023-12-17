import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(
    'should show person details for a particular person',
    waitForAsync(() => {
      const person = {
        id: 1,
        Vorname: "Ben",
        Nachname: "Müller",
        EmailAdresse: "BenMüller@test.de",
      };

      component.person = person;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const idELement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#id')
        ).nativeElement;
        const vornameElement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#vorname')
        ).nativeElement;
        const nachnameElement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#nachname')
        ).nativeElement;
        const emailElement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#email')
        ).nativeElement;

        expect(idELement.textContent).toContain(person.id);
        expect(vornameElement.textContent).toContain(person.Vorname);
        expect(nachnameElement.textContent).toContain(person.Nachname);
        expect(emailElement.textContent).toContain(person.EmailAdresse);
      });
    })
  );
  it(
    'should show the details for a particular person when editing',
    waitForAsync(() => {
      const person = {
        id: 1,
        Vorname: "Ben",
        Nachname: "Müller",
        EmailAdresse: "BenMüller@test.de",
      };

      component.person = person;
      component.editable = true;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const vornameElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#vornameInput')
        ).nativeElement;
        const nachnameElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#nachnameInput')
        ).nativeElement;
        const emailElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#emailInput')
        ).nativeElement;

        expect(vornameElement.value).toContain(person.Vorname);
        expect(nachnameElement.value).toContain(person.Nachname);
        expect(emailElement.value).toContain(person.EmailAdresse);
      });
    })
  );
  it(
    'should check if a bad input is catched',
    waitForAsync(() => {
      const person = {
        id: 1,
        Vorname: "Ben",
        Nachname: "Müller",
        EmailAdresse: "BenMüller@test.de",
      };
      const updatedPerson = <NgForm>{value:{...person, Vorname: ""}};

      component.person = person;
      component.editable = true;
      component.newPerson = true
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.onSubmit(updatedPerson)).toBeFalse()
      });
    })
  );
  it(
    'should check if a person updates',
    waitForAsync(() => {
      const person = {
        id: 1,
        Vorname: "Ben",
        Nachname: "Müller",
        EmailAdresse: "BenMüller@test.de",
      };
      const updatedPerson = {...person, Vorname: "Benjamin"};
      const updatedPersonForm = <NgForm>{value:{...person, Vorname: "Benjamin"}};

      component.person = person;
      component.editable = true;
      component.updatePerson = new EventEmitter()
      
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.onSubmit(updatedPersonForm);
        expect(component.person).toEqual(updatedPerson)
      });
    })
  );
});
