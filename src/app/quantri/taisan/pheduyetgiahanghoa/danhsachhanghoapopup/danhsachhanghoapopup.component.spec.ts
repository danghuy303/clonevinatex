import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhanghoapopupComponent } from './danhsachhanghoapopup.component';

describe('DanhsachhanghoapopupComponent', () => {
  let component: DanhsachhanghoapopupComponent;
  let fixture: ComponentFixture<DanhsachhanghoapopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhanghoapopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhanghoapopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
