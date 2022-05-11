import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsucomayComponent } from './dmsucomay.component';

describe('DmsucomayComponent', () => {
  let component: DmsucomayComponent;
  let fixture: ComponentFixture<DmsucomayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsucomayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsucomayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
