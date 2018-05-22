import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { CommonModule } from '@angular/common';
import { ModelHallComponent } from './model-hall/model-hall.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    UserRoutingModule,
    
  ],
  declarations: [NavbarComponent, UserComponent, HomeComponent, CreateEventComponent, ModelHallComponent],
  providers: [
   
  ],
})
export class UserModule { }
