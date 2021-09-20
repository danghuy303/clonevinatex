import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MucluongcocaunhansuComponent } from './mucluongcocaunhansu.component';

describe('MucluongcocaunhansuComponent', () => {
  let component: MucluongcocaunhansuComponent;
  let fixture: ComponentFixture<MucluongcocaunhansuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MucluongcocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MucluongcocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
