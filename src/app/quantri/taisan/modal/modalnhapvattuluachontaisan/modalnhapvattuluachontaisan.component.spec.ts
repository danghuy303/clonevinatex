import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalnhapvattuluachontaisanComponent } from './modalnhapvattuluachontaisan.component';

describe('ModalnhapvattuluachontaisanComponent', () => {
  let component: ModalnhapvattuluachontaisanComponent;
  let fixture: ComponentFixture<ModalnhapvattuluachontaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalnhapvattuluachontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalnhapvattuluachontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
