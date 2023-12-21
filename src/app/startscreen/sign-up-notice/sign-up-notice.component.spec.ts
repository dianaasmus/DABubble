import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNoticeComponent } from './sign-up-notice.component';

describe('SignUpNoticeComponent', () => {
  let component: SignUpNoticeComponent;
  let fixture: ComponentFixture<SignUpNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
