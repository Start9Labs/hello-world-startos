/**
 * Here you define a set of sensitive keys/values to be stored in the service vault. Values are encrypted with the StartOS master password
 */
export interface Vault extends Record<string, string> {}
