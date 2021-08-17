import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaonhanhanghoamodalComponent } from './giaonhanhanghoamodal.component';

describe('GiaonhanhanghoamodalComponent', () => {
  let component: GiaonhanhanghoamodalComponent;
  let fixture: ComponentFixture<GiaonhanhanghoamodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaonhanhanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaonhanhanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
