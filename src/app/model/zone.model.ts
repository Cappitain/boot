// To parse this data:
//
//   import { Convert } from "./file";
//
//   const zone = Convert.toZone(json);

export interface Zone {
    zoneID:      number;
    zoneName:    string;
    zoneDetail:  string;
    eventID:     number;
    zonePicture: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toZone(json: string): Zone[] {
        return JSON.parse(json);
    }

    public static zoneToJson(value: Zone[]): string {
        return JSON.stringify(value);
    }
}
