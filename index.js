

function changeSong(name, picture, audio) {
    //Updates "Now Playing:" title, album cover, and audio player
    let player = document.querySelector(".musicPlayer");

    //Title
    player.childNodes[1].innerHTML = "Now Playing: " + name
    //Album cover
    player.childNodes[3].src = picture
    player.childNodes[3].alt = "K.K. Slider's "+ name +" Album Cover"
    //Audio player
    player.childNodes[5].src = audio
    player.childNodes[5].childNodes[1].href = audio
}


document.addEventListener("DOMContentLoaded", function() {
    //MUSIC PLAYER
    const inputMusic = document.querySelectorAll("form")[0];

    inputMusic.addEventListener("submit", (event)=>{
        event.preventDefault();
        const inputSong = document.querySelector("input#musicRequest");

        fetch('https://acnhapi.com/v1/songs')
        .then((response)=>response.json())
        .then((data)=> {
            //Make collection of all data songs into an array
            const allSongs = Object.values(data)
            let newSong = Object

            //Iterate through every song and compare input with US English song name
            allSongs.forEach(function(song){
                const engName = Object.values(song.name)[1];
                if (engName === inputSong.value){
                    //console.log("found match!")
                    newSong = song;
                }
            })

            //Implement changes with changeSong function
            const newName = Object.values(newSong.name)[1];
            changeSong(newName, newSong.image_uri, newSong.music_uri);

            //Reset form 
            inputMusic.reset();
        })
    })
    
});



