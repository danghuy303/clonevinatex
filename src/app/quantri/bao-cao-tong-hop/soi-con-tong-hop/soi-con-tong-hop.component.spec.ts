import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoiConTongHopComponent } from './soi-con-tong-hop.component';

describe('SoiConTongHopComponent', () => {
  let component: SoiConTongHopComponent;
  let fixture: ComponentFixture<SoiConTongHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoiConTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoiConTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
