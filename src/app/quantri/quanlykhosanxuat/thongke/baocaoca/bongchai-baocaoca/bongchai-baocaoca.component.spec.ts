import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BongchaiBaocaocaComponent } from './bongchai-baocaoca.component';

describe('BongchaiBaocaocaComponent', () => {
  let component: BongchaiBaocaocaComponent;
  let fixture: ComponentFixture<BongchaiBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BongchaiBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BongchaiBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
