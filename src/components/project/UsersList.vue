<template>
    <base-card :fullscreen-available="true" class="users-list__card">
      <template slot="header-title">
          {{ $t('users.users') }}
      </template>
      <template slot="content">
          <div class="users-list">
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
                      <svgicon name="close"  height="21" width="21"></svgicon>
                    </span>
                  </div>
                </div>
              </transition>
              <transition name="fade">
                <div class="users-list__header__search" v-if="displaySearchUser">
                  <input type="text" placeholder="Search user" v-model="searchFilter">
                  <div class="users-list__header__invitation__actions">
                    <span class="check-cross" @click="resetSearchUser">
                      <svgicon name="close"  height="21" width="21"></svgicon>
                    </span>
                  </div>
                </div>
              </transition>
            </div>
            <div class="users-list__body">
                <ul class="users-list__users">
                  <li v-for="(user, index) in filteredUsers" :key="index" class="users-list__user">
                    <div class="users-list__user__picture" v-if="user.hasAccepted">
                      <img :src="user.photo" alt="" class="img-fluid circle" v-if="user.photo">
                      <span class="user-menu__pic" v-else>{{ user.name|initialsFormat }}</span>
                      <span class="users-list__user__status users-list__user__status--inline" v-if="user.inline"></span>
                      <span class="users-list__user__status users-list__user__status--outline" v-else></span>
                    </div>
                    <div class="users-list__user__picture" v-else>
                      <svgicon name="user-invit-pending" height="40" width="40"></svgicon>
                    </div>
                    <div class="users-list__user__datas" v-if="user.hasAccepted">
                      <p>
                        <span class="users-list__user__name">{{ user.name }}</span>
                        <span>{{ user.job }}</span>
                        <span>{{ user.enterprise }}</span>
                      </p>
                      <span class="badge badge-primary" v-if="isAdmin(user.role)">{{ $t('users.administrator') }}</span>
                    </div>
                    <div class="users-list__user__datas" v-else>
                      <p>
                        <span class="users-list__user__name">{{ user.name }}</span>
                        <span>{{ $t('users.guest') }} - {{ $t('users.without_answer') }}. <a href="">{{ $t('users.resend_invitation') }}</a></span>
                      </p>
                      <span class="badge badge-primary" v-if="isAdmin(user.role)">{{ $t('users.administrator') }}</span>
                    </div>
                    <div class="users-list__user__actions" v-if="user.hasAccepted">
                      <base-button-option @option-toggled="toggleMenu" class="users-list__user__actions__menu">
                        <ul>
                            <li @click.stop.self="toggleRights()" :class="{'actif': displayRights}" class="arrow-left">
                              {{ $t('users.modify_rights') }} <svgicon name="user-cadenas" width="12" height="12"></svgicon>

                              <div class="new_folder_box" v-if="displayRights">
                                <base-input-radio
                                  v-for="(right, index) in rights"
                                  :key="index" :id="user.id"
                                  :option="right"
                                  name="rights"
                                  @input="radioSelected"
                                  :selected="user.role"
                                ></base-input-radio>
                              </div>
                          </li>
                          <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                              {{ $t('users.remove') }} <svgicon name="user-croix" width="12" height="12"></svgicon>
                              <transition name="slide-fade">
                                <div class="delete__actions" v-if="showRemoveActions">
                                  <span class="check" @click="removeUser(user.id)">
                                    <svgicon name="check" height="15" width="18"></svgicon>
                                  </span>
                                  <span class="check-cross" @click="showRemoveActions = false">
                                    <svgicon name="close"  height="13" width="13"></svgicon>
                                  </span>
                                </div>
                              </transition>
                            </li>
                        </ul>
                      </base-button-option>
                    </div>
                  </li>
                </ul>
            </div>
          </div>
      </template>
    </base-card>
</template>
<script>
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  components: {
    BaseCard,
    BaseButtonOption,
    BaseInputRadio
  },
  data () {
    return {
      displayRights: false,
      displayRightsInvitation: false,
      showRemoveActions: false,
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
      rights: [
        {
          text: 'Administrateur',
          value: 100
        },
        {
          text: 'Utilisateur',
          value: 50
        },
        {
          text: 'Invité',
          value: 25
        }
      ],
      users: [
        {
          id: 1,
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg',
          hasAccepted: true,
          inline: true,
          role: 100
        },
        {
          id: 2,
          name: 'Lorem ipsum',
          job: '',
          enterprise: '',
          photo: '',
          hasAccepted: false,
          inline: true,
          role: 25
        },
        {
          id: 3,
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: '',
          photo: '',
          hasAccepted: true,
          inline: false,
          role: 50
        },
        {
          id: 4,
          name: 'François Thierry',
          job: '',
          enterprise: '',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          hasAccepted: false,
          inline: false,
          role: 25
        },
        {
          id: 5,
          name: 'Gabriel Cambreling',
          job: 'Chauffagiste',
          enterprise: 'mon entreprise',
          photo: '',
          hasAccepted: true,
          inline: false,
          role: 50
        },
        {
          id: 6,
          name: 'François Thierry',
          job: 'Plombier',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          hasAccepted: true,
          inline: true,
          role: 25
        },
        {
          id: 7,
          name: 'François Thierry',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          hasAccepted: true,
          inline: true,
          role: 100
        }
      ]
    }
  },
  methods: {
    toggleRights () {
      this.displayRights = !this.displayRights
      this.showRemoveActions = false
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
        this.displayRights = false
      }
    },
    radioSelected (object) {
      console.log('object', object)
      // Call ajax
    },
    removeUser (userId) {
      console.log(userId)
      // Call to remove user
    },
    isAdmin (userRole) {
      if (userRole === 100) {
        return true
      }

      return false
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
  computed: {
    filteredUsers () {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                user.enterprise.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                user.job.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
}
</script>
