import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VattuComponent } from './vattu.component';

describe('VattuComponent', () => {
  let component: VattuComponent;
  let fixture: ComponentFixture<VattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
