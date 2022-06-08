import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiSanComponent } from './tai-san.component';

describe('TaiSanComponent', () => {
  let component: TaiSanComponent;
  let fixture: ComponentFixture<TaiSanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiSanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
