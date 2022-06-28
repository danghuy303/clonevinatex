import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiSanModalComponent } from './tai-san-modal.component';

describe('TaiSanModalComponent', () => {
  let component: TaiSanModalComponent;
  let fixture: ComponentFixture<TaiSanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiSanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
