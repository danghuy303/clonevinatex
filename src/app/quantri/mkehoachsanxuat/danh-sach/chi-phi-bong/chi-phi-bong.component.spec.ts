import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBongComponent } from './chi-phi-bong.component';

describe('ChiPhiBongComponent', () => {
  let component: ChiPhiBongComponent;
  let fixture: ComponentFixture<ChiPhiBongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
