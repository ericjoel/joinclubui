// Angular
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JoinclubAuthService } from '../joinclub-auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    private joinclubAuthService: JoinclubAuthService;

    constructor(private _injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.joinclubAuthService = this._injector.get(JoinclubAuthService);
    
        if (this.joinclubAuthService.getAccessToken()) {
          request = request.clone({
            setHeaders: {
              Authorization: this.joinclubAuthService.getAccessToken()
            }
          });
        }
    
    
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            // if (this.joinclubAuthService.getAccessToken()) {
            //   if (event['body']) {
            //     event['body'] = event['body']['data'];
            //     return event;
            //   }
            // }
            return event;
          })
        )
      }
}