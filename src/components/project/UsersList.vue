<template>
    <base-card :fullscreen-available="false" class="users-list__card">
      <slot slot="header-title" name="header-title">
        {{ $t('users.users') }}
      </slot>
      <template slot="content">
        <div class="users-list">
          <transition name="slide-bottom-fade">
            <div class="users-list__response-resend" v-if="hasResendResponse">
              Invitation sent to {{ resendEmail }}
              <span class="users-list__response-resend__close" @click="hasResendResponse = false">
                <svgicon name="close" height="18" width="18"></svgicon>
              </span>
            </div>
          </transition>
          <transition name="slide-bottom-fade">
            <div class="users-list__response-resend users-list__response-resend--error" v-if="hasResendResponseError">
              Too much invitation sent to {{ resendEmail }}
              <span class="users-list__response-resend__close" @click="hasResendResponseError = false">
                <svgicon name="close" height="18" width="18"></svgicon>
              </span>
            </div>
          </transition>
          <slot name="users-list-header"></slot>
          <div class="users-list__body">
            <ul class="users-list__users">
              <users-list-item
                v-for="(user, index) in filteredUsers"
                :key="`user-${index}`"
                :user="user"
                :displayMenu="displayMenu"
                :role="user.role"
                @on-remove-user="removeUser"
                @on-update-user="updateUser"
                @on-remove-user-pending="removeUserPending"
                @email-resend="displayResponse"
                :class="{'open-top': index > 5}"></users-list-item>
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
import UsersListItem from '@/components/project/UsersListItem'

export default {
  components: {
    BaseCard,
    BaseButtonOption,
    BaseValidDelete,
    UsersListItem
  },
  data () {
    return {
      hasResendResponse: false,
      hasResendResponseError: false,
      resendEmail: '',
      nbResend: 0
    }
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
    },
    filter: {
      type: String,
      default: ''
    }
  },
  methods: {
    removeUser (userId) {
      this.$emit('on-remove-user', userId)
    },
    removeUserPending (invitationId) {
      this.$emit('on-remove-user-pending', invitationId)
    },
    updateUser (user, right) {
      this.$emit('on-update-user', user, right)
    },
    displayResponse (email, nbResend) {
      this.nbResend = nbResend
      this.resendEmail = email
      if (nbResend < 3) {
        this.hasResendResponse = true
      } else {
        this.hasResendResponseError = true
      }
      setTimeout(() => {
        // Hide OK message after 3 sec
        this.hasResendResponse = false
        this.hasResendResponseError = false
      }, 3000)
    }
  },
  computed: {
    searchFilter: {
      get () {
        return this.filter ? this.filter : ''
      }
    },
    filteredUsers () {
      return this.users.filter(user => {
        return (user.firstname ? user.firstname.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
        (user.lastname ? user.lastname.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
        (user.company ? user.company.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
        (user.job ? user.job.toLowerCase().includes(this.searchFilter.toLowerCase()) : false) ||
        (user.email ? user.email.toLowerCase().includes(this.searchFilter.toLowerCase()) : false)
      })
    }
  }
}
</script>
