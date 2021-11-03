import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonkienchovaymodalComponent } from './chonkienchovaymodal.component';

describe('ChonkienchovaymodalComponent', () => {
  let component: ChonkienchovaymodalComponent;
  let fixture: ComponentFixture<ChonkienchovaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkienchovaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkienchovaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
