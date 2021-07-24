import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaonhanhanghoaComponent } from './giaonhanhanghoa.component';

describe('GiaonhanhanghoaComponent', () => {
  let component: GiaonhanhanghoaComponent;
  let fixture: ComponentFixture<GiaonhanhanghoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaonhanhanghoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaonhanhanghoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
