import { ExpectedExports } from 'start-sdk/lib/types'
import { nameToConsole } from './nameToConsole'
import { setupActions } from 'start-sdk/lib/actions/setupActions'

export const { actions, initializeActions } = setupActions(nameToConsole)
