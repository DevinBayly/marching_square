
let pt = (x, y, z) => ({
  x, y, z,
  mult(v) {
    let res = { ...this }
    res.x *= v
    res.y *= v
    res.z *= v
    return res
  },
  dot(o) {
    return this.x * o.x + this.y * o.y + this.z * o.z
  },
  sub(o) {
    let o_neg = o.mult(-1)
    return this.add(o_neg)
  },
  add(o) {
    let res = { ...this }
    res.x += o.x
    res.y += o.y
    res.z += o.z
    return res
  },
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }
})

let clicks = 0
let a, b, c

let faces = []
let points = []
function setup() {
  createCanvas(500, 500)
  let loader = new THREE.GLTFLoader()
  loader.load("./demo_mesh.glb", function (model) {
    //console.log(model)
    let geo = model.scene.children[0].geometry
    let values = geo.attributes.position.array
    //console.log(values)
    let indices = geo.index.array
    for (let i = 0; i < values.length; i += 3) {
      let p = new THREE.Vector3(values[i] * width, height - values[i + 1] * height, values[i + 2])
      points.push(p)
    }
    //console.log("points", points)
    // in theory we have 64 faces, and 81 vertices
    for (let i = 0; i < indices.length; i += 3) {
      // use the values in the first 4 to create a face
      let face = []
      let faceIndices = indices.slice(i, i + 3)
      for (let ind of faceIndices) {
        face.push(points[ind])
      }
      faces.push(face)
    }
    strokeWeight(10)
    drawMesh()

  })
}

function drawMesh() {
  stroke("black")
  for(let f of faces) {
    for (let i = 0; i < 3; i += 1) {
      let p1 = f[i % 3]
      let p2 = f[(i + 1) % 3]
      line(p1.x, p1.y, p2.x, p2.y)
      //point(p1.x*width,height - p1.y*height)
    }
  }
}

function barycentricContains(a, b, c, p) {
  // 
  let v1 = b.sub(a)
  let v2 = c.sub(a)
  let v3 = p.sub(a)

  let v =(v3.y*v1.x - v3.x*v1.y)/(v2.y*v1.x - v2.x*v1.y)
  let u = v3.x/v1.x -v*v2.x/v1.x
  let uv = v+u
  return uv >= 0 && uv <= 1
}

function mousePressed() {
  // 
  drawMesh()
  for (let f of faces) {
  let p = new THREE.Vector3(mouseX, mouseY, 0)
    let p1 = f[0]
    let p2 = f[1]
    let p3 = f[2]
    stroke("black")
    // 
    let tri = new THREE.Triangle(p1,p2,p3)

    if (tri.containsPoint(p)) {
      stroke("red")
      point(p1.x, p1.y)
      point(p2.x, p2.y)
      point(p3.x, p3.y)
    }
  }

}
