import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthanhlytaisanComponent } from './modalthanhlytaisan.component';

describe('ModalthanhlytaisanComponent', () => {
  let component: ModalthanhlytaisanComponent;
  let fixture: ComponentFixture<ModalthanhlytaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthanhlytaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthanhlytaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
