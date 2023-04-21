import { InputSpec } from "./inputSpec";
import { WrapperData } from "../../wrapperData";
import { Read } from "start-sdk/lib/config/setupConfigExports";

/**
 * This function executes on config fetch
 * 
 * Use this function to gather data from various files and assemble into a valid config
*/

export const read: Read<WrapperData, InputSpec> = async ({ utils }) => {
  return utils.getWrapperData({ path: '/config' });
}
