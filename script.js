"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const getInputSearch = document.getElementById("searchInput");
  const getButtonHandler = document.getElementById("searchButton");
  const getLanguageList = document.getElementById("laguages-list");

  const renderRepositories = (data) => {
    getLanguageList.innerHTML = "";
    let savedLanguages = {};
    data.forEach((item) => {
      if (item?.language) {
        if (item.language in savedLanguages) {
          savedLanguages[item.language] += 1;
        } else {
          savedLanguages[item.language] = 1;
        }
      }

    });

    const objToArrConverted = Object.entries(savedLanguages);
    objToArrConverted.forEach((language) => {
      getLanguageList.innerHTML += `
          <li class="language-item">
            <span>${language[0]}: </span>
            <span>${language[1]} </span>
          </li>
      `;
    });
  }

  const searchLanguagesHandler = (e, initialValue) => {
    const inputValue = getInputSearch.value || initialValue;
    if (initialValue) {
      getInputSearch.value = initialValue;
    }
    fetch(`https://api.github.com/users/${inputValue}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        renderRepositories(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  getButtonHandler.addEventListener("click", searchLanguagesHandler);

  searchLanguagesHandler(null, 'awslabs');

});
