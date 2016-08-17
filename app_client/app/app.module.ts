import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {HTTP_PROVIDERS} from '@angular/http';

import ApplicationComponent from './common/application/application';
import HomeComponent from './pages/home/home';
import ProjectListComponent from './pages/projectList/projectList';
import CvComponent from './pages/cv/cv';
import AboutComponent from './pages/about/about';
import ContactComponent from './pages/contact/contact';
import ProjectDetailComponent from './pages/projectDetail/projectDetail';
import RegisterComponent from './pages/register/register';
import LoginComponent from './pages/login/login';
import ResetComponent from './pages/reset/reset';
import ForgotComponent from './pages/forgot/forgot';
import ActivateComponent from './pages/activate/activate';
import ProfileComponent from './pages/profile/profile';

import CarouselComponent from './common/carousel/carousel';
import FooterComponent from './common/footer/footer';
import NavbarComponent from './common/navbar/navbar';
import PageHeaderComponent from './common/pageHeader/pageHeader';
import {ProjectSearchFilter} from './common/projectSearch/projectSearchFilter';


import {ProjectService} from './services/project-service';
import {SERVICES} from './services/services';

@NgModule({
  imports: [BrowserModule,
            HttpModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forRoot([
              {path: '',                                component: HomeComponent},
              {path: 'projects',                        component: ProjectListComponent},
              {path: 'projects/:projectId',             component: ProjectDetailComponent},
              {path: 'cv',                              component: CvComponent},
              {path: 'contact',                         component: ContactComponent},
              {path: 'about',                           component: AboutComponent},
              {path: 'register',                        component: RegisterComponent},
              {path: 'login',                           component: LoginComponent},
              {path: 'reset/:emailToken',               component: ResetComponent},
              {path: 'forgot',                          component: ForgotComponent},
              {path: 'activate/:emailToken/:userName',  component: ActivateComponent},
              //TODO in angular2 '?' isn't working -> replace with an optional queryParam
              {path: 'profile/:token?',                 component: ProfileComponent}
            ]),
  ],
  declarations: [
    ApplicationComponent,
    HomeComponent,
    ProjectListComponent,
    CvComponent,
    AboutComponent,
    ContactComponent,
    ProjectDetailComponent,
    RegisterComponent,
    LoginComponent,
    ResetComponent,
    ForgotComponent,
    ActivateComponent,
    ProfileComponent,
    CarouselComponent,
    FooterComponent,
    NavbarComponent,
    PageHeaderComponent,
    ProjectSearchFilter
  ],
  providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      ProjectService,
      HTTP_PROVIDERS,
      SERVICES
  ],
  bootstrap: [ ApplicationComponent ]
})

export class AppModule { }
