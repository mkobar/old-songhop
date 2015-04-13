angular.module('songhop.services', [])

.factory('User', function ($http, SERVER) {
var o = {
username: false,
session_id: false,
favorites: [ ],
newFavorites: 0
}
// attempt login or signup
o.auth = function(username, signingUp) {
var authRoute;
if (signingUp) {
authRoute = 'signup';
} else {
authRoute = 'login'
}
return $http.post(SERVER.url + '/' + authRoute, {username: username});
}
    
    o.addSongToFavorites = function (song) {
        if (!song) return false;
        
        o.favorites.unshift(song);
        
    }
    
    o.removeSongFromFavorites = function(song, index) {
    // make sure there's a song to add
    if (!song) return false;

    // add to favorites array
    o.favorites.splice(index, 1);
  }
    
    return o;
    
    
})

.factory('Recommendations', function ($http, SERVER){
    
    var o = {
        queue: []
    };
    
    o.getNextSongs = function() {
        return $http ({
            method:'GET',
            url: SERVER.url + '/recommendations'
        })
        .success(function(data) {
            o.queue = o.queue.concat(data);
        });
    }
    
    o.nextSong = function() {
        o.queue.shift();
        
        if (o.queue.length <= 3) {
            o.getNextSongs();
        }
    }
    
    return o;
})
