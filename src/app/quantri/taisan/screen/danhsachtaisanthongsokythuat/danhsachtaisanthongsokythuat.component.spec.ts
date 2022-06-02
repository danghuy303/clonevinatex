import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtaisanthongsokythuatComponent } from './danhsachtaisanthongsokythuat.component';

describe('DanhsachtaisanthongsokythuatComponent', () => {
  let component: DanhsachtaisanthongsokythuatComponent;
  let fixture: ComponentFixture<DanhsachtaisanthongsokythuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtaisanthongsokythuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtaisanthongsokythuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
