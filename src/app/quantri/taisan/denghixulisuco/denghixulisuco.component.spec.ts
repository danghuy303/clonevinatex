import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghixulisucoComponent } from './denghixulisuco.component';

describe('DenghixulisucoComponent', () => {
  let component: DenghixulisucoComponent;
  let fixture: ComponentFixture<DenghixulisucoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghixulisucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghixulisucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
