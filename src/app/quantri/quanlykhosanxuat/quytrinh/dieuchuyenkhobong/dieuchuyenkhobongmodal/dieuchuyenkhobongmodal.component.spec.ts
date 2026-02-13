import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuchuyenkhobongmodalComponent } from './dieuchuyenkhobongmodal.component';

describe('DieuchuyenkhobongmodalComponent', () => {
  let component: DieuchuyenkhobongmodalComponent;
  let fixture: ComponentFixture<DieuchuyenkhobongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenkhobongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenkhobongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
