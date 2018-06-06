import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import './core/rxjs-extensions';

import { AppComponent } from './app.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpHelperService } from './core/http-helper.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
