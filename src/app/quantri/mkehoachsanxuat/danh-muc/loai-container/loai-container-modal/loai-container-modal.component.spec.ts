import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiContainerModalComponent } from './loai-container-modal.component';

describe('LoaiContainerModalComponent', () => {
  let component: LoaiContainerModalComponent;
  let fixture: ComponentFixture<LoaiContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiContainerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
