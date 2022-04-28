import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghisulyluachonthemvattuComponent } from './denghisulyluachonthemvattu.component';

describe('DenghisulyluachonthemvattuComponent', () => {
  let component: DenghisulyluachonthemvattuComponent;
  let fixture: ComponentFixture<DenghisulyluachonthemvattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghisulyluachonthemvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghisulyluachonthemvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
