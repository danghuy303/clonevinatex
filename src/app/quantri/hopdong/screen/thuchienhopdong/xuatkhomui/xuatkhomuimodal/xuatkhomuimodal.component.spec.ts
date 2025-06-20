import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhomuimodalComponent } from './xuatkhomuimodal.component';

describe('XuatkhomuimodalComponent', () => {
  let component: XuatkhomuimodalComponent;
  let fixture: ComponentFixture<XuatkhomuimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhomuimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhomuimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
