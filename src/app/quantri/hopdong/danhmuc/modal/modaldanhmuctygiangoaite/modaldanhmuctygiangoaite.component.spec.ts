import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuctygiangoaiteComponent } from './modaldanhmuctygiangoaite.component';

describe('ModaldanhmuctygiangoaiteComponent', () => {
  let component: ModaldanhmuctygiangoaiteComponent;
  let fixture: ComponentFixture<ModaldanhmuctygiangoaiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctygiangoaiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctygiangoaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
