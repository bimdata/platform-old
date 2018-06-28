<template>
    <div class="user-menu">
        <b-dropdown id="user-menu__ddown" size="lg" :text="getCurrentUserFirstname + ' ' + getCurrentUserLastname" class="m-2">
            <b-dropdown-item-button @click="logout">{{ $t('dashboard.logout') }}</b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions('user', [
      'fetchUserData'
    ]
    ),
    ...mapActions('authentication', [
      'logoutUser'
    ]),
    logout () {
      this.logoutUser()
    }
  },
  computed: {
    ...mapGetters('user', [
      'getCurrentUserFirstname',
      'getCurrentUserLastname',
      'getCurrentUserId'
    ])
  },
  created () {
    this.fetchUserData()
  }
}
</script>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';
    @import '@styles/_mixins.scss';

    .user-menu {
        flex: 2 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .dropdown-menu {
            width: 200px;
            border: none;
            background-color: white;
            @include bm-box-shadow;
        }

        button {
            outline: none;
            box-shadow: none;
            &:hover {
                cursor: pointer
            }
        }
    }

    #user-menu__ddown__BV_toggle_ {
        background-color: white;
        color: $primary;
        border: none;
        width: 200px;
        &:after {
            margin-left: 1.1em;
        }

        .dropdown-item {
            background-color: white;
            outline: none;
        }
    }
</style>
