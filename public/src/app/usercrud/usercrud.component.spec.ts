import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercrudComponent } from './usercrud.component';

describe('UsercrudComponent', () => {
  let component: UsercrudComponent;
  let fixture: ComponentFixture<UsercrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
