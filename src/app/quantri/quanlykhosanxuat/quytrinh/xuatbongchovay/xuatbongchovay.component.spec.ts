import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatbongchovayComponent } from './xuatbongchovay.component';

describe('XuatbongchovayComponent', () => {
  let component: XuatbongchovayComponent;
  let fixture: ComponentFixture<XuatbongchovayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatbongchovayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatbongchovayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
