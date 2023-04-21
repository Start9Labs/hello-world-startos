import { setupMigrations } from "start-sdk/lib/migrations";
import { WrapperData } from "../wrapperData";

export const { init, uninit } = setupMigrations<WrapperData>(async ({ effects, utils }) => {})