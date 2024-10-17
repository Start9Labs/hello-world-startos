import { sdk } from '../sdk'
import { showSecretPhrase } from './showSecretPhrase'
import { setName } from './setName'
import { nameToLogs } from './nameToLogs'

export const actions = sdk.Actions.of()
  .addAction(setName)
  .addAction(showSecretPhrase)
  .addAction(nameToLogs)
