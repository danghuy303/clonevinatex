import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuongMacComponent } from './vuong-mac.component';

describe('VuongMacComponent', () => {
  let component: VuongMacComponent;
  let fixture: ComponentFixture<VuongMacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuongMacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuongMacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
