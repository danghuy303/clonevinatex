import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhThuModalComponent } from './doanh-thu-modal.component';

describe('DoanhThuModalComponent', () => {
  let component: DoanhThuModalComponent;
  let fixture: ComponentFixture<DoanhThuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoanhThuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhThuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
