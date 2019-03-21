import React from 'react'
import { shallow } from 'enzyme'

import blocks from '../lib/blocks'
import BlockResolverContainer from './BlockResolverContainer'

jest.mock('../lib/blocks', () => {
  const BlockA = () => null
  BlockA.is = jest.fn(({ entityId }) => entityId === 'a')

  const BlockB = () => null
  BlockB.is = jest.fn(({ entityId }) => entityId === 'b')

  const BlockFallback = () => null
  BlockFallback.is = jest.fn(() => true)

  return [BlockA, BlockB, BlockFallback]
})

const BlockA = blocks[0]
const BlockB = blocks[1]
const BlockFallback = blocks[2]

describe('drupal', () => {
  describe('layout', () => {
    describe('BlockResolverContainer', () => {
      beforeEach(jest.clearAllMocks)

      it("should execute each block' predicate", () => {
        const block = {}

        shallow(<BlockResolverContainer block={ block } />)

        expect(BlockA.is).toHaveBeenCalledWith(block)
        expect(BlockB.is).toHaveBeenCalledWith(block)
        expect(BlockFallback.is).toHaveBeenCalledWith(block)
      })

      it('should render matching block component', () => {
        const a = <BlockResolverContainer block={ { entityId: 'a' } } />
        const b = <BlockResolverContainer block={ { entityId: 'b' } } />
        const fallback = <BlockResolverContainer block={ {} } />

        expect(shallow(a).is(BlockA)).toBe(true)
        expect(shallow(b).is(BlockB)).toBe(true)
        expect(shallow(fallback).is(BlockFallback)).toBe(true)
      })
    })
  })
})
