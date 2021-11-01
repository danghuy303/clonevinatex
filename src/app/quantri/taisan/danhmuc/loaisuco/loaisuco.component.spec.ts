import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaisucoComponent } from './loaisuco.component';

describe('LoaisucoComponent', () => {
  let component: LoaisucoComponent;
  let fixture: ComponentFixture<LoaisucoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaisucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaisucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
