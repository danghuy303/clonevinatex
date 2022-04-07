import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BongChaiTongHopComponent } from './bong-chai-tong-hop.component';

describe('BongChaiTongHopComponent', () => {
  let component: BongChaiTongHopComponent;
  let fixture: ComponentFixture<BongChaiTongHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BongChaiTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BongChaiTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
