import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuyTrinhCanXuLyComponent } from './modal-quy-trinh-can-xu-ly.component';

describe('ModalQuyTrinhCanXuLyComponent', () => {
  let component: ModalQuyTrinhCanXuLyComponent;
  let fixture: ComponentFixture<ModalQuyTrinhCanXuLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQuyTrinhCanXuLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuyTrinhCanXuLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
