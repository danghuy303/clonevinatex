import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongsanphammodalComponent } from './hopdongsanphammodal.component';

describe('HopdongsanphammodalComponent', () => {
  let component: HopdongsanphammodalComponent;
  let fixture: ComponentFixture<HopdongsanphammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongsanphammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongsanphammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
