import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhlapkehoachlichxichnamComponent } from './quytrinhlapkehoachlichxichnam.component';

describe('QuytrinhlapkehoachlichxichnamComponent', () => {
  let component: QuytrinhlapkehoachlichxichnamComponent;
  let fixture: ComponentFixture<QuytrinhlapkehoachlichxichnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhlapkehoachlichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhlapkehoachlichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
