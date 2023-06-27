//Search status 0 = name, 1 = personality, 2 = species
let searchStatus = 0;

//Main function is called after DOM content is loaded
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
                    console.log("found match!")
                    newSong = song;

                    //Implement changes with changeSong function
                    const newName = Object.values(newSong.name)[1];
                    changeSong(newName, newSong.image_uri, newSong.music_uri);
                }
            })

            //Reset form 
            inputMusic.reset();
        })
    })

    //MAKE VILLAGER SEARCH OPTION BUTTONS
    //Name
    const searchName = document.createElement("button")
    searchName.innerHTML = "Name"
    searchName.style = "grid-column: 1"
    searchName.classList.add("search-btn")
    searchName.id = "search-0";

    //Personality
    const searchPers = document.createElement("button")
    searchPers.innerHTML = "Personality"
    searchPers.style = "grid-column: 2"
    searchPers.classList.add("button")
    searchPers.id = "search-1";

    //Species
    const searchSpec = document.createElement("button")
    searchSpec.innerHTML = "Species"
    searchSpec.style = "grid-column: 3"
    searchSpec.classList.add("button")
    searchSpec.id = "search-2";

    //Create element listeners
    srBtns([searchName, searchPers, searchSpec])

    //Add to DOM
    document.querySelector("#search-by").append(searchName, searchPers, searchSpec)


    //VILLAGER SEARCH
    const villForm = document.querySelectorAll("form")[1];
    
    villForm.addEventListener("submit", (event)=>{
        event.preventDefault();

        //Reset results
        document.querySelector("#vill-results").innerHTML = '';
        const inputVill = document.querySelector("input#villSearch")

        fetch('https://acnhapi.com/v1/villagers')
        .then((response)=>response.json())
        .then((data)=>{
            //Convert collection of all villagers to an array
            const allVillagers = Object.values(data);
            
            //Iterate through array to find the villager that matches input
            //If there is a match, call addVillager function
            allVillagers.forEach(function(villager){
                //search by name
                if(searchStatus === 0){
                    villName = Object.values(villager.name)[0];
                    if(villName === inputVill.value){
                        
                        addVillager(villager)
                    }}
                //search by personality
                if(searchStatus === 1){
                    if(villager.personality === inputVill.value){
                        addVillager(villager)
                    }}
                //search by species
                else{
                    if(villager.species === inputVill.value){
                        addVillager(villager)
                    }}
            })

            //Reset form
            villForm.reset();
        })
    })
});

//HELPER FUNCTIONS

//Updates "Now Playing:" title, album cover, and audio player
function changeSong(name, picture, audio) {
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

//Adds villager cards to search results
function addVillager(villager){   
    console.log(villager)
    const newVill = document.createElement("div");
    newVill.classList.add("card");
    
    //Name
    const villName = document.createElement("h2");
    villName.innerHTML = Object.values(villager.name)[0];

    //Icon - shows when user wants to remove villager from island
    const villIcon = document.createElement("img");
    villIcon.src = villager.icon_uri;
    villIcon.alt = "Icon of "+ villName.innerHTML;
    villIcon.classList.add("villager-icon")
    villIcon.hidden = true;

    //Picture - shows when villager is wanted/first created
    const villPic = document.createElement("img");
    villPic.src = villager.image_uri;
    villPic.alt = "Picture of "+ villName.innerHTML;
    villPic.classList.add("villager-pic")

    //Species and personality
    const villSpePers = document.createElement("h4");
    villSpePers.innerHTML = villager.personality + " " + villager.species
    
    //Button to add villager to island
    const villAdd = document.createElement("button");
    villAdd.id = "search_"+villName.innerHTML
    villAdd.innerHTML = "Add to island"
    villAdd.classList.add("button")

    //Add to DOM
    newVill.append(villName, villIcon, villPic, villSpePers, villAdd)
    document.querySelector("#vill-results").append(newVill);

    //Add event listeners to buttons
    villBtns(villAdd, newVill, false)
}

//Handles all villager button events
function villBtns(button, villElement, island=true, wanted=true){
    //Variable island is true when the villager is in user's island. 
    //      It is false when the villager is in the search results.
    //Variable wanted is true when the villager is in the search results or when it is first added to the island.
    //      It is false when the user clicks planning to remove, so they do not want the villager.
    button.addEventListener("click", ()=>{
        if(island === true){
            //Villager is in the user's island
            if(wanted === true){
                //Villager was wanted, but we are changing to unwanted status (showing icon)
                villElement.querySelector(".villager-pic").hidden = true;
                villElement.querySelector(".villager-icon").hidden = false;
                villElement.querySelector("button").innerHTML = "Nevermind, I want them"
                wanted = false

                //Create button to remove completely
                delBtn = document.createElement("button")
                delBtn.classList.add("del-btn")
                delBtn.innerHTML = "They moved out!"
                villElement.append(delBtn)
                
                //Remove button will fully remove from island
                delBtn.addEventListener("click", ()=>{
                    villElement.remove();
                })

            } else{
                //Villager was unwanted, but we are changing to wanted status (showing portrait)
                villElement.querySelector(".villager-pic").hidden = false;
                villElement.querySelector(".villager-icon").hidden = true;
                villElement.querySelector("button").innerHTML = "Planning to remove"
                villElement.querySelector(".del-btn").remove();
                wanted = true
            }
            
        } else{
            //Villager is in the search results
            //Clicking will move villager to the user's island with wanted status
            villElement.querySelector("button").innerHTML = "Planning to remove"
            document.querySelector("#current-island").append(villElement);
            console.log(villElement.childNodes[0])
            villElement.childNodes[0].innerHTML = villElement.childNodes[0].innerHTML + " 🏝️"
            island = true
        }
    })
}

//Handle search mode button events
function srBtns(allButtons){
    allButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            //Make button that is currently green a regular button
            const currentBtn = document.querySelector("#search-"+searchStatus);
            currentBtn.classList.remove("search-btn")
            currentBtn.classList.add("button")

            //Make clicked button green
            button.classList.remove("button")
            button.classList.add("search-btn")

            const form = document.querySelector("#villSearch")

            //Change form placeholder to match clicked button
            //Change search status: 0 = name, 1 = personality, 2 = species
            if(button.id === "search-0"){
                form.placeholder = "Enter villager name"
                searchStatus = 0;
            } if(button.id === "search-1"){
                form.placeholder = "Enter personality type"
                searchStatus = 1;
            } if (button.id === "search-2"){
                form.placeholder = "Enter animal species"
                searchStatus = 2;
            }
        })
    })
}


