import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Con2BaocaocaComponent } from './con2-baocaoca.component';

describe('Con2BaocaocaComponent', () => {
  let component: Con2BaocaocaComponent;
  let fixture: ComponentFixture<Con2BaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Con2BaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Con2BaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
