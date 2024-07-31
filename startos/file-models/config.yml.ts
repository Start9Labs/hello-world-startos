import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string } = matches

const shape = object({
  name: string,
})

export const yamlFile = FileHelper.yaml('./config.yml', shape)
