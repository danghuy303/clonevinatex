import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanhopdongmodalComponent } from './thanhtoanhopdongmodal.component';

describe('ThanhtoanhopdongmodalComponent', () => {
  let component: ThanhtoanhopdongmodalComponent;
  let fixture: ComponentFixture<ThanhtoanhopdongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanhopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanhopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
