import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEditerComponent } from './session-editer.component';

describe('SessionEditerComponent', () => {
  let component: SessionEditerComponent;
  let fixture: ComponentFixture<SessionEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionEditerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
