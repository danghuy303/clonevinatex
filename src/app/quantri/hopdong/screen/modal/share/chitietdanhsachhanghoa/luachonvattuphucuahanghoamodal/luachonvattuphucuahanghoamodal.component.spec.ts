import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuachonvattuphucuahanghoamodalComponent } from './luachonvattuphucuahanghoamodal.component';

describe('LuachonvattuphucuahanghoamodalComponent', () => {
  let component: LuachonvattuphucuahanghoamodalComponent;
  let fixture: ComponentFixture<LuachonvattuphucuahanghoamodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuachonvattuphucuahanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuachonvattuphucuahanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
