import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhocapdaumodalComponent } from './xuatkhocapdaumodal.component';

describe('XuatkhocapdaumodalComponent', () => {
  let component: XuatkhocapdaumodalComponent;
  let fixture: ComponentFixture<XuatkhocapdaumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhocapdaumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhocapdaumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
