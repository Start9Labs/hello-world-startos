import { VersionGraph } from '@start9labs/start-sdk'
import { v_2_0_0_3 } from './v2.0.0.3'
import { v_2_0_0_4 } from './v2.0.0.4'

export const versionGraph = VersionGraph.of({
  current: v_2_0_0_4,
  other: [v_2_0_0_3],
})
