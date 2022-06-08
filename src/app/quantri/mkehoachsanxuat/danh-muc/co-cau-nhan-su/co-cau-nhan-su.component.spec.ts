import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoCauNhanSuComponent } from './co-cau-nhan-su.component';

describe('CoCauNhanSuComponent', () => {
  let component: CoCauNhanSuComponent;
  let fixture: ComponentFixture<CoCauNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoCauNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoCauNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
