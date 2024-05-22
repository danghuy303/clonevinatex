import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaodienmodalComponent } from './baocaodienmodal.component';

describe('BaocaodienmodalComponent', () => {
  let component: BaocaodienmodalComponent;
  let fixture: ComponentFixture<BaocaodienmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaodienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaodienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
