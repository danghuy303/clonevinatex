import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBanHangModalComponent } from './chi-phi-ban-hang-modal.component';

describe('ChiPhiBanHangModalComponent', () => {
  let component: ChiPhiBanHangModalComponent;
  let fixture: ComponentFixture<ChiPhiBanHangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBanHangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBanHangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
