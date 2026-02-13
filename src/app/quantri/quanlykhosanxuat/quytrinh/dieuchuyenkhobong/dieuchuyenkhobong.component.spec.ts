import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuchuyenkhobongComponent } from './dieuchuyenkhobong.component';

describe('DieuchuyenkhobongComponent', () => {
  let component: DieuchuyenkhobongComponent;
  let fixture: ComponentFixture<DieuchuyenkhobongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenkhobongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenkhobongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
