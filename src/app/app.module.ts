import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';


import { AppComponent } from './app.component';
import { SchedulerComponent } from './Scheduler/scheduler.component';
import { ParametrosComponent } from './Scheduler/Parametros/paramentos.component';
import { MensagemComponent } from './Scheduler/Mensagem/mensagem.component';
import { routing } from './app.routes';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ParametroService } from './Services/parametros.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    ParametrosComponent,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ParametroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
