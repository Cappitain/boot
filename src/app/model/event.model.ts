// To parse this data:
//
//   import { Convert } from "./file";
//
//   const event = Convert.toEvent(json);

export interface Event {
    eventID:   string;
    eventName: string;
    startDate: string;
    endDate:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toEvent(json: string): Event[] {
        return JSON.parse(json);
    }

    public static eventToJson(value: Event[]): string {
        return JSON.stringify(value);
    }
}
