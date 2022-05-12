import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuclassimatComponent } from './thongkechitieuclassimat.component';

describe('ThongkechitieuclassimatComponent', () => {
  let component: ThongkechitieuclassimatComponent;
  let fixture: ComponentFixture<ThongkechitieuclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
