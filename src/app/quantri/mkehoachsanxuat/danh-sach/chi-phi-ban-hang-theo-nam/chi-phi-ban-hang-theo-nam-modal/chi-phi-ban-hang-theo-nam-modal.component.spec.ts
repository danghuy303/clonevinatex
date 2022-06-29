import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBanHangTheoNamModalComponent } from './chi-phi-ban-hang-theo-nam-modal.component';

describe('ChiPhiBanHangTheoNamModalComponent', () => {
  let component: ChiPhiBanHangTheoNamModalComponent;
  let fixture: ComponentFixture<ChiPhiBanHangTheoNamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBanHangTheoNamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBanHangTheoNamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
