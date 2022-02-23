import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucnhacungcapComponent } from './danhmucnhacungcap.component';

describe('DanhmucnhacungcapComponent', () => {
  let component: DanhmucnhacungcapComponent;
  let fixture: ComponentFixture<DanhmucnhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucnhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
