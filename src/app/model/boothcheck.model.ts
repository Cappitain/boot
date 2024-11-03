// To parse this data:
//
//   import { Convert } from "./file";
//
//   const boothcheck = Convert.toBoothcheck(json);

export interface Boothcheck {
    firstName:    string;
    lastName:    string;
    telephone:   string;
    boothName:   string;
    boothStatus: string;
    zoneName:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBoothcheck(json: string): Boothcheck[] {
        return JSON.parse(json);
    }

    public static boothcheckToJson(value: Boothcheck[]): string {
        return JSON.stringify(value);
    }
}
