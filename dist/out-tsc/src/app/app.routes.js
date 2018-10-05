// ====== ./app/app.routes.ts ======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var scheduler_component_1 = require("./Scheduler/scheduler.component");
var parametros_component_1 = require("./Scheduler/Parametros/parametros.component");
var mensagem_component_1 = require("./Scheduler/Mensagem/mensagem.component");
var auth_guard_service_1 = require("./services/auth-guard.service");
// Route Configuration
exports.routes = [
    {
        path: '',
        redirectTo: '/scheduler',
        pathMatch: 'full'
    },
    {
        path: 'scheduler',
        component: scheduler_component_1.SchedulerComponent,
        children: [
            { path: 'parametros', component: parametros_component_1.ParametrosComponent },
            { path: 'mensagem', component: mensagem_component_1.MensagemComponent }
        ],
        canActivate: [auth_guard_service_1.AuthGuardService]
    }
];
// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map