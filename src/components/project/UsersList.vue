<template>
    <base-card :fullscreen-available="true" class="users-list__card">
      <template slot="header-title">
          {{ $t('users.users') }}
      </template>
      <template slot="content">
          <div class="users-list">
            <div class="users-list__header">
              <div class="users-list__header__left-container">
                <svgicon name="menu" width="18" height="12"></svgicon>
              </div>
              <div class="users-list__header__right-container">
                <svgicon name="account-plus"></svgicon>
                <svgicon name="magnify" height="14" width="14"></svgicon>
                <svgicon name="filter-variant" width="18" height="12"></svgicon>
              </div>
            </div>
            <div class="users-list__body">
                <ul class="users-list__users">
                  <li v-for="(user, index) in users" :key="index" class="users-list__user">
                    <div class="users-list__user__picture">

                    </div>
                    <div class="users-list__user__datas">
                      {{ user.name }}
                      {{ user.job }}
                      {{ user.enterprise }}
                      <span class="badge badge-primary" v-if="user.isAdmin">{{ $t('users.administrator') }}</span>
                    </div>
                    <div class="users-list__user__actions">

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

export default {
  components: {
    BaseCard
  },
  data () {
    return {
      users: [
        {
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: true,
          isAdmin: true
        },
        {
          name: 'Lorem ipsum',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: false,
          isAdmin: false
        },
        {
          name: 'Gabriel Cambreling',
          job: 'Architecte',
          enterprise: 'Cabinet Marsouin',
          photo: '',
          hasAccepted: true,
          isAdmin: false
        }
      ]
    }
  }
}
</script>
