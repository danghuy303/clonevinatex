import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltinhtrangtaisanComponent } from './modaltinhtrangtaisan.component';

describe('ModaltinhtrangtaisanComponent', () => {
  let component: ModaltinhtrangtaisanComponent;
  let fixture: ComponentFixture<ModaltinhtrangtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltinhtrangtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltinhtrangtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
