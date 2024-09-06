import { setupExposeStore } from '@start9labs/start-sdk'

/**
 * @description The Store is used for persisting arbitrary data that are needed by the wrapper
 *   package but are NOT persisted by the upstream service. Do NOT persist data here that are
 *   already being persisted by the service itself.
 *
 *   Store data should be kept to a minimum. Stateless packages are easier to maintain
 *   and eliminate unexpected behavior.
 * @type {Record<string, any>}
 * @example
 * ```
 * export type Store = {
 *   key1: string
 *   key2: boolean
 *   key3: number
 *   key4: {
 *     key5: string[]
 *   }
 * }
 * ```
 */
export type Store = {
  secretPhrase: string
  nameLastUpdatedAt: string
}

export const exposedStore = setupExposeStore<Store>((pathBuilder) => [
  pathBuilder.nameLastUpdatedAt,
])
