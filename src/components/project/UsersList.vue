<template>
    <base-card :fullscreen-available="false" class="users-list__card">
      <slot slot="header-title" name="header-title">
        {{ $t('users.users') }}
      </slot>
      <template slot="content">
        <div class="users-list">
          <slot name="users-list-header">
            <div class="users-list__header">
              <div class="users-list__header__left-container d-none">
                <svgicon name="menu" width="23" height="23"></svgicon>
              </div>
              <transition name="fade">
                <div class="users-list__header__right-container" v-if="!displaySendInvit && !displaySearchUser">
                  <span class="base-button-option__tool" :class="{clicked: clicked}">
                    <svgicon name="account-plus" width="22" height="22" @click.native="openSendInvit" class="account-plus"></svgicon>
                  </span>
                  <svgicon name="magnify" height="21" width="21" @click.native="openSearchUser"></svgicon>
                  <svgicon name="filter-variant" width="25" height="26" class="d-none"></svgicon>
                </div>
              </transition>
              <transition name="fade">
                <div class="users-list__header__invitation" v-if="displaySendInvit">
                  <input type="text" v-model="mailInvitation" placeholder="Email adress">
                  <div class="rights-select">
                    <svgicon name="chevron-down" width="20" height="18" class="arrow-down"></svgicon>
                    <span @click="toggleRightsInvitation" class="ellipsis">{{ rightChoosed.text }}</span>
                    <div class="base-button-option__menu" v-if="displayRightsInvitation" v-on-clickaway="away">
                      <ul>
                        <li v-for="(right, index) in rights" :key="index">
                          <base-input-radio
                            :option="right"
                            name="invitation-rights"
                            @input="setInvitationRight"
                          ></base-input-radio>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="users-list__header__invitation__actions">
                    <span class="check" @click="sendInvitation">
                      <svgicon name="check" height="22" width="24"></svgicon>
                    </span>
                    <span class="check-cross" @click="displaySendInvit = false">
                      <svgicon name="close" height="21" width="21"></svgicon>
                    </span>
                  </div>
                </div>
              </transition>
              <transition name="fade">
                <div class="users-list__header__search" v-if="displaySearchUser">
                  <input type="text" placeholder="Search user" v-model="searchFilter">
                  <div class="users-list__header__invitation__actions">
                    <span class="check-cross" @click="resetSearchUser">
                      <svgicon name="close" height="21" width="21"></svgicon>
                    </span>
                  </div>
                </div>
              </transition>
            </div>
          </slot>
          <div class="users-list__body">
            <ul class="users-list__users">
              <users-list-item v-for="(user, index) in filteredUsers" :key="index" :user="user" :displayMenu="displayMenu"></users-list-item>
            </ul>
          </div>
        </div>
      </template>
    </base-card>
</template>
<script>
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import UsersListItem from '@/components/project/UsersListItem'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  components: {
    BaseCard,
    BaseButtonOption,
    BaseInputRadio,
    BaseValidDelete,
    UsersListItem
  },
  props: {
    displayMenu: {
      type: Boolean,
      default: true
    },
    users: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      displayRightsInvitation: false,
      displaySendInvit: false,
      displaySearchUser: false,
      clicked: false,
      searchFilter: '',
      rightChoosed: {
        value: null,
        text: 'Droits'
      },
      mailInvitation: '',
      rightInvitation: null,
      guests: [
        {
          id: 7,
          name: 'Sarah Croche',
          role: 50
        },
        {
          id: 8,
          name: 'Sarah Pelle',
          role: 100
        }
      ]
    }
  },
  methods: {
    radioSelected (object) {
      console.log('object', object)
      // Call ajax
    },
    removeUser (userId) {
      console.log(userId)
      // Call to remove user
    },
    openSendInvit () {
      this.clicked = false
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
        this.displaySearchUser = false
        this.displaySendInvit = true
      }, 500)
    },
    openSearchUser () {
      this.displaySendInvit = false
      this.displaySearchUser = true
    },
    toggleRightsInvitation () {
      this.displayRightsInvitation = !this.displayRightsInvitation
    },
    away () {
      this.displayRightsInvitation = false
    },
    sendInvitation () {
      // Call to send invitation
    },
    setInvitationRight (value) {
      this.rightChoosed = value
      this.displayRightsInvitation = false
    },
    resetSearchUser () {
      this.displaySearchUser = false
      this.searchFilter = ''
    }
  },
  created () {
    this.users.map(user => {
      user.hasAccepted = true
    })
    this.guests.map(guest => this.users.push({
      id: guest.id,
      name: guest.name,
      job: '',
      company: '',
      photo: '',
      hasAccepted: false,
      role: guest.role
    }))
  },
  computed: {
    filteredUsers () {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                user.company.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                user.job.toLowerCase().includes(this.searchFilter.toLowerCase())
      }).reverse()
    }
  }
}
</script>
