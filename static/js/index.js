const 정답 = "APPLE";
let index = 0;
let attempts = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다";
    //직접 css (지양하는방법)
    div.style =
      " display: flex; justify-content: center; align-items: center; position:absolute; top:40vh; left:38vw;  background-color: white;";
    document.body.appendChild(div);
  }; // `displayGameover` 함수 끝나는 중괄호 추가

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover(); // 게임 종료 메시지 표시
  };

  const nextLine = () => {
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0; //변수이름 오타..나서 not defined

    if (index < 5) return; // Ensure all characters are entered before processing
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      // console.log(block.innerText);

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      //console.log("입력한 글자 : ", 입력한_글자, "정답_글자 : ", 정답_글자);
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#67B360";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#777e7f";
      }
      block.style.color = "white";
    } // for 루프 끝나는 중괄호

    if (맞은_갯수 === 5) gameover(); //게임이 종료되면 이벤트리스너를지우자!
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  }; // handleBackspace 함수의 중괄호 수정

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();

    if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey(); // Ensure Enter key only processes when index is 5
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      if (thisBlock) {
        thisBlock.innerText = key;
        index += 1;
      }
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      //js 내장함수
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간); // Date 객체로감싸줘야함!(getMinutes..등의 메소드사용을위해서)

      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0"); ///숫자
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
    //console.log(timer); //setInterval의 id로 게임오버일떄 clear
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

// const 정답 = "APPLE";
// let index = 0;
// let attempts = 0;

// function appStart() {
//   const nextLine = () => {
//     attempts += 1;
//     index = 0;
//   };

//   const gameover = () => {
//     window.removeEventListener("keydown", handleKeydown);
//   };

//   const handleEnterKey = () => {
//     let 맞은_갯수 = 0; //변수이름 오타..나서 not defined

//     if (index < 5) return; // Ensure all characters are entered before processing
//     for (let i = 0; i < 5; i++) {
//       const block = document.querySelector(
//         `.board-column[data-index='${attempts}${i}']`
//       );
//       // console.log(block.innerText);

//       const 입력한_글자 = block.innerText;
//       const 정답_글자 = 정답[i];
//       //console.log("입력한 글자 : ", 입력한_글자, "정답_글자 : ", 정답_글자);
//       if (입력한_글자 === 정답_글자) {
//         맞은_갯수 += 1;
//         block.style.background = "#67B360";
//       } else if (정답.includes(입력한_글자)) {
//         block.style.background = "#C9B458";
//       } else block.style.background = "#777e7f";
//       block.style.color = "white";
//     } // for 루프 끝나는 중괄호!!! -> 진짜 이것때문에 엔터시 색변경안됨...

//     if (맞은_갯수 === 5) gameover(); //게임이 종료되면 이벤트리스너를지우자!
//     else nextLine();
//   };

//   // attempts++;
//   // index = 0; // Reset index for the next attempt
//   //};

//   const handleKeydown = (event) => {
//     const key = event.key.toUpperCase();
//     const keyCode = event.keyCode;
//     const thisBlock = document.querySelector(
//       `.board-column[data-index='${attempts}${index}']`
//     );

//     if (index === 5) {
//       if (event.key === "Enter") {
//         handleEnterKey(); // Ensure Enter key only processes when index is 5
//       } else {
//         return;
//       }
//     } else if (65 <= keyCode && keyCode <= 90) {
//       if (thisBlock) {
//         thisBlock.innerText = key;
//         index += 1;
//       }
//     }
//   };

//   window.addEventListener("keydown", handleKeydown);
// }

// appStart();
