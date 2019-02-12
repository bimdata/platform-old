<template>
    <base-card :fullscreen-available="true" class="users-list__card">
      <template slot="header-title">
          {{ $t('users.users') }}
      </template>
      <template slot="content">
          <div class="users-list">
            <div class="users-list__header">
              <div class="users-list__header__left-container">
                <svgicon name="menu" width="23" height="23"></svgicon>
              </div>
              <div class="users-list__header__right-container">
                <svgicon name="account-plus" width="22" height="22"></svgicon>
                <svgicon name="magnify" height="21" width="21"></svgicon>
                <svgicon name="filter-variant" width="25" height="26"></svgicon>
              </div>
            </div>
            <div class="users-list__body">
                <ul class="users-list__users">
                  <li v-for="(user, index) in users" :key="index" class="users-list__user">
                    <div class="users-list__user__picture">
                      <img :src="user.photo" alt="" class="img-fluid circle" v-if="user.photo">
                      <span class="user-menu__pic" v-else>{{ user.name|initialsFormat }}</span>
                      <span class="users-list__user__status users-list__user__status--inline" v-if="user.inline"></span>
                      <span class="users-list__user__status users-list__user__status--outline" v-else></span>
                    </div>
                    <div class="users-list__user__datas">
                      <p>
                        <span class="users-list__user__name">{{ user.name }}</span>
                        <span>{{ user.job }}</span>
                        <span>{{ user.enterprise }}</span>
                      </p>
                      <span class="badge badge-primary" v-if="user.isAdmin">{{ $t('users.administrator') }}</span>
                    </div>
                    <div class="users-list__user__actions">
                      <base-button-option @option-toggled="toggleMenu" class="users-list__user__actions__menu">
                        <ul>
                            <li @click.stop.self="toggleRights()" :class="{'actif': displayRights}" class="arrow-left">
                              {{ $t('users.modify_rights') }} <svgicon name="user-cadenas" width="12" height="12"></svgicon>

                              <div class="new_folder_box" v-if="displayRights">
                                  <div class="base-input-text-material">
                                      <input
                                        type="text"
                                        autofocus
                                        :placeholder="cloud.name"
                                        required
                                        v-model="renameCloud"
                                        v-on:keyup.enter="saveRename"
                                      >
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                  </div>
                              </div>
                          </li>
                          <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                              {{ $t('users.remove') }} <svgicon name="user-croix" width="12" height="12"></svgicon>
                              <transition name="slide-fade">
                                <div class="delete__actions" v-if="showRemoveActions">
                                  <span class="check" @click="remove">
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

export default {
  components: {
    BaseCard,
    BaseButtonOption
  },
  data () {
    return {
      displayRights: false,
      showRemoveActions: false,
      users: [
        {
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://mir-s3-cdn-cf.behance.net/user/276/df2bfd2271051.59b8e8f49b466.jpg',
          hasAccepted: true,
          isAdmin: true,
          inline: true
        },
        {
          name: 'Lorem ipsum',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: false,
          isAdmin: false,
          inline: true
        },
        {
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: true,
          isAdmin: false,
          inline: false
        },
        {
          name: 'François Thierry',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          hasAccepted: true,
          isAdmin: false,
          inline: false
        },
        {
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: true,
          isAdmin: false,
          inline: false
        },
        {
          name: 'François Thierry',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: 'https://d2cxspbh1aoie1.cloudfront.net/avatars/local/0b08b2d76dd021b129244840525ce6f469a07ccf9d8b6a7463712a051d686d2e/160',
          hasAccepted: true,
          isAdmin: true,
          inline: true
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
        this.displayRename = false
      }
    }
  }
}
</script>
