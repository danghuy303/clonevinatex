import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoCauNhanSuModalComponent } from './co-cau-nhan-su-modal.component';

describe('CoCauNhanSuModalComponent', () => {
  let component: CoCauNhanSuModalComponent;
  let fixture: ComponentFixture<CoCauNhanSuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoCauNhanSuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoCauNhanSuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
