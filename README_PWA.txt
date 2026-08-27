DSCAN v4.6.19 PWA — Data Persistence Recovery Fix

GitHub Pages 배포 시 이 폴더의 내용을 dscan 저장소 루트에 그대로 업로드하세요.
- index.html
- sw.js
- dscan.webmanifest
- icons/

중요: 기존 v4.6.15 사용자는 새 sw.js까지 반드시 함께 교체해야 새 캐시 버전으로 전환됩니다.

핵심 안정화:
1) Active Session이 History에서 누락되어도 삭제하지 않고 History를 복구
2) 입력 중 260ms debounce 저장 + background/pagehide/beforeunload 즉시 checkpoint
3) localStorage active session 저장 실패 시 IndexedDB 복구 mirror 저장 시도
4) 다음 시작에서 SESSION_KEY가 없으면 IndexedDB mirror를 복구 후 1회 reload
5) History 저장 실패는 Active Session 삭제 사유가 아님

사진 Blob 자체는 기존 DSCAN 사진 persistence 체계를 그대로 사용합니다.


[2026-08-24] v4.6.19: 강평 관계법령 canonical row 직접 렌더링 및 LawDB 상세 연결.


[v4.6.25] Critical Runtime Journal: 평가점수/평가상태/결과분류/부적합사항/강평체크를 세션별 초경량 Journal로 이중 보호. Resume은 Master 재생성이 아닌 canonical session snapshot을 복원합니다.


v4.6.25: 안전병합 충돌 상세보기 및 필드별 현재값 유지/ZIP값 선택 적용 UI 추가. 기존 병합 판정/사진 합집합/비충돌 자동병합 규칙은 유지.
