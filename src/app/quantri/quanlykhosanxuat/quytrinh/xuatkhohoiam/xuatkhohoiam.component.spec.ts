import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhohoiamComponent } from './xuatkhohoiam.component';

describe('XuatkhohoiamComponent', () => {
  let component: XuatkhohoiamComponent;
  let fixture: ComponentFixture<XuatkhohoiamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhohoiamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhohoiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
