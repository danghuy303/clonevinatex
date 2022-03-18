import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemNhaCungUngModalComponent } from './them-nha-cung-ung-modal.component';

describe('ThemNhaCungUngModalComponent', () => {
  let component: ThemNhaCungUngModalComponent;
  let fixture: ComponentFixture<ThemNhaCungUngModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemNhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemNhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
