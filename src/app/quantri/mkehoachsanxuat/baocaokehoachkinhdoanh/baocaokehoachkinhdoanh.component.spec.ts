import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaokehoachkinhdoanhComponent } from './baocaokehoachkinhdoanh.component';

describe('BaocaokehoachkinhdoanhComponent', () => {
  let component: BaocaokehoachkinhdoanhComponent;
  let fixture: ComponentFixture<BaocaokehoachkinhdoanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaokehoachkinhdoanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaokehoachkinhdoanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
