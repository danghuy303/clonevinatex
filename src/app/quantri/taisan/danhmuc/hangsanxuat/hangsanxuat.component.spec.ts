import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangsanxuatComponent } from './hangsanxuat.component';

describe('HangsanxuatComponent', () => {
  let component: HangsanxuatComponent;
  let fixture: ComponentFixture<HangsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
