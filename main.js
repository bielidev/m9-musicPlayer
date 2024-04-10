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
    artist: "Metallica",
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
    image: "https://m.media-amazon.com/images/I/618KRNqUL-L._UXNaN_FMwebp_QL85_.jpg",
    path: "../src/posada.mp3",
  },
  {
    name: "La Cruz de Santiago",
    artist: "Mägo de Oz",
    image: "https://www.granviadiscos.com/wp-content/uploads/2023/05/finisterra-opera-rock.jpg",
    path: "../src/cruzSantiago.mp3",
  },
  {
    name: "Todo Tiene Su Fin",
    artist: "El Barrio",
    image: "https://m.media-amazon.com/images/I/613XT7mqtqL._UXNaN_FMwebp_QL85_.jpg",
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
    image: "https://m.media-amazon.com/images/I/51qW4nMi7eL._UF894,1000_QL80_.jpg",
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
    artist: "Katy Perry",
    image: "https://www.musicroom.com/product/image/medium/dam97358_0.jpg",
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
    image: "https://m.media-amazon.com/images/I/516j8tw2uTL._UX250_FMwebp_QL85_.jpg",
    path: "../src/wham.mp3",
  },
];

const artistList = [
  {
    name: "Metallica",
    image: "https://media.gq.com.mx/photos/62c5b935615fcd90436ac392/3:2/w_3000,h_2000,c_limit/metallica-1202089448.jpg",
    genre: "Heavy Metal Band",
    followers: "26,767,941",
    monthlyListeners: "25,515,759",
    bio: "Metallica formed in 1981 by drummer Lars Ulrich and guitarist and vocalist James Hetfield and has become one of the most influential and commercially successful rock bands in history, having sold 120 million albums worldwide and generating more than 15 billion streams while playing to millions of fans on literally all seven continents. They have scored several multi-platinum albums, including 1991’s Metallica (commonly referred to as The Black Album), with sales of nearly 18 million copies in the United States alone, making it the best-selling album in the history of Soundscan. Metallica has also garnered numerous awards and accolades, including nine Grammy Awards, two American Music Awards, and multiple MTV Video Music Awards, and were inducted into the Rock and Roll Hall of Fame and Museum in 2009. In December 2013, Metallica made history when they performed a rare concert in Antarctica, becoming the first act to ever play all seven continents all within a year, and earning themselves a spot in the Guinness Book of World Records."
  },
  {
    name: "Mägo de Oz",
    image: "https://www.cmtv.com.ar/imagenes_artistas/1693.webp?Mago%20de%20Oz",
    genre: "Folk Metal Band",
    followers: "4,074,932",
    monthlyListeners: "3,853,311",
    bio: "A popular and prolific Spanish folk-metal outfit with a strong Celtic streak, Madrid's Mägo de Oz (Spanish for 'Wizard of Oz') draw from a rich tapestry of hard rock subNames, including symphonic, pagan, and power metal; they have issued no less than five rock operas. Playful and inventive, the band deftly weave elements of fantasy, satire, literature, witchcraft, and offbeat humor into their material (their name is Spanish for Wizard of Oz), with a metal umlaut tossed in for good measure. Since debuting with a self-titled album in 1994, the band have delivered increasingly ambitious conceptual pieces, with highlights arriving via the dystopian, two-part Finisterra (the latter one an opera) and the epic Gaia trilogy. Other seminal works include 2017's globally acclaimed Diabulus in Opera and 2021's Bandera Negra."
  },
  {
    name: "El Barrio",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-i0JVOTCrHcixXhrK9vCgY4p94uj4gk1m572fcgsTHPgHLfOr",
    genre: "New Flamenco Singer",
    followers: "1,171,130",
    monthlyListeners: "1,128,766",
    bio: "José Luis Figuereo, better known by the stage name El Barrio, is a Spanish new flamenco singer. He was born on 4 June 1970 in Cádiz, Santa María.Figuereo is known as a multi-artist from Andalucía. He is not only a singer-songwriter, but is also a composer and a poet. In his music, he uses old flamenco techniques, as well as new.His poetic style offers a fresh take on flamenco. The lyrics of his songs define an urban flamenco, with conceptual and emotional subjects. His language is lyrical, youthful, and modern, employing slang and even gypsy expressions into his work.This poetic style is reminiscent of the great Spanish flamenco singers. He has first-class use of his throat when singing.José Luis Figuereo, Selu, El Barrio, is an urban poet of the 21st century for his fans, he has connected very well with them, even more with the young fans who already like flamenco."
  },
  {
    name: "The Rolling Stones",
    image: "https://www.mondosonoro.com/wp-content/uploads/2015/03/TheRollingStones.jpg",
    genre: "Rock Band",
    followers: "13,766,219",
    monthlyListeners: "29,833,703",
    bio: "By the time the Rolling Stones began calling themselves the World's Greatest Rock & Roll Band in the late '60s, they had already staked out an impressive claim on the title. As the self-consciously dangerous alternative to the bouncy Merseybeat of the Beatles in the British Invasion, the Stones had pioneered the gritty, hard-driving blues-based rock & roll that came to define hard rock. With his preening machismo and latent maliciousness, Mick Jagger became the prototypical rock frontman, tempering his macho showmanship with a detached, campy irony while Keith Richards and Brian Jones wrote the blueprint for sinewy, interlocking rhythm guitars. Backed by the strong yet subtly swinging rhythm section of bassist Bill Wyman and drummer Charlie Watts, the Stones became the breakout band of the British blues scene, eclipsing such contemporaries as the Animals and Them. Over the course of their career, the Stones never really abandoned blues, but as soon as they gained popularity in the U.K."
  },
  {
    name: "Estopa",
    image: "https://yt3.googleusercontent.com/ytc/AIdro_mvDRgLVmgdN4mRNE3lF9qbp8p79iO2hPSPXirR=s900-c-k-c0x00ffffff-no-rj",
    genre: "Rock-Rumba Duo",
    followers: "1,899,492",
    monthlyListeners: "4,634,275",
    bio: "Estopa is a rock/rumba duo from Cornellà de Llobregat. Their songs 'El Run Run' and 'Cuando Amanece' reached number one on Billboard's chart in Spain, and 'Con La Mano Levanta' reached number four. The band consists of brothers José and David Muñoz; their style includes rock, rumba, and flamenco Names. The band has stated, 'We don't like to be easily categorized.' Their sound is similar to that of Khode, a Spanish rumba band that was popular in the 1970s. Estopa made a cameo appearance in the Spanish film The 4th Floor. They have performed with other popular Spanish artists such as Rosario Flores and Macaco."
  },
  {
    name: "Evanescence",
    image: "https://akamai.sscdn.co/uploadfile/letras/fotos/c/7/b/8/c7b8f989886bdc774abbbe1b09955df9.jpg",
    genre: "Gothic Metal Band",
    followers: "4,340,258",
    monthlyListeners: "14,221,117",
    bio: "Evanescence will release the 20th anniversary edition of their multi-platinum debut album Fallen on November 17th. The anniversary will see remastered tracks from the original album, previously unheard demos, and alternate versions of some of their most iconic songs. In Amy’s words, '20 years later, this album has never meant more. Fallen has been the soundtrack to first loves, epic heartbreak, self-realization, wedding days, last goodbyes, friendships, and countless other moments in so many lives…not to mention my own. I am forever humbled and grateful to be a part of it.'"
  },
  {
    name: "Katy Perry",
    image: "https://yt3.googleusercontent.com/8s2hH6UfSKbED2-UUVgCALU5BXXxvnk2ueNzBaCU-exfeoC9X1OZzDa6uqzI4cOA3ZDqyXjIsg=s900-c-k-c0x00ffffff-no-rj",
    genre: "Pop Singer",
    followers: "32.455.667",
    monthlyListeners: "57.562.954",
    bio: "In her 12 years with Capitol, Katy has racked up a cumulative 50 billion streams alongside worldwide sales of over 47.5 million adjusted albums and 135 million tracks. With the singles 'Roar,' 'Firework,' and 'Dark Horse' each surpassing the 10 million threshold including song sales and streams, Katy became the first artist to earn three RIAA Digital Single Diamond Awards. Katy is one of only five artists in history to have topped 100 million certified units with their digital singles – and the first-ever Capitol Records recording artist to join the elite RIAA 100 Million Certified Songs club. She was the first to reach 100 million followers on Twitter. Katy’s 2015 Super Bowl performance is the highest-rated in the event’s history. Katy was the first female artist to have four videos surpass a billion views each. Her videos for 'Firework', 'Last Friday Night' and 'Bon Appetit' have over one billion views, while 'Dark Horse' has surpassed the two billion mark. 'Roar' now has over three billion views."
  },
  {
    name: "Avicii",
    image: "https://d34ugyblrhxy34.cloudfront.net/wp-content/uploads/2019/05/06001655/avicii.jpg",
    genre: "Electro House DJ",
    followers: "22,638,717",
    monthlyListeners: "38,100,358",
    bio: "With his melodic songs and inspirational lyrics Swedish house producer Avicii was one of the defining artists of modern pop. The Name-bending tracks captivated audiences worldwide and are widely considered the soundtrack of a generation. Born 1989 in Stockholm, Tim Bergling grew up being obsessed with video games, a passion that in his teens translated into him making music. After being discovered through a blog and gaining some traction with ”Seek Bromance”, his career exploded in 2011 with ”Levels”. His way of boldly blending musical styles became a trademark of Avicii, shown on full display on his first album ”True”. The leading single ”Wake Me Up”, a fusion of house music and traditional bluegrass, reached the number one spot on the iTunes charts in over 60 countries. The song became the most streamed ever on Spotify to that date, played over 200 million times, and turned Avicii into a sought-after pop producer, collaborating with stars such as Madonna and Coldplay. After touring the world at a frantic pace, all the while struggling with health issues and substance abuse, in 2015 Tim Bergling retired from performing live altogether.  The slower lifestyle allowed him to focus purely on composing, drawing inspiration this time mainly from African and Asian traditions. Bergling was working on his fourth project, ”Tim”, when he tragically passed away during a holiday trip to Oman, in April of 2018. He is regarded as one of the most influential house producers of all time."
  },
  {
    name: "Wham!",
    image: "https://www.radiosiente.com/wp-content/uploads/wham.jpg",
    genre: "Pop Duo",
    followers: "2,673,005",
    monthlyListeners: "11,391,680",
    bio: "Wham! followed the parallel path of most of their British pop peers, celebrating colorful, candied hooks and big, effervescent beats at a time most emerging U.K. groups were dedicated to stylish, detached synth pop. George Michael and Andrew Ridgeley, the childhood friends who comprised Wham!, didn't ignore fashion -- their flashy visuals were tailor-made for MTV -- but they shunned the arty and dour portions of new wave, building their persona on American dance music and pop, even dabbling in a bit of rap on their first single 'Wham! Rap (Enjoy What You Do).' That single, along with 'Young Guns (Go for It)' and 'Bad Boys,' broke them into the U.K. Top Ten in 1983, but it was the jubilant 'Wake Me Up Before You Go-Go' that turned them into international superstars. Almost immediately, Michael stood apart from Ridgeley: he had the supple, soulful voice showcased on their second number one, 'Careless Whisper,' which was occasionally credited to Michael on his own. Wham! sustained their run at the top of the charts through 1985 but in 1986, 'A Different Corner' announced Michael's separation from his longtime friend. By the end of that year, Wham! had split, leaving Michael on the road to superstar."
  }
 
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
  // Update artist info when loading a new track
  updateArtistInfo(track_list[track_index]);
}

/* Update artist bio */

function updateArtistInfo(track) {
  const artist = artistList.find(artist => artist.name === track.artist);

  if (artist) {
    document.querySelector('.artist-name').textContent = artist.name;
    document.querySelector('.genre').textContent = artist.genre;
    document.querySelector('.description').textContent = artist.bio;
    document.querySelector('.image-container img').src = artist.image;
  } 
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
updateArtistInfo(track_list[track_index]);