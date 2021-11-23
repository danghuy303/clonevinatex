import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphidienComponent } from './chiphidien.component';

describe('ChiphidienComponent', () => {
  let component: ChiphidienComponent;
  let fixture: ComponentFixture<ChiphidienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphidienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphidienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
