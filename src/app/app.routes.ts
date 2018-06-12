// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerComponent } from './Scheduler/scheduler.component';
import { ParametrosComponent } from './Scheduler/Parametros/parametros.component';
import { MensagemComponent } from './Scheduler/Mensagem/mensagem.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/scheduler',
    pathMatch: 'full'
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    children: [
      { path: 'parametros', component: ParametrosComponent },
      { path: 'mensagem', component: MensagemComponent }
    ]
  }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
