import { fetchPosts } from './fetch';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

// ensure data for rendering given list type
/*export function FETCH_LIST_DATA ({ commit, dispatch }, { type }) {
  commit('FETCHING_LISTS');
  return fetchPosts(type)
    .then(posts => {
      return commit('SET_POSTS', { posts })
    });
}*/

var dbUrl = 'https://grey-matter-backend.herokuapp.com/api/';

export function login ({ commit, state}, {userObj, navigate}) {

  commit('LOGGING_IN', true);
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'login', {
            id: userObj.id,
            password: userObj.password
        })
        .then(function (response) {
          console.log(response);
          var welcomeMsg = JSON.stringify(response.data.message);
          if (welcomeMsg != null) {
            alert(welcomeMsg);
            setTimeout(() => {
                commit('LOGIN_SUCCESFULL', {userObj})
                AsyncStorage.setItem('id', userObj.id)
                navigate('ViewSets');
                resolve();
              }, 1000)
          }
        })
        .catch(function (error) {
          console.log("Invalid Username or Password");
          reject(error);
      });
  })
}

export function SET_USER({commit, state}, {userObj}) {
  return commit('LOGIN_SUCCESFULL', {userObj})
}

export function logout ({ commit, state}, callback) {
  return new Promise((resolve, reject) => {
      AsyncStorage.removeItem('id').then(() => {
        callback();
        resolve();
      })
  })
}

export function addSet({commit, state}, {setObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'addSet', {
      user_id: setObj.user_id,
      name: setObj.setName,
      category: setObj.setCategory
    })
    .then(function(response) {
      alert("Set has been added.");
      console.log("Set has been added:\n" + setObj);
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error adding set:\n" + setObj);
      reject(error);
    });
  });
}

export function remove({commit, state}, {deleteObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'remove' + deleteObj.deleteType, {
      id: deleteObj.id
    })
    .then(function(response) {
      alert(deleteObj.deleteType + " has been removed.");
      console.log(deleteObj.deleteType + " has been removed.");
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error removing " + deleteObj.deleteType + ".");
      reject(error);
    });
  });
}

export function searchSets({commit, state}, {queryObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'searchSet', {
      user_id: queryObj.user_id,
      search: queryObj.searchStr
    })
    .then(function(response) {
      AsyncStorage.setItem("setSearch", JSON.stringify(response.data.results));
      resolve();
    })
    .catch(function(error) {
      console.error(error);
      reject(error);
    });
  });
}