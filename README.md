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

이미 작업 브랜치가 생성되어 있는 경우에는 새로 만들지 않고 해당 브랜치로 이동합니다.

```bash
git switch feature/브랜치이름
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

## Pull Request 및 Merge 절차

### Pull Request 생성

1. 작업 브랜치에서 수정 내용을 커밋하고 원격 저장소에 push합니다.

```bash
git status
git add .
git commit -m "type: short description"
git push
```

2. GitHub 저장소에서 `Compare & pull request`를 클릭하거나, `Pull requests` > `New pull request`를 선택합니다.

3. 브랜치를 아래처럼 설정합니다.

```text
base: develop
compare: 작업 브랜치
```

4. PR 제목과 설명을 작성합니다.

예시:

```text
feat: update search page
```

```md
## 작업 내용
- 검색 페이지 구조 수정
- 검색 관련 UI 정리

## 확인 사항
- 화면 표시 확인
- 링크 동작 확인
```

5. `Create pull request`를 클릭합니다.

### Pull Request 확인

PR에서는 아래 항목을 확인합니다.

- `Conversation`: 설명, 댓글, merge 가능 여부 확인
- `Commits`: 포함된 커밋 확인
- `Files changed`: 실제 변경 파일 확인

`No conflicts with base branch`가 보이면 충돌 없이 merge할 수 있습니다.

### Merge 진행

1. 작업이 완료되었는지 확인합니다.
2. merge 대상이 올바른지 확인합니다.

```text
feature/* -> develop
```

3. `Merge pull request`를 클릭합니다.
4. merge 커밋 메시지를 확인한 뒤 `Confirm merge`를 클릭합니다.

### Merge 후 로컬 최신화

GitHub에서 merge를 완료한 뒤 로컬 `develop` 브랜치를 최신화합니다.

```bash
git switch develop
git pull origin develop
```

다음 작업 브랜치를 만들기 전에는 항상 최신 `develop`에서 시작합니다.

```bash
git switch develop
git pull origin develop
git switch -c feature/새브랜치이름
```

### 최종 반영

여러 기능이 `develop`에 충분히 모이고 안정화되면 아래 방향으로 PR을 생성합니다.

```text
base: main
compare: develop
```

즉, 기본 흐름은 아래와 같습니다.

```text
feature/* -> develop -> main
```

