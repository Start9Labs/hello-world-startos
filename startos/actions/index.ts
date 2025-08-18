import { sdk } from '../sdk'
import { showSecretPhrase } from './showSecretPhrase'
import { setName } from './setName'
import { helloScript } from './helloScript'

export const actions = sdk.Actions.of()
  .addAction(setName)
  .addAction(showSecretPhrase)
  .addAction(helloScript)
