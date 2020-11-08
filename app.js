const play = document.querySelector('.play');
const prev= document.querySelector('.prev');
const next = document.querySelector('.next');
const music= document.querySelector('audio');
const image = document.querySelector('.display');
const title= document.querySelector('h3');
const progress=document.querySelector('.progress');
const progressContainer=  document.querySelector('.progress-container');
const time= document.querySelector('.time');
const upnext= document.querySelector('.upForward');
const nextTitle = document.querySelector('.nextTitle');
const nextImage= document.querySelector('.nextimage');

let isPlaying =false;

play.addEventListener("click",question);

play.addEventListener("touchend",question);
function question()
{
    isPlaying?pauseSong():playSong();
}

function playSong()
{
    isPlaying=true;
    play.classList.replace('fa-play-circle','fa-pause-circle');
    
    image.classList.add("animation");
    music.play();
}
 
function pauseSong(){
    isPlaying= false;
    play.classList.replace('fa-pause-circle','fa-play-circle');
    image.classList.remove("animation");
    music.pause();
}

const name=["believer","badboy","dirtysexymoney","friends","stealmygirl","whenigrowup"] 

songIndex = 0;
function changeSong(songIndex)
{
   image.src="images/" + name[songIndex]+".jpg";
   music.src="songs/" + name[songIndex] +".mp3";
   title.innerHTML= name[songIndex];
   nextImage.src="images/" + name[songIndex+1]+".jpg";
   nextTitle.textContent= name[songIndex+1];
   if(songIndex===numberOfSongs-1){
       nextImage.src="images/believer.jpg";
       nextTitle.textContent="believer";
   }
  
   
}

numberOfSongs= name.length;

prev.addEventListener("click", previousSong);

prev.addEventListener("touchend", previousSong);

function previousSong(){
    songIndex--;
    
    if(songIndex<0){
        songIndex=numberOfSongs-1;
    }
    changeSong(songIndex);
    isPlaying?music.play():music.pause();

};


next.addEventListener("click", nextSong);

next.addEventListener("touchend", nextSong);

function nextSong(){
    songIndex++;
    
    if(songIndex===numberOfSongs){
        songIndex=0;
    }
    changeSong(songIndex);
    isPlaying?music.play():music.pause();
};



// progress Bar

function updateProgress(e)
{
    var duration=this.duration;
    var current = this.currentTime;
    percentage = (current/duration)*100;
    progress.style.width= percentage+"%";

    var min = Math.floor((current/60));
    var sec= (current%60).toFixed(0);
    min=min<10?'0'+min:min;
   sec= sec<10?"0"+ sec:sec;
   time.textContent=min+':'+sec;

    

};

music.addEventListener("timeupdate", updateProgress);
progress.addEventListener("timeupdate", updateProgress);

function setprogress(e)
{
    const duration= music.duration;
    const width = this.clientWidth;
    const clickX= e.offsetX;
    const time= (clickX/width)*duration;
    music.currentTime=time;
    console.log(width);
  
};
progressContainer.addEventListener("timeupdate",setprogress);
progressContainer.addEventListener("click",setprogress);
progressContainer.addEventListener("touch",setprogress);
music.addEventListener("ended", nextSong );


upnext.addEventListener("click",nextSong);
upnext.addEventListener("touch",nextSong);