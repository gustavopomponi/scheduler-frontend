// ====== ./app/Scheduler/scheduler.component.ts ======
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import component decorator
var core_1 = require("@angular/core");
var icon_1 = require("@angular/material/icon");
var platform_browser_1 = require("@angular/platform-browser");
var SchedulerComponent = (function () {
    function SchedulerComponent(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('calendar', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-alt.svg'));
        iconRegistry.addSvgIcon('database', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/database.svg'));
        iconRegistry.addSvgIcon('cogs', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cogs.svg'));
        iconRegistry.addSvgIcon('envelope', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));
        iconRegistry.addSvgIcon('pencil', sanitizer.bypassSecurityTrustResourceUrl('../node_modules/material-design-icons/image/svg/production/ic_edit_24px.svg'));
        iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));
        iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/envelope.svg'));
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
        iconRegistry.registerFontClassAlias('fontawesome', 'fas');
    }
    return SchedulerComponent;
}());
SchedulerComponent = __decorate([
    core_1.Component({
        templateUrl: './scheduler.component.html'
    })
    // Component class
    ,
    __metadata("design:paramtypes", [icon_1.MatIconRegistry, platform_browser_1.DomSanitizer])
], SchedulerComponent);
exports.SchedulerComponent = SchedulerComponent;
//# sourceMappingURL=scheduler.component.js.map