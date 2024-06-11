import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string, natural } = matches

const shape = object({
  name: string,
  // favoriteNumber: natural,
})

export const yamlFile = FileHelper.yaml(
  '/media/startos/volumes/main/config.yml',
  shape,
)
