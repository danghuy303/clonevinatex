import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachkinhdoanhdanhsachComponent } from './kehoachkinhdoanhdanhsach.component';

describe('KehoachkinhdoanhdanhsachComponent', () => {
  let component: KehoachkinhdoanhdanhsachComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhdanhsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhdanhsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhdanhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
