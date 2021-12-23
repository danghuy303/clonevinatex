import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkesanluongcaComponent } from './thongkesanluongca.component';

describe('ThongkesanluongcaComponent', () => {
  let component: ThongkesanluongcaComponent;
  let fixture: ComponentFixture<ThongkesanluongcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
