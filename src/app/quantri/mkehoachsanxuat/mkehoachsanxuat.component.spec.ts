import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';

describe('MkehoachsanxuatComponent', () => {
  let component: MkehoachsanxuatComponent;
  let fixture: ComponentFixture<MkehoachsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MkehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MkehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
