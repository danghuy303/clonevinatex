import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoihancungcapvattuComponent } from './thoihancungcapvattu.component';

describe('ThoihancungcapvattuComponent', () => {
  let component: ThoihancungcapvattuComponent;
  let fixture: ComponentFixture<ThoihancungcapvattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoihancungcapvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoihancungcapvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
