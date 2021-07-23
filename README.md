# -Wetube Reloaded

/ -> Home 메인
/join -> Join 회원가입
/login -> Login 로그인 페이지
/search -> Search 검색 페이지
----여기까지가 글로벌 라우터 이다----

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My profile 유저 정보 수정
/users/delete -> Delete My profile 유저 정보 삭제
----여기까지 유저 라우터이다 해당 컨트롤러는 현재 로그인 중인 유저만 가능하다.----

/videos/:id -> Watch video 동영상 시청 페이지
/videos/:id/edit -> Edit Video 동영상 수정 페이지
/videos/:id/delete -> Delete Video 동영상 상제 페이지
/videos/upload -> Upload video
----여기까지 동여상 라우터 이다----

- 라우터를 도메인 별로 나누는 것이 가장 최고의 방법이다.
- 유저 URL과 동영상 URL을 각각의 ROUTER에 집어넣자.
- 위에서 보듯이 users와 videos가 라우더가 된다.

** 규칙의 예외 사항 **
- 마케팅 적인 측면때문에
