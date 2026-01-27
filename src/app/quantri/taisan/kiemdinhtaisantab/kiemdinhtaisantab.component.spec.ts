import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemdinhtaisantabComponent } from './kiemdinhtaisantab.component';

describe('KiemdinhtaisantabComponent', () => {
  let component: KiemdinhtaisantabComponent;
  let fixture: ComponentFixture<KiemdinhtaisantabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemdinhtaisantabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemdinhtaisantabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
