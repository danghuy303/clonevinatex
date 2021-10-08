import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhdanhgiakhachhangmodalComponent } from './quytrinhdanhgiakhachhangmodal.component';

describe('QuytrinhdanhgiakhachhangmodalComponent', () => {
  let component: QuytrinhdanhgiakhachhangmodalComponent;
  let fixture: ComponentFixture<QuytrinhdanhgiakhachhangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhdanhgiakhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhdanhgiakhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
