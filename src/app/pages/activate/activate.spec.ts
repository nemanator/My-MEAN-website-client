/*
 * Copyright (C) 2015-2016 Stefano Cappa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import ActivateComponent from './activate.component';
import { RouterLinkStubDirective, RouterOutletStubComponent, ActivatedRoute, ActivatedRouteStub }   from '../../common/testing/router-stubs.spec';
import { AuthService } from "../../common/services/auth.service";
import { FakeAuthService } from "../../common/testing/fake-auth.service.spec";

const FAKE_EMAIL_TOKEN = 'fake@fake.it';
const FAKE_USERNAME = 'fake username';

let comp: ActivateComponent;
let fixture: ComponentFixture<ActivateComponent>;
let activatedRoute: ActivatedRouteStub;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

describe('ActivateComponent', () => {
  beforeEach( async(() => {

    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = { emailToken: FAKE_EMAIL_TOKEN, userName: FAKE_USERNAME };

    TestBed.configureTestingModule({
      declarations: [ ActivateComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    }).overrideComponent(ActivateComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: AuthService, useClass: FakeAuthService }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    return fixture.whenStable().then(() => fixture.detectChanges());
  }));


  describe('---YES---', () => {
    beforeEach(() => {
      fixture.detectChanges();
      linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('can instantiate it', () => expect(comp).not.toBeNull());

    it('can get RouterLinks from template', () => {
      expect(links.length).toBe(1, 'should have 1 links');
      expect(links[0].linkParams).toEqual(['/login'], '1st link should go to login');
    });

    it('should activate the local account, displaying username and a success message', () => {
      const element: DebugElement = fixture.debugElement;

      const alert: DebugElement[] = element.queryAll(By.css('h4'));
      expect(alert.length).toBe(1);
      expect(alert[0].nativeElement.textContent).toBe(`Welcome ${FAKE_USERNAME}`);

      const welcomeName: DebugElement[] = element.queryAll(By.css('div.alert.alert-success'));
      expect(welcomeName.length).toBe(1);
      expect(welcomeName[0].nativeElement.textContent.trim()).toBe(`Success An e-mail has been sent to ${FAKE_EMAIL_TOKEN} with further instructions.`);
    });
  });

  // it('should NOT activate the local account, displaying username and an error message', () => {
  //
  //   activatedRoute.testParams = { emailToken: 'notexisting@mail.it', userName: 'not existing' };
  //
  //
  //   //respond with {"message":"No account with that token exists."}
  //   // Service actually injected into the component
  //   // let authService = fixture.debugElement.injector.get(AuthService);
  //   //
  //   // // Setup spy on the `getQuote` method
  //   // let spy = spyOn(authService, 'activate')
  //   //   .and.returnValue(Observable.of({
  //   //     "message":"No account with that token exists."
  //   //   }));
  //
  //   fixture.detectChanges(); // trigger data binding
  //   const element = fixture.debugElement;
  //
  //   const alert = element.queryAll(By.css('h4'));
  //   expect(alert.length).toBe(1);
  //   expect(alert[0].nativeElement.textContent).toBe('Welcome not existing');
  //
  //   const welcomeName = element.queryAll(By.css('div.alert.alert-danger'));
  //   expect(welcomeName.length).toBe(1);
  //   expect(welcomeName[0].nativeElement.textContent.trim()).toBe('Danger No account with that token exists.');
  // });
});
