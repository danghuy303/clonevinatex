import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucsanxuatComponent } from './dinhmucsanxuat.component';

describe('DinhmucsanxuatComponent', () => {
  let component: DinhmucsanxuatComponent;
  let fixture: ComponentFixture<DinhmucsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
