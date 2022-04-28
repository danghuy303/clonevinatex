import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanbaoduongComponent } from './taisanbaoduong.component';

describe('TaisanbaoduongComponent', () => {
  let component: TaisanbaoduongComponent;
  let fixture: ComponentFixture<TaisanbaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisanbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
