let play_one_last_point;
let play_two_last_point;

document.querySelectorAll(".point_hidden").forEach(point => {
    point.addEventListener("click", () => {
        addPoint(point.id, play_one_last_point, "player1")
    })
})

document.querySelectorAll(".two_point_hidden").forEach(point => {
    point.addEventListener("click", () => {
        addPoint(point.id, play_two_last_point, "player2")
    })
})

document.querySelectorAll(".stones").forEach(stone => {
    stone.addEventListener("dragstart", (e) =>{
        dragStart(e)
    })
    stone.addEventListener("click", () => {
        flipStone(stone.id)
    })
})

document.querySelectorAll(".board_slots").forEach(slot => {
    slot.addEventListener("dragover", (e) => {
        dragOver(e)
    })
    slot.addEventListener("drop", (e) => {
        drop(e)
    })
})

function addPoint(point_id, play_last_point_active, player){

    const point_element_id = document.getElementById(`${point_id}`)

    if(play_last_point_active == undefined){
        point_element_id.classList.add("point_active")
    }
    else{
        document.getElementById(play_last_point_active).classList.remove("point_active")
        point_element_id.classList.add("point_active")
    }

    if(player == "player1"){
        play_one_last_point = `${point_id}`
        console.log("p1")
    }
    else
    {
        console.log("p2")
        play_two_last_point = `${point_id}`
    }
}

function flipStone(stone_id){
    const stone = document.getElementById(`${stone_id}`)
    
    if(stone.className.includes("stone__flip-side")){
        stone.classList.remove("stone__flip-side")
        stone.src = `./imgs/${stone_id}.png`
        console.log(stone.src)
    }
    else{
        stone.classList.add("stone__flip-side")
        stone.src = ""
    }
}

function dragStart(e){
    e.dataTransfer.setData("text/plain", e.target.id)
}

function dragOver(e){
    e.preventDefault()
}

function drop(e){
    const stone = e.dataTransfer.getData("text")
    const stoneElement = document.getElementById(`${stone}`)
    const target = e.target
    const board_nodeList = [...document.querySelectorAll(".board_slots")]
    let stonePosition;

    if(target == stoneElement.parentElement || target == stoneElement || target.children.length == 1){
        return
    }

    if(target.className == "board_slots" && target.children.length == 0){
        target.appendChild(stoneElement)
    }
    else if(stoneElement.parentElement.className == "start_area"){
        return
    }
    else{
        for(let i = 0; i < board_nodeList.length; i++){
            if(board_nodeList[i].children[0] == stoneElement){
                stonePosition = i
            }
        }

        target.parentElement.appendChild(stoneElement)
        board_nodeList[stonePosition].appendChild(target)
    }



}