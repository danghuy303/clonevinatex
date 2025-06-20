import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhomuiComponent } from './kiemkekhomui.component';

describe('KiemkekhomuiComponent', () => {
  let component: KiemkekhomuiComponent;
  let fixture: ComponentFixture<KiemkekhomuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhomuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhomuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
