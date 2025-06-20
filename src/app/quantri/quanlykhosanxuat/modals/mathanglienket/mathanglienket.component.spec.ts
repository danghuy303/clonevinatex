import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathanglienketComponent } from './mathanglienket.component';

describe('MathanglienketComponent', () => {
  let component: MathanglienketComponent;
  let fixture: ComponentFixture<MathanglienketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathanglienketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathanglienketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
