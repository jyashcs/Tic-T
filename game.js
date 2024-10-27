let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let turn = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn) {
                box.innerText = "X";
                box.classList.add("turn-x");
                box.classList.remove("turn-o")
            } else {
                box.innerText = "O";
                box.classList.add("turn-o");
                box.classList.remove("turn-x");
            }
            turn = !turn;
            count++;
            box.disabled = true;
            checkWinner();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return; 
        }
    }
    if (count === 9) {
        showDrawMatch();
    }
};

const showDrawMatch = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is '${winner}'`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    turn = true;
    count = 0;
};

newGameBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
});

resetBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
});