import typescriptConfig from 'eslint-config-next/typescript'
import nextVitals from 'eslint-config-next/core-web-vitals'
import eyeConfig from "eslint-config-eye"

import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...typescriptConfig,
  ...eyeConfig,
  {
    rules:{
      '@stylistic/key-spacing':`off`,
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    `.next/**`,
    `out/**`,
    `build/**`,
    `next-env.d.ts`,
  ]),
])
 
export default eslintConfig
