import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoilichbaoduongcopyComponent } from './taomoilichbaoduongcopy.component';

describe('TaomoilichbaoduongcopyComponent', () => {
  let component: TaomoilichbaoduongcopyComponent;
  let fixture: ComponentFixture<TaomoilichbaoduongcopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoilichbaoduongcopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoilichbaoduongcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
