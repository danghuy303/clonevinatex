import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemdinhtaisanComponent } from './kiemdinhtaisan.component';

describe('KiemdinhtaisanComponent', () => {
  let component: KiemdinhtaisanComponent;
  let fixture: ComponentFixture<KiemdinhtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemdinhtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemdinhtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
