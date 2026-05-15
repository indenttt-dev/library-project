# library-project

## 브랜치 전략

기본 브랜치는 아래처럼 사용합니다.

- `main`: 최종 안정본을 관리하는 브랜치
- `develop`: 각 기능 브랜치의 작업을 모으는 개발 통합 브랜치
- `feature/*`: 페이지별 기능 작업 브랜치

### 기능 브랜치 구분

- `feature/1-index`: 홈 화면 작업 (`index.html`)
- `feature/2-search`: 자료 이용 페이지 작업 (`pages/search.html`)
- `feature/3-recommend`: 추천 도서 페이지 작업 (`pages/recommend.html`)
- `feature/4-facility`: 시설 이용 페이지 작업 (`pages/facility.html`)
- `feature/5-mypage`: 마이페이지 작업 (`pages/mypage.html`)
- `feature/6-login`: 로그인 페이지 작업 (`pages/login.html`)

### 공통 파일 작업

- `css/` 공통 스타일 수정: 해당 페이지 기능 브랜치에서 함께 수정하거나, 여러 페이지에 공통으로 영향을 주는 경우 `style/common-css` 브랜치 사용
- `js/` 공통 스크립트 수정: 여러 페이지 공통 작업인 경우 `refactor/common-js` 브랜치 사용
- `images/` 이미지 추가 및 교체: 관련 기능 브랜치에서 함께 수정

## 작업 절차

1. 작업 전 `develop` 브랜치를 최신화합니다.

```bash
git switch develop
git pull origin develop
```

2. 작업 브랜치를 생성합니다.

```bash
git switch -c feature/브랜치이름
```

3. 파일을 수정한 뒤 변경 사항을 확인합니다.

```bash
git status
```

4. 필요한 파일을 추가하고 커밋합니다.

```bash
git add .
git commit -m "type: short description"
```

5. 원격 저장소에 올립니다.

```bash
git push -u origin 브랜치이름
```

6. GitHub에서 Pull Request를 생성합니다.

- base: `develop`
- compare: 작업 브랜치

7. 기능 작업이 충분히 완료되면 `develop`에 merge합니다.

8. 최종 안정본이 준비되면 `develop`에서 `main`으로 merge합니다.

## 커밋 메시지 규칙

커밋 메시지는 아래 형식을 사용합니다.

```text
type: short description
```

### 자주 사용하는 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `style`: 들여쓰기, 코드 정렬, 공백 등 동작 변화 없는 스타일 수정
- `refactor`: 기능 변화 없이 코드 구조 개선
- `docs`: README 등 문서 수정
- `chore`: 프로젝트 설정, 폴더 구조, 기타 유지보수 작업

### 예시

```text
chore: set up project structure
style: format home page code
style: format common css
refactor: organize common js
feat: add login page layout
fix: correct search page link path
docs: update README workflow
```

## 권장 사용 방식

- 초기 프로젝트 구조 세팅은 `main`에 반영할 수 있습니다.
- 실제 페이지 수정은 각 `feature/*` 브랜치에서 진행합니다.
- 여러 페이지에 공통으로 적용되는 변경은 별도 브랜치로 분리합니다.
- 작업이 끝난 기능 브랜치는 `develop`에 merge한 뒤 삭제해도 됩니다.
- `main`에는 완성도가 충분한 안정본만 반영합니다.
