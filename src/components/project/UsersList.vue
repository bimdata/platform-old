<template>
  <base-card :fullscreen-available="false" class="users-list__card">
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
                    <svgicon name="account-plus" width="22" height="22" @click.native="openSendInvite"
                             class="account-plus"></svgicon>
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
        <div class="users-list__body">
          <ul class="users-list__users">
            <li v-for="user in filteredUsers" :key="`user-${user.id}`" class="users-list__user">
              <div class="users-list__user__picture">
                <template v-if="user.hasAccepted">
                  <img :src="user.photo" alt="" class="img-fluid circle" v-if="user.photo">
                  <span class="user-menu__pic" v-else>{{ `${user.firstname} ${user.lastname}` | initialsFormat }}</span>
                </template>
                <template v-if="!user.hasAccepted">
                  <svgicon name="user-invit-pending" height="40" width="40"></svgicon>
                </template>
              </div>
              <div class="users-list__user__datas">
                <p v-if="user.hasAccepted">
                  <span class="users-list__user__name">{{ user.firstname }} {{ user.lastname }}</span>
                  <span>{{ user.job }}</span>
                  <span>{{ user.company }}</span>
                </p>
                <p v-if="!user.hasAccepted">
                  <span class="users-list__user__name">{{ user.firstname }} {{ user.lastname }}</span>
                  <span>{{ $t('users.guest') }} - {{ $t('users.without_answer') }}. <a href="#">{{ $t('users.resend_invitation') }}</a></span>
                </p>
                <span class="badge badge-primary" v-if="isAdmin(user.project_role)">
                    {{ $t('users.administrator') }}
                  </span>
              </div>
              <div class="users-list__user__actions" v-if="user.hasAccepted && isAdmin()">
                <base-button-option @option-toggled="toggleMenu" class="users-list__user__actions__menu">
                  <ul>
                    <li @click.stop.self="toggleRights()" :class="{'actif': displayRights}" class="arrow-left">
                      {{ $t('users.modify_rights') }}
                      <svgicon name="user-cadenas" width="12" height="12"></svgicon>

                      <div class="new_folder_box" v-if="displayRights">
                        <base-input-radio
                          v-for="(right, rightIndex) in rights"
                          :key="`radio-${rightIndex}`" :id="user.id"
                          :option="right"
                          name="rights"
                          @input="radioSelected(user, right)"
                          :selected="user.project_role"
                        ></base-input-radio>
                      </div>
                    </li>
                    <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                      {{ $t('users.remove') }}
                      <svgicon name="user-croix" width="12" height="12"></svgicon>
                      <transition name="slide-fade">
                        <div class="delete__actions" v-if="showRemoveActions">
                                  <span class="check" @click="removeUser(user.id)">
                                    <svgicon name="check" height="15" width="18"></svgicon>
                                  </span>
                          <span class="check-cross" @click="showRemoveActions = false">
                                    <svgicon name="close" height="13" width="13"></svgicon>
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
import {mapActions, mapGetters} from 'vuex'
import BaseCard from '@/components/base-components/BaseCard'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import {mixin as clickaway} from 'vue-clickaway'

export default {
  mixins: [clickaway],
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
      ]
    }
  },
  methods: {
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers',
      projectInvite: 'project/projectInvite',
      deleteUser: 'project/deleteProjectUser',
      updateProjectUserRole: 'project/updateProjectUserRole'
    }),
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
    async radioSelected (user, right) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId

      await this.updateProjectUserRole({
        cloudId,
        projectId,
        userId: user.id,
        role: right.value
      })
      // Call ajax
    },
    async removeUser (userId) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId

      await this.deleteUser({ cloudId, projectId, userId })

      this.fetchProjectUsers(this.project)
    },
    isAdmin (userRole) {
      if (userRole) {
        if (userRole === 100) {
          return true
        }
      } else {
        if (this.$store.state.project.selectedProject.role === 100) {
          return true
        }
      }

      return false
    },
    openSendInvite () {
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
    async sendInvitation () {
      if (this.mailInvitation && this.rightChoosed.value) {
        const response = await this.projectInvite({
          project: this.project,
          invite: {
            email: this.mailInvitation,
            role: this.rightChoosed.value,
            redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}/project/${this.$route.params.projectId}`
          }
        })

        this.displaySendInvit = false
        console.log(response)
      }
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
  mounted () {
    this.fetchProjectUsers(this.project)
  },
  computed: {
    ...mapGetters({
      getProjectById: 'getProjectById',
      projectUsers: 'project/users'
    }),
    project () {
      return this.getProjectById(this.$route.params.projectId)
    },
    allUsers () {
      return [
        ...this.projectUsers.map(user => ({...user, hasAccepted: true}))
      ]
    },
    filteredUsers () {
      return this.allUsers.filter(
        user => (
          (user.firstname ? user.firstname.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
          (user.lastname ? user.lastname.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
          (user.company ? user.company.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
          (user.job ? user.job.toLowerCase().includes(this.searchFilter.toLowerCase()) : false)
        )
      ).reverse()
    }
  }
}
</script>
