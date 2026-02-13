import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuchuyenkhoxoComponent } from './dieuchuyenkhoxo.component';

describe('DieuchuyenkhoxoComponent', () => {
  let component: DieuchuyenkhoxoComponent;
  let fixture: ComponentFixture<DieuchuyenkhoxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenkhoxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenkhoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
