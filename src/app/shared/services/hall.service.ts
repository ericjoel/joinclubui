// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

// Models
import { BehaviorSubject } from 'rxjs';
import { EventModel } from '../models/EventModel';
import { environment } from '../../../environments/environment';
import { Hall } from '../models/Hall';
import { IHallResponse } from '../models/response/hall-response';
import { IEventResponse } from '../models/response/event-response';

@Injectable()
export class HallService {
    private _baseUrl = environment.apiUrl;
    private _hall = new BehaviorSubject<Hall>(new Hall());

    hall$ = this._hall.asObservable();

    constructor(private _http: HttpClient) { }
    
    getHalls() {
        return this._http.get<IHallResponse[]>
            (`${this._baseUrl}/api/halls`);
    }

    getEvents(idHall: string, dateEvent: string) {
        let params = new HttpParams().set('date_event', dateEvent);
        return this._http.get<IEventResponse[]>
            (`${this._baseUrl}/api/halls/${idHall}/events`, { params: params }).pipe();
    }

    get hall() {
        return this._hall.getValue();
    }

    set hall(hall: Hall) {
        this._hall.next(hall);
    }
}