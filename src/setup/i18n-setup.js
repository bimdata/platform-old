/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { messages } from '@/lang/messages'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages
})

const loadedLanguages = ['fr'] // our default language that is prelaoded

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
