import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmloaidienComponent } from './modaldmloaidien.component';

describe('ModaldmloaidienComponent', () => {
  let component: ModaldmloaidienComponent;
  let fixture: ComponentFixture<ModaldmloaidienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmloaidienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmloaidienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
