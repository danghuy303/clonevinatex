import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan.component';

describe('NhaplieuxuattaisanComponent', () => {
  let component: NhaplieuxuattaisanComponent;
  let fixture: ComponentFixture<NhaplieuxuattaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaplieuxuattaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaplieuxuattaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
