import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanvattuphuComponent } from './thanhtoanvattuphu.component';

describe('ThanhtoanvattuphuComponent', () => {
  let component: ThanhtoanvattuphuComponent;
  let fixture: ComponentFixture<ThanhtoanvattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
