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

export function login ({ commit, state}, {userObj, navigate}) {

  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    axios.post('https://grey-matter-backend.herokuapp.com/api/login', {
            id: userObj.id,
            password: userObj.password
        })
        .then(function (response) {
          console.log(response);
          var welcomeMsg = JSON.stringify(response.data.message);
          if (welcomeMsg != null) {
            setTimeout(() => {
                commit('LOGIN_SUCCESFULL', {userObj})
                AsyncStorage.setItem('id', userObj.id)
                navigate('Dashboard');
                resolve();
              }, 1000)
          }
        })
        .catch(function (error) {
          console.log("Invalid Username or Passworder");
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