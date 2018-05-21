import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { DefaultModule } from './default/default.module';
import { UserModule } from './user/user.module';
  
const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => DefaultModule,
    },
    {
        path: 'u',
        loadChildren: () => UserModule,
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