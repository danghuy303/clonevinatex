import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkedieukhongComponent } from './thongkedieukhong.component';

describe('ThongkedieukhongComponent', () => {
  let component: ThongkedieukhongComponent;
  let fixture: ComponentFixture<ThongkedieukhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkedieukhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkedieukhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
