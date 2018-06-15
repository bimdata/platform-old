import Vue from 'vue'
import PageLoginResetPassword from '@/components/PageLoginResetPassword'

describe('Reset Password', () => {
  it('has created hook', () => {
    expect(typeof PageLoginResetPassword.created).toBe('function')
  })

  it('has token setted', () => {
    const Constructor = Vue.extend(PageLoginResetPassword)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).toBe('au revoir !')
  })
})
