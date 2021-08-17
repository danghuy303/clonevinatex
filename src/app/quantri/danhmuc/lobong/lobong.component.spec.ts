import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobongComponent } from './lobong.component';

describe('LobongComponent', () => {
  let component: LobongComponent;
  let fixture: ComponentFixture<LobongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
