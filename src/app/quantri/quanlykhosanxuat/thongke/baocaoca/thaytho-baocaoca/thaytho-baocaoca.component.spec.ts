import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaythoBaocaocaComponent } from './thaytho-baocaoca.component';

describe('ThaythoBaocaocaComponent', () => {
  let component: ThaythoBaocaocaComponent;
  let fixture: ComponentFixture<ThaythoBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThaythoBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThaythoBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
