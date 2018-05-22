import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { IEventResponse } from '../../models/response/event-response';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailEventComponent implements OnInit {

  id: number; 
  private sub: any;
  event: IEventResponse;
  joinErrorMessage: string;
  joinMessageSuccess: string;
  constructor(private route: ActivatedRoute,
    private eventService: EventService) { }

  joinEvent() {
    this.joinMessageSuccess = null;
    this.joinErrorMessage = null;
    this.eventService.joinEvent(this.id.toString())
    .subscribe(
      (data: any) => {
        this.joinMessageSuccess = "Successfull join";
      },
      (error) => {
        if (error.status === 401) {
          this.joinErrorMessage = 'Unauthorized user';
        } 

        else if (error.status == 422) {            
          this.joinErrorMessage = error.error.business;
        }        
        else {
          this.joinErrorMessage = 'An error has ocurred, please contact the administrator';
        }
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.eventService.getEventById(this.id.toString()).subscribe(
        (data:IEventResponse) => 
        {
          this.event = data;          
        }
      )
   });
  }

}
