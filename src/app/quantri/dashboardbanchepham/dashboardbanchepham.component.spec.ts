import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbanchephamComponent } from './dashboardbanchepham.component';

describe('DashboardbanchephamComponent', () => {
  let component: DashboardbanchephamComponent;
  let fixture: ComponentFixture<DashboardbanchephamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardbanchephamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbanchephamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
