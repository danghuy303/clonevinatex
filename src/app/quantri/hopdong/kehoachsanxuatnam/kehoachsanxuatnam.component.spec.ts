import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachsanxuatnamComponent } from './kehoachsanxuatnam.component';

describe('KehoachsanxuatnamComponent', () => {
  let component: KehoachsanxuatnamComponent;
  let fixture: ComponentFixture<KehoachsanxuatnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
