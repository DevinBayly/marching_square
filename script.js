let data
let canRun = false
let pt = (x, y) => ({
  x, y,
  draw() {
    point(this.x, this.y)
  },
  dist(opt) {
    return ((this.x - opt.x) ** 2 + (this.y - opt.y) ** 2) ** .5
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
    rect(this.left, this.bottom, this.sqw, this.sqh)
  },
  contains(p) {
    //console.log("checking contains", p, p.x >= this.left, p.x <= this.right, p.y <= this.top, p.y >= this.bottom)
    return p.x >= this.left && p.x <= this.right && p.y >= this.top && p.y <= this.bottom
  }
})
// //
let QT = (center, qtw, qth, lim) => ({
  square: sq(center, qtw, qth),
  qtw,
  qth,
  subdivided: false,
  points: [],
  subqt: [],
  center,
  lim,
  add(pele) {
    //console.log("adding", pele)
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
      //console.log("adding point")
      this.points.push(pele)
    } else {
      // subdivided
      // make subtrees
      // top left
      let tl = QT(pt(this.center.x - this.qtw / 4, this.center.y - this.qth / 4), this.qtw / 2, this.qth / 2, this.lim)
      let tr = QT(pt(this.center.x + this.qtw / 4, this.center.y - this.qth / 4), this.qtw / 2, this.qth / 2, this.lim)
      let bl = QT(pt(this.center.x - this.qtw / 4, this.center.y + this.qth / 4), this.qtw / 2, this.qth / 2, this.lim)
      let br = QT(pt(this.center.x + this.qtw / 4, this.center.y + this.qth / 4), this.qtw / 2, this.qth / 2, this.lim)
      this.subqt = [tl, tr, bl, br]
      // for each point
      // also add our current pele to someone

      for (let p of [...this.points, pele]) {
        for (let subqt of this.subqt) {
          subqt.add(p)// will add it if it makes sense
        }
      }
      // change subdivided
      this.subdivided = true
      this.points = []
    }
  },
  draw() {
    //console.log(this)
    strokeWeight(.3)
    this.square.draw()
    // if subdivided call draw on our children
    if (this.subdivided) {
      //console.log("is subdivided")
      for (let subqt of this.subqt) {
        subqt.draw()
      }
    } else {
      // draw each point
      //console.log("not subdivided")
      strokeWeight(.5)
      for (let p of this.points) {
        p.draw()
      }
    }


    // want to draw our boxes and the points 

  },
  query(pele) {
    let result = []
    if (!this.square.contains(pele)) {
      return -1
    } else {
      if (this.subdivided) {
        for (let subqt of this.subqt) {
          result = [...result, subqt.query(pele)]
        }
      } else {
        return this
      }
    }

    // perform final filter to keep only what we want
    result = result.filter(e => e != -1)[0]
    return result
  }
  // has subdivided bool
  // has subs which are also QTs
  // points if not subdivided
  // method add
  // method query
  // width, height

})

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
  strokeWeight(1)
  qt = QT(pt(width / 2, height / 2), width, height, 100)
  // make random data
  // Array(40).fill(0).map(e=> qt.add(pt(random(width),random(height))))
  // use the points that are in the data
  // 
  let scalex = d3.scaleLinear().range([0, width])
  let scaley = d3.scaleLinear().range([height, 0])
  // 
  let localdata = data.points
  scalex.domain(d3.extent(localdata.map(e => e.x)))
  scaley.domain(d3.extent(localdata.map(e => e.y)))
  localdata.map(e => {
    qt.add(pt(scalex(e.x), scaley(e.y)))
  })
  qt.draw()
  // iterate over the tree, overloads the browser... colorize on all centers
  // setTimeout(()=> {
  // let i = 0
  // // get flat rep of tree
  // let flat = []
  // let current = qt
  // let lim = 20
  // while (flat.length < lim) {
  //   if (current.subdivided) {
  //   flat = [...flat,...current.subqt]
  //   }
  //   i+= 1
  //   current = flat[i]
  // }
  // console.log(flat)
  // for (let flattree of flat) {
  //   setTimeout(()=>{colorize(flattree.center.x,flattree.center.y)},10*random()*4)
  // }
  // },4000)


  // stroke("black")
  // line(test.x - 50,test.y,test.x + 50,test.y)
}

function mousePressed() {
  colorize(mouseX,mouseY)
}

function colorize(ix,iy) {
  // console.log("clicked")
  // let neighbors = qt.query(pt(mouseX,mouseY))
  // stroke('red')
  // neighbors.map(e=> point(e.x,e.y))
  // implement a thing where we compare the pixels in this section to all the pixels
  let subqt = qt.query(pt(ix, iy))
  let bounds = subqt.square
    let factor = 1/(width/2)

  // if there's no points make it into a gradient with white at the center
let i = 0
  if (subqt.points.length == 0) {
for (let x = bounds.left; x < bounds.right; x++) {
    for (let y = bounds.top; y < bounds.bottom; y++) {
      i += 1
      // test using timeout so it doesn't crash

      setTimeout(() => {
        let mid = pt(bounds.right - bounds.sqw/2,bounds.bottom - bounds.sqh/2 )
        let dst = mid.dist(pt(x,y))
        strokeWeight(1)

        stroke(255 - dst*factor*255)
        point(x, y)
      }, 1 * (i))

    }
  }
  return
  }
  
  // use the bounds of the subqt to iterate over pixels
  // create a d3 color scaleLinear
  
  for (let p of subqt.points) {
    stroke("red")
    point(p.x, p.y)
  }
  rect(bounds.left, bounds.top, bounds.qtw,bounds.qth)
  console.log(subqt)
  
  // decide if the distance is greatest lengthwise or width wise
  // probably should decide whether color is dependent on the boundary or not
  // if (bounds.sqh > bounds.sqw) {
  //   factor = 1/bounds.sqh
  // } else {
  //   factor = 1 / bounds.sqw
  // }
  console.log(factor)
  for (let x = bounds.left; x < bounds.right; x++) {
    for (let y = bounds.top; y < bounds.bottom; y++) {
      i += 1
      // test using timeout so it doesn't crash

      setTimeout(() => {
        let points = qt.query(pt(x, y)).points
        //console.log(points)
        //find min distance to a point in setup
        let min = 10000
        for (let p of points) {
          let dist = p.dist(pt(x, y))
          if (dist < min) {
            min = dist
          }
        }
        strokeWeight(1)

        stroke(min*factor*255)
        point(x, y)
      }, 1 * (i))

    }
  }
}

