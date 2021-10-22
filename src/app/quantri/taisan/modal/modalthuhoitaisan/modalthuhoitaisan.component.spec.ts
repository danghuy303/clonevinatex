import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthuhoitaisanComponent } from './modalthuhoitaisan.component';

describe('ModalthuhoitaisanComponent', () => {
  let component: ModalthuhoitaisanComponent;
  let fixture: ComponentFixture<ModalthuhoitaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthuhoitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthuhoitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
