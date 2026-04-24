var master = []
var storage = []
var food = []
var hazards = []
var speed = 200
var direction = [0, 1]
var score = 0
var root
var rootinterval
class snakeHead {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.next = null
    }
    move(direction) {
        let temp = this.row
        let temp1 = this.col
        this.row = this.row + direction[0]
        this.col = this.col + direction[1]
        if (this.row < 0) {
            this.row = this.row + 20
        }
        else {
            this.row = this.row % 20
        }
        if (this.col < 0) {
            this.col = this.col + 20
        }
        else {
            this.col = this.col % 20
        }
        if (this.next) {
            let temp2 = this.next.shift(temp, temp1)
            temp2.push([this.row, this.col])
            return temp2
        }
        else {
            return [[this.row, this.col]]
        }

    }
}
class snakebody {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.next = null
    }
    shift(row, col) {
        let temp = this.row
        let temp1 = this.col
        this.row = row
        this.col = col
        if (this.next) {
            let temp2 = this.next.shift(temp, temp1)
            temp2.push([this.row, this.col])
            return temp2
        }
        else {
            return [[this.row, this.col]]
        }

    }
}
function overlaoanykzier(arr){

    
    for (let i = 0; i<arr.length; i++ ){
        let temp = [...arr]
        console.log(temp)
        temp.splice(i,1)
        console.log(temp,i)
        for (let ii = 0; ii<temp.length; ii++ ){
            console.log(arr[i],temp[ii])
            if (`${arr[i]}`==`${temp[ii]}`){
                return true
            }
    
        }
        
    }
    return false


}
function velocity(event) {
    if (event.key == "ArrowLeft") {
        direction = [0, -1]
        clearInterval(rootinterval)
        rootinterval = setInterval(maingame, speed)
    }
    else if (event.key == "ArrowRight") {
        direction = [0, 1]
        clearInterval(rootinterval)
        rootinterval = setInterval(maingame, speed)
    }
    else if (event.key == "ArrowDown") {
        direction = [1, 0]
        clearInterval(rootinterval)
        rootinterval = setInterval(maingame, speed)

    } else if (event.key == "ArrowUp") {
        direction = [-1, 0]
        clearInterval(rootinterval)
        rootinterval = setInterval(maingame, speed)
    }

}
function feeder() {
    index1 = Math.floor(Math.random() * 20)
    index2 = Math.floor(Math.random() * 20)
    if (((search(storage,[[index1, index2]]))||(search(food,[[index1, index2]])))||(search(hazards,[[index1, index2]]))) {
        return feeder()
    }
    else {
        return [index1, index2]
    }

}
function search(arr1,arr2){
    for (let i = 0; i<arr1.length;i++){
        for (let ii = 0; ii<arr2.length;ii++){
            if (`${arr1[i]}`==`${arr2[ii]}`){
                return [arr1[i]]
            }
        }

    }
    return false
}
function redraw(){
    for (let i = 0; i<20;i++){
        for (let ii = 0; ii<20;ii++){
            master[i][ii].className="mainclass1"
            master[i][ii].style.cssText=""

        }
    }
    for (let i = 0; i<storage.length;i++){
    master[storage[i][0]][storage[i][1]].className="mainclass3"
    }
    for (let i = 0; i<food.length;i++){
    master[food[i][0]][food[i][1]].className="mainclass4"
    }
    for (let i = 0; i<hazards.length;i++){
    master[hazards[i][0]][hazards[i][1]].className="mainclass6"
    }
    master[root.row][root.col].className="mainclass5"
    if (`${direction}`==`${[0,-1]}`){
master[root.row][root.col].style.cssText="rotate: 180deg "
    } 
    else if (`${direction}`==`${[0,1]}`){
master[root.row][root.col].style.cssText=""
    }
    else if (`${direction}`==`${[-1,0]}`){
master[root.row][root.col].style.cssText="rotate: 270deg "
    }
    else if (`${direction}`==`${[1,0]}`){
master[root.row][root.col].style.cssText="rotate: 90deg "
    }
    
}
function maingame(){
    storage=root.move(direction)
    if (overlaoanykzier(storage)){
        document.body.innerHTML=""
        let temp  = document.createElement("div")
        temp.innerHTML='<img src="gamove.png" style="height:80%"> <h1><a href="index.html">restart</a></h1>'
        document.body.appendChild(temp)
    }
    if (search(storage,hazards)){
        document.body.innerHTML=""
        let temp  = document.createElement("div")
        temp.innerHTML='<img src="gamove.png" style="height:80%"> <h1><a href="index.html">restart</a></h1>'
        document.body.appendChild(temp)
    }

    if (search(storage,food)){
    
    let temp1 = root.col
    let temp = root.row
    let temp2 = new snakebody(temp,temp1)
    temp2.next=root.next
    root.row = root.row + direction[0]
    root.col = root.col + direction[1]
        if (root.row < 0) {
            root.row = root.row + 20
        }
        else {
            root.row = root.row % 20
        }
        if (root.col < 0) {
            root.col = root.col + 20
        }
        else {
            root.col = root.col % 20
        }
    root.next=temp2
    food.splice(food.indexOf(search(storage,food)),1)
    food.push((feeder()))
    score=score+1
    scoretext.innerText=`Score is ${score}`
  if (score%5==0){
    hazards.push((feeder()))
  }
  speed=speed-1
    
    }

    redraw()

    

}
document.addEventListener("keydown", velocity)
var min = Math.min([window.innerWidth/30,window.innerHeight/30])
for (let i = 0; i < 20; i++) {


    let temp3 = document.createElement("div")
    temp3.className = "mainclass2"
    let temp = []
    for (let ii = 0; ii < 20; ii++) {
        let temp2 = document.createElement("div")
        temp2.className = "mainclass1"


        temp3.appendChild(temp2)
        temp.push(temp2)

    }
    document.body.appendChild(temp3)
    master.push(temp)
}

var root = new snakeHead (feeder()[0],feeder()[1])
var scoretext = document.createElement("H1")



scoretext.innerText="Score is 0"
document.body.appendChild(scoretext)
storage.push(root.row,root.col)
console.log(feeder())
food.push(feeder())
rootinterval = setInterval(maingame, speed)
