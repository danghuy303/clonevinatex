import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatbongchovaymodalComponent } from './xuatbongchovaymodal.component';

describe('XuatbongchovaymodalComponent', () => {
  let component: XuatbongchovaymodalComponent;
  let fixture: ComponentFixture<XuatbongchovaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatbongchovaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatbongchovaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
