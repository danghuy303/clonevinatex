import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobongcopymodalComponent } from './lobongcopymodal.component';

describe('LobongcopymodalComponent', () => {
  let component: LobongcopymodalComponent;
  let fixture: ComponentFixture<LobongcopymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobongcopymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobongcopymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
