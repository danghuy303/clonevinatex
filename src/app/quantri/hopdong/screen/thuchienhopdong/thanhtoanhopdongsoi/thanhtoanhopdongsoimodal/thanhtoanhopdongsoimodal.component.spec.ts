import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanhopdongsoimodalComponent } from './thanhtoanhopdongsoimodal.component';

describe('ThanhtoanhopdongsoimodalComponent', () => {
  let component: ThanhtoanhopdongsoimodalComponent;
  let fixture: ComponentFixture<ThanhtoanhopdongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanhopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanhopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
