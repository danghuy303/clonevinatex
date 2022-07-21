import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapDoanhThuModalComponent } from './lap-doanh-thu-modal.component';

describe('LapDoanhThuModalComponent', () => {
  let component: LapDoanhThuModalComponent;
  let fixture: ComponentFixture<LapDoanhThuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapDoanhThuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapDoanhThuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
