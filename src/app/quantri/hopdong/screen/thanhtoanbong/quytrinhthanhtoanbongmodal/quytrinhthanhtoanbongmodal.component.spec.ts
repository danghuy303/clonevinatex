import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhthanhtoanbongmodalComponent } from './quytrinhthanhtoanbongmodal.component';

describe('QuytrinhthanhtoanbongmodalComponent', () => {
  let component: QuytrinhthanhtoanbongmodalComponent;
  let fixture: ComponentFixture<QuytrinhthanhtoanbongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhthanhtoanbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhthanhtoanbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
