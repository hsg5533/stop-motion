const totalImages = 59; // 0~58까지 총 59장
const displayedImage = document.getElementById("displayed-image");
const playButton = document.getElementById("play-button");

let imageIndex = 0; // 현재 이미지 인덱스
let intervalId = null; // 자동 재생 setInterval ID
let isPlaying = false; // 재생 여부
let isReversed = false; // 자동 재생 시 역방향 여부
let isDragging = false; // 드래그 중인지 여부
let startX = 0; // 드래그 시작 위치
let currentX = 0; // 현재 마우스 위치

// 이미지 변경 함수
function changeImage() {
  const imageNumber = imageIndex.toString().padStart(2, "0"); // 두 자리 숫자로 변환
  displayedImage.src = `./img/chamber_3_${imageNumber}.jpg`;

  if (isReversed) {
    imageIndex--;
    if (imageIndex < 0) {
      imageIndex = 1;
      isReversed = false;
    }
  } else {
    imageIndex++;
    if (imageIndex >= totalImages) {
      imageIndex = totalImages - 1;
      isReversed = true;
    }
  }
}

// 재생 버튼 클릭 이벤트
playButton.addEventListener("click", () => {
  if (isPlaying) {
    clearInterval(intervalId);
    playButton.textContent = "재생";
  } else {
    intervalId = setInterval(changeImage, 100); // 100ms마다 이미지 변경
    playButton.textContent = "정지";
  }
  isPlaying = !isPlaying;
});

// 마우스 드래그 시작
document.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.clientX;
});

// 마우스 드래그 중
document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  currentX = event.clientX;
  let deltaX = currentX - startX; // 움직인 거리
  if (Math.abs(deltaX) > 10) {
    // 이동 감지 최소 임계값
    if (deltaX > 0) {
      // 오른쪽으로 드래그 → 순방향 (00 → 58)
      imageIndex = Math.min(imageIndex + 1, totalImages - 1);
    } else {
      // 왼쪽으로 드래그 → 역방향 (58 → 00)
      imageIndex = Math.max(imageIndex - 1, 0);
    }
    startX = currentX; // 새로운 기준점 설정
    changeImage();
  }
});

// 마우스 드래그 종료
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// 터치 이벤트 (모바일 지원)
document.addEventListener("touchstart", (event) => {
  isDragging = true;
  startX = event.touches[0].clientX;
});

document.addEventListener("touchmove", (event) => {
  if (!isDragging) return;
  currentX = event.touches[0].clientX;
  let deltaX = currentX - startX;
  if (Math.abs(deltaX) > 10) {
    if (deltaX > 0) {
      imageIndex = Math.min(imageIndex + 1, totalImages - 1);
    } else {
      imageIndex = Math.max(imageIndex - 1, 0);
    }
    startX = currentX;
    changeImage();
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});
