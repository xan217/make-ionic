import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/Storage';

import { endpoint, passportClient } from '../../../laravel/settings'; 
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user: any = { 
    name: '',
    email: '',
    created_at: ''
  }

  constructor(
    public navControl: NavController, 
    public authService: AuthService,
    public http: HttpClient,
    private storage: Storage,
    private loadingService: LoadingService,
    private alertControl: AlertController
  ) {
    console.log('home page constructor');
    this.getuser();

  }

  getuser(){
    this.authService.getuser()
                    .then((response: any) => {
                      console.log(response);
                      this.user.name = response.data.user[0].name;
                      this.user.email = response.data.user[0].email;
                      this.user.created_at = response.data.user[0].created_at;
                    })
                    .catch(async err => {
                      console.log(err);
                      this.loadingService.loadingDismiss();
                      let alert = this.alertControl.create({header: "ERROR", message: "No se ha podido iniciar sesión", buttons: ['Ok']});
                      (await alert).present();
                    });
  }

  async ionViewCanEnter()
  {
    console.log('ion view can enter');
    return this.authService.checkIsAuthenticated();
  }

  logout () {
    console.log('login out');
    this.authService.removeCredentials();
    setTimeout(() => {
      this.navControl.navigateRoot('login');
    }, 750)
  }

}
