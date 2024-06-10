import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhucuongComponent } from './phucuong.component';

describe('PhucuongComponent', () => {
  let component: PhucuongComponent;
  let fixture: ComponentFixture<PhucuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhucuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhucuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
