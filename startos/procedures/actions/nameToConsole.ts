import { Config, Value } from "start-sdk/lib/config/builder";

export const inputBuilder = Config.of({
  name: Value.text(
    {
      name: 'Name to Print',
      required: false,
      default: null,
      patterns: [],
    },
  ),
});
const matchConfigSpec = inputBuilder.validator();
type InputSpec = typeof matchConfigSpec._TYPE;

export const nameToConsole = createAction<WrapperData, InputSpec>(
  {
    name: 'Name to Console',
    description: 'Prints the provided name to console or, if left blank, the saved name from config.',
    id: 'nameToConsole',
    input: inputBuilder.build(),
    runningOnly: false,
  },
  async ({ effects, utils, input }) => {
    const { name } = await utils.getWrapperData('/config').first()
    effects.runCommand(`echo "Hello ${input.name || name}"`)
  }
)
