import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhdanhgiakhachhangComponent } from './quytrinhdanhgiakhachhang.component';

describe('QuytrinhdanhgiakhachhangComponent', () => {
  let component: QuytrinhdanhgiakhachhangComponent;
  let fixture: ComponentFixture<QuytrinhdanhgiakhachhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhdanhgiakhachhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhdanhgiakhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
