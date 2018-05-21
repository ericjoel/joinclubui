import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePoolComponent } from './create-pool/create-pool.component';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [NavbarComponent, UserComponent, HomeComponent, CreatePoolComponent]
})
export class UserModule { }
