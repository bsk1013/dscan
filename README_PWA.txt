디스캔(DSCAN) PWA 패키지

구성
- index.html : DSCAN v4.6.14 기반 + PWA 메타데이터/Service Worker 등록만 국소 추가
- dscan.webmanifest : 앱 이름 디스캔(DSCAN), standalone 설정
- sw.js : 앱 셸 및 CDN 라이브러리 오프라인 캐시
- icons/ : 사용자 제공 favicon.pub 아이콘 원본

배포
1) 이 폴더의 파일/폴더 구조를 그대로 GitHub Pages 루트(또는 동일한 HTTPS 웹 루트)에 업로드합니다.
2) 반드시 HTTPS 또는 localhost에서 실행해야 PWA 설치/Service Worker가 작동합니다. file:// 직접 실행에서는 PWA 등록이 동작하지 않습니다.
3) Chrome/Edge/Android에서는 브라우저의 '앱 설치' 메뉴로 설치할 수 있습니다.
4) iPhone/iPad Safari에서는 공유 → 홈 화면에 추가를 사용합니다.

보호 원칙
- Service Worker는 DSCAN의 localStorage, IndexedDB, 세션, 사진, ZIP, 완료/LOCK 데이터를 수정하지 않습니다.
- PWA 추가는 앱 셸(HTML/manifest/icon/CDN 정적 라이브러리) 캐시에 한정됩니다.
