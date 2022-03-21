import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomNhaCungUngModalComponent } from './nhom-nha-cung-ung-modal.component';

describe('NhomNhaCungUngModalComponent', () => {
  let component: NhomNhaCungUngModalComponent;
  let fixture: ComponentFixture<NhomNhaCungUngModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomNhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomNhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
