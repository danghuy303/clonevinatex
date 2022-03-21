import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphikhacComponent } from './chiphikhac.component';

describe('ChiphikhacComponent', () => {
  let component: ChiphikhacComponent;
  let fixture: ComponentFixture<ChiphikhacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphikhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphikhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
