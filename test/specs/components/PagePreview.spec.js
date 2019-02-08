import Vue from 'vue'
import PagePreview from '../../../src/components/pages/PagePreview.vue'

describe('Page preview test', () => {
  it('has created hook', () => {
    expect(typeof PagePreview.created).toBe('function')
  })
})
