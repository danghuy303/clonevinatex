import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghixulysucochiphikhacComponent } from './denghixulysucochiphikhac.component';

describe('DenghixulysucochiphikhacComponent', () => {
  let component: DenghixulysucochiphikhacComponent;
  let fixture: ComponentFixture<DenghixulysucochiphikhacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghixulysucochiphikhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghixulysucochiphikhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
