const express=require("express")
const app=express()

const path=require("path")
const http=require("http")
const { Server } = require("socket.io")


const server=http.createServer(app)

const io=new Server(server)
app.use(express.static(path.resolve("")))

let waitingArr=[]
let playingArr=[]

io.on("connection", (socket) => {

    socket.on("find", (e) => {
        if(e.name!=null) { 

            waitingArr.push(e.name)

            if(waitingArr.length>=2) {
                let p1={
                    p1name: waitingArr[0],
                    p1value: "X",
                    p1move: ""
                }
                let p2={
                    p2name: waitingArr[1],
                    p2value: "O",
                    p2move: ""
                }

                let obj={
                    p1: p1,
                    p2: p2,
                    sum: 1,
                }
            
            playingArr.push(obj)
            console.log(playingArr)
            waitingArr.splice(0, 2)


            io.emit("find", {allPlayers: playingArr})

            }
        }
    })

    socket.on("playing", (e)=> {

        if(e.value == "X") {

            let objToChange=playingArr.find(obj => obj.p1.p1name === e.name)

            console.log(objToChange)

            objToChange.p1.p1move=e.id
            objToChange.sum++
        }
        else if(e.value == "O") {

            let objToChange=playingArr.find(obj => obj.p2.p2name === e.name)

            console.log(objToChange)

            objToChange.p2.p2move=e.id
            objToChange.sum++
        }

        io.emit("playing", {allPlayers:playingArr})

    })

    socket.on("gameOver", (e) => {
        playingArr = playingArr.filter(obj=>obj.p1.p1name!==e.name)
        console.log(playingArr)
    })

    socket.on("leave", (e) => {
        io.emit("left", {name:e.name})
    })

})


app.get("/", (req, res) => {
    return res.sendFile("index.html")
})


server.listen(3000, () => {
    console.log("port connected to 3000")
})