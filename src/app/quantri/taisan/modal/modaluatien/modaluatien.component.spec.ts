import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaluatienComponent } from './modaluatien.component';

describe('ModaluatienComponent', () => {
  let component: ModaluatienComponent;
  let fixture: ComponentFixture<ModaluatienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaluatienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaluatienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
