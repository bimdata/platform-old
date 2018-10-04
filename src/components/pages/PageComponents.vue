<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="components__divider"></div>
                <h1>All components</h1>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Base Treeselect</h3>
                <base-tree-select :initial-parent-node="5" :tree="folderTree"></base-tree-select>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Base Choices list</h3>
                <base-choice-list :options="baseChoiceList.options" @selected-option="baseChoiceList" :value="baseChoiceList.selected" v-model="baseChoiceList.selected"></base-choice-list>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Cards components</h3>
                <base-card></base-card>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Upload component</h3>
                <base-upload-area></base-upload-area>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Map component</h3>
                <base-map :lat="45.7709096"
                          :lng="4.8626887"
                          text="BimData's office">
                </base-map>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Table Spaced</h3>
                <base-table-spaced :values="baseTableSpaced.values"
                                   :fields="baseTableSpaced.fields">
                    <template slot="author" slot-scope="data">
                        {{ data.item.author.firstname + ' ' + data.item.author.lastname }}
                    </template>
                </base-table-spaced>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Base action's button</h3>
                <h5>With icon</h5>
                <base-button-action icon-name="cloud">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Without icon</h5>
                <base-button-action>Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small with icon</h5>
                <base-button-action size="small" icon-name="cloud">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small without icon</h5>
                <base-button-action size="small">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small with right icon</h5>
                <base-button-action size="small" icon-position="right" icon-name="chevron-right">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Full with button with icon</h5>
                <base-button-action size="fullwidth" icon-name="home">Ecrire une note</base-button-action>
            </div>
        </div>
    </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseCard from '@/components/base-components/BaseCard'
import BaseTableSpaced from '@/components/base-components/BaseTableSpaced'
import BaseMap from '@/components/base-components/BaseMap'
import BaseUploadArea from '@/components/base-components/BaseUploadArea'
import BaseTreeSelect from '@/components/base-components/BaseTreeSelect'
export default {
  data () {
    return {
      baseChoiceList: {
        selected: { value: 'AU', text: 'Australia' },
        options: [
          { value: 'AU', text: 'Australia' },
          { value: 'CA', text: 'Canada' },
          { value: 'CN', text: 'China' },
          { value: 'DE', text: 'Germany' },
          { value: 'JP', text: 'Japan' },
          { value: 'MX', text: 'Mexico' },
          { value: 'CH', text: 'Switzerland' },
          { value: 'US', text: 'United States' }
        ]
      },
      baseTableSpaced: {
        fields: [
          {key: 'name', label: 'Nom'},
          {key: 'type', label: 'Type'},
          {key: 'author', label: 'Créateur'},
          {key: 'last_modify', label: 'Modifié le'},
          {key: 'state', label: 'Etat'}
        ],
        values: [
          [
            { name: 'simple wall' },
            'IFC',
            { author: { id: 1, firstname: 'Samy', lastname: 'Bounouar' } },
            'Hier',
            'OK'
          ],
          [
            'simple wall',
            'IFC',
            'Samy Bounouar',
            'Hier',
            'OK'
          ]
        ]
      },
      tree: '{"name":"UNTEC","id":2,"parent_id":null,"created_at":"[native Date Wed Feb 21 2018 18:25:06 GMT+0100 (heure normale d’Europe centrale)]","updated_at":"[native Date Tue Apr 10 2018 15:55:54 GMT+0200 (heure d’été d’Europe centrale)]","children":[{"id":4,"name":"Test dossier","created_at":"2018-02-26T14:34:46Z","updated_at":"2018-02-26T14:34:46Z","children":[],"created_by":null,"type":"Folder","parent_id":2},{"id":5,"name":"Test sous-dossier","created_at":"2018-02-26T14:34:53Z","updated_at":"2018-02-26T14:34:53Z","children":[{"id":10,"name":"Sous dossier","created_at":"2018-03-02T05:51:57Z","updated_at":"2018-03-02T05:51:57Z","children":[],"created_by":null,"type":"Folder","parent_id":5}],"created_by":null,"type":"Folder","parent_id":2},{"id":632,"name":"Cassiopae_Petite_Structure_sDTQSje.ifc","file_name":"Cassiopae_Petite_Structure_sDTQSje.ifc","created_at":"2018-09-21T13:16:48Z","updated_at":"2018-09-21T13:16:48Z","created_by":{"id":134,"email":"samy@bimdata.io","company":"BIMData","firstname":"Gabriel","lastname":"Cambreling","created_at":"2018-04-10T12:26:25Z","updated_at":"2018-08-29T12:30:55Z","last_login":"2018-10-01T13:11:56Z","oidc_sub":"7"},"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/Cassiopae_Petite_Structure_sDTQSje.ifc?temp_url_sig=72c9c9e90281c435620ffdd7444107b60a189274&temp_url_expires=1538558699","size":281823,"parent_id":2,"type":"Ifc","ifcId":379},{"id":37,"name":"AC11 Institute Var 2 IFC SDTalcS","file_name":"AC11-Institute-Var-2-IFC_SDTalcS.ifc","created_at":"2018-03-05T16:57:03Z","updated_at":"2018-09-13T13:09:03Z","created_by":null,"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/AC11-Institute-Var-2-IFC_SDTalcS.ifc?temp_url_sig=6e27ce33b2afe639b4081bb8980c170aa46a0538&temp_url_expires=1538558699","size":3196467,"parent_id":2,"type":"Ifc","ifcId":37},{"id":1,"name":"ABV","file_name":"16-09-08-137-01-abv-cm-apd-eco-maquette-avp-102-20170331-134857.ifc","created_at":"2018-02-21T17:25:56Z","updated_at":"2018-09-13T13:08:54Z","created_by":null,"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/16-09-08-137-01-abv-cm-apd-eco-maquette-avp-102-20170331-134857.ifc?temp_url_sig=0b1b5df20f87d004e17c49f4a5eb35037c0e7043&temp_url_expires=1538558699","size":34218667,"parent_id":2,"type":"Ifc","ifcId":1},{"id":3,"name":"Cassiopae Moyenne Structure","file_name":"Casiope Moyenne Structure.ifc","created_at":"2018-02-22T10:59:15Z","updated_at":"2018-09-13T13:08:54Z","created_by":null,"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/Casiope_Moyenne_Structure.ifc?temp_url_sig=c6d93b2b20757edd3b2a46dfe1148ead17759851&temp_url_expires=1538558699","size":23139700,"parent_id":2,"type":"Ifc","ifcId":3},{"id":5,"name":"Autodesk Conf center IFC4","file_name":"Autodesk_OTC-Conference-Center_IFC4.ifc","created_at":"2018-02-23T12:31:56Z","updated_at":"2018-09-13T13:09:00Z","created_by":null,"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/Autodesk_OTC-Conference-Center_IFC4.ifc?temp_url_sig=38552c365b3ad5121a39821e8d095f92fe652766&temp_url_expires=1538558699","size":71700417,"parent_id":2,"type":"Ifc","ifcId":5},{"id":7,"name":"MAP","file_name":"main-buildings-a17-dp-49-20170119-014534.ifc","created_at":"2018-02-23T15:59:24Z","updated_at":"2018-09-13T13:09:01Z","created_by":null,"file":"https://storage.gra3.cloud.ovh.net/v1/AUTH_b6a1c0b6b7c041d3a71d56f84ce25102/bimdata-staging-dev/cloud_2/project_2/main-buildings-a17-dp-49-20170119-014534.ifc?temp_url_sig=f107e9811b0f5d64de6a20817ffb0d4cc437d13c&temp_url_expires=1538558699","size":29255229,"parent_id":2,"type":"Ifc","ifcId":7}],"created_by":"__vue_devtool_undefined__"}'
    }
  },
  components: {
    BaseChoiceList,
    BaseButtonAction,
    BaseCard,
    BaseTableSpaced,
    BaseMap,
    BaseUploadArea,
    BaseTreeSelect
  },
  methods: {
    BaseChoiceListSelected () {
      console.log(this.baseChoiceList.selected)
    }
  },
  computed: {
    folderTree () {
      let resultTree = []
      resultTree.push(JSON.parse(this.tree))
      return resultTree
    }
  },
  created () {
    let listOfStates = []
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      if (/^oidc\.[a-f0-9]{32}$/.test(localStorage.key(i))) {
        listOfStates.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
    }

    const currentState = listOfStates.reduce(function (oldValue, newValue) {
      let greaterValue = (oldValue.created > newValue.created) ? oldValue : newValue
      return greaterValue
    })
    console.log(currentState)
  }
}
</script>
