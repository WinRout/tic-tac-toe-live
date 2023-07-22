const express=require("express")
const app=express()

const path=require("path")
const http=require("http")
const { Server } = require("socket.io")

const hostname = '0.0.0.0'
const port = 3000


const server=http.createServer(app)

const io=new Server(server)
app.use(express.static(path.resolve("")))

let waitingArr=[]
let playingArr=[]

io.on("connection", (socket) => {

    socket.on("find", (e) => {
        if (e.name == waitingArr[0]) {
            io.emit("find", {name: e.name, error: 'Username already exists'})
        }
        if(e.name!=null && e.name!=waitingArr[0]) { 

            waitingArr.push(e.name)
            console.log("Waiting : ", waitingArr)
            io.emit("waiting", {name: e.name});

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
            console.log("New Game: ", playingArr)
            waitingArr.splice(0, 2)


            io.emit("find", {allPlayers: playingArr})

            }
        }
    })

    socket.on("playing", (e)=> {

        if(e.value == "X") {

            let objToChange=playingArr.find(obj => obj.p1.p1name === e.name)

            objToChange.p1.p1move=e.id
            objToChange.sum++
        }
        else if(e.value == "O") {

            let objToChange=playingArr.find(obj => obj.p2.p2name === e.name)

            objToChange.p2.p2move=e.id
            objToChange.sum++
        }

        io.emit("playing", {allPlayers:playingArr})

    })

    socket.on("gameOver", (e) => {
        playingArr = playingArr.filter(obj=>obj.p1.p1name!==e.name)
        console.log("Game Over:", playingArr)
    })

    socket.on("leave", (e) => {
        io.emit("left", {name:e.name})
        playingArr = playingArr.filter(obj=>obj.p1.p1name!==e.name)
        playingArr = playingArr.filter(obj=>obj.p2.p2name!==e.name)
        console.log(e.name, " left: ", playingArr)
    })

})


app.get("/", (req, res) => {
    console.log("new entry")
    return res.sendFile("index.html")
})

app.get("/api/waiting", (req, res) => {
    data = []
    waitingArr.forEach((item) => {
        data.push(`{name: ${item}}`)
    })
    res.json(data)
})

app.get("/api/playing", (req, res) => {
    res.json(playingArr)
})


server.listen(port, hostname, () => {
    console.log("port connected to ", port)
})