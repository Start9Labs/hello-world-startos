import { configBuilder } from "start-sdk/lib";
const { Config, Value } = configBuilder;

/** 
 * This file is required. It can be composed manually or generated from inputSpecRaw.ts, depending on your syntactic preference for writing input specs
*/
export const inputSpec = Config.of({
  name: Value.text(
    {
      name: "Name",
      description: 'When you launch the Hello World UI, it will display "Hello [First Name]"',
      required: false,
    },
  ),
});

export const matchConfigSpec = inputSpec.validator();
export type InputSpec = typeof matchConfigSpec._TYPE;

