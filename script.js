let data
let canRun = false
let pt = (x, y) => ({
  x, y,
  draw() {
    point(this.x,this.y)
  }
})

let sq = (center, sqw, sqh) => ({
  top: center.y + sqh / 2,
  bottom: center.y - sqh / 2,
  left: center.x - sqw / 2,
  right: center.x + sqw / 2,
  center,
  sqw,
  sqh,
  draw() {
    rect(this.left, this.bottom, this.sqw, this.sqh)
  },
  contains(p) {
    console.log("checking contains",p,p.x >= this.left , p.x <= this.right ,p.y <= this.top , p.y >= this.bottom)
    return p.x >= this.left && p.x <= this.right && p.y <= this.top && p.y >= this.bottom
  }
})
// //
let QT = (center, qtw,qth, lim) => ({
  square: sq(center, qtw,qth),
  qtw,
  qth,
  subdivided: false,
  points: [],
  subqt: [],
  center,
  lim,
  add(pele) {
    console.log("adding",pele)
    // check whether the point is within our sq
    if (this.subdivided) {
      // add it to one of the children
      for (let subqt of this.subqt) {
        subqt.add(pele)
      }
    } else if (!this.square.contains(pele)) { // if the point isn't inside our square, then skip
      return
    } else if (this.points.length < this.lim - 1) {
      // add the point to the list
      console.log("adding point")
      this.points.push(pele)
    } else {
      // subdivided
      // make subtrees
      // top left
      let tl = QT( pt(this.center.x - this.qtw / 4, this.center.y - this.qth / 4),this.qtw / 2, this.qth / 2,this.lim)
      let tr = QT(pt(this.center.x + this.qtw / 4, this.center.y - this.qth / 4),this.qtw / 2, this.qth / 2 ,this.lim)
      let bl = QT( pt(this.center.x - this.qtw / 4, this.center.y + this.qth / 4),this.qtw / 2, this.qth / 2,this.lim)
      let br = QT(pt(this.center.x + this.qtw / 4, this.center.y + this.qth / 4),this.qtw / 2, this.qth / 2, this.lim)
      this.subqt = [ tl, tr, bl, br ]
      // for each point
            // also add our current pele to someone

      for (let p of [...this.points,pele]) {
        for(let subqt of this.subqt) {
          subqt.add(p)// will add it if it makes sense
        }
      }
      // change subdivided
      this.subdivided = true
      this.points = []
    }
  },
  draw() {
    console.log(this)
    this.square.draw()
    // if subdivided call draw on our children
    if (this.subdivided) {
      console.log("is subdivided")
      for( let subqt of this.subqt) {
        subqt.draw()
      }
    } else {
      // draw each point
      console.log("not subdivided")
      for (let p of this.points) {
        p.draw()
      }
    }
    

    // want to draw our boxes and the points 

  },
  query(pele) {

  }
  // has subdivided bool
  // has subs which are also QTs
  // points if not subdivided
  // method add
  // method query
  // width, height

})

// function preload() {

//   fetch("test_vtu_convert_tstep10.json").then(res => res.json()).then(j => {
//     data = j
//     canRun = true
//     setup()
//   })
// }
let qt
function setup() {
  // if (!canRun) {
  //   return
  // }
  console.log("setup")
  createCanvas(400  ,400)
  background("white")
  noFill()
  strokeWeight(4)
  qt = QT(pt(width/2,height/2),width,height,4)
  



  // stroke("black")
  // line(test.x - 50,test.y,test.x + 50,test.y)
}
function mousePressed() {
  console.log("clicked")
  qt.add(pt(mouseX,mouseY))
  qt.draw()
}
