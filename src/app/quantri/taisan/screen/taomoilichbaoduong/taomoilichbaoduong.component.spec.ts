import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoilichbaoduongComponent } from './taomoilichbaoduong.component';

describe('TaomoilichbaoduongComponent', () => {
  let component: TaomoilichbaoduongComponent;
  let fixture: ComponentFixture<TaomoilichbaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoilichbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoilichbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
