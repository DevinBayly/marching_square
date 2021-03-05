let data 
let canRun = false
function preload() {

fetch("test_vtu_convert_tstep10.json").then(res=> res.json()).then(j=> {
    data = j
    canRun = true
    setup()
  })
}

function setup() {
  if (!canRun) {
    return
  }
  console.log("setup")
  createCanvas(innerWidth,innerHeight)
  background("white")
  noFill()
  stroke("black")
  strokeWeight(5)
  point(width/2,height/2)
  strokeWeight(2)
  let test = sq(pt(width/2,height/2),width/2,height/2)
  test.draw()



 
  // stroke("black")
  // line(test.x - 50,test.y,test.x + 50,test.y)
}

let pt = (x,y)=> ({
  x,y
})

let sq = (center,sqw,sqh) => ({
  top:center.y - sqh/2,
  bottom: center.y + sqh/2,
  left: center.x - sqw/2,
  right: center.x + sqw/2,
  sqw,
  sqh,
  draw() {
    rect(this.left,this.top,this.sqw,this.sqh)
  }
})
//
let QT = (width,height,center)=> ({
  // has subdivided bool
  // has subs which are also QTs
  // points if not subdivided
  // method add
  // method query
  // width, height
  
})
