import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapvattumodalthemvattuComponent } from './nhapvattumodalthemvattu.component';

describe('NhapvattumodalthemvattuComponent', () => {
  let component: NhapvattumodalthemvattuComponent;
  let fixture: ComponentFixture<NhapvattumodalthemvattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapvattumodalthemvattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapvattumodalthemvattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
