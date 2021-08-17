import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmchisotrienkhaiComponent } from './dmchisotrienkhai.component';

describe('DmchisotrienkhaiComponent', () => {
  let component: DmchisotrienkhaiComponent;
  let fixture: ComponentFixture<DmchisotrienkhaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchisotrienkhaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchisotrienkhaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
