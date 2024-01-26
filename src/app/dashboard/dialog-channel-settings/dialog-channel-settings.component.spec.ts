import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChannelSettingsComponent } from './dialog-channel-settings.component';

describe('DialogChannelSettingsComponent', () => {
  let component: DialogChannelSettingsComponent;
  let fixture: ComponentFixture<DialogChannelSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogChannelSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogChannelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
