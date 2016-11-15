import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing }  from './admin.routing';

import ApplicationAdminComponent from './application/application.component';
import DashboardAdminComponent from './pages/dashboard/dashboard.component';
import UsersAdminComponent from './pages/users/users.component';
import NewsletterAdminComponent from './pages/newsletter/newsletter.component';

import FooterAdminComponent from './common/components/footer/footer.component';
import { SidebarModule } from './sidebar-module/sidebar.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LaddaModule,
    SidebarModule,
    routing
  ],
  declarations: [
    ApplicationAdminComponent,
    DashboardAdminComponent,
    UsersAdminComponent,
    NewsletterAdminComponent,
    FooterAdminComponent
  ],
  providers: [],
  bootstrap: [ ApplicationAdminComponent ]
})

export class AdminModule { }
