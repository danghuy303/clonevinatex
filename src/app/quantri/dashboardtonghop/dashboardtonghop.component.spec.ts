import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardtonghopComponent } from './dashboardtonghop.component';

describe('DashboardtonghopComponent', () => {
  let component: DashboardtonghopComponent;
  let fixture: ComponentFixture<DashboardtonghopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardtonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardtonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
