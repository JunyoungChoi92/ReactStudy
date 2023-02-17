import { Nav } from "react-bootstrap";
import { useState } from "react";

function TabContents({ v }) {
  if (v == 0) {
    return (
      <div>
        웹사이트의 모습을 기술하기 위한 마크업 언어. 프로그래밍 언어가 아니라ß
        마크업 정보를 표현하는 마크업 언어로 문서의 내용 이외의 문서의 구조나
        서식 같은 것을 포함한다. 보면 알겠지만 애초에 이름 HTML의 ML이 마크업
        언어라는 뜻이다. 웹사이트에서 흔히 볼 수 있는 htm이나 html 확장자가 바로
        이 언어로 작성된 문서다. 최초 제안자는 CERN의 물리학자 티머시 J.
        버너스리이다. URL, HTTP, WWW의 전신인 Enquire 등도 그가 세트로 개발하고
        제안했다. 나무위키에서는 아래와 같이 내용을 집어넣어 HTML을 적용시킬 수
        있지만 도움말에 의하면 지원 종료 가능성이 있는 비권장 문법이므로
        나무위키에서는 HTML 태그를 사용하지 않는 것을 추천한다.
      </div>
    );
  } else if (v == 1) {
    return (
      <div>
        HTML 등의 마크업 언어로 작성된 문서가 실제로 웹사이트에 표현되는 방법을ß
        정해주는 스타일 시트 언어. CSS의 C가 Cascading의 약자인데, 이는 상위
        요소의 스타일 속성을 자손 요소들에게 상속시켜주는 모습이 DOM
        트리구조에서 마치 폭포수처럼 내려가는 모습을 닮았기 때문이다. 다만
        예외로 마진, 패딩, 보더 등의 박스모델 관련 속성은 상속되지 않는다. 물론
        inherit 값을 줘서 강제로 상속시킬 순 있다.
      </div>
    );
  } else if (v == 2) {
    return (
      <div>
        Ecma International의 프로토타입 기반의 프로그래밍 언어로, 스크립트
        언어에 해당된다. 특수한 목적이 아닌 이상 모든 웹 브라우저에 인터프리터가
        내장되어 있다. 오늘날 HTML, CSS와 함께 웹을 구성하는 요소 중 하나다.
        HTML이 웹 페이지의 기본 구조를 담당하고, CSS가 디자인을 담당한다면
        JavaScript는 클라이언트 단에서 웹 페이지가 동작하는 것을 담당한다. 웹
        페이지를 자동차에 비유하자면, HTML은 자동차의 뼈대, CSS는 자동차의 외관,
        JavaScript는 자동차의 동력원인 엔진이라고 볼 수 있다.
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}

export function TabUI() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setKey(0)} eventKey="link0">
            HTML
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setKey(1)} eventKey="link1">
            CSS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setKey(2)} eventKey="link2">
            JAVASCRIPT
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContents v={key}></TabContents>
    </div>
  );
}
