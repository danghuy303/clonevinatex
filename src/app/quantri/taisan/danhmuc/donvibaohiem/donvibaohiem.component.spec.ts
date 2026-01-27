import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonvibaohiemComponent } from './donvibaohiem.component';

describe('DonvibaohiemComponent', () => {
  let component: DonvibaohiemComponent;
  let fixture: ComponentFixture<DonvibaohiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonvibaohiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonvibaohiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
