import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBangTienHangThangModalComponent } from './chi-phi-bang-tien-hang-thang-modal.component';

describe('ChiPhiBangTienHangThangModalComponent', () => {
  let component: ChiPhiBangTienHangThangModalComponent;
  let fixture: ComponentFixture<ChiPhiBangTienHangThangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBangTienHangThangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBangTienHangThangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
