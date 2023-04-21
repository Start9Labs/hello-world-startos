import { ExpectedExports } from "start-sdk/lib/types";
import { nameToConsole } from "./nameToConsole";

export const { actions, manifestActions }: ExpectedExports.action = setupActions(nameToConsole)
