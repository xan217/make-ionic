import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

import { NavController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  private activeFormController: boolean = true;
  private loginForm: any = { 
    email: '',
    password: ''
  }

  private registerForm: any = { 
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService, 
    public navControl: NavController, 
    //public navParams: NavParams,
    private loadingService: LoadingService,
    private alertControl: AlertController,
    private router: Router) 
  {
      console.log('auth page constructor');
  }

  ionViewDidLoad()
  {
    console.log('ionView did load');
    this.checkIsAuthenticated();
  }

  private activeForm(event: any){
    console.log(event.detail.value);
    console.log(event.detail.value == 'login');
    this.activeFormController = (event.detail.value == 'login');
  }

  async checkIsAuthenticated()
  {
    console.log('check if it is authenticated');
    try {
      let is_authenticated = await this.authService.checkIsAuthenticated();
      console.log( "is_authenticated" );
      console.log( is_authenticated );

      if( is_authenticated ){
        console.log("check is authenticated");
        this.navControl.navigateForward('home');
        this.router.navigateByUrl('home');
        console.log("end check");
      } 
    } catch (err) {
      console.log(err);
      let alert = this.alertControl.create({header: "ERROR", message: "No se ha podido verificar el inicio de sesión", buttons: ['Ok']});
      (await alert).present();
    }
  }

  private async login( form: any )
  {
    console.log('launch login function');
    this.loadingService.loadingPresent();
    this.authService.login(form)
                    .then((response) => {
                      this.loadingService.loadingDismiss();
                      //console.log(response);
                      //console.log("before redirect");
                      this.authService.storageCredentials(response);
                      this.navControl.navigateForward('home');
                      //this.router.navigateByUrl('home');
                      
                      //console.log("end auth service");
                      //this.checkIsAuthenticated();
                    })
                    .catch(async err => {
                      //console.log(err);
                      this.loadingService.loadingDismiss();
                      let alert = this.alertControl.create({header: "ERROR", message: "No se ha podido iniciar sesión", buttons: ['Ok']});
                      (await alert).present();
                    });
  }
  
  private register()
  {
    console.log('launch register function');
    this.loadingService.loadingPresent();
    this.authService.register(this.registerForm)
                    .then(async (response: any) => {
                      this.loadingService.loadingDismiss();
                      console.log(response);
                      let alert = this.alertControl.create({header: "LISTO", message: "Su usuario ha sido creado con éxito", buttons: ['Ok']});
                      this.login(this.registerForm);
                      (await alert).present();
                    })
                    .catch(async err => {
                      this.loadingService.loadingDismiss();
                      console.log(err);
                      let alert = this.alertControl.create({header: "ERROR", message: "No se ha podido crear el usuario", buttons: ['Ok']});
                      (await alert).present();
                    })
                    ;
  }

  ngOnInit() {
    console.log('init auth page module');
  }

}
