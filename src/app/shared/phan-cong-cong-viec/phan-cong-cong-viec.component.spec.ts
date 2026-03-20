import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanCongCongViecComponent } from './phan-cong-cong-viec.component';

describe('PhanCongCongViecComponent', () => {
  let component: PhanCongCongViecComponent;
  let fixture: ComponentFixture<PhanCongCongViecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanCongCongViecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanCongCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
