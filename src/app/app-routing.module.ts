import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: 'app/default/default.module#DefaultModule'
      },
      {
        path: 'u',
        loadChildren: 'app/user/user.module#UserModule'
      }
    
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }