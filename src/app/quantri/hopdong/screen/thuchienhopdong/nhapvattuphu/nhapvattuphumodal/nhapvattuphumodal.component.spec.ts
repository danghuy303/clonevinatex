import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapvattuphumodalComponent } from './nhapvattuphumodal.component';

describe('NhapvattuphumodalComponent', () => {
  let component: NhapvattuphumodalComponent;
  let fixture: ComponentFixture<NhapvattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
