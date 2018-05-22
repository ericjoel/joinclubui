import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './default/default.module';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OverlayModule } from "@angular/cdk/overlay";
import { HttpAuthInterceptor } from './user/http-auth.interceptors';
import { EventService } from './shared/services/event.service';
import { PresentationService } from './shared/services/presentation.service';
import { HallService } from './shared/services/hall.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    OverlayModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
    EventService,
    PresentationService,
    HallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
