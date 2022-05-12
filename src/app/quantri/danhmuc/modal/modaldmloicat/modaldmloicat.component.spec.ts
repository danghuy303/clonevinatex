import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmloicatComponent } from './modaldmloicat.component';

describe('ModaldmloicatComponent', () => {
  let component: ModaldmloicatComponent;
  let fixture: ComponentFixture<ModaldmloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
