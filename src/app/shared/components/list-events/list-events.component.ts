import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/EventModel';
import { IEventResponse } from '../../models/response/event-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListEventsComponent implements OnInit {
  events: IEventResponse[];
  
  constructor(private eventService: EventService,
    private _router: Router) { 

  }

  ngOnInit() {
    this.eventService.getEventService()
      .subscribe(
        (data:IEventResponse[]) => 
        {
          this.events = data;
          console.log(data);
        }
      );
  }

}
