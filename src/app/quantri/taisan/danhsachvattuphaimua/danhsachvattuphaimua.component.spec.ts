import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachvattuphaimuaComponent } from './danhsachvattuphaimua.component';

describe('DanhsachvattuphaimuaComponent', () => {
  let component: DanhsachvattuphaimuaComponent;
  let fixture: ComponentFixture<DanhsachvattuphaimuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachvattuphaimuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachvattuphaimuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
