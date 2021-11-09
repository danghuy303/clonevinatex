import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapgiatinhdoanhthumodalComponent } from './nhapgiatinhdoanhthumodal.component';

describe('NhapgiatinhdoanhthumodalComponent', () => {
  let component: NhapgiatinhdoanhthumodalComponent;
  let fixture: ComponentFixture<NhapgiatinhdoanhthumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapgiatinhdoanhthumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapgiatinhdoanhthumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
