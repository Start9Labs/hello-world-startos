import { sdk } from '../../sdk'
const { Config, Value } = sdk

/**
 * Here you define the config spec that will ultimately present to the user as validated form inputs
 *
 * Most form controls are available, including text, textarea, number, toggle, select, multiselect, list, color, datetime, object (aka a "sub form"), and union (aka a conditional "sub form")
 */
export const configSpec = Config.of({
  name: Value.text({
    name: 'Name',
    description:
      'When you launch the Hello World UI, it will display "Hello [First Name]"',
    required: { default: 'World' },
  }),
})
