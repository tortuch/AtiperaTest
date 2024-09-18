import { InjectionToken } from "@angular/core";
import { RxState } from '@rx-angular/state';
import { PeriodicElement } from "../models/periodic.type";

export interface GlobalState {
  elements: PeriodicElement[]
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>(
  'GLOBAL_RX_STATE'
);
