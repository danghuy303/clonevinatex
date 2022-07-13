import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoNhuCauComponent } from './bao-cao-nhu-cau.component';

describe('BaoCaoNhuCauComponent', () => {
  let component: BaoCaoNhuCauComponent;
  let fixture: ComponentFixture<BaoCaoNhuCauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoNhuCauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoNhuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
