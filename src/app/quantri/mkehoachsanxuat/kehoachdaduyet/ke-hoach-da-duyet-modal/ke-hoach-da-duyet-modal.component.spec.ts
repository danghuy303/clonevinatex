import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachDaDuyetModalComponent } from './ke-hoach-da-duyet-modal.component';

describe('KeHoachDaDuyetModalComponent', () => {
  let component: KeHoachDaDuyetModalComponent;
  let fixture: ComponentFixture<KeHoachDaDuyetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachDaDuyetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachDaDuyetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
