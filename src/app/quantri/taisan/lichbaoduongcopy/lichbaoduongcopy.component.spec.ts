import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichbaoduongcopyComponent } from './lichbaoduongcopy.component';

describe('LichbaoduongcopyComponent', () => {
  let component: LichbaoduongcopyComponent;
  let fixture: ComponentFixture<LichbaoduongcopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichbaoduongcopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichbaoduongcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
