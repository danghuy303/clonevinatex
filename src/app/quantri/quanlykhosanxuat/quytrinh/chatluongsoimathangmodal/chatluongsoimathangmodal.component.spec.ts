import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatluongsoimathangmodalComponent } from './chatluongsoimathangmodal.component';

describe('ChatluongsoimathangmodalComponent', () => {
  let component: ChatluongsoimathangmodalComponent;
  let fixture: ComponentFixture<ChatluongsoimathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatluongsoimathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatluongsoimathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
