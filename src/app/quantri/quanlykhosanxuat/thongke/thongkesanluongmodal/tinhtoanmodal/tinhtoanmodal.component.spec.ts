import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhtoanmodalComponent } from './tinhtoanmodal.component';

describe('TinhtoanmodalComponent', () => {
  let component: TinhtoanmodalComponent;
  let fixture: ComponentFixture<TinhtoanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhtoanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhtoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
