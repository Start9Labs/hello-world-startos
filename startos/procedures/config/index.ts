import { inputSpec } from "./inputSpec";
import { read } from "./read";
import { save } from "./save";
import { setupConfig } from "start-sdk/lib/config";

export const { getConfig, setConfig } = setupConfig(inputSpec, read, save);