import { sdk } from '../sdk'
import { sayHello } from './sayHello'

export const actions = sdk.Actions.of().addAction(sayHello)
