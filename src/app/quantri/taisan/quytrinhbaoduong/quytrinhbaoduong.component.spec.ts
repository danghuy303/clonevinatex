import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhbaoduongComponent } from './quytrinhbaoduong.component';

describe('QuytrinhbaoduongComponent', () => {
  let component: QuytrinhbaoduongComponent;
  let fixture: ComponentFixture<QuytrinhbaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
