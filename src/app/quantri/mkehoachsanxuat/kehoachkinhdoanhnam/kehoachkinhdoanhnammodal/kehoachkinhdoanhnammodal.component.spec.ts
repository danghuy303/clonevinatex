import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnammodal.component';

describe('KehoachkinhdoanhnammodalComponent', () => {
  let component: KehoachkinhdoanhnammodalComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhnammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhnammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhnammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
