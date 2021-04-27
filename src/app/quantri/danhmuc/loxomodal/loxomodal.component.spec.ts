import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoxomodalComponent } from './loxomodal.component';

describe('LoxomodalComponent', () => {
  let component: LoxomodalComponent;
  let fixture: ComponentFixture<LoxomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
