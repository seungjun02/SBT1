# GitHub Actions 사용하기 (선택 사항)

처음에는 이 문서를 따라 설정하지 않아도 됩니다. 이 보일러플레이트에는 기본 .github/ 폴더가 없습니다. 로컬 검사와 Vercel 배포부터 진행하고, 팀 작업에서 Windows·Linux 검사를 반복 자동화하고 싶을 때 선택하세요.

## 기본 검사 방법

| 상황           | 실행할 명령                                           | 결과 확인                        |
| -------------- | ----------------------------------------------------- | -------------------------------- |
| 개발 중        | npm run check                                         | 로컬 터미널                      |
| 로컬 빌드 확인 | npm run build                                         | 로컬 터미널                      |
| Vercel 배포    | Build Command를 npm run check && npm run build로 지정 | Vercel 배포의 빌드 로그          |
| DB 설정 후     | npm run db:check                                      | 로컬 터미널, 읽기 전용 연결 결과 |

Vercel의 검사 실패 시 뒤의 빌드를 실행하지 않도록 &&로 연결합니다. 설정 위치와 절차는 [배포 안내](VERCEL_DEPLOYMENT.md)를 따르세요. Vercel 검사는 Windows 호환성 검사를 대신하지 않습니다.

## 언제 선택하면 좋은가요?

- 여러 사람이 바꾼 코드의 타입·린트·서식·빌드를 GitHub에서도 확인하고 싶을 때
- Windows와 Linux의 파일 경로·빌드 차이를 점검하고 싶을 때
- Pull Request를 검토하면서 검사 결과를 함께 보고 싶을 때

GitHub Actions는 DB나 배포 서비스가 아니라 코드 검사를 실행하는 기능입니다. 아래 예시는 DB 비밀번호나 Secrets 없이 검사하며, DB 접속·마이그레이션·Vercel 배포를 수행하지 않습니다.

## 1. 필요할 때만 설정 파일 만들기

1. GitHub 저장소 루트에 package.json과 .nvmrc가 있는지 확인합니다.
2. 같은 루트에 .github/workflows/ 폴더를 만듭니다.
3. 그 안에 check.yml 파일을 만들고 아래 전체 내용을 복사합니다.
4. 새 파일을 GitHub 기본 브랜치에 반영합니다. 파일 생성·업로드를 Codex에 맡기려면 각각 필요한 작업을 승인하세요.

package.json이 저장소의 하위 폴더에 있다면 그대로 복사하지 말고 workflow의 위치와 작업 디렉터리·캐시 경로를 실제 저장소 구조에 맞게 조정해야 합니다. .github/workflows/ 자체는 GitHub 저장소 루트에 있어야 합니다.

아래 예시는 **수동 실행만 사용**합니다. 파일을 등록하거나 코드를 올렸다는 이유로 검사 작업이 자동 실행되지는 않습니다.

```yaml
name: Project checks

on:
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: checks-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    name: Node 24 / ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    timeout-minutes: 20
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest]
    env:
      NEXT_TELEMETRY_DISABLED: '1'
    steps:
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Check types, lint and formatting
        run: npm run check
      - name: Validate Prisma schema
        run: npm run db:validate
      - name: Build without database credentials
        run: npm run build
```

## 2. 수동 실행과 결과 확인

1. GitHub 저장소의 **Actions**를 엽니다. 조직·저장소에서 Actions 사용을 허용해야 합니다.
2. **Project checks → Run workflow**를 선택합니다. 실행에는 저장소 쓰기 권한이 필요합니다.
3. 브랜치를 선택하고 실행합니다. Run workflow가 보이지 않으면 check.yml이 기본 브랜치에 있는지와 workflow_dispatch 설정을 확인하세요.
4. Windows와 Linux의 작업을 각각 열어 설치·타입·린트·서식·스키마·빌드 중 어디에서 성공하거나 실패했는지 확인합니다.

이 문서와 예시를 추가한 것만으로 원격 검사 결과가 생기지는 않습니다. 실제 실행 결과를 확인한 경우에만 통과했다고 기록하세요. [GitHub 수동 실행 안내](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)

## 3. 자동 실행도 원할 때

원하면 check.yml의 on 부분만 다음처럼 바꿉니다. 바꾸어 GitHub에 반영하면 이후 push와 Pull Request에서 자동 실행되고, 수동 실행도 가능합니다.

```yaml
on:
  push:
  pull_request:
  workflow_dispatch:
```

GitHub Actions 검사와 Vercel 배포는 기본적으로 별개입니다. **이 예시에서 Actions 실패가 Vercel 배포를 자동으로 막지는 않습니다.** Vercel에서도 npm run check && npm run build를 유지하세요. 검사 결과를 병합 필수 조건으로 정하는 것은 별도 저장소 설정입니다.

## 사용을 중단할 때

GitHub에서 해당 워크플로를 비활성화하거나 추가한 check.yml을 제거할 수 있습니다. 다른 워크플로·설정이 있다면 .github/ 전체를 삭제하지 마세요. 로컬 코드와 Vercel의 검사·빌드는 별도로 유지합니다.

[설치와 실행](SETUP.md) · [Vercel 배포](VERCEL_DEPLOYMENT.md) · [프로젝트 맞춤 설정 안내](CUSTOMIZE_PROJECT.md)
