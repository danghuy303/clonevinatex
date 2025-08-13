import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhocapdauComponent } from './xuatkhocapdau.component';

describe('XuatkhocapdauComponent', () => {
  let component: XuatkhocapdauComponent;
  let fixture: ComponentFixture<XuatkhocapdauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhocapdauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhocapdauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
