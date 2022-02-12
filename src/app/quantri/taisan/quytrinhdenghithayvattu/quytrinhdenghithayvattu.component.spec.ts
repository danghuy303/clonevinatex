import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhdenghithayvattuComponent } from './quytrinhdenghithayvattu.component';

describe('QuytrinhdenghithayvattuComponent', () => {
  let component: QuytrinhdenghithayvattuComponent;
  let fixture: ComponentFixture<QuytrinhdenghithayvattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhdenghithayvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhdenghithayvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
