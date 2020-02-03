import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule ) },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule ) },
  //{ path: 'home', component: HomePageModule },
  { path: 'login', loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule ) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
