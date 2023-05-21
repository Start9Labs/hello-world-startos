/**
 * Here you define a set of sensitive keys/values to be stored in the service vault.
 *
 * Vaults are needed because services seldom store their own access credentials for good reason.
 * You can think of the Vault as a bare bones password manager built into your StartOS package.
 *
 * Values are encrypted with the user's StartOS master password and are visible to the user in the service console.
 */
export interface Vault extends Record<string, string> {
  secretPhrase: string
}
