import { IPhoto } from "./iphoto"

export interface IMember {
    id:Number
    userName:string
    photoUrl:string
    age:number
    knowAs:string
    created:Date
    lastActive:Date
    gender:string
    introduction:string
    lookingFor:string
    interests:string
    city:string
    country:string
    photos:IPhoto[]
}