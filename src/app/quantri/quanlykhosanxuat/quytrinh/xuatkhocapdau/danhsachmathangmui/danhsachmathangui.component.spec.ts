import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachmathanguiComponent } from './danhsachmathangui.component';

describe('DanhsachmathanguiComponent', () => {
  let component: DanhsachmathanguiComponent;
  let fixture: ComponentFixture<DanhsachmathanguiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachmathanguiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachmathanguiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
