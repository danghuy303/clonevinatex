import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucmucdouatienComponent } from './danhmucmucdouatien.component';

describe('DanhmucmucdouatienComponent', () => {
  let component: DanhmucmucdouatienComponent;
  let fixture: ComponentFixture<DanhmucmucdouatienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucmucdouatienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucmucdouatienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
