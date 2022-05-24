import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayongBaocaocaComponent } from './mayong-baocaoca.component';

describe('MayongBaocaocaComponent', () => {
  let component: MayongBaocaocaComponent;
  let fixture: ComponentFixture<MayongBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayongBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayongBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
