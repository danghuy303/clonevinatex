import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenbuocComponent } from './chuyenbuoc.component';

describe('ChuyenbuocComponent', () => {
  let component: ChuyenbuocComponent;
  let fixture: ComponentFixture<ChuyenbuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuyenbuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuyenbuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
