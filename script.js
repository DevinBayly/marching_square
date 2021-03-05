let data
let canRun = false
function preload() {

  fetch("test_vtu_convert_tstep10.json").then(res => res.json()).then(j => {
    data = j
    canRun = true
    setup()
  })
}
let qt
function setup() {
  if (!canRun) {
    return
  }
  console.log("setup")
  createCanvas(innerWidth, innerHeight)
  background("white")
  noFill()
  qt = QT(pt(width/2,height/2),width,height,4)
  



  // stroke("black")
  // line(test.x - 50,test.y,test.x + 50,test.y)
}
function mousePressed() {
  qt.add(pt(mouseX,mouseY))
  qt.draw()
}
let pt = (x, y) => ({
  x, y,
  draw() {
    point(this.x,this.y)
  }
})

let sq = (center, sqw, sqh) => ({
  top: center.y - sqh / 2,
  bottom: center.y + sqh / 2,
  left: center.x - sqw / 2,
  right: center.x + sqw / 2,
  center,
  sqw,
  sqh,
  draw() {
    rect(this.left, this.top, this.sqw, this.sqh)
  },
  contains(p) {
    return p.x >= this.left && p.x <= this.right && p.y <= this.top && p.y >= this.bottom
  }
})
// //
let QT = (center, width, height, lim) => ({
  square: sq(center, width, height),
  qtw: width,
  qth: height,
  subdivided: false,
  points: [],
  subqt: {},
  lim,
  add(pele) {
    // check whether the point is within our sq
    if (this.subdivided) {
      // add it to one of the children
      for (let subqt in this.subqt) {
        subqt.add(pele)
      }
    } else if (!this.square.contains(pele)) { // if the point isn't inside our square, then skip
      return
    } else if (this.points.length < this.lim - 1) {
      // add the point to the list
      this.points.push(pele)
    } else {
      // subdivided
      // make subtrees
      // top left
      let tl = QT(this.qtw / 2, this.qth / 2, pt(this.center.x - this.qtw / 4, this.center.y - this.qth / 4))
      let tr = QT(this.qtw / 2, this.qth / 2, pt(this.center.x + this.qtw / 4, this.center.y - this.qth / 4))
      let bl = QT(this.qtw / 2, this.qth / 2, pt(this.center.x - this.qtw / 4, this.center.y + this.qth / 4))
      let br = QT(this.qtw / 2, this.qth / 2, pt(this.center.x + this.qtw / 4, this.center.y + this.qth / 4))
      this.subqt = { tl, tr, bl, br }
      // for each point
            // also add our current pele to someone

      for (let p of [...this.points,pele]) {
        for(let subqt in this.subqt) {
          subqt.add(p)// will add it if it makes sense
        }
      }
      // change subdivided
      this.subdivided = true
      this.points = []
    }
  },
  draw() {
    this.square.draw()
    // if subdivided call draw on our children
    if (this.subdivided) {
      for( let subqt in this.subqt) {
        subqt.draw()
      }
    } else {
      // draw each point
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
