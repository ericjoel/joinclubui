import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { EventService } from '../../shared/services/event.service';
import { PresentationService } from '../../shared/services/presentation.service';
import { IPresentationResponse } from '../../shared/models/response/presentation-response';
import { FormValidator } from '../../shared/utils/form-validator';
import { CustomValidators } from '../../shared/utils/custom-validator';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ISpeakerResponse } from '../../shared/models/response/speaker-response';
import { HallService } from '../../shared/services/hall.service';
import { IHallResponse } from '../../shared/models/response/hall-response';
import { IEventResponse } from '../../shared/models/response/event-response';
import { EventModel } from '../../shared/models/EventModel';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent extends FormValidator implements OnInit {

  detailEventMessage: string;
  errorPresentationMessage: string;
  errorFinishHour: string;
  errorServerPost: string;

  filteredOptionsPresentation: Observable<IPresentationResponse[]>;
  presentations: IPresentationResponse[];

  filteredOptionsSpeakers: Observable<ISpeakerResponse[]>;
  speakers: ISpeakerResponse[];

  halls: IHallResponse[];
  events: IEventResponse[];
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  breakpoint: number;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  idHallSelected: number;
  idPresentationSelected: number;
  idSpeakerSelected: number;

  loading = false;
  success = false;
  formErrors = {
    'speaker': '',
    'presentation': '',
    'description': ''
  };

  formHallErrors = {
    'hall': '',
    'dateEvent': '',
    'startHour': '',
    'finishHour': '',
    'capacity': ''
  };

  validationFormHallMessages = {
    'hall': {
      'required': 'required field',
      'maxlength': 'overlong'
    },
    'dateEvent': {
      'required': 'required field'
    },
    'startHour': {
      'required': 'required field',
      'formatTimeCorrect': 'time invalid format',
      'maxlength': 'overlong'
    },
    'finishHour': {
      'required': 'required field',
      'formatTimeCorrect': 'time invalid format',
      'maxlength': 'overlong',
      'finishHourValid': 'finish hour is invalid is mayor to start hour'
    },
    'capacity' : {
      'required': 'required field',
      'numberValidator': 'invalid number'
    }
  };

  validationMessages = {
    'speaker': {
      'required': 'required field',
      'maxlength': 'overlong'
    },
    'presentation': {
      'required': 'required field',      
      'maxlength': 'overlong'
    },
    'description': {
      'required': 'required field',
      'minlength': 'please write at least 50 characters',
      'maxlength': 'overlong'      
    }
  };

  onValueChangedForm(formValue: FormGroup, formErrorsValue: any, formValidationsMessage: any,  data?: any) {
    if (!formValue) { return; }
    
    var form = formValue;
    var formErrors = formErrorsValue;
    var validationMessages = formValidationsMessage;
    
    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        formErrors[field] = '';
        const control = form.controls[field];

        if (control && control.touched && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }  

  constructor(_fb: FormBuilder,
    private presentationService: PresentationService,
    private hallService: HallService,
    private eventService: EventService) { 
      super();
      this.firstFormGroup = _fb.group({
        presentation: [
          null,
          Validators.compose([
            Validators.maxLength(100),
            Validators.required
          ]),
        ],
        speaker: [
          null,
          Validators.compose([
            Validators.maxLength(100),
            Validators.required
          ]),
        ],
        description: [
          null,
          Validators.compose([
            Validators.minLength(50),
            Validators.maxLength(1000),
            Validators.required
          ])
        ]
      });
  
      this.firstFormGroup.valueChanges.subscribe(
        data => { this.onValueChangedForm(
          this.firstFormGroup, this.formErrors
          , this.validationMessages, data); }
      );

      this.firstFormGroup.controls['speaker'].disable();



      this.secondFormGroup = _fb.group({
        hall: [
          null,
          Validators.compose([
            Validators.required
          ]),
        ],
        dateEvent: [
        ],
        startHour: [
          null,
          Validators.compose([
            Validators.required,
            Validators.maxLength(5),
            CustomValidators.formatTimeCorrect
          ])
        ],
        finishHour: [
          null,
          Validators.compose([
            Validators.required,
            Validators.maxLength(5),
            CustomValidators.formatTimeCorrect
          ])
        ],
        capacity: [
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.numberValidator
          ])
        ]
      }, {validator: CustomValidators.finishHourValid('startHour', 'finishHour')});

      this.secondFormGroup.valueChanges.subscribe(
        data => {           
          this.onValueChangedForm(
          this.secondFormGroup, this.formHallErrors
          , this.validationFormHallMessages, data); 

          if (this.secondFormGroup.hasError('finishHourValid')){
            this.errorFinishHour = "The finish hour have to be mayor than start hour";
          } else {
            this.errorFinishHour = "";
          }
        }
      );
  }

  changeHallName(){
    this.secondFormGroup.controls['hall'].setErrors({ 'incorrect': true });
    this.idHallSelected = null;
  }

  changePresentation(){    
    this.idPresentationSelected = null;
    this.firstFormGroup.controls['presentation'].setErrors({ 'incorrect': true });
    this.firstFormGroup.controls['speaker'].setValue('');    
    this.firstFormGroup.controls['speaker'].disable();
  };

  changeSpeaker() {
    this.firstFormGroup.controls['speaker'].setErrors({ 'incorrect': true });
    this.idSpeakerSelected = null;
  }

  getDateFormated(date) {
    var dateString = date.toString();
    var dateSearch;

    if (dateString.includes('object')) {
      dateSearch = new Date(date.value.substring(0, 10))
    } else {
      dateSearch = new Date(dateString.substring(0, 15));
    }

    var day = dateSearch.getDate() < 10 ? '0' + dateSearch.getDate().toString() : dateSearch.getDate().toString();
    var month = (dateSearch.getMonth() + 1)< 10 ? '0' + (dateSearch.getMonth() + 1).toString() : (dateSearch.getMonth() + 1).toString();
    var year = dateSearch.getFullYear();

    var dateChanged = year + '-' + month + '-' + day;
    return dateChanged;
  }

  loadHallInfo() {
    if (this.idHallSelected == null) {
      return;
    }
    this.loadEventsHall(this.idHallSelected);
  }

  loadEventsHall(idHall) {
    var date = this.secondFormGroup.controls['dateEvent'].value;
    var dateChanged = this.getDateFormated(date);

    this.hallService.getEvents(idHall, dateChanged).subscribe(
      (data: IEventResponse[]) => 
      {
        this.events = data;        
      }
    );
  }

  loadSchedules(idHall, name) {
    this.idHallSelected = idHall;
    this.secondFormGroup.controls['hall'].setValue(name);
    this.loadEventsHall(idHall);
  }

  onSelectionChangedSpeaker(event: MatAutocompleteSelectedEvent) {    
    this.idSpeakerSelected = event.option.value.id;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {    
    var idPresentation = event.option.value.id;
    this.idPresentationSelected = idPresentation;
    this.presentationService.getSpeakers(idPresentation).subscribe(
      (data: ISpeakerResponse[]) => 
        { 
          this.speakers = data;

          this.filteredOptionsSpeakers = this.firstFormGroup.controls['speaker'].valueChanges.pipe(
            startWith<string | ISpeakerResponse>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterSpeakers(name) : this.speakers.slice())
          );

          this.firstFormGroup.controls['speaker'].enable();
        }
    );
    
  }

  ngOnInit() {

    this.secondFormGroup.controls['dateEvent'].setValue(this.serializedDate);
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    this.hallService.getHalls()
    .subscribe(
      (data:IHallResponse[]) => 
      {
        this.halls = data;
      }
    );

    this.presentationService.getPresentations()
    .subscribe(
      (data: IPresentationResponse[]) => 
        { 
          this.presentations = data;

          this.filteredOptionsPresentation = this.firstFormGroup.controls['presentation'].valueChanges.pipe(
            startWith<string | IPresentationResponse>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterPresentation(name) : this.presentations.slice())
          );
        }
    );
    
  }

  filterPresentation(name: string): IPresentationResponse[] {
    return this.presentations.filter(presentation =>
      presentation.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterSpeakers(name: string): ISpeakerResponse[] {
    return this.speakers.filter(presentation =>
      presentation.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFnPresesentation(presentation?: IPresentationResponse): string | undefined {
    return presentation ? presentation.name : undefined;
  }

  displayFnSpeaker(speaker?: ISpeakerResponse): string | undefined {
    return speaker ? speaker.name : undefined;
  }  


  createEvent(e: Event) {
    e.preventDefault();

    if (this.secondFormGroup.invalid || this.firstFormGroup.invalid) {      
      return;
    }

    var eventInsert = new EventModel();
    var date = this.secondFormGroup.controls['dateEvent'].value;
    var startHour = this.secondFormGroup.controls['startHour'].value;
    var finishHour = this.secondFormGroup.controls['finishHour'].value;
    var idHall = this.idHallSelected;
    var idPresentation = this.idPresentationSelected;
    var idSpeaker = this.idSpeakerSelected;
    var dateChanged = this.getDateFormated(date);
    var capacity = this.secondFormGroup.controls['capacity'].value;
    eventInsert.capacity = capacity;
    eventInsert.date_event = dateChanged;
    eventInsert.start_hour = startHour;
    eventInsert.finish_hour = finishHour;
    eventInsert.hall_id = idHall;
    eventInsert.presentation_id = idPresentation;
    eventInsert.speaker_id = idSpeaker;
    this.loading = true;
    this.errorServerPost = null;
    this.success = false;
    this.eventService.postEvent(eventInsert)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.success = true;
        },
        (error) => {
          this.loading = false;
          this.success = false;
          if (error.status === 401) {
            this.errorServerPost = 'Unauthorized user';
          } 

          else if (error.status == 422) {            
            this.errorServerPost = error.error.business;
          }
          
          else {
            this.errorServerPost = 'An error has ocurred, please contact the administrator';
            console.log(error);
          }
          
        }
      )
  }

}
