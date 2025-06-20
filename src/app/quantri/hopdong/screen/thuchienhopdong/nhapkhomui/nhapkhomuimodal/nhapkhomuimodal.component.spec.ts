import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhomuimodalComponent } from './nhapkhomuimodal.component';

describe('NhapkhomuimodalComponent', () => {
  let component: NhapkhomuimodalComponent;
  let fixture: ComponentFixture<NhapkhomuimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhomuimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhomuimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
