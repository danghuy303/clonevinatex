import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhoxoComponent } from './nhapkhoxo.component';

describe('NhapkhoxoComponent', () => {
  let component: NhapkhoxoComponent;
  let fixture: ComponentFixture<NhapkhoxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhoxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
