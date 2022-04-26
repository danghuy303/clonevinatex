import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgansachdukienvathucteComponent } from './ngansachdukienvathucte.component';

describe('NgansachdukienvathucteComponent', () => {
  let component: NgansachdukienvathucteComponent;
  let fixture: ComponentFixture<NgansachdukienvathucteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgansachdukienvathucteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgansachdukienvathucteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
