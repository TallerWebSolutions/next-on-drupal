/**
 * Typename based block resolving matcher.
 *
 * @param {String} typename The typename of the block. i.e.: "BlockContentBasic".
 */
export const typenameIs = typename => ({ __typename }) =>
  __typename === typename
