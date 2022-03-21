import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaNhaCungUngModalComponent } from './sua-nha-cung-ung-modal.component';

describe('SuaNhaCungUngModalComponent', () => {
  let component: SuaNhaCungUngModalComponent;
  let fixture: ComponentFixture<SuaNhaCungUngModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuaNhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuaNhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
