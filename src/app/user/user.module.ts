import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule
  ],
  declarations: [NavbarComponent, UserComponent, HomeComponent, CreateEventComponent],
  providers: [
   
  ],
})
export class UserModule { }
