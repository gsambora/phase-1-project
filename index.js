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

function addVillager(villager, island=true){
    //Adds villager cards either to current island or search results
    console.log(villager)
    const newVill = document.createElement("div");
    newVill.classList.add("card");
    
    const villName = document.createElement("h2");
    villName.innerHTML = Object.values(villager.name)[0];
    
    const villIcon = document.createElement("img");
    villIcon.src = villager.icon_uri;
    villIcon.alt = "Icon of "+ villName.innerHTML;
    villIcon.classList.add("villager-icon")
    villIcon.hidden = true;

    const villPic = document.createElement("img");
    villPic.src = villager.image_uri;
    villPic.alt = "Picture of "+ villName.innerHTML;
    villPic.classList.add("villager-pic")

    const villSpePers = document.createElement("h4");
    villSpePers.innerHTML = villager.personality + " " + villager.species

    //newVill.id="card-"+villName.innerHTML;

    if(island === true){
        document.querySelector("#current-island").append(newVil);
    } else{
        const villAdd = document.createElement("button");
        villAdd.id = "search_"+villName.innerHTML
        villAdd.innerHTML = "Add to island"
        
        newVill.append(villName, villIcon, villPic, villSpePers, villAdd)

        document.querySelector("#vill-results").append(newVill);
        villBtns(villAdd, newVill, false)
    }

}

function villBtns(button, villElement, island=true, wanted=true){
    button.addEventListener("click", ()=>{
        console.log(villElement)
        if(island === true){
            if(wanted === true){
                console.log("want to remove")
                villElement.querySelector(".villager-pic").hidden = true;
                villElement.querySelector(".villager-icon").hidden = false;
                villElement.querySelector("button").innerHTML = "Nevermind, I want them"
                wanted = false
            } else{
                console.log("want them back")
                villElement.querySelector(".villager-pic").hidden = false;
                villElement.querySelector(".villager-icon").hidden = true;
                villElement.querySelector("button").innerHTML = "Planning to remove"
                wanted = true
            }
            
        } else{
            console.log("adding to island");
            villElement.querySelector("button").innerHTML = "Planning to remove"
            document.querySelector("#current-island").append(villElement);
            island = true

        }
    })
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
    
    //Villager search by name
    const villForm = document.querySelectorAll("form")[1];
    
    villForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        const inputVill = document.querySelector("input#villSearch")
        
        fetch('https://acnhapi.com/v1/villagers')
        .then((response)=>response.json())
        .then((data)=>{
            const allVillagers = Object.values(data);
            let newVillager = Object;

            allVillagers.forEach(function(villager){
                villName = Object.values(villager.name)[0];
                if(villName === inputVill.value){
                    addVillager(villager, false)
                }
            })

        })

        //villForm.reset();
    })


});



