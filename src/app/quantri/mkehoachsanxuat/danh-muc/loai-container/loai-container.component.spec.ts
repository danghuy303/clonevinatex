import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiContainerComponent } from './loai-container.component';

describe('LoaiContainerComponent', () => {
  let component: LoaiContainerComponent;
  let fixture: ComponentFixture<LoaiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
