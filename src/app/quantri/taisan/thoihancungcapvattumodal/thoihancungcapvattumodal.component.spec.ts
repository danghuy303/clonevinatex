import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoihancungcapvattumodalComponent } from './thoihancungcapvattumodal.component';

describe('ThoihancungcapvattumodalComponent', () => {
  let component: ThoihancungcapvattumodalComponent;
  let fixture: ComponentFixture<ThoihancungcapvattumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoihancungcapvattumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoihancungcapvattumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
