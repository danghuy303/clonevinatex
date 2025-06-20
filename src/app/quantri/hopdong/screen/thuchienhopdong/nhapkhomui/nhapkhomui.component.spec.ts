import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhomuiComponent } from './nhapkhomui.component';

describe('NhapkhomuiComponent', () => {
  let component: NhapkhomuiComponent;
  let fixture: ComponentFixture<NhapkhomuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhomuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhomuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
