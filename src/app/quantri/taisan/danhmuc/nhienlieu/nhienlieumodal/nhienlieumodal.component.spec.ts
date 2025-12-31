import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhienlieumodalComponent } from './nhienlieumodal.component';

describe('NhienlieumodalComponent', () => {
  let component: NhienlieumodalComponent;
  let fixture: ComponentFixture<NhienlieumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhienlieumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhienlieumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
