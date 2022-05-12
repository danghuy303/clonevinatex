import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmchitieuloicatComponent } from './dmchitieuloicat.component';

describe('DmchitieuloicatComponent', () => {
  let component: DmchitieuloicatComponent;
  let fixture: ComponentFixture<DmchitieuloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchitieuloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchitieuloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
