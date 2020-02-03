import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navControl: NavController
  ) {
    console.log('constructor app component');
    this.initializeApp();
  }

  logout () {
    console.log('login out');
    this.authService.removeCredentials();
    setTimeout(() => {
      this.navControl.navigateRoot('login');
    }, 750)
  }

  initializeApp() {
    console.log('initialize app call');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.navControl.navigateRoot('login');
      console.log('initialize app exit');
    });
  }
}
