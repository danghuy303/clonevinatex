import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieukiemhangmodalComponent } from './phieukiemhangmodal.component';

describe('PhieukiemhangmodalComponent', () => {
  let component: PhieukiemhangmodalComponent;
  let fixture: ComponentFixture<PhieukiemhangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieukiemhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieukiemhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
