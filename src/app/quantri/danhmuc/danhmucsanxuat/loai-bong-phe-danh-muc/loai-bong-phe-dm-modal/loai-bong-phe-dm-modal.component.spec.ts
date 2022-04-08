import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiBongPheDmModalComponent } from './loai-bong-phe-dm-modal.component';

describe('LoaiBongPheDmModalComponent', () => {
  let component: LoaiBongPheDmModalComponent;
  let fixture: ComponentFixture<LoaiBongPheDmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiBongPheDmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiBongPheDmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
