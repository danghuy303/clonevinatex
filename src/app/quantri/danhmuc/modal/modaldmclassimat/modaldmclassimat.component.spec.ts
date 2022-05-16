import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmclassimatComponent } from './modaldmclassimat.component';

describe('ModaldmclassimatComponent', () => {
  let component: ModaldmclassimatComponent;
  let fixture: ComponentFixture<ModaldmclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
