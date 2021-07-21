import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietnhansuthuchienComponent } from './chitietnhansuthuchien.component';

describe('ChitietnhansuthuchienComponent', () => {
  let component: ChitietnhansuthuchienComponent;
  let fixture: ComponentFixture<ChitietnhansuthuchienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietnhansuthuchienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietnhansuthuchienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
