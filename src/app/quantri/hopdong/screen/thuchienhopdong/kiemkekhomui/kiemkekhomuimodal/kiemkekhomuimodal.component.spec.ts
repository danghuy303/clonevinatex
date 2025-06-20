import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhomuimodalComponent } from './kiemkekhomuimodal.component';

describe('KiemkekhomuimodalComponent', () => {
  let component: KiemkekhomuimodalComponent;
  let fixture: ComponentFixture<KiemkekhomuimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhomuimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhomuimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
