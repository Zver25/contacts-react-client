import BlockedInfo from "../../models/BlockedInfo";
import Person from "../../models/Person";

export const stateName = 'people';

export interface PeopleState {
  page: number
  perPage: number;
  count: number;
  query: string;
  list: Array<Person>,
  blockList: Array<BlockedInfo>;
  // @todo: define type
  error: any;
}

export interface FetchPeopleListEvent {
  page: number;
  perPage: number;
  query: string;
}

export interface FetchPeopleListSuccessEvent {
  count: number;
  list: Array<Person>;
}
