
# 세종대학교 인터페이스 해커톤  
  ![img](https://img.shields.io/badge/Platform-AWS-orange) ![project_start_date](https://img.shields.io/badge/Project%20Start%20Date-2019--08--22-informational.svg)
  
>세종대학교 프로그래밍 동아리 인터페이스 인페톤

## 📖프로젝트 소개
세종대 중앙 프로그래밍 동아리 인터페이스 웹사이트 재개발 & SKT AI 스피커 플렛폼 NUGU 인터페이스 Play 프로젝트를 동시에 진행했습니다.

## 📜기획 동기
기존 [인터페이스 소개 페이지](http://interface.or.kr/)는 github 기반의 정적 웹 사이트로, 별다른 기능이 없고 업데이트에 불편함이 있어 신입생 모집외에는 잘 사용되지 않는 상황이었음.

또한, 동아리를 위해 해커톤, 프로그래밍 전시회 등에서 다양한 프로그램이 개발되었음에도 불구하고 이를 배포하고 사용할 플렛폼이 없었음.

이를 위해 인터페이스 대내외의 홍보, 정보 공유, 프로그램 플렛폼으로서 활용하기 위해 인페 웹사이트의 개편과 더불어 동방에 있는 NUGU를 활용한 스피치봇 개발을 하기로 했음.

## 📋인터페이스 웹 Ver.2
기존 인터페이스 웹사이트의 디자인 방향성은 유지하되, 기능을 추가하는 방향으로 진행하였다.

정적웹이었던 기존 웹사이트에 SQLite DB를 붙이고 장고로 이전하여 동적웹으로 만들고 AWS EB로 배포하였다.

현재 기존 웹사이트의 코드가 방대하여 컨버팅 작업을 진행중에 있어 아직 메인페이지외에 기능이 불안정할 수 있다.

### 🗓️캘린더
동아리 행사(인커톤, 프로그래밍 전시회 등)와 학사 일정(개강, 수강신청 등)을 DB 기반으로 띄워주는 캘린더.

[캘린더 API](https://fullcalendar.io/) 위에 일정을 입혀주는 기능은 직접 구현하였다.

현재 동아리 행사는 admin 계정을 이용하여 직접 등록할 수 있으며, 학사 일정은 크롤러를 이용해 주기적으로 업데이트하는 방식을 취할 예정이다.

## 💬NUGU speechbot
SKT 스마트 스피커 NUGU 플랫폼에서 동작하는 speechbot을 개발하였다.

주요 기능은 동아리 일정 조회와 학교 커리큘럼 조회가 있으며, 추후 다른 동아리 내 프로젝트와 연계한 동방 인원 수 확인 등의 기능이 업데이트 될 예정이다.

이 코드에서는 NUGU request를 처리하는 API를 구현했는데, NUGU 요청을 전담하는 URL을 만들고, 그 위에 커스텀 view를 통해 JSON을 response 하는 API를 구현하였다.

JSON request 처리 과정에서 JSON decode에 문제가 있어 임시로 Custom JSON Handler를 구현했는데, 많이 불안정하므로 빠른 시일내에 패치할 예정이다.

## 👩‍💻  System requirements
기본적인 요구사항은 `requirements.txt`에도 기술되어 있지만, 로컬 실행을 위해서는 아래 과정을 거쳐 패키지를 설치하고 첨부된 `github_settings.py`를 `settings.py`로 바꾼 후, 임의의 secret_key를 넣고 django를 실행하면 된다.

```
pip install django
```

## 참여자  
[백지오](https://www.github.com/skyil7)  : 기획, Django/API 백엔드
  
[김태균](https://www.github.com/WhiskyHolic) : 프론트 엔드, JavaScript 개발 및 UX 디자인

*****Special Thanks to original Interface web developers below*****

-   17학번 [강동민](https://github.com/riyenas0925) 전자정보통신공학과
-   17학번 김진성 지능기전공학부
-   17학번 박나영 컴퓨터공학과
-   17학번 [이경은](https://github.com/2kyung19) 바이오산업자원공학과
-   17학번 [이동엽](https://github.com/MovedSide) 컴퓨터공학과
-   17학번 오경식 지능기전공학부