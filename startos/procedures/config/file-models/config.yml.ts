import { matches } from '@start9labs/start-sdk'
import FileHelper from '@start9labs/start-sdk/lib/util/fileHelper'

const { object, string } = matches

const yamlShape = object({
  name: string,
})

export const yamlFile = FileHelper.toml('config.yml', yamlShape)
