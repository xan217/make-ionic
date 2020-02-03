import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';

import { endpoint, passportClient } from '../../laravel/settings'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    public http: HttpClient, 
    private storage: Storage
  ) { }

  login(user: any){
    let request = {
        grant_type    : passportClient.grant_type,
        client_id     : passportClient.client_id,
        client_secret : passportClient.client_secret,
        username      : user.email,
        password      : user.password
    }
    return this.http.post(`${endpoint}/api/login`, request).toPromise();
  }

  register(user: any){
    return this.http.post(`${endpoint}/api/register`, user).toPromise();
  }

  async checkIsAuthenticated(){
    let now = Date.now();
    let auth: any = await this.storage.get( 'auth' );

    if( !!!auth ) return false;

    if( auth.expired_at <= now ) return false;

    return true;
  }

  async getuser(){
    let request = {
      name: await this.storage.get( "name" ).then( (res) => { console.log(res); return res; }),
      access_token: await this.storage.get( "access_token" ).then( (res) => { console.log(res); return res; })
    }
    return this.http.post(`${endpoint}/api/user`, request).toPromise();
  }

  removeCredentials(){
    this.storage.remove( 'auth' ); 
  }

  storageCredentials ( response: any ) {
    //let expired_at = ( response.expires_in * 1000 ) + Date.now();

    console.log(response.data);

    this.storage.set( 'access_token', response.data.access_token );
    this.storage.set( 'name', response.data.name );
      // refresh_token: response.refresh_token,
      // expired_at: response.expired_at
  }
}
