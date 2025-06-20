import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhomuiComponent } from './xuatkhomui.component';

describe('XuatkhomuiComponent', () => {
  let component: XuatkhomuiComponent;
  let fixture: ComponentFixture<XuatkhomuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhomuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhomuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
