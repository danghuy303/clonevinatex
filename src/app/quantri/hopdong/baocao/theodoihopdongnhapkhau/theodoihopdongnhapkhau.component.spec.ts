import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoihopdongnhapkhauComponent } from './theodoihopdongnhapkhau.component';

describe('TheodoihopdongnhapkhauComponent', () => {
  let component: TheodoihopdongnhapkhauComponent;
  let fixture: ComponentFixture<TheodoihopdongnhapkhauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoihopdongnhapkhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoihopdongnhapkhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
