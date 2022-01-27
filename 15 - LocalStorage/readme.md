# Local Storage

## for adding the option to checkALl or Uncheck all. I used a foreach on the items object

- function checkAll() {
  let isDone = true ;
  if(sellectAllBtn.innerText ==="unSelect all") {
  sellectAllBtn.innerText = "Select all"
  isDone = false ;
  }else {
  sellectAllBtn.innerText = "unSelect all"
  }
  items.forEach( plate => {
  plate.done = isDone ;
           });

       updateList() ;

}
