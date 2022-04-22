import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuSuDungComponent } from './lich-su-su-dung.component';

describe('LichSuSuDungComponent', () => {
  let component: LichSuSuDungComponent;
  let fixture: ComponentFixture<LichSuSuDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichSuSuDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
