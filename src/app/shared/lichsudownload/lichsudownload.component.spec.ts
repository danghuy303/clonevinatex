import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsudownloadComponent } from './lichsudownload.component';

describe('LichsudownloadComponent', () => {
  let component: LichsudownloadComponent;
  let fixture: ComponentFixture<LichsudownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichsudownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsudownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
