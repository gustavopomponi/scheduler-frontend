// ====== ./app/Scheduler/scheduler.component.ts ======

// Import component decorator
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  templateUrl: './scheduler.component.html'
})

// Component class
export class SchedulerComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-alt.svg'));

    iconRegistry.addSvgIcon(
      'database',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/database.svg'));

    iconRegistry.addSvgIcon(
      'cogs',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cogs.svg'));

    iconRegistry.addSvgIcon(
      'envelope',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));

    iconRegistry.addSvgIcon(
      'pencil',
      sanitizer.bypassSecurityTrustResourceUrl('../node_modules/material-design-icons/image/svg/production/ic_edit_24px.svg'));

    iconRegistry.addSvgIcon(
      'check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));

    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));

    iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    iconRegistry.registerFontClassAlias('fontawesome', 'fas');

  }

}
