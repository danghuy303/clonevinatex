import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongxuatlobongxomodalComponent } from './hopdongxuatlobongxomodal.component';

describe('HopdongxuatlobongxomodalComponent', () => {
  let component: HopdongxuatlobongxomodalComponent;
  let fixture: ComponentFixture<HopdongxuatlobongxomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongxuatlobongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongxuatlobongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
