/*
 * Copyright (C) 2015-2017 Stefano Cappa
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


// run:
// 1. npm run webdriver:update:ci
// 2. npm run e2e

require('ts-node/register');
let helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:3000',

  specs: [
    // /**
    //  * add jasmine-expect before tests
    //  * https://github.com/JamieMason/Jasmine-Matchers)
    //  */
    // 'node_modules/jasmine-expect/index.js',
    /**
     * My e2e tests
     */
    helpers.root('e2e/**/**.e2e.ts'),
    helpers.root('e2e/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      // args: ["--headless", "--disable-gpu", "--window-size=800,600"]
      'args': ['show-fps-counter=true', "--window-size=1280,1024"]
    }
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;

    if (!process.env.CI) {
      // only for local environment, because dotenv isn't working on CIs
      // don't require dotenv at the beginning of this file!!! You have to require it only inside this if statement
      // use dotenv to load variables for e2e testing on your PC
      const dotenv = require('dotenv').config({path: '.env_e2e'}); //to read info from .env_e2e file
      if (dotenv.error) {
        throw dotenv.error;
      }
      console.log('dotenv loaded', dotenv.parsed);
    }
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true

 // SELENIUM_PROMISE_MANAGER: false // to be able to use async/await
};