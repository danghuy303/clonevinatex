import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghixulysuconhancongComponent } from './denghixulysuconhancong.component';

describe('DenghixulysuconhancongComponent', () => {
  let component: DenghixulysuconhancongComponent;
  let fixture: ComponentFixture<DenghixulysuconhancongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghixulysuconhancongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghixulysuconhancongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
