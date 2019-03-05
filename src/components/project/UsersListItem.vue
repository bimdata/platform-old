<template>
    <div class="users-list__user">
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
          <span class="users-list__user__name">{{ user.firstname }} {{ user.lastname }}</span>
          <span>{{ $t('users.guest') }} - {{ $t('users.without_answer') }}. <a href="">{{ $t('users.resend_invitation') }}</a></span>
        </p>
        <span v-if="user.hasAccepted" v-html="getBadge(user.project_role)"></span>
      </div>
      <div class="users-list__user__actions" v-if="user.hasAccepted && isAdmin()">
        <base-button-option @option-toggled="toggleMenu" class="users-list__user__actions__menu" v-if="displayMenu">
          <ul>
              <li @click.stop.self="toggleRights()" :class="{'actif': displayRights}" class="arrow-left">
                {{ $t('users.modify_rights') }} <svgicon name="user-cadenas" width="12" height="12"></svgicon>

                <div class="new_folder_box" v-if="displayRights">
                  <base-input-radio
                    v-for="(right, indexRight) in rights"
                    :key="indexRight"
                    :id="user.id"
                    :option="right"
                    name="rights"
                    @input="radioSelected(user, right)"
                    :selected="user.project_role"
                  ></base-input-radio>
                </div>
            </li>
            <li @click.stop.self="showRemoveActions = true" class="users-list__user__actions">
                {{ $t('users.remove') }} <svgicon name="user-croix" width="12" height="12"></svgicon>
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
import { mapActions } from 'vuex'
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
      displayRights: false,
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
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    displayMenu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers',
      deleteUser: 'project/deleteProjectUser',
      updateProjectUserRole: 'project/updateProjectUserRole'
    }),
    async radioSelected (user, right) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId
      console.log({
        cloudId,
        projectId,
        userId: user.id,
        role: right.value
      })
      await this.updateProjectUserRole({
        cloudId,
        projectId,
        userId: user.id,
        role: right.value
      })
    },
    toggleRights () {
      this.displayRights = !this.displayRights
      this.showRemoveActions = false
    },
    async removeUser (userId) {
      const cloudId = this.$route.params.cloudId
      const projectId = this.$route.params.projectId

      await this.deleteUser({ cloudId, projectId, userId })
      this.fetchProjectUsers(this.project)
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
        this.displayRights = false
      }
    },
    getBadge (role) {
      let roleText = _.find(this.rights, function (r) {
        return r.value === role
      }).text
      if (role === 100) {
        return '<span class="badge badge-primary">' + roleText + '</span>'
      } else if (role === 50) {
        return '<span class="badge badge-success">' + roleText + '</span>'
      } else {
        return '<span class="badge badge-secondary text-white">' + roleText + '</span>'
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
    }
  }
}
</script>