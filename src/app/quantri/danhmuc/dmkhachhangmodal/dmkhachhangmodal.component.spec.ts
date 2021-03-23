import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmkhachhangmodalComponent } from './dmkhachhangmodal.component';

describe('DmkhachhangmodalComponent', () => {
  let component: DmkhachhangmodalComponent;
  let fixture: ComponentFixture<DmkhachhangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
