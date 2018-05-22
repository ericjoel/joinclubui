// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

// Models
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Presentation } from '../models/Presentation';
import { IPresentationResponse } from '../models/response/presentation-response';
import { ISpeakerResponse } from '../models/response/speaker-response';

@Injectable()
export class PresentationService {
    private _baseUrl = environment.apiUrl;
    private _presentation = new BehaviorSubject<Presentation>(new Presentation());

    presentation$ = this._presentation.asObservable();

    constructor(private _http: HttpClient) { }
    
    getPresentations() {
        return this._http.get<IPresentationResponse[]>
            (`${this._baseUrl}/api/presentations`).pipe();
    }

    get presentation() {
        return this._presentation.getValue();
    }

    getPresentationByName(name: string) {
        let params = new HttpParams().set('name', name);
        return this._http.get<IPresentationResponse[]>
            (`${this._baseUrl}/api/presentations`, { params: params }).pipe();
    }
    
    getSpeakers(idPresentation: string) {
        return this._http.get<ISpeakerResponse[]>
            (`${this._baseUrl}/api/presentations/${idPresentation}/speakers`).pipe();
    }

    set presentation(presentation: Presentation) {
        this._presentation.next(presentation);
    }
}