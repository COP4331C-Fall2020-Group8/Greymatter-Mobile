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
          console.log(error);
          var errorCode = JSON.stringify(error.response.status);
          if (errorCode == "401")
          {
            alert("Invalid Username or Password");
          }
          if (errorCode == "402")
          {
            alert("Please Verify Your Email");
          }
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
      console.log("Set has been added:\n" + JSON.stringify(setObj));
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error adding set:\n" + JSON.stringify(setObj));
    });
  });
}

export function addCard({commit, state}, {cardObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'addCard', {
      user_id: cardObj.user_id,
      set_id: cardObj.set_id,
      card: {
        front: cardObj.front,
        back: cardObj.back
      }
    })
    .then(function(response) {
      console.log("Card has been added:\n" + JSON.stringify(cardObj));
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error adding card:\n" + JSON.stringify(cardObj));
    });
  });
}

export function editSet({commit, state}, {setObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'updateSet', {
      id: setObj.id,
      name: setObj.name,
      category: setObj.category
    })
    .then(function(response) {
      console.log("Set has been updated.");
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error updating the set.");
    });
  });
}

export function editCard({commit, state}, {cardObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'updateCard', {
      id: cardObj.id,
      front: cardObj.front,
      back: cardObj.back
    })
    .then(function(response) {
      console.log("Card has been updated.");
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error updating the card.");
    });
  });
}

export function forgotPassword({commit, state}, {userObj, navigate}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + "forgotPassword", {
      id: userObj.id
    })
    .then(function(response) {
      console.log("Password reset link sent to user " + userObj.id);
      alert("A password reset link has been sent to the e-mail registered to this account.");
      navigate("Home");
      resolve();
    })
    .catch(function(error) {
      console.error(error);
      var errorCode = JSON.stringify(error.response.status);
      if (errorCode = "401") {
        console.error("User " + userObj.id + " not found.");
        alert("No user exists with username: " + userObj.id);
      }
    }); 
  });
}

export function remove({commit, state}, {deleteObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'remove' + deleteObj.deleteType, {
      id: deleteObj.id
    })
    .then(function(response) {
      console.log(deleteObj.deleteType + " has been removed.");
      resolve();
    })
    .catch(function(error) {
      console.error("There was an error removing " + deleteObj.deleteType + ".");
    });
  });
}

export function searchCards({commit, state}, {queryObj}) {
  return new Promise((resolve, reject) => {
    axios.post(dbUrl + 'searchCard', {
      set_id: queryObj.set_id,
      search: queryObj.searchStr
    })
    .then(function(response) {
      AsyncStorage.setItem("cardSearch", JSON.stringify(response.data.results));
      resolve();
    })
    .catch(function(error) {
      console.error(error);
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
      console.log("Found sets:");
      console.log(response.data.results);
      AsyncStorage.setItem("setSearch", JSON.stringify(response.data.results));
      resolve();
    })
    .catch(function(error) {
      console.error(error);
    });
  });
}