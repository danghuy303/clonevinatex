import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobongmodalComponent } from './lobongmodal.component';

describe('LobongmodalComponent', () => {
  let component: LobongmodalComponent;
  let fixture: ComponentFixture<LobongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
