# library-project

## 브랜치 전략

기본 브랜치는 아래처럼 사용합니다.

- `main`: 최종 안정본을 관리하는 브랜치
- `develop`: 작업 내용을 통합하는 개발 브랜치
- `refactor/*`: 폴더 구조 정리, 코드 구조 개선 등 리팩토링 작업 브랜치
- `docs/*`: README 등 문서 수정 작업 브랜치

작업 브랜치는 목적에 맞게 생성한 뒤, Pull Request를 통해 `develop` 브랜치로 병합합니다.
최종 안정본이 준비되면 `develop`에서 `main`으로 병합합니다.


## 폴더 구조

```text
library-project/
├─ index.html
├─ index.css
├─ index.js
├─ css/
│  ├─ common.css
│  └─ nav.css
├─ js/
│  ├─ main.js
│  └─ books.js
├─ pages/
│  ├─ materials/
│  │  ├─ materials.html
│  │  └─ materials.css
│  ├─ recommend/
│  │  ├─ recommend.html
│  │  ├─ recommend.css
│  │  └─ recommend.js
│  ├─ reading/
│  │  ├─ reading.html
│  │  ├─ reading.css
│  │  └─ reading.js
│  ├─ facility/
│  │  ├─ facility.html
│  │  ├─ floormap.html
│  │  ├─ facility.css
│  │  ├─ floormap.css
│  │  └─ facility.js
│  ├─ community/
│  │  ├─ community.html
│  │  └─ community.css
│  ├─ mypage/
│  │  ├─ mypage.html
│  │  └─ mypage.css
│  └─ login/
│     ├─ login.html
│     └─ login.css
├─ images/
│  ├─ books/
│  ├─ floor_1f.png
│  ├─ floor_2f.png
│  ├─ floor_3f.png
│  ├─ floor_4f.png
│  ├─ floor_5f.png
│  ├─ floor_6f.png
│  ├─ hours_video.mp4
│  ├─ logo.jpg
│  └─ logo2.png
└─ README.md
```

공통 스타일은 `css/common.css`, 네비게이션 스타일은 `css/nav.css`에서 관리합니다.
각 페이지에서만 사용하는 CSS와 JS는 해당 HTML 파일과 같은 폴더에 배치했습니다.
`index.html`은 사이트 첫 진입 파일이므로 루트에 유지합니다.
## 작업 절차

1. 작업 전 `develop` 브랜치를 최신화합니다.

```bash
git switch develop
git pull --rebase origin develop
```

2. 작업 목적에 맞는 브랜치를 생성합니다.

```bash
git switch -c 브랜치이름
```

이미 작업 브랜치가 생성되어 있는 경우에는 새로 만들지 않고 해당 브랜치로 이동합니다.

```bash
git switch 브랜치이름
```

3. 파일을 수정한 뒤 변경 사항을 확인합니다.

```bash
git status
```

4. 필요한 파일을 추가하고 커밋합니다.

```bash
git add 수정한파일명
git commit -m "type: short description"
```

구조 변경처럼 파일 이동/삭제가 많을 때는 아래 명령어를 사용할 수 있습니다.

```bash
git add -A
```

5. 원격 저장소에 올립니다.

```bash
git push -u origin 브랜치이름
```

6. GitHub에서 Pull Request를 생성합니다.

- base: `develop`
- compare: 작업 브랜치

7. 변경 파일과 충돌 여부를 확인한 뒤 `develop`에 merge합니다.

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

- 작업 전에는 항상 최신 `develop` 브랜치에서 시작합니다.
- 작업 목적에 맞게 `refactor/*`, `docs/*` 등 브랜치 이름을 구분합니다.
- 공통 CSS와 JS를 수정할 때는 다른 페이지에 영향이 있는지 확인합니다.
- 작업 브랜치는 Pull Request를 통해 `develop`에 병합합니다.
- `main`에는 완성도가 충분한 안정본만 반영합니다.

## Pull Request 및 Merge 절차

### Pull Request 생성

1. 작업 브랜치에서 수정 내용을 커밋하고 원격 저장소에 push합니다.

```bash
git status
git add 수정한파일명
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
refactor: organize project structure
```

```md
## 작업 내용
- nav 메뉴 기준으로 pages 폴더 구조 정리
- 공통 CSS와 페이지별 CSS 분리
- 변경된 파일 경로에 맞게 href/src 경로 수정
- README에 폴더 구조 추가

## 확인 사항
- HTML 상대 경로 확인
- README 폴더 구조 확인
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
작업 브랜치 -> develop
```

3. `Merge pull request`를 클릭합니다.
4. merge 커밋 메시지를 확인한 뒤 `Confirm merge`를 클릭합니다.

### Merge 후 로컬 최신화

GitHub에서 merge를 완료한 뒤 로컬 `develop` 브랜치를 최신화합니다.

```bash
git switch develop
git pull --rebase origin develop
```

다음 작업 브랜치를 만들기 전에는 항상 최신 `develop`에서 시작합니다.

```bash
git switch develop
git pull --rebase origin develop
git switch -c 새브랜치이름
```

### 최종 반영

여러 작업 내용이 `develop`에 충분히 모이고 안정화되면 아래 방향으로 PR을 생성합니다.

```text
base: main
compare: develop
```

즉, 최종 흐름은 아래와 같습니다.

```text
작업 브랜치 -> develop -> main
```

