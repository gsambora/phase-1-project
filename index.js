document.addEventListener('DOMContentLoaded', init);

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

const init = () => {

    //MUSIC PLAYER
    const inputMusic = document.querySelectorAll("form")[0];

    inputMusic.addEventListener("submit", (event)=>{
        event.preventDefault();
        console.log("song submitted")
        const inputSong = document.querySelector("input#musicRequest");
        let inputSongID = 8;

        fetch('https://acnhapi.com/v1/songs')
        .then((response)=>response.json())
        .then((data)=> {
            //console.log(data)
            //console.log(Object.values(data))
            for (const song in Object.values(data)) {
                const engName = Object.values(Object.values(data)[song].name)[1];
                //console.log(engName, inputSong.value)
                if (engName === inputSong.value){
                    //console.log("found match!")
                    inputSongID = song
                }
            }
            const newName = Object.values(Object.values(data)[inputSongID].name)[1];
            const newPic = Object.values(data)[inputSongID].image_uri;
            const newAudio = Object.values(data)[inputSongID].music_uri;

            changeSong(newName, newPic, newAudio);
        })
    })
    
};



