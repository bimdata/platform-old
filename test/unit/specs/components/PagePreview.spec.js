/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import Vue from 'vue'
import PagePreview from '../../../../src/components/pages/PagePreview.vue'

describe('Page preview test', () => {
  it('has created hook', () => {
    expect(typeof PagePreview.created).toBe('function')
  })
})
