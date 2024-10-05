import { Accesspoint_Devices_Dto } from "./Accesspoint_devices";

export class AccessPoint {
    id:number=0;
    name: string = "";
    alias: string = "";
    City_Id:number=0;
    location_Id: number = 0;
    floor_Id: number = 0;
    devices:Accesspoint_Devices_Dto[]=[];
}