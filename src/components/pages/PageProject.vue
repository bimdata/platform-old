<template>
  <div class="page-project">
    <div class="toolbar-page row">
      <div class="col-12 d-flex align-items-center">
        <choice-list-cloud
          class="top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud"></choice-list-cloud>
        <choice-list-project
          @selected-project-loaded="loadedProject = true"
          @selected-project-loading="loadedProject = false"
          class="top-toolbar__choice-list-items top-toolbar__choice-list-items--project"
        ></choice-list-project>
        <button-upload-new-file
          class="top-toolbar__button-new-file ml-auto"
          :class="{'active': displayUpload}"
          @click="displayUpload = !displayUpload"
        ></button-upload-new-file>
      </div>
      <div class="col-12 upload-area-container">
        <upload-ifc @upload-complete="closeUploadIfc" v-show="displayUpload"></upload-ifc>
      </div>
    </div>

    <template v-if="loadedProject && loadedDMS">
      <div class="row justify-content-between">
        <div class="content-project">
          <card-project-content></card-project-content>
        </div>
        <div class="user-project">
          <users-list :users="allUsers" :filter="searchFilter">
            <template slot="users-list-header">
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
            </template>
          </users-list>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table-ifc></table-ifc>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <base-card :fullscreen-available="false" class="ged-card">
            <template slot="header-title">Project's documents</template>
            <template slot="content">
              <dms></dms>
            </template>
          </base-card>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="loader loader-layout">
        <p class="loader-layout__text">Loading</p>
        <div class="lds-dual-ring"></div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ChoiceListProject from '@/components/project/ChoiceListProject'
import ChoiceListCloud from '@/components/project/ChoiceListCloud'
import ButtonUploadNewFile from '@/components/project/ButtonUploadNewFile'
import CardProjectContent from '@/components/project/CardProjectContent'
import BaseCard from '@/components/base-components/BaseCard'
import TableIfc from '@/components/project/TableIfc'
import UsersList from '@/components/project/UsersList'
import UploadIfc from '@/components/project/UploadIfc'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'
import DMS from '@/components/project/DMS'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  components: {
    UploadIfc,
    ChoiceListCloud,
    ChoiceListProject,
    ButtonUploadNewFile,
    CardProjectContent,
    TableIfc,
    BaseCard,
    UsersList,
    BaseInputRadio,
    'dms': DMS
  },
  data () {
    return {
      rightChoosed: {
        value: null,
        text: 'Droits'
      },
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
      ],
      searchFilter: '',
      loadedProject: false,
      loadedDMS: false,
      displayUpload: false,
      displaySendInvit: false,
      displaySearchUser: false,
      displayRightsInvitation: false,
      clicked: false,
      mailInvitation: '',
      guests: [
        {
          id: 7,
          firstname: 'Sarah',
          lastname: 'Croche',
          project_role: 50,
          hasAccepted: false
        },
        {
          id: 8,
          firstname: 'Sarah',
          lastname: 'Pelle',
          project_role: 100,
          hasAccepted: false
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      fetchProjectUsers: 'project/fetchProjectUsers'
    }),
    sendInvitation () {
      // Call to send invitation
    },
    closeUploadIfc () {
      this.displayUpload = false
    },
    away () {
      this.displayRightsInvitation = false
    },
    setCurrentCloud () {
      const cloud = this.getCloudById(this.$route.params.cloudId)
      this.$store.commit('SET_CURRENT_CLOUD', cloud)
    },
    setProject () {
      const project = this.$store.getters.getProjectById(this.$route.params.projectId)
      this.$store.dispatch('project/init')
      this.loadedProject = false
      this.$store.commit('project/SET_PROJECT', project)
      this.$store.dispatch('project/getTree', project)
        .then(tree => {
          this.loadedDMS = true
        })
      this.$store.dispatch('project/fetchProjectIfc', project).then(() => {
        this.loadedProject = true
      })
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
  created () {
    this.setCurrentCloud()
    this.setProject()
  },
  computed: {
    ...mapGetters({
      getCloudById: 'getCloudById',
      getProjectById: 'getProjectById',
      projectUsers: 'project/users'
    }),
    project () {
      return this.getProjectById(this.$route.params.projectId)
    },
    users () {
      return [
        ...this.projectUsers.map(user => ({...user, hasAccepted: true}))
      ]
    },
    allUsers () {
      return this.users.concat(this.guests).reverse()
    }
  }
}
</script>
