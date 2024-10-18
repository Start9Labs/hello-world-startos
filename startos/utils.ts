// Here we define any constants or functions that are shared by multiple components
// throughout the package codebase. This file will be unnecessary for many packages.

export function getSecretPhrase(name: string): string {
  return `Knock knock. Who's there? ${name}!`
}

export const uiPort = 80
