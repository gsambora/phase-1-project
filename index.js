

function changeSong(name, picture, audio) {
    let player = document.querySelector(".musicPlayer");
    // console.log(player)
    // console.log(player.childNodes)

    player.childNodes[1].innerHTML = "Now Playing: " + name
    player.childNodes[3].src = picture
    player.childNodes[3].alt = "K.K. Slider's "+ name +" Album Cover"
    player.childNodes[5].src = audio
    player.childNodes[5].childNodes[1].href = audio
}


document.addEventListener("DOMContentLoaded", function() {
    //MUSIC PLAYER
    const inputMusic = document.querySelectorAll("form")[0];

    inputMusic.addEventListener("submit", (event)=>{
        event.preventDefault();
        const inputSong = document.querySelector("input#musicRequest");
        let inputSongID = 8;

        fetch('https://acnhapi.com/v1/songs')
        .then((response)=>response.json())
        .then((data)=> {

            const allSongs = Object.values(data)
            let newSong = Object

            allSongs.forEach(function(song){
                const engName = Object.values(song.name)[1];
                if (engName === inputSong.value){
                    //console.log("found match!")
                    newSong = song
                }
            })

            const newName = Object.values(newSong.name)[1];

            changeSong(newName, newSong.image_uri, newSong.music_uri);
        })
    })
    
});



