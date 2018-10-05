"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var SchedulerFrontendPage = (function () {
    function SchedulerFrontendPage() {
    }
    SchedulerFrontendPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    SchedulerFrontendPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return SchedulerFrontendPage;
}());
exports.SchedulerFrontendPage = SchedulerFrontendPage;
//# sourceMappingURL=app.po.js.map