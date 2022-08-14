// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the Embassy UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({});

//export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
//  "tor-address": {
//    "name": "Network Tor Address",
//    "description": "The Tor address for the network interface.",
//    "type": "pointer",
//    "subtype": "package",
//    "package-id": "hello-world",
//    "target": "tor-address",
//    "interface": "main"
//  },
//});
