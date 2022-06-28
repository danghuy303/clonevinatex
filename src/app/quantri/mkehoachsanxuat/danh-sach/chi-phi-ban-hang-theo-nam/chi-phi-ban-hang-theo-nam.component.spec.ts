import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBanHangTheoNamComponent } from './chi-phi-ban-hang-theo-nam.component';

describe('ChiPhiBanHangTheoNamComponent', () => {
  let component: ChiPhiBanHangTheoNamComponent;
  let fixture: ComponentFixture<ChiPhiBanHangTheoNamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBanHangTheoNamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBanHangTheoNamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
