import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichbaoduongComponent } from './lichbaoduong.component';

describe('LichbaoduongComponent', () => {
  let component: LichbaoduongComponent;
  let fixture: ComponentFixture<LichbaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
