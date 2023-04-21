import { InputSpec } from "start-sdk/lib/config/configTypes";

/** 
 * This file is optional. Use it to define the input spec in a single structure
 * 
 * Once complete, run "npm run gen-input-spec" to generate inputSpec.ts from this file
 * 
 * Hint: use "ctrl + space" inside any given key to see the set of possible attributes for that key's type
*/
export const spec: InputSpec = {
  name: {
    type: "text",
    name: "Name",
    description: 'When you launch the Hello World UI, it will display "Hello [First Name]"',
    required: false,
    default: "World",
    placeholder: "Enter your name",
    warning: null,
    minLength: null,
    maxLength: null,
    inputmode: "email",
    masked: false,
    patterns: [],
  },
};
