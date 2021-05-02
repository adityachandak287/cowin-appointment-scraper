// Generate from http://json2ts.com/

declare module namespace {
  export interface Session {
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    vaccine: string;
    slots: string[];
  }

  export interface VaccineFee {
    vaccine: string;
    fee: string;
  }

  export interface Center {
    center_id: number;
    name: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    sessions: Session[];
    vaccine_fees: VaccineFee[];
  }

  export interface RootObject {
    centers: Center[];
  }
}
