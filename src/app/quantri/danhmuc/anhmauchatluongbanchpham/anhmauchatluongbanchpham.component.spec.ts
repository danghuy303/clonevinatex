import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhmauchatluongbanchphamComponent } from './anhmauchatluongbanchpham.component';

describe('AnhmauchatluongbanchphamComponent', () => {
  let component: AnhmauchatluongbanchphamComponent;
  let fixture: ComponentFixture<AnhmauchatluongbanchphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnhmauchatluongbanchphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnhmauchatluongbanchphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
