import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachkinhdoanhTaomoiComponent } from './kehoachkinhdoanh-taomoi.component';

describe('KehoachkinhdoanhTaomoiComponent', () => {
  let component: KehoachkinhdoanhTaomoiComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhTaomoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhTaomoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhTaomoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
