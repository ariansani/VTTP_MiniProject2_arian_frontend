export interface Gym{
    id: number
    name: string
    location: string
    routeReset: string
    latitude: number
    longitude: number
}

export interface Weather{
    daily: {
        [k: string]: string[]|number[];
        time:string[]
        precipitation_sum:number[]
        rain_sum:number[]
        temperature_2m_max:number[]
        windspeed_10m_max:number[]
    };
    elevation : number
    generationtime_ms: number
    daily_units: {
        [k:string]:string
        precipitation_sum:string
        rain_sum:string
        temperature_2m_max:string
        time:string
        windspeed_10m_max:string
    }
    latitude: number
    longitude: number
    timezone: string
    timezone_abbreviation: string
    utc_offset_seconds:number
}

export interface Package{
    packageUUID: string
    gymId: number
    gymName: string
    userId: number
    entryPasses: number
    expiryDate: string
    expired: boolean
}

export interface UserLogin{
    username: string
    password: string
}

export interface UserRegister{
    username: string
    email: string
    password: string

}

export interface History{
    packageUUID:string
    dateUsed:string
    passesUsed:number
    gymName:string
    userId:string
    gymId:string
}