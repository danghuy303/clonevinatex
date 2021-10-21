import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangiaotaisanComponent } from './bangiaotaisan.component';

describe('BangiaotaisanComponent', () => {
  let component: BangiaotaisanComponent;
  let fixture: ComponentFixture<BangiaotaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangiaotaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangiaotaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
