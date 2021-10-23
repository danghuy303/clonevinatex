import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhthanhtoanbongComponent } from './quytrinhthanhtoanbong.component';

describe('QuytrinhthanhtoanbongComponent', () => {
  let component: QuytrinhthanhtoanbongComponent;
  let fixture: ComponentFixture<QuytrinhthanhtoanbongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhthanhtoanbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhthanhtoanbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
