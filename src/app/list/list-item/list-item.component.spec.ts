import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { By } from '@angular/platform-browser';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(
    'should show the first and last name for a particular person',
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
        const vornameElement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#vorname')
        ).nativeElement;
        const nachnameElement: HTMLParagraphElement = fixture.debugElement.query(
          By.css('#nachname')
        ).nativeElement;

        expect(vornameElement.textContent).toContain(person.Vorname);
        expect(nachnameElement.textContent).toContain(person.Nachname);
      });
    })
  );
});
