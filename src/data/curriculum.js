// src/data/curriculum.js

export const curriculum = {
  html: {
    title: "HTML 기초 맛보기",
    description: "웹 페이지의 뼈대를 만드는 가장 기본적인 태그들을 배워봅니다.",
    lessons: [
      {
        id: "headings",
        title: "1. 제목 태그 (Headings)",
        theory: `
          <h3>가장 중요한 글자, 제목</h3>
          <p>HTML에서 제목을 나타낼 때는 <code>&lt;h1&gt;</code>부터 <code>&lt;h6&gt;</code>까지의 태그를 사용합니다.</p>
          <p>숫자가 작을수록 화면에서 <strong>더 크고 굵게</strong> 표시되며, 보통 페이지의 메인 제목은 <code>&lt;h1&gt;</code>을 하나만 사용합니다.</p>
        `,
        examples: [
          { code: "<h1>가장 큰 제목 (h1)</h1>", description: "페이지의 메인 제목" },
          { code: "<h2>두 번째로 큰 제목 (h2)</h2>", description: "섹션의 제목" },
          { code: "<h3>세 번째 제목 (h3)</h3>", description: "소제목" }
        ],
        quiz: {
          question: "다음 중 화면에 가장 작은 글씨 크기로 렌더링되는 제목 태그는 무엇일까요?",
          type: "multiple",
          options: ["<h1>", "<h3>", "<h6>", "<p>"],
          answer: 2, // index of "<h6>"
          explanation: "h1부터 h6까지 숫자가 커질수록 글자 크기는 작아집니다."
        }
      },
      {
        id: "paragraphs",
        title: "2. 문단과 버튼 (Paragraph & Button)",
        theory: `
          <h3>글을 쓰고 누를 수 있게 만들기</h3>
          <p><code>&lt;p&gt;</code> 태그는 일반적인 텍스트 문단(Paragraph)을 뜻합니다. 글 내용을 작성할 때 주로 씁니다.</p>
          <p>그리고 <code>&lt;button&gt;</code> 태그를 사용하면 사용자가 클릭할 수 있는 아주 직관적인 버튼이 생깁니다.</p>
        `,
        examples: [
          { code: "<p>저는 평범한 글이 적히는 문단입니다. 화면의 공간을 넓게 차지합니다.</p>", description: "일반 텍스트" },
          { code: "<button>나를 클릭해보세요!</button>", description: "클릭 가능한 버튼 요소" }
        ],
        quiz: {
          question: "일반적인 텍스트 문단을 작성할 때 사용하는 태그는 무엇일까요?",
          type: "fill-in",
          template: "<[   ]>안녕하세요!</p>", // user needs to type 'p'
          answer: "p",
          explanation: "<p> 태그는 문단을 의미합니다."
        }
      }
    ],
    practice: {
      title: "💻 개인 프로필 카드 만들기 (HTML)",
      html: `<!-- 프로필 카드 뼈대를 만들어보세요 -->
<div class="profile-card">
  <!-- 1. 가장 큰 제목 태그(h1)로 자신의 이름을 적어보세요 -->
  <h1>여기에 이름을 입력하세요</h1>
  
  <!-- 2. 문단 태그(p)로 자신을 소개해보세요 -->
  <p>안녕하세요! 코딩을 막 시작한 초보 개발자입니다.</p>
  
  <!-- 3. 버튼(button) 태그를 만들어 "팔로우" 버튼을 추가해보세요 -->
  
</div>`,
      css: `.profile-card {
  max-width: 300px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

img {
  width: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}  

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}`,
      js: ""
    }
  },
  css: {
    title: "CSS 예쁘게 꾸미기",
    description: "뼈대에 색을 입히고 예쁘게 배치하는 마법 같은 스타일링을 배웁니다.",
    lessons: [
      {
        id: "colors",
        title: "1. 텍스트와 배경 색상 (Color)",
        theory: `
          <h3>원하는 색깔 칠하기</h3>
          <p>CSS를 사용하면 텍스트 색상(<code>color</code>)과 배경색(<code>background-color</code>)을 자유자재로 바꿀 수 있습니다.</p>
          <p>색상 이름(red, blue)을 넣거나, #으로 시작하는 헥스 코드(#ff0000)를 사용할 수 있습니다.</p>
        `,
        examples: [
          { code: "<div style='color: #2563eb; font-weight: bold;'>파란색 글씨입니다.</div>", description: "color 속성 사용" },
          { code: "<div style='background-color: #fef08a; padding: 10px;'>노란 배경의 상자입니다.</div>", description: "background-color 속성 사용" }
        ],
        quiz: {
          question: "요소의 '배경색'을 검은색으로 바꾸고 싶습니다. 빈칸에 들어갈 속성은 무엇일까요?",
          type: "fill-in",
          template: "[             ]: black;", // user needs to type 'background-color'
          answer: "background-color",
          explanation: "배경색은 background-color 요소로 제어합니다."
        }
      }
    ],
    practice: {
      title: "💻 카페 소개 페이지 꾸미기 (CSS)",
      html: `<div class="cafe-page">
  <div class="hero-image"></div>
  <div class="content">
    <h1>Cafe Moonlight</h1>
    <p>도심 속의 작은 휴식처, 카페 문라이트에 오신 것을 환영합니다.</p>
    <button class="menu-btn">메뉴 보기</button>
  </div>
</div>`,
      css: `/* 카페 페이지를 예쁘게 꾸며보세요! */
.cafe-page {
  font-family: 'sans-serif';
  background-color: #f9f9f9;
}

.hero-image {
  width: 100%;
  height: 200px;
  background-image: url('/assets/cafe_header.png');
  background-size: cover;
  background-position: center;
}

.content {
  padding: 30px;
  text-align: center;
}

h1 {
  /* 1. 카페 이름의 색상을 어두운 갈색(#4b3832)으로 변경해보세요 */
  color: #000000;
}

.menu-btn {
  /* 2. 버튼의 배경색을 따뜻한 오렌지색(#f08a5d)으로 변경해보세요 */
  background-color: #aaaaaa;
  
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}`,
      js: ""
    }
  },
  js: {
    title: "JavaScript 생명력 불어넣기",
    description: "버튼을 눌렀을 때 반응하는 등의 동적 작동 로직을 배웁니다.",
    lessons: [
       {
        id: "events",
        title: "1. 이벤트와 경고창 (Events & Alert)",
        theory: `
          <h3>사용자 행동에 반응하기</h3>
          <p>자바스크립트로 HTML 요소를 찾은 뒤, 클릭(click) 같은 이벤트가 발생할 때 특정 코드가 실행되도록 만들 수 있습니다.</p>
          <p><code>alert('메시지')</code> 함수를 쓰면 화면에 작은 팝업창을 띄울 수 있습니다.</p>
        `,
        examples: [
          { code: "<button onclick='alert(\"안녕하세요!\")'>눌러서 인사받기</button>", description: "클릭하면 실행되는 alert" }
        ],
        quiz: {
          question: "버튼을 클릭했을 때 발생하는 이벤트의 이름은 무엇일까요? 보통 addEventListener('이것', ...) 형태로 쓰입니다.",
          type: "fill-in",
          template: "addEventListener('[     ]', ...)",
          answer: "click",
          explanation: "버튼 등을 눌렀을 때 감지하는 가장 대표적인 이벤트는 click입니다."
        }
      }     
    ],
    practice: {
      title: "💻 사용자 상호작용 추가하기 (JS)",
      html: `<div class="interactive-card">
  <img src="/assets/profile_avatar.png" class="avatar" alt="Avatar">
  <h2>익명의 코더</h2>
  <p>저를 몇 번 눌렀는지 맞춰보세요!</p>
  <button id="likeBtn">❤️ 좋아요 (0)</button>
</div>`,
      css: `.interactive-card {
  max-width: 320px;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}
.avatar { width: 100px; border-radius: 50%; }
button {
  background-color: #ef4444; color: white; border: none;
  padding: 10px 20px; border-radius: 20px; font-weight: bold;
  cursor: pointer; margin-top: 15px; transition: transform 0.1s;
}
button:active { transform: scale(0.95); }`,
      js: `// 엘리먼트를 가져옵니다.
const btn = document.getElementById("likeBtn");
let count = 0;

if (btn) {
  // 1. 버튼 클릭(click) 이벤트를 감지하도록 코드를 완성해보세요.
  btn.addEventListener("click", () => {
    
    // 이 안의 코드가 클릭될 때마다 실행됩니다.
    // 2. 누를 때마다 count가 1씩 증가하도록 만들어보세요.
    count = count + 1;
    
    btn.innerText = "❤️ 좋아요 (" + count + ")";
    
    // 3. 만약 5번 이상 누르면 alert 창을 띄워보세요!
    // if (count >= 5) { ... }
    
  });
}`
    }
  }
}
