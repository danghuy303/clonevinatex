import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachsanxuatthangComponent } from './kehoachsanxuatthang.component';

describe('KehoachsanxuatthangComponent', () => {
  let component: KehoachsanxuatthangComponent;
  let fixture: ComponentFixture<KehoachsanxuatthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
