import { Item } from './item';

export interface Paycheck {

  grossIncome?: number;
  taxes?: Array<Item>;
  credits?: Array<Item>;
  netIncome?: number;

}
