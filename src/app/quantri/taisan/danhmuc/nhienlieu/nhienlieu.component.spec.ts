import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhienlieuComponent } from './nhienlieu.component';

describe('NhienlieuComponent', () => {
  let component: NhienlieuComponent;
  let fixture: ComponentFixture<NhienlieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhienlieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhienlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
