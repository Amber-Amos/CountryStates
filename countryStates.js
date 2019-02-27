function SortByName(x, y) {
  if (x.name > y.name) {
    return 1
  } else if (x.name < y.name) {
    return -1
  }
  return 0
}

function getCountries() {
  return fetch('https://xc-ajax-demo.herokuapp.com/api/countries/')
    .then(response => {
      return response.json()
    })
    .then(response => {
      response.sort(SortByName)
      populateCountryDropDown(response)
    })
}

function populateCountryDropDown(jsonObject) {
  var popCountry = document.getElementById('countryDrop')
  for (let i = 0; i < jsonObject.length; i++) {
    var option = document.createElement('option')
    option.value = jsonObject[i].code
    option.text = jsonObject[i].name
    popCountry.options.add(option)
  }
}

function getStates() {
  document.getElementById('stateDrop').options.length = 0
  var selected = document.getElementById('countryDrop').value
  if (selected != 'empty') {
    return fetch(
      'https://xc-ajax-demo.herokuapp.com/api/countries/' +
      selected +
      '/states/'
    )
      .then(response => {
        return response.json()
      })
      .then(response => {
        response.sort(SortByName)
        populateStateDropDown(response)
      })
  } else {
    document.getElementById('stateDrop').options.length = 0
  }
}

function populateStateDropDown(jsonObject) {
  var popState = document.getElementById('stateDrop')
  for (let i = 0; i < jsonObject.length; i++) {
    var option = document.createElement('option')
    option.value = jsonObject[i].code
    option.text = jsonObject[i].name
    popState.options.add(option)
  }
}
