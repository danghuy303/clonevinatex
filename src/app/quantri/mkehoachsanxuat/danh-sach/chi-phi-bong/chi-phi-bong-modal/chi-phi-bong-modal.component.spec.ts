import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBongModalComponent } from './chi-phi-bong-modal.component';

describe('ChiPhiBongModalComponent', () => {
  let component: ChiPhiBongModalComponent;
  let fixture: ComponentFixture<ChiPhiBongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
