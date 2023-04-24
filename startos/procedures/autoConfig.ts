import { setupAutoConfig } from 'start-sdk/lib/autoconfig'
import { InputSpec } from './config/inputSpec'
import { WrapperData } from '../wrapperData'

export const autoConfig = setupAutoConfig<WrapperData, InputSpec>({})
