import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucchitieuloicatComponent } from './dinhmucchitieuloicat.component';

describe('DinhmucchitieuloicatComponent', () => {
  let component: DinhmucchitieuloicatComponent;
  let fixture: ComponentFixture<DinhmucchitieuloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucchitieuloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucchitieuloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
