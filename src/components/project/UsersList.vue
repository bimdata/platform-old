<template>
    <base-card :fullscreen-available="false" class="users-list__card">
      <slot slot="header-title" name="header-title">
        {{ $t('users.users') }}
      </slot>
      <template slot="content">
        <div class="users-list">
          <slot name="users-list-header"></slot>
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

export default {
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
    },
    filter: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
      // Call ajax
    },
    removeUser (userId) {
      // Call to remove user
    },
    sendInvitation () {
      // Call to send invitation
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
    searchFilter: {
      get () {
        return this.filter ? this.filter : ''
      }
    },
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
