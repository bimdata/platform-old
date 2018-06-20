var request = require('axios')

request.post('https://poeditor.com/api/webhooks/github?api_token=a5ed27af85ac2fce00751a6f5b9fb430&id_project=190343&language=en&operation=export_terms_and_translations').then(response => {
    if (response.status === 200) {
      console.log('Translations exported successfully')
    }
}, err => {
  console.log(err)
});