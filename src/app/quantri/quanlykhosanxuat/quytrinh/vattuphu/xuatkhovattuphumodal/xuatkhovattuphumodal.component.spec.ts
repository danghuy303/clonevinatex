import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhovattuphumodalComponent } from './xuatkhovattuphumodal.component';

describe('XuatkhovattuphumodalComponent', () => {
  let component: XuatkhovattuphumodalComponent;
  let fixture: ComponentFixture<XuatkhovattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhovattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhovattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
