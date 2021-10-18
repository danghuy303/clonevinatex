import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalhangsanxuatComponent } from './modalhangsanxuat.component';

describe('ModalhangsanxuatComponent', () => {
  let component: ModalhangsanxuatComponent;
  let fixture: ComponentFixture<ModalhangsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalhangsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalhangsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
