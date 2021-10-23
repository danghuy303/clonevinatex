import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanvattuphumodalComponent } from './thanhtoanvattuphumodal.component';

describe('ThanhtoanvattuphumodalComponent', () => {
  let component: ThanhtoanvattuphumodalComponent;
  let fixture: ComponentFixture<ThanhtoanvattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
