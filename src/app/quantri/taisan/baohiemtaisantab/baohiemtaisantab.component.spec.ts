import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaohiemtaisantabComponent } from './baohiemtaisantab.component';

describe('BaohiemtaisantabComponent', () => {
  let component: BaohiemtaisantabComponent;
  let fixture: ComponentFixture<BaohiemtaisantabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaohiemtaisantabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaohiemtaisantabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
