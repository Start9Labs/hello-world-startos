/**
 * The Store is for saving any necessary data NOT saved by the upstream service. Do NOT persist data in the package that is already being persisted by the service
 *
 * Ideally this is empty. Stateless packages are easier to maintain and eliminate unexpected behavior
 */
export interface Store {
  nameLastUpdatedAt: string
}
