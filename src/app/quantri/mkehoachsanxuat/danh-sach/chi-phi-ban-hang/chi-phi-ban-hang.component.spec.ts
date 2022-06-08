import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBanHangComponent } from './chi-phi-ban-hang.component';

describe('ChiPhiBanHangComponent', () => {
  let component: ChiPhiBanHangComponent;
  let fixture: ComponentFixture<ChiPhiBanHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBanHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBanHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
