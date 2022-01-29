
const timeLeftElm = document.querySelector(".display__time-left");
const endTimeElm = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");

let countdown ;


function timer (seconds) {
    //clear any existign timers
    clearInterval(countdown);

    const now = Date.now() ;
    const endTime = now + seconds *1000 ;

    displayTimeLeft(seconds) ;
    displayEndTime(endTime);
    
   countdown = setInterval(() => {
   const secondsLeft = Math.round((endTime - Date.now()) / 1000) ;
  
    if( secondsLeft < 0 ) {
        clearInterval(countdown) ;
    }else {
            displayTimeLeft(secondsLeft) ;
          } 
    }, 1000)   
}

function startTimer(){
    console.log("button clicked: ")
    const duration = parseInt(this.dataset.time) ;
    timer(duration);
    console.log(this) ;
}

buttons.forEach(button => button.addEventListener("click", startTimer))  ;
document.customForm.addEventListener("submit", function(e){
     e.preventDefault()
     const mins = this.minutes.value  ;
      timer(mins * 60) ;
    }) ;

function displayTimeLeft(seconds){
    
    const mins = Math.floor(seconds /60) ;
    const sec = seconds % 60 ;
    
    console.log(mins, sec) ;
 //   console.log(timeLeftElm) ;
     timeLeftElm.textContent = `${mins}:${sec <10 ? 0 : ""}${sec}  ` ;

}

function displayEndTime(endTime) {
   const end = new Date(endTime) ;
   let  hour = end.getHours() ;
         hour = hour > 12 ? hour - 12 : hour ;
    const mins = end.getMinutes() ;
    endTimeElm.textContent= `Be back at ${hour}:${mins <10 ? 0:""}${mins}`;

}
