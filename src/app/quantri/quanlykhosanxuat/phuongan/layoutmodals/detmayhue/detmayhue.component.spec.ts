import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetmayhueComponent } from './detmayhue.component';

describe('DetmayhueComponent', () => {
  let component: DetmayhueComponent;
  let fixture: ComponentFixture<DetmayhueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetmayhueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetmayhueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
