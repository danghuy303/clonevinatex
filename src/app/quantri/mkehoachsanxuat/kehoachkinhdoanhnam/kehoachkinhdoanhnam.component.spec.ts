import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam.component';

describe('KehoachkinhdoanhnamComponent', () => {
  let component: KehoachkinhdoanhnamComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
