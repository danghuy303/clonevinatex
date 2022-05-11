import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmsucomayComponent } from './modaldmsucomay.component';

describe('ModaldmsucomayComponent', () => {
  let component: ModaldmsucomayComponent;
  let fixture: ComponentFixture<ModaldmsucomayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmsucomayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmsucomayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
