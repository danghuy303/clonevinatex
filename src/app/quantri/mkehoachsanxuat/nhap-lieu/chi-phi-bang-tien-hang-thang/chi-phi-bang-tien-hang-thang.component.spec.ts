import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBangTienHangThangComponent } from './chi-phi-bang-tien-hang-thang.component';

describe('ChiPhiBangTienHangThangComponent', () => {
  let component: ChiPhiBangTienHangThangComponent;
  let fixture: ComponentFixture<ChiPhiBangTienHangThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBangTienHangThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBangTienHangThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
