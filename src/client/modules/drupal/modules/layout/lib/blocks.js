/**
 * Blocks resolution library.
 */

import BlockContentBasic from '~drupal/modules/layout/blocks/BlockContentBasic'
import BlockNotFound from '~drupal/modules/layout/blocks/BlockNotFound'

// prettier-ignore
// the blocks registry, in order of precendence.
const blocks = [
  BlockContentBasic,
  BlockNotFound
]

export default blocks
