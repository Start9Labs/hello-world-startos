import { configBuilder } from 'start-sdk/lib'
const { Config, Value } = configBuilder

/**
 * Here you define the config specification that will ultimately present to the user as validated form inputs
 *
 * Most form controls are available, including text, textarea, number, toggle, select, multiselect, list, color, datetime, object (a subform), and union (a conditional subform)
 */
export const configSpec = Config.of({
  name: Value.text({
    name: 'Name',
    description:
      'When you launch the Hello World UI, it will display "Hello [First Name]"',
    required: true,
  }),
})
// These two lines are necessary to satisfy Typescript typings. Do not touch them
export const matchConfigSpec = configSpec.validator()
export type ConfigSpec = typeof matchConfigSpec._TYPE
