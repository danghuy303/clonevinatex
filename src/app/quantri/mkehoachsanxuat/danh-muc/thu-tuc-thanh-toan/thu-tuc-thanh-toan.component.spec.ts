import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuTucThanhToanComponent } from './thu-tuc-thanh-toan.component';

describe('ThuTucThanhToanComponent', () => {
  let component: ThuTucThanhToanComponent;
  let fixture: ComponentFixture<ThuTucThanhToanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuTucThanhToanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuTucThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
