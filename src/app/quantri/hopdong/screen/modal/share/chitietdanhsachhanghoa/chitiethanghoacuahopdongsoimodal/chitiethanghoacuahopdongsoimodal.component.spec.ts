import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal.component';

describe('ChitiethanghoacuahopdongsoimodalComponent', () => {
  let component: ChitiethanghoacuahopdongsoimodalComponent;
  let fixture: ComponentFixture<ChitiethanghoacuahopdongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethanghoacuahopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethanghoacuahopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
