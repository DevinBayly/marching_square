function setup() {
  createCanvas(600,600)
  background("white")
  noStroke()
  //randomSeed(5)
  // make random data
  // grid and assign random to the corners
  let gridCount = {x:100,y:100}
  let points = []
  //translate(5,5)
  for (let y = 0 ; y < height; y += height/gridCount.y) {
  for(let x = 0 ; x < width; x += width/gridCount.x) {
    let pt = {x,y,val:noise(x*.01,y*.01)>.5? 1:0}
    if (pt.val == 1) {
      fill("orange")
    } else {
      fill("purple")
    }
    circle(x,y,5)
    points.push(pt)
  }
  }
  let getPt = (x,y)=> {
    // when y = 1 and x = 1 we have 1 + 1*10 which should give 11
    return points[x + y*gridCount.x]
  }
  //let test = getPt(2,1)

  // don't count the edge
  // make the categories
  stroke("black")
  strokeWeight(3)
  let mid = (a,b)=> {
    return (a + b)/2
  }

  let run =(x,y)=> {
    
      let tl = getPt(x,y)
      let tr = getPt(x+1,y)
      let bl = getPt(x,y+1)
      let br = getPt(x+1,y+1)
    
  
      // horizontal
      if (tl.val == 0 && tr.val == 0 && bl.val == 1 && br.val == 1  ) {
        line(tl.x,(tl.y + bl.y)/2,tr.x,(tl.y + bl.y)/2)
      } else if (tl.val == 0 && tr.val == 1 && bl.val == 0 && br.val == 0) {
        line((tl.x + tr.x)/2,tl.y,tr.x,(tr.y + br.y)/2)
      } else if (tl.val == 0 && tr.val == 1 && br.val == 0 && bl.val == 1) {
        // two lines
        line(tl.x,mid(tl.y ,bl.y),mid(tl.x,tr.x),tl.y)
        line(mid(bl.x, br.x),bl.y,br.x,mid(br.y , tr.y))
      } else if (tl.val == 1 && tr.val == 0 && br.val == 0&& bl.val == 0) {
        line(tl.x,mid(tl.y , bl.y),mid(tl.x,tr.x),tl.y)
      } else if (tl.val == 1 && bl.val==1 && tr.val == 0 && br.val == 0) {

        line(mid(tl.x,tr.x),tl.y,mid(tl.x,tr.x),bl.y)
      } else if (tl.val == 1 && tr.val == 1 && br.val == 0 && bl.val ==1) {
        line(mid(bl.x,br.x),bl.y,br.x,mid(tr.y,br.y))
      } else if (tl.val == 0 && tr.val == 1 && br.val == 1 && bl.val == 1) {

        line(tl.x,mid(tl.y,bl.y),mid(tl.x,tr.x),tl.y)
      } else if (tl.val == 0&& tr.val == 0 && br.val == 1 && bl.val == 0) {
        line(mid(br.x,bl.x),br.y,br.x,mid(br.y,tr.y))
      } else if (tl.val == 1 && tr.val == 1 && br.val == 1 && bl.val == 0 ) {
        line(tl.x,mid(tl.y,bl.y),mid(bl.x,br.x),br.y)
      } else if (tl.val == 0 && bl.val == 0 && tr.val == 1 && br.val == 1){
        line(mid(tr.x,tl.x),tl.y,mid(tr.x,tl.x),br.y)
      } else if (tl.val == 0 && tr.val == 0 && br.val == 0 && bl.val == 1) {

        line(tl.x,mid(tl.y,bl.y),mid(br.x,bl.x),bl.y)
      } else if (tl.val==1 && tr.val == 0 && br.val == 1&& bl.val == 1) {
        line(mid(tl.x,tr.x),tl.y,br.x,mid(br.y,tr.y))
      } else if (tl.val == 1&& tr.val == 0 && br.val == 1 && bl.val == 0) {
        line(tl.x,mid(tl.y,bl.y),mid(tl.x,tr.x),tl.y)
        line(mid(bl.x,br.x),bl.y,br.x,mid(br.y,tr.y))
      } else if (tl.val == 1 && tr.val == 1 && br.val == 0 && bl.val == 0) {
        line(tl.x,mid(tl.y,bl.y),tr.x,mid(tl.y,bl.y))
      }

      

    }
    for(let y = 0; y < gridCount.y-1; y+=1) {

    for (let x = 0 ; x < gridCount.x-1 ; x +=1) {
      run(x,y)
  }
  }
 
  // stroke("black")
  // line(test.x - 50,test.y,test.x + 50,test.y)
}
