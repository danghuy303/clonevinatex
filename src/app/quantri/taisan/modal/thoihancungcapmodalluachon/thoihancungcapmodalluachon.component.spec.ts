import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoihancungcapmodalluachonComponent } from './thoihancungcapmodalluachon.component';

describe('ThoihancungcapmodalluachonComponent', () => {
  let component: ThoihancungcapmodalluachonComponent;
  let fixture: ComponentFixture<ThoihancungcapmodalluachonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoihancungcapmodalluachonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoihancungcapmodalluachonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
