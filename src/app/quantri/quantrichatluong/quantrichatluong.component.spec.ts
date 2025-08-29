import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantrichatluongComponent } from './quantrichatluong.component';

describe('QuantrichatluongComponent', () => {
  let component: QuantrichatluongComponent;
  let fixture: ComponentFixture<QuantrichatluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantrichatluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantrichatluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
