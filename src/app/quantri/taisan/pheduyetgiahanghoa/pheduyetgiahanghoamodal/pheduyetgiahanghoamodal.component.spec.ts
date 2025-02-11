import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PheduyetgiahanghoamodalComponent } from './pheduyetgiahanghoamodal.component';

describe('PheduyetgiahanghoamodalComponent', () => {
  let component: PheduyetgiahanghoamodalComponent;
  let fixture: ComponentFixture<PheduyetgiahanghoamodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PheduyetgiahanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PheduyetgiahanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
