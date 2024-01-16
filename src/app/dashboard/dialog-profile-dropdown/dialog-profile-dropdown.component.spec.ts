import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileDropdownComponent } from './dialog-profile-dropdown.component';

describe('DialogProfileDropdownComponent', () => {
  let component: DialogProfileDropdownComponent;
  let fixture: ComponentFixture<DialogProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
