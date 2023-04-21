import { setupProperties } from "start-sdk/lib/properties";
import { PropertyString } from "start-sdk/lib/properties";
import { WrapperData } from "../wrapperData";

/**
 * In this example, we use the "name" value from Hello World wrapper data to compose a secret phrase and display it to the user in Properties
 */
export const properties = setupProperties<WrapperData>(async ({ wrapperData }) => {
  const name = wrapperData.name
  return [
    PropertyString.of({
      // The display label of the property
      name: 'Secret Phrase',
      // A human-readable description of the property
      description: "This secret phrase will get you access to a secret place.",
      // The value of the property
      value: `When I say "Hello", you say "${name}". Hello, ${name}! Hello, ${name}!`,
      // optionally display a copy button with the property
      copyable: true,
      // optionally permit displaying the property as a QR code
      qr: false,
      // optionally mask the value of the property
      masked: false,
    }),
  ]
});
