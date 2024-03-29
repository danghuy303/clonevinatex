import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoHiemModalComponent } from './bao-hiem-modal.component';

describe('BaoHiemModalComponent', () => {
  let component: BaoHiemModalComponent;
  let fixture: ComponentFixture<BaoHiemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoHiemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoHiemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
