import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuloicatComponent } from './thongkechitieuloicat.component';

describe('ThongkechitieuloicatComponent', () => {
  let component: ThongkechitieuloicatComponent;
  let fixture: ComponentFixture<ThongkechitieuloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
