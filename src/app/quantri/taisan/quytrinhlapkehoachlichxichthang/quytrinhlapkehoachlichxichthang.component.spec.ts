import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhlapkehoachlichxichthangComponent } from './quytrinhlapkehoachlichxichthang.component';

describe('QuytrinhlapkehoachlichxichthangComponent', () => {
  let component: QuytrinhlapkehoachlichxichthangComponent;
  let fixture: ComponentFixture<QuytrinhlapkehoachlichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhlapkehoachlichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhlapkehoachlichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
