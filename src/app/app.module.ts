import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/Storage';

import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthPageModule } from './pages/auth/auth.module';
import { HomePageModule } from './pages/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(), 
    HttpClientModule, 
    FormsModule, 
    AuthPageModule,
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthPageModule,
    HomePageModule,
    Storage,  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
