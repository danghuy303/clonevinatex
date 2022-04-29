import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VattulichxichthangComponent } from './vattulichxichthang.component';

describe('VattulichxichthangComponent', () => {
  let component: VattulichxichthangComponent;
  let fixture: ComponentFixture<VattulichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VattulichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattulichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
