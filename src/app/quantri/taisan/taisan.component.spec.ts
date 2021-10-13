import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanComponent } from './taisan.component';

describe('TaisanComponent', () => {
  let component: TaisanComponent;
  let fixture: ComponentFixture<TaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
