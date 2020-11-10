

    function gameBoard() {
        let player1 = true;
        let count = 9;

        class Box {
            constructor(value, index) {
                this.value = value;
                this.index = index;
                this.domElem = this.domElement();
            }

            domElement() {
                let box = document.createElement('div');
                box.classList.add('box');
                if (this.value !== -1) {
                    box.textContent = this.value;
                }
                //box.textContent = this.index;
                box.setAttribute('id', this.index);
                return box;
            }
        }

        let board = [];

        for (let i = 0; i < 9; i++) {
            let box = new Box(-1, i);
            board.push(box);
            if(i >= 0 && i <= 2){
                box.domElem.style.borderTop= 'none';
            }
            if(i >= 6 && i<= 8){
                box.domElem.style.borderBottom = 'none';
            }
            switch (i) {
                case 0:
                case 3:
                case 6: box.domElem.style.borderLeft = 'none';break;
                case 2:
                case 5:
                case 8: box.domElem.style.borderRight = 'none';break;
            }
            document.querySelector('.game-board').appendChild(box.domElem);
            box.domElem.addEventListener('click', clickHandler);
        }

        function clickHandler() {
            let index = parseInt(this.getAttribute('id'));
            let h = document.querySelector('h1');
            let box = board[index];
            if (box.value === -1) {

                if (player1) {
                    box.domElem.innerHTML = 'X';
                    box.value = 0;
                    h.textContent = "Player 2";
                    h.setAttribute('class', 'red')

                } else {
                    box.domElem.innerHTML = 'O';
                    box.value = 1;
                    h.textContent = "Player 1";
                    h.setAttribute('class', 'yellow')
                }
                player1 = !player1;
                count--;

                checkTie();

                announceWinner(checkWinner());
            }

        }

        function checkWinner() {
            let array = [];
            board.forEach((elem) => {
                array.push(elem.value);
            });
            for (let i = 0; i < array.length; i += 3) {
                if (array[i] === -1) continue;
                if (array[i] === array[i + 1] && array[i] === array[i + 2]) {
                    tiktok(board[i].domElem.firstChild);
                    tiktok(board[i + 1].domElem.firstChild);
                    tiktok(board[i + 2].domElem.firstChild);
                    return array[i];
                }
            }
            for (let i = 0; i < array.length / 3; i++) {
                if (array[i] === -1) continue;
                if (array[i] === array[i + 3] && array[i] === array[i + 6]) {
                    tiktok(board[i].domElem.firstChild);
                    tiktok(board[i + 3].domElem.firstChild);
                    tiktok(board[i + 6].domElem.firstChild);
                    return array[i];
                }
            }
            if (array[0] !== -1 || array[2] !== -1) {
                if ((array[0] === array[4] && array[0] === array[8]) &&
                    (array[0] !== -1 && array[4] !== -1 && array[8] !== -1)) {
                    tiktok(board[0].domElem.firstChild);
                    tiktok(board[4].domElem.firstChild);
                    tiktok(board[8].domElem.firstChild);
                    return array[0];
                }
                if ((array[2] === array[4] && array[2] === array[6]) &&
                    (array[2] !== -1 && array[4] !== -1 && array[6]!== -1)
                ) {
                    tiktok(board[2].domElem.firstChild);
                    tiktok(board[4].domElem.firstChild);
                    tiktok(board[6].domElem.firstChild);
                    return array[2];
                }
            }
        }

        function tiktok(domElem) {
            setInterval(() => {
                domElem.classList.toggle('_hide');
            }, 500)
        }

        function checkTie() {
            let h1 = document.querySelector('h1');
            if (count === 0) {
                h1.textContent = "It's a Tie";
                h1.style.color = '#ff6347';
                h1.classList.remove('bottomIn');
                tiktok(h1);
            }
        }

        function announceWinner(value) {
            if(value === null) return;
            let h1 = document.querySelector('h1');
            h1.classList.remove('bottomIn');
            if (value === 0) {
                h1.textContent = "Player 1 Wins";
                h1.style.color = '#21e271';
                deattachEventListeners();
                tiktok(h1);
            } else if (value === 1) {
                h1.textContent = "Player 2 Wins";
                h1.style.color = '#21e271';
                deattachEventListeners();
                tiktok(h1);
            }
        }

        function deattachEventListeners() {
            let doms = document.querySelectorAll('.box');
            doms.forEach((elem) => {
                elem.removeEventListener('click', clickHandler);
            });
        }
    }
    gameBoard();

    document.querySelector('#resetBtn').addEventListener('click',()=>{
        location.reload();
    })

