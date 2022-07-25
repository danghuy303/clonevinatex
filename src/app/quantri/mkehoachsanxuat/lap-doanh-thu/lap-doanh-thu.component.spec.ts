import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapDoanhThuComponent } from './lap-doanh-thu.component';

describe('LapDoanhThuComponent', () => {
  let component: LapDoanhThuComponent;
  let fixture: ComponentFixture<LapDoanhThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapDoanhThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapDoanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
