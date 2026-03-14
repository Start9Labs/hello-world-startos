import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const sayHello = sdk.Action.withoutInput(
  'say-hello',

  async ({ effects }) => ({
    name: i18n('Say Hello'),
    description: i18n('A simple example action that greets the user'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    return {
      version: '1',
      title: 'Hello!',
      message: 'This is an example action for the Hello World package.',
      result: null,
    }
  },
)
