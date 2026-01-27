import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoihoatmodalComponent } from './theodoihoatmodal.component';

describe('TheodoihoatmodalComponent', () => {
  let component: TheodoihoatmodalComponent;
  let fixture: ComponentFixture<TheodoihoatmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoihoatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoihoatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
