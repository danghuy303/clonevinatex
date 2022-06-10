import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuyTrinhComponent } from './test-quy-trinh.component';

describe('TestQuyTrinhComponent', () => {
  let component: TestQuyTrinhComponent;
  let fixture: ComponentFixture<TestQuyTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
