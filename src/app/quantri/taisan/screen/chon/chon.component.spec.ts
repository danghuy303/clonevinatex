import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonComponent } from './chon.component';

describe('ChonComponent', () => {
  let component: ChonComponent;
  let fixture: ComponentFixture<ChonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
