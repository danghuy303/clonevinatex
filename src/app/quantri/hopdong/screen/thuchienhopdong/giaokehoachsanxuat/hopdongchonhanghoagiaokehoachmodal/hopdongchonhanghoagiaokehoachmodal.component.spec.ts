import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongchonhanghoagiaokehoachmodalComponent } from './hopdongchonhanghoagiaokehoachmodal.component';

describe('HopdongchonhanghoagiaokehoachmodalComponent', () => {
  let component: HopdongchonhanghoagiaokehoachmodalComponent;
  let fixture: ComponentFixture<HopdongchonhanghoagiaokehoachmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongchonhanghoagiaokehoachmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongchonhanghoagiaokehoachmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
