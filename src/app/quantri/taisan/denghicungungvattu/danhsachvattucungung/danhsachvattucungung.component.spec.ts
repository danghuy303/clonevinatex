import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachvattucungungComponent } from './danhsachvattucungung.component';

describe('DanhsachvattucungungComponent', () => {
  let component: DanhsachvattucungungComponent;
  let fixture: ComponentFixture<DanhsachvattucungungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachvattucungungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachvattucungungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
