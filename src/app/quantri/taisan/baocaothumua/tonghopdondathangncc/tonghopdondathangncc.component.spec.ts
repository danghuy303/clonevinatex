import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonghopdondathangnccComponent } from './tonghopdondathangncc.component';

describe('TonghopdondathangnccComponent', () => {
  let component: TonghopdondathangnccComponent;
  let fixture: ComponentFixture<TonghopdondathangnccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonghopdondathangnccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonghopdondathangnccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
