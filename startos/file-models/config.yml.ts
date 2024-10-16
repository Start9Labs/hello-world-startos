import { matches, FileHelper } from '@start9labs/start-sdk'
const { object, string } = matches

const shape = object({
  name: string,
})

export const yamlFile = FileHelper.yaml(
  '/media/startos/volumes/main/config.yml',
  shape,
)
