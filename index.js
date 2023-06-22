const init = () => {
    const inputMusic = document.querySelectorAll("form")[0];

    inputMusic.addEventListener("submit", (event)=>{
        event.preventDefault();
        //console.log("song submitted")
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

function changeSong(name, picture, audio) {
    console.log(name, picture, audio)
    let player = document.getElementsByClassName("musicPlayer");
    player.remove();
    // player.innerHTML = "";
    // document.getElementsByClassName("musicPlayer").innerHTML = `
    //     <div>
    //         <h3>Now Playing: ${name}</h3>
    //         <img src = "${picture}" alt = "K.K. Slider's ${name} Album Cover">
    //         <audio 
    //             controls
    //             loop="true"
    //             src="${audio}">
    //             <a href="${audio}">Download audio</a>
    //         </audio>
    //     </div>

    // `

}

document.addEventListener('DOMContentLoaded', init);