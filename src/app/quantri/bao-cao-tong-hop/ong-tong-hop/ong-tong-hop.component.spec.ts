import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngTongHopComponent } from './ong-tong-hop.component';

describe('OngTongHopComponent', () => {
  let component: OngTongHopComponent;
  let fixture: ComponentFixture<OngTongHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
