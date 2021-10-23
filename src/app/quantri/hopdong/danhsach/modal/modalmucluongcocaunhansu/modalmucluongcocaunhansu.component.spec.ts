import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmucluongcocaunhansuComponent } from './modalmucluongcocaunhansu.component';

describe('ModalmucluongcocaunhansuComponent', () => {
  let component: ModalmucluongcocaunhansuComponent;
  let fixture: ComponentFixture<ModalmucluongcocaunhansuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmucluongcocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmucluongcocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
