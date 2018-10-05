"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var auth_guard_service_1 = require("./services/auth-guard.service");
var app_component_1 = require("./app.component");
var scheduler_component_1 = require("./Scheduler/scheduler.component");
var parametros_component_1 = require("./Scheduler/Parametros/parametros.component");
var mensagem_component_1 = require("./Scheduler/Mensagem/mensagem.component");
var app_routes_1 = require("./app.routes");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var menu_1 = require("@angular/material/menu");
var button_1 = require("@angular/material/button");
var card_1 = require("@angular/material/card");
var table_1 = require("@angular/material/table");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var checkbox_1 = require("@angular/material/checkbox");
var list_1 = require("@angular/material/list");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var http_2 = require("@angular/common/http");
var parametros_service_1 = require("./Services/parametros.service");
var forms_2 = require("@angular/forms");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            scheduler_component_1.SchedulerComponent,
            parametros_component_1.ParametrosComponent,
            mensagem_component_1.MensagemComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            app_routes_1.routing,
            toolbar_1.MatToolbarModule,
            icon_1.MatIconModule,
            menu_1.MatMenuModule,
            button_1.MatButtonModule,
            card_1.MatCardModule,
            table_1.MatTableModule,
            input_1.MatInputModule,
            select_1.MatSelectModule,
            checkbox_1.MatCheckboxModule,
            list_1.MatListModule,
            slide_toggle_1.MatSlideToggleModule,
            http_2.HttpClientModule,
            forms_2.ReactiveFormsModule
        ],
        providers: [parametros_service_1.ParametroService,
            auth_guard_service_1.AuthGuardService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map