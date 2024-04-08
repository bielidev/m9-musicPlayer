// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
// Create the audio element for the player
let curr_track = document.createElement("audio");
// Define the list of tracks that have to be played
let track_list = [
  // 10 canciones 
  {
    name: "Master of Puppets",
    artist: "Metalica",
    image: "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201711/06/00105111367511____1__640x640.jpg",
    path: "../src/puppets.mp3",
  },
  {
    name: "La Costa del Silencio",
    artist: "Mägo de Oz",
    image: "https://i.scdn.co/image/ab67616d0000b273b637449c74ec8501ed2e03aa",
    path: "../src/costaSilencio.mp3",
  },
  {
    name: "La Posada de los Muertos",
    artist: "Mägo de Oz",
    image: "https://i.scdn.co/image/ab67616d0000b273b637449c74ec8501ed2e03aa",
    path: "../src/posada.mp3",
  },
  {
    name: "La Cruz de Santiago",
    artist: "Mägo de Oz",
    image: "https://www.granviadiscos.com/wp-content/uploads/2023/05/finisterra-opera-rock.jpg",
    path: "../src/cruzSantiago.mp3",
  },
  {
    name: "Todo tiene su fin",
    artist: "El Barrio",
    image: "https://m.media-amazon.com/images/I/511RXRK1A9L._AC_UF894,1000_QL80_.jpg",
    path: "../src/barrio.mp3",
  },
  {
    name: "Paint it Black",
    artist: "The Rolling Stones",
    image: "https://m.media-amazon.com/images/I/91URz+ZyLhL._UF1000,1000_QL80_.jpg",
    path: "../src/rolling.mp3",
  },
  {
    name: "Tu Calorro",
    artist: "Estopa",
    image: "https://i.scdn.co/image/ab67616d0000b2731a311570340a4f6530da158b",
    path: "../src/calorro.mp3",
  },
  {
    name: "Bring to Life",
    artist: "Evanescence",
    image: "https://i.scdn.co/image/ab67616d0000b27325f49ab23f0ec6332efef432",
    path: "../src/evanescence.mp3",
  },
  {
    name: "Hot 'n Cold",
    artist: "Katty Perry",
    image: "https://m.media-amazon.com/images/I/511RXRK1A9L._AC_UF894,1000_QL80_.jpg",
    path: "../src/perry.mp3",
  },
  {
    name: "Wake Me Up",
    artist: "Avicii",
    image: "https://i.discogs.com/7Ypd8KvM6xx8p4JCnvHfyU7WGVBukVvAzXAPU-azscQ/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjky/NjQ3LTE1Nzg1NDQ3/MzktOTE5Ny5qcGVn.jpeg",
    path: "../src/avicii.mp3",
  },
  {
    name: "Wake Me Up Before You Go-Go",
    artist: "Wham!",
    image: "https://i.discogs.com/cqETO0UKO1svSoJByxyHUX_eDiVSN6eDY2aAnRVRpeo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NDQ3/Ni0xMzE2NjA2MDIx/LmpwZWc.jpeg",
    path: "../src/wham.mp3",
  },
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  // Apply a random background color
  random_bg_color();
}
function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  // Set the background to the new color
  document.body.style.background = bgColor;
}
// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
function seekUpdate() {
  let seekPosition = 0;
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );
    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);
