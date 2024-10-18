// To parse this data:
//
//   import { Convert } from "./file";
//
//   const booth = Convert.toBooth(json);

export interface Booth {
    boothID:      number;
    boothName:    string;
    boothSize:    string;
    boothStatus:  string;
    boothPrice:   number;
    boothPicture: string;
    product:      string;
    zoneID:       number;
}

// Converts JSON strings to/from your types
export class Convert {
    static toEvent(arg0: string): Event[] {
      throw new Error('Method not implemented.');
    }
    public static toBooth(json: string): Booth[] {
        return JSON.parse(json);
    }

    public static boothToJson(value: Booth[]): string {
        return JSON.stringify(value);
    }
}
