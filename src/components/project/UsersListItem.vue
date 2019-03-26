<template>
    <div class="users-list__user" :class="{'role-changed': roleChanged}">
      <div class="users-list__user__picture">
        <template v-if="user.hasAccepted">
          <img :src="user.photo" alt="" class="img-fluid circle" v-if="user.photo">
          <span class="user-menu__pic" v-else>{{ `${user.firstname} ${user.lastname}` | initialsFormat }}</span>
          <!--<span class="users-list__user__status users-list__user__status--inline" v-if="user.online"></span>
          <span class="users-list__user__status users-list__user__status--outline" v-else></span>-->
        </template>
        <template v-else>
            <svgicon name="user-invit-pending" height="40" width="40"></svgicon>
        </template>
      </div>
      <div class="users-list__user__datas">
        <p v-if="user.hasAccepted">
          <span class="users-list__user__name">{{ user.firstname }} {{ user.lastname }}</span>
          <span>{{ user.job }}</span>
          <span>{{ user.company }}</span>
        </p>
        <p v-else>
          <span class="users-list__user__name">{{ user.email }}</span>
          <span>
            <span v-html="getRoleText(user.role)"></span> - {{ $t('users.without_answer') }}. <a href="" @click.prevent.stop="resendInvitation(user.email, user.role)">{{ $t('users.resend_invitation') }}</a>
          </span>
        </p>
        <span v-if="user.hasAccepted" v-html="getBadge(user.role)"></span>
      </div>
      <div class="users-list__user__actions" v-if="user.hasAccepted && isAdmin()">
        <base-button-option ref="menu" @option-toggled="toggleMenu" class="users-list__user__actions__menu" v-if="displayMenu">
          <ul>
              <li @click.stop.self="toggleRights()" :class="{'actif': displayRights}" class="arrow-left">
                {{ $t('users.modify_rights') }} <svgicon name="user-lock" width="12" height="12"></svgicon>

                <div class="new_folder_box" v-if="displayRights">
                  <base-input-radio
                    v-for="(right, indexRight) in rights"
                    :key="indexRight"
                    :id="user.id"
                    :option="right"
                    name="rights"
                    @input="radioSelected(right)"
                    :selected="role"
                  ></base-input-radio>
                  <transition name="slide-fade">
                    <base-valid-delete v-if="showRemoveRightsActions" @on-valid-action="changeUserRights" @on-cancel-action="showRemoveRightsActions = false"></base-valid-delete>
                  </transition>
                </div>
            </li>
            <li @click.stop.self="showRemoveActions = true" class="users-list__user__actions">
                {{ $t('users.remove') }} <svgicon name="user-cross" width="12" height="12"></svgicon>
                <transition name="slide-fade">
                  <base-valid-delete v-if="showRemoveActions" @on-valid-action="removeUser(user.id)" @on-cancel-action="showRemoveActions = false"></base-valid-delete>
                </transition>
              </li>
          </ul>
        </base-button-option>
        <template v-else>
          <svgicon name="delete" height="15" width="18" @click="showRemoveActions = true"></svgicon>
          <transition name="slide-fade">
            <base-valid-delete v-if="showRemoveActions" @on-valid-action="removeUser(user.id)" @on-cancel-action="showRemoveActions = false"></base-valid-delete>
          </transition>
        </template>
      </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import { mixin as clickaway } from 'vue-clickaway'
import _ from 'lodash'

export default {
  mixins: [ clickaway ],
  components: {
    BaseButtonOption,
    BaseValidDelete,
    BaseInputRadio
  },
  data () {
    return {
      showRemoveActions: false,
      showRemoveRightsActions: false,
      displayRights: false,
      selectedRight: undefined,
      roleChanged: false,
      rights: [
        {
          text: this.$t('users.administrator'),
          value: 100
        },
        {
          text: this.$t('users.user'),
          value: 50
        },
        {
          text: this.$t('users.guest'),
          value: 25
        }
      ]
    }
  },
  watch: {
    role () {
      this.roleChanged = true
      setTimeout(() => {
        this.roleChanged = false
      }, 500)
    }
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    },
    displayMenu: {
      type: Boolean,
      default: true
    },
    role: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      getProjectById: 'getProjectById'
    }),
    project () {
      return this.getProjectById(this.$route.params.projectId)
    }
  },
  methods: {
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers',
      deleteProjectUser: 'project/deleteProjectUser',
      projectInvite: 'project/projectInvite',
      updateProjectUserRole: 'project/updateProjectUserRole',
      deleteCloudUser: 'deleteCloudUser',
      updateCloudUser: 'updateCloudUser'
    }),
    async radioSelected (right) {
      this.showRemoveRightsActions = true
      this.selectedRight = right
    },
    changeUserRights () {
      this.$emit('on-update-user', this.user, this.selectedRight)
      this.$refs.menu.displayMenu = false
      this.toggleMenu(false)
    },
    toggleRights () {
      this.displayRights = !this.displayRights
      this.showRemoveActions = false
    },
    async removeUser (userId) {
      this.$emit('on-remove-user', userId)
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
        this.showRemoveRightsActions = false
        this.displayRights = false
      }
    },
    getRoleText (value) {
      if (value) {
        return _.find(this.rights, function (r) {
          return r.value === value
        }).text || ''
      }
    },
    getBadge (value) {
      let roleText = this.getRoleText(value)
      if (value) {
        if (value === 100) {
          return '<span class="badge badge-primary">' + roleText + '</span>'
        } else if (value === 50) {
          return '<span class="badge badge-success">' + roleText + '</span>'
        } else {
          return '<span class="badge badge-secondary text-white">' + roleText + '</span>'
        }
      }
    },
    isAdmin () {
      if (this.$store.state.project.selectedProject !== null) {
        if (this.$store.state.project.selectedProject.role === 100) {
          return true
        }
      } else {
        if (this.$store.state.currentCloud.role === 100) {
          return true
        }
      }

      return false
    },
    async resendInvitation (email, role) {
      await this.projectInvite({
        project: this.project,
        invite: {
          email: email,
          role: role,
          redirect_uri: `${process.env.BD_APP_URL}/cloud/${this.$route.params.cloudId}/project/${this.$route.params.projectId}`
        }
      })
    }
  }
}
</script>
