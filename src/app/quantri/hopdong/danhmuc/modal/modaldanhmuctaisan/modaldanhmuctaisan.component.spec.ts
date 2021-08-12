import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuctaisanComponent } from './modaldanhmuctaisan.component';

describe('ModaldanhmuctaisanComponent', () => {
  let component: ModaldanhmuctaisanComponent;
  let fixture: ComponentFixture<ModaldanhmuctaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
