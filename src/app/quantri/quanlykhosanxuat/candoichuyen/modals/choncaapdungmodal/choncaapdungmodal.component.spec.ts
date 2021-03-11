import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoncaapdungmodalComponent } from './choncaapdungmodal.component';

describe('ChoncaapdungmodalComponent', () => {
  let component: ChoncaapdungmodalComponent;
  let fixture: ComponentFixture<ChoncaapdungmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoncaapdungmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoncaapdungmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
