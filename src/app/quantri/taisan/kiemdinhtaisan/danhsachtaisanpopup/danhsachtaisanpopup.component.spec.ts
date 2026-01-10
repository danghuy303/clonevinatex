import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtaisanpopupComponent } from './danhsachtaisanpopup.component';

describe('DanhsachtaisanpopupComponent', () => {
  let component: DanhsachtaisanpopupComponent;
  let fixture: ComponentFixture<DanhsachtaisanpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtaisanpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtaisanpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
