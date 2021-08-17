import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmchisotrienkhaimodalComponent } from './dmchisotrienkhaimodal.component';

describe('DmchisotrienkhaimodalComponent', () => {
  let component: DmchisotrienkhaimodalComponent;
  let fixture: ComponentFixture<DmchisotrienkhaimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchisotrienkhaimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchisotrienkhaimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
