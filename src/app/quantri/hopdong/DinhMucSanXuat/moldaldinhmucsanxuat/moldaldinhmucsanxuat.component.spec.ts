import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldaldinhmucsanxuatComponent } from './moldaldinhmucsanxuat.component';

describe('MoldaldinhmucsanxuatComponent', () => {
  let component: MoldaldinhmucsanxuatComponent;
  let fixture: ComponentFixture<MoldaldinhmucsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldaldinhmucsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldaldinhmucsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
