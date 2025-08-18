import { sdk } from '../sdk'
import { configYaml } from '../fileModels/config.yml'
import { store } from '../fileModels/store.json'

export const helloScript = sdk.Action.withoutInput(
  // id
  'hello-script',

  // metadata
  async ({ effects }) => ({
    name: 'Print Name to Logs',
    description: `Uses a script to print "hello name" to the logs`,
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
    visibility: (await store.read((s) => s.nameLastUpdatedAt).const(effects))
      ? 'enabled'
      : {
          disabled: 'Cannot print to logs until you update your name.',
        },
  }),

  // the execution function
  async ({ effects }) => {
    const mountpoint = '/scripts'

    const NAME = (await configYaml.read().const(effects))!.name!

    // we use a script here for example purposes only. Printing to the logs can also be done with `console.log(NAME)`
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'hello-world' },
      sdk.Mounts.of().mountAssets({ subpath: null, mountpoint }),
      'hello-world-script',
      async (subc) =>
        subc.exec(['sh', `${mountpoint}/sayHello.sh`], {
          env: { NAME },
        }),
    )

    return {
      version: '1',
      title: 'Success',
      message:
        'Hello name printed to logs. Open the Hello World service logs to view it.',
      result: null,
    }
  },
)
