// Angular
import { Injectable } from '@angular/core';
import {    HttpClient,
            HttpRequest,
            HttpHandler,
            HttpEvent,
            HttpInterceptor,
            HttpResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';

// Models
import { BehaviorSubject } from 'rxjs';
import { EventModel } from '../models/EventModel';
import { environment } from '../../../environments/environment';
import { JoinclubAuthService } from '../../joinclub-auth.service';

@Injectable()
export class EventService {
    private _baseUrl = environment.apiUrl;
    private _event = new BehaviorSubject<EventModel>(new EventModel());

    event$ = this._event.asObservable();

    constructor(private _http: HttpClient, 
        private joinclubAuthService: JoinclubAuthService) { }
    
    getEventService() {
        return this._http.get<EventModel>
            (`${this._baseUrl}/api/events`);
    }

    postEvent(event: EventModel) {
        const formData: FormData = new FormData();
        formData.set('date_event', event.date_event);
        formData.set('start_hour', event.start_hour);
        formData.set('finish_hour', event.finish_hour);
        formData.set('hall_id', event.hall_id.toString());
        formData.set('presentation_id', event.presentation_id.toString());
        formData.set('speaker_id', event.speaker_id.toString());
        
        return this._http.post(`${this._baseUrl}api/events`, formData);
    }

    get event() {
        return this._event.getValue();
    }

    set event(event: EventModel) {
        this._event.next(event);
    }
}