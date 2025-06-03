import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoikehoachComponent } from './theodoikehoach.component';

describe('TheodoikehoachComponent', () => {
  let component: TheodoikehoachComponent;
  let fixture: ComponentFixture<TheodoikehoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoikehoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoikehoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
