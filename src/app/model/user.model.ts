// To parse this data:
//
//   import { Convert } from "./file";
//
//   const memberInfo = Convert.toMemberInfo(json);

export interface MemberInfo {
    userID: number;
    titleName: string;
    firstName: string;
    lastName:  string;
    telephone: string;
    email:     string;
    password: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMemberInfo(json: string): MemberInfo[] {
        return JSON.parse(json);
    }

    public static memberInfoToJson(value: MemberInfo[]): string {
        return JSON.stringify(value);
    }
}
