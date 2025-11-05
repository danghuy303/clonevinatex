import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantrichatluongcongdoanComponent } from './quantrichatluongcongdoan.component';

describe('QuantrichatluongcongdoanComponent', () => {
  let component: QuantrichatluongcongdoanComponent;
  let fixture: ComponentFixture<QuantrichatluongcongdoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantrichatluongcongdoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantrichatluongcongdoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
