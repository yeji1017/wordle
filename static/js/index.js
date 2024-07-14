const 정답 = "APPLE";
let index = 0;
let attempts = 0;

function appStart() {
  const nextLine = () => {
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
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
      } else block.style.background = "#777e7f";
      block.style.color = "white";
    } // for 루프 끝나는 중괄호!!! -> 진짜 이것때문에 엔터시 색변경안됨...

    if (맞은_갯수 === 5) gameover(); //게임이 종료되면 이벤트리스너를지우자!
    else nextLine();
  };

  // attempts++;
  // index = 0; // Reset index for the next attempt
  //};

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

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

  window.addEventListener("keydown", handleKeydown);
}

appStart();
