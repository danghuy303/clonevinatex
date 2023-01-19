import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoHiemComponent } from './bao-hiem.component';

describe('BaoHiemComponent', () => {
  let component: BaoHiemComponent;
  let fixture: ComponentFixture<BaoHiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoHiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoHiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
