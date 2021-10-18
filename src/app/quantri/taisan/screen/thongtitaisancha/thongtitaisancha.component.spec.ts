import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtitaisanchaComponent } from './thongtitaisancha.component';

describe('ThongtitaisanchaComponent', () => {
  let component: ThongtitaisanchaComponent;
  let fixture: ComponentFixture<ThongtitaisanchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtitaisanchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtitaisanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
