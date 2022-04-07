import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiBongPheDanhMucComponent } from './loai-bong-phe-danh-muc.component';

describe('LoaiBongPheDanhMucComponent', () => {
  let component: LoaiBongPheDanhMucComponent;
  let fixture: ComponentFixture<LoaiBongPheDanhMucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiBongPheDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiBongPheDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
