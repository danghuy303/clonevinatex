import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoihopdonhnhapkhauComponent } from './theodoihopdonhnhapkhau.component';

describe('TheodoihopdonhnhapkhauComponent', () => {
  let component: TheodoihopdonhnhapkhauComponent;
  let fixture: ComponentFixture<TheodoihopdonhnhapkhauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoihopdonhnhapkhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoihopdonhnhapkhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
