/**
 * Blocks resolution library.
 */

import BlockSiteBranding from '~drupal/modules/layout/blocks/BlockSiteBranding'
import BlockContentBasic from '~drupal/modules/layout/blocks/BlockContentBasic'
import BlockNotFound from '~drupal/modules/layout/blocks/BlockNotFound'

// prettier-ignore
// the blocks registry, in order of precendence.
const blocks = [
  BlockSiteBranding,
  BlockContentBasic,
  BlockNotFound
  // ADD YOUR BLOCK HERE
]

export default blocks
