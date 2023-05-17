/**
 * Here you define a set of sensitive keys/values to be stored in the service vault.
 *
 * Values are encrypted with the user's StartOS master password and are visible to the user.
 */
export interface Vault extends Record<string, string> {
  secretPhrase: string
}
