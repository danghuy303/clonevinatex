import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachnhacungcungungmodalComponent } from './danhsachnhacungcungungmodal.component';

describe('DanhsachnhacungcungungmodalComponent', () => {
  let component: DanhsachnhacungcungungmodalComponent;
  let fixture: ComponentFixture<DanhsachnhacungcungungmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachnhacungcungungmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachnhacungcungungmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
