import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhancongComponent } from './nhancong.component';

describe('NhancongComponent', () => {
  let component: NhancongComponent;
  let fixture: ComponentFixture<NhancongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhancongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhancongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
