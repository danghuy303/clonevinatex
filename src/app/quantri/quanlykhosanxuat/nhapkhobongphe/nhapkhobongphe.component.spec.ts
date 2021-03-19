import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhobongpheComponent } from './nhapkhobongphe.component';

describe('NhapkhobongpheComponent', () => {
  let component: NhapkhobongpheComponent;
  let fixture: ComponentFixture<NhapkhobongpheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhobongpheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhobongpheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
