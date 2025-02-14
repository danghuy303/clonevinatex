import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieukiemhangComponent } from './phieukiemhang.component';

describe('PhieukiemhangComponent', () => {
  let component: PhieukiemhangComponent;
  let fixture: ComponentFixture<PhieukiemhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieukiemhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieukiemhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
