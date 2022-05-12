import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatthuvientaisanchitietComponent } from './capnhatthuvientaisanchitiet.component';

describe('CapnhatthuvientaisanchitietComponent', () => {
  let component: CapnhatthuvientaisanchitietComponent;
  let fixture: ComponentFixture<CapnhatthuvientaisanchitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapnhatthuvientaisanchitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatthuvientaisanchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
