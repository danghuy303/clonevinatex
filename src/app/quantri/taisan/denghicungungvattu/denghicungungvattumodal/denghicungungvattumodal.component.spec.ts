import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghicungungvattumodalComponent } from './denghicungungvattumodal.component';

describe('DenghicungungvattumodalComponent', () => {
  let component: DenghicungungvattumodalComponent;
  let fixture: ComponentFixture<DenghicungungvattumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghicungungvattumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghicungungvattumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
