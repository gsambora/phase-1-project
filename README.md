# ACNH Island Planner

## Usage

If you play Animal Crossing: New Horizons, you can easily choose which villagers you would like on your island with this app. You can search for villagers by name, personality type, or species and add them to your island. If you change your mind, you can remove them by clicking "Planning to Remove". You will get a chance to change your mind before removing them from your island. 

While you are searching for villagers, you can also listen to K.K. Slider's songs and search for your favorites in the top right corner. The search functions for both villagers and songs *are* case sensitive.

![Example usage](/app-use-example.gif)

## Description

I built this app as my Phase 1 project at Flatiron School using HTML, JS, and CSS. I accessed data from the fan-made Animal Crossing: New Horizons API at: https://acnhapi.com/ 

My goals were to make a HTML/CSS/JS frontend that accessed data from a public API and ran on a single page. I needed to use at least 3 distinct event listeners, and implement at least one instance of array iteration. My event listeners were the DOMContentLoaded event (which called my main function), submit events for the villager and song forms, and click events for every villager card button. Submitting either the villager or song form triggers a fetch GET request to the ACNH API, which is then processed to either create villager cards or change the song, album cover, and title in the top right music player.