import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiDungTraoDoiComponent } from './noi-dung-trao-doi.component';

describe('NoiDungTraoDoiComponent', () => {
  let component: NoiDungTraoDoiComponent;
  let fixture: ComponentFixture<NoiDungTraoDoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoiDungTraoDoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiDungTraoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
