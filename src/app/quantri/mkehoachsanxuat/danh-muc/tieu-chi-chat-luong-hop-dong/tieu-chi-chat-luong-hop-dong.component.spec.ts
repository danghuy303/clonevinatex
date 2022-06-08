import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuChiChatLuongHopDongComponent } from './tieu-chi-chat-luong-hop-dong.component';

describe('TieuChiChatLuongHopDongComponent', () => {
  let component: TieuChiChatLuongHopDongComponent;
  let fixture: ComponentFixture<TieuChiChatLuongHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiChatLuongHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiChatLuongHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
