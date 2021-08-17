import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadhdsdsanxuatComponent } from './uploadhdsdsanxuat.component';

describe('UploadhdsdsanxuatComponent', () => {
  let component: UploadhdsdsanxuatComponent;
  let fixture: ComponentFixture<UploadhdsdsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadhdsdsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadhdsdsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
