import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoiconBaocaocaComponent } from './soicon-baocaoca.component';

describe('SoiconBaocaocaComponent', () => {
  let component: SoiconBaocaocaComponent;
  let fixture: ComponentFixture<SoiconBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoiconBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoiconBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
