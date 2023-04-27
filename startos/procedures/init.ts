import { setupInit, setupInstall, setupUninstall } from 'start-sdk/lib/inits'
import { WrapperData } from '../wrapperData'
import { migrations } from './migrations'

/**
 * Here you define arbitrary code that runs once, on fresh install only
 */
const install = setupInstall<WrapperData>(async ({ effects, utils }) => {})

/**
 * Here you define arbitrary code that runs once, on uninstall only
 */
const uninstall = setupUninstall<WrapperData>(async ({ effects, utils }) => {})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = setupInit(migrations, install, uninstall)
