import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuloicattheomaymodalComponent } from './thongkechitieuloicattheomaymodal.component';

describe('ThongkechitieuloicattheomaymodalComponent', () => {
  let component: ThongkechitieuloicattheomaymodalComponent;
  let fixture: ComponentFixture<ThongkechitieuloicattheomaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuloicattheomaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuloicattheomaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
