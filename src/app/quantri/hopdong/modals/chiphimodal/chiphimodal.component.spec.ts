import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphimodalComponent } from './chiphimodal.component';

describe('ChiphimodalComponent', () => {
  let component: ChiphimodalComponent;
  let fixture: ComponentFixture<ChiphimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
