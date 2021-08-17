import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoikienbongmodalComponent } from './doikienbongmodal.component';

describe('DoikienbongmodalComponent', () => {
  let component: DoikienbongmodalComponent;
  let fixture: ComponentFixture<DoikienbongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoikienbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoikienbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
