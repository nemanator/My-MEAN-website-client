import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import HomeComponent from './pages/home/home.component';
import ProjectListComponent from './pages/project-list/project-list.component';
// import CvComponent from './pages/cv/cv.component';
import AboutComponent from './pages/about/about.component';
import ContactComponent from './pages/contact/contact.component';
import ProjectDetailComponent from './pages/project-detail/project-detail.component';
import RegisterComponent from './pages/register/register.component';
import LoginComponent from './pages/login/login.component';
import ResetComponent from './pages/reset/reset.component';
import ForgotComponent from './pages/forgot/forgot.component';
import ActivateComponent from './pages/activate/activate.component';
import ProfileComponent from './pages/profile/profile.component';
import Post3dAuthComponent from './pages/post3d-auth/post3d-auth.component';

import { AuthGuard } from './common/services/auth-guard.service';
import NotFound404Component from "./pages/404/not-found404.component";

const appRoutes: Routes = [

  {path: '',                                component: HomeComponent},
  {path: 'dashboard',                       component: HomeComponent},
  {path: 'projects',                        component: ProjectListComponent},
  {path: 'projects/:projectId',             component: ProjectDetailComponent},
  {path: 'cv',                              loadChildren: './pages/cv/index#CvModule'},
  {path: 'contact',                         component: ContactComponent},
  {path: 'about',                           component: AboutComponent},
  {path: 'register',                        component: RegisterComponent},
  {path: 'login',                           component: LoginComponent},
  {path: 'reset/:emailToken',               component: ResetComponent},
  {path: 'forgot',                          component: ForgotComponent},
  {path: 'activate/:emailToken/:userName',  component: ActivateComponent},
  // TODO in angular2 '?' isn't working -> find a better approach to do that
  {path: 'profile',                         component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'profile/:token',                  component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'post3dauth',                      component: Post3dAuthComponent},
  {path: '**',                              component: NotFound404Component}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
