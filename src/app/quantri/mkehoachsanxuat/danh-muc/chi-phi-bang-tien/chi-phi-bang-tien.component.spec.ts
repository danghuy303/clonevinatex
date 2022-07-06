import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBangTienComponent } from './chi-phi-bang-tien.component';

describe('ChiPhiBangTienComponent', () => {
  let component: ChiPhiBangTienComponent;
  let fixture: ComponentFixture<ChiPhiBangTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBangTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBangTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
