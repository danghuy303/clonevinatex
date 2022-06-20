import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaodieukhongComponent } from './baocaodieukhong.component';

describe('BaocaodieukhongComponent', () => {
  let component: BaocaodieukhongComponent;
  let fixture: ComponentFixture<BaocaodieukhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaodieukhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaodieukhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
