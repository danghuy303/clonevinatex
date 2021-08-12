import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhovattuphumodalComponent } from './nhapkhovattuphumodal.component';

describe('NhapkhovattuphumodalComponent', () => {
  let component: NhapkhovattuphumodalComponent;
  let fixture: ComponentFixture<NhapkhovattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhovattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhovattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
