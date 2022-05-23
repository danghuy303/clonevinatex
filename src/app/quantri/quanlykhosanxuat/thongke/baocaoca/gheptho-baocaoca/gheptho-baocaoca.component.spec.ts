import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhepthoBaocaocaComponent } from './gheptho-baocaoca.component';

describe('GhepthoBaocaocaComponent', () => {
  let component: GhepthoBaocaocaComponent;
  let fixture: ComponentFixture<GhepthoBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhepthoBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhepthoBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
