import BlockedInfo from "../../models/BlockedInfo";
import Person from "../../models/Person";
import { RootState } from "../index";

export const peopleCountSelector = (state: RootState): number => (
  state.people.count
);

export const peopleListSelector = (state: RootState): Array<Person> => (
  state.people.list
);

export const peopleBlockListSelector = (state: RootState): Array<BlockedInfo> => (
  state.people.blockList
);
