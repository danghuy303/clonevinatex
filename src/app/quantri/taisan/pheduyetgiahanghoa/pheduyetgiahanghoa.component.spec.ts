import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PheduyetgiahanghoaComponent } from './pheduyetgiahanghoa.component';

describe('PheduyetgiahanghoaComponent', () => {
  let component: PheduyetgiahanghoaComponent;
  let fixture: ComponentFixture<PheduyetgiahanghoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PheduyetgiahanghoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PheduyetgiahanghoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
