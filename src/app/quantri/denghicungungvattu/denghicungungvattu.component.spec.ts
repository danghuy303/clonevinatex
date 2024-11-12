import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghicungungvattuComponent } from './denghicungungvattu.component';

describe('DenghicungungvattuComponent', () => {
  let component: DenghicungungvattuComponent;
  let fixture: ComponentFixture<DenghicungungvattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghicungungvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghicungungvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
