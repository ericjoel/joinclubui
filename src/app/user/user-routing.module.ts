import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DetailEventComponent } from '../shared/components/detail-event/detail-event.component';
import { ModelHallComponent } from './model-hall/model-hall.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children : [{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'create-event',
      component: CreateEventComponent
    },
    {
      path: 'detail-event/:id',
      component: DetailEventComponent
    },
    {
      path: 'model-hall',
      component: ModelHallComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
