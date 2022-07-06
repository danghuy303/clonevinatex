import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayDaiHanModalComponent } from './chi-phi-lai-vay-dai-han-modal.component';

describe('ChiPhiLaiVayDaiHanModalComponent', () => {
  let component: ChiPhiLaiVayDaiHanModalComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayDaiHanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayDaiHanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayDaiHanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
