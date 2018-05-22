import { IHallResponse } from "./hall-response";
import { IPresentationResponse } from "./presentation-response";
import { ISpeakerResponse } from "./speaker-response";

export interface IEventResponse {
    id: string;
    date_event: string;
    start_hour: string;
    finish_hour: string;
    hall: IHallResponse;
    presentation: IPresentationResponse;
    speaker: ISpeakerResponse;
}