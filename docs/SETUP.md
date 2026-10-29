# 설치와 환경 설정

새 프로젝트를 시작하기 위한 최소 보일러플레이트입니다. Next.js App Router, TypeScript, Tailwind CSS, Zod, React Hook Form, `@hookform/resolvers`, Prisma 7, ESLint, Prettier와 VS Code 설정을 포함합니다. Supabase는 PostgreSQL 데이터베이스로 사용합니다.

CRUD·로그인 화면은 없으며 기본 `User` 모델만 포함합니다. Zod는 환경 변수 검증에 사용하며 React Hook Form과 resolvers는 필요한 폼을 만들 때 사용할 수 있도록 설치 구성에만 포함합니다. create-next-app 16.4.3의 TypeScript·Tailwind·ESLint·App Router 생성 결과를 기본으로 사용하고, Supabase 연결과 개발 편의를 위한 설정을 추가했습니다.

처음에는 **프로젝트 가져오기 → 화면 실행**까지만 진행하세요. DB·인증·폰트 선택은 필요한 기능을 만들 때 검토합니다. 실행 중 오류가 나면 [오류 확인 안내](TROUBLESHOOTING.md)를 참고하세요.

처음 실행하려고 캐시·Tailwind 로더·Prisma 설정을 바꿀 필요는 없습니다. 기능 개발 시 에이전트가 현재 버전·설정을 확인하고 필요한 처리를 제안하도록 구성되어 있습니다. 변경이 필요할 때 이유·영향·권장안을 확인하면 됩니다.

## GitHub에서 내 프로젝트 만들기

1. 보일러플레이트 저장소가 Template repository로 등록되어 있다면 **Use this template → Create a new repository**로 내 저장소를 만듭니다. 일반적으로 원본 보일러플레이트를 계속 수정하는 대신 새 프로젝트 저장소에서 작업합니다.
2. 내 저장소에서 **Code → Download ZIP**으로 내려받아 압축을 풀거나, Git·GitHub Desktop으로 가져옵니다. ZIP으로 받았다면 이후 GitHub에 변경 내용을 반영하기 위한 저장소 연결은 별도로 필요합니다.
3. 편집기에서 package.json이 있는 폴더를 엽니다. 상위 폴더를 내려받았다면 실제 프로젝트 폴더로 들어갑니다.
4. 아래 명령으로 설치·실행합니다. 이미 가져온 이 프로젝트에서 create-next-app을 다시 실행하지 않습니다.

GitHub는 저장소에 등록된 파일을 전달합니다. .gitignore에서 제외한 .env·node_modules·.next·src/generated_prisma는 각자 준비하거나 설치 시 재생성합니다. 최초 업로드 때는 제외 대상이 이미 Git에 등록되지 않았는지 확인하세요. 별도 공유용 복사본 생성 명령은 필요하지 않습니다.

Template repository 설정은 저장소 관리자가 GitHub의 **Settings → General → Template repository**에서 수행합니다. 이 파일을 수정하는 것만으로 원격 설정이 바뀌지는 않습니다. [GitHub 공식 안내](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)

## 1. 실행하기

처음에는 DB 설정 없이 화면을 실행하면 됩니다. Node.js 24의 최신 보안 패치 버전과 npm을 준비하세요.

1. 복사한 프로젝트 폴더를 편집기에서 엽니다.
2. 편집기에서 터미널을 열고, 현재 폴더에 package.json이 있는지 확인합니다.
3. Windows PowerShell과 Linux 모두 다음 명령을 순서대로 실행합니다.

```bash
node --version
npm --version
npm ci
npm run dev
```

node 버전은 v24로 시작해야 합니다. 설치와 서버 실행은 시간이 걸릴 수 있으므로 다음 명령을 입력하기 전에 출력을 확인하세요.

터미널에 표시된 주소를 브라우저에서 엽니다. 기본 주소는 [http://localhost:3000](http://localhost:3000)이며, 다른 프로그램이 해당 포트를 사용하면 다른 주소가 표시될 수 있습니다. 화면을 사용하는 동안 터미널은 켜 두고, 종료하려면 해당 터미널에서 Ctrl+C를 누릅니다. 다시 시작할 때는 npm run dev를 실행하면 됩니다.

처음 실행에 Supabase 가입이나 .env 파일은 필요하지 않습니다. DB 기능을 만들 때 아래의 Supabase 설정을 진행하세요.

node_modules, .next, src/generated_prisma, next-env.d.ts, tsconfig.tsbuildinfo는 설치·실행·검사 시 자동 생성됩니다. 재사용할 배포본에는 넣지 않으며 Git에서도 제외합니다. package-lock.json, .env.example, .vscode는 유지합니다.

### VS Code와 한글 파일

VS Code에서 추천 확장을 확인하면 ESLint, Prettier, Prisma를 선택하여 설치할 수 있습니다. 확장은 자동 설치되지 않습니다.

.vscode/settings.json은 일반 파일에 UTF-8, Markdown에 UTF-8 BOM을 사용하도록 설정합니다. .editorconfig에도 같은 인코딩 원칙이 있습니다. 다른 편집기는 EditorConfig 지원 여부를 확인하세요.

한글이 깨져 보이면 먼저 화면 오른쪽 아래의 인코딩 표시를 확인하고 Codex에게 원인 확인을 요청하세요. 깨진 내용을 그대로 저장하거나 임의로 인코딩을 바꿔 덮어쓰지 마세요.

## 기능 계획과 필요한 안내 선택

첫 화면이 열렸다면 [Codex 사용 안내](CODEX_GUIDE.md)를 참고해 만들 기능·사용자·완료 기준부터 정하세요. 아래 문서를 모두 읽거나 선택 사항을 전부 결정한 뒤 시작할 필요는 없습니다. 기본 설정으로 진행하고 기능에 필요한 안내만 선택합니다.

| 지금 하려는 일                    | 참고할 안내                                           |
| --------------------------------- | ----------------------------------------------------- |
| 요구사항 분석·단계별 구현 요청    | [Codex 사용법](CODEX_GUIDE.md)                        |
| 여러 단계 작업의 계획 기록        | [계획 작성 양식](../plans/README.md)                  |
| 이름·제작자 등 내 프로젝트 설정   | [맞춤 설정](CUSTOMIZE_PROJECT.md)                     |
| 회원가입·로그인 방식 선택         | [인증](AUTHENTICATION.md). 기본 인증 기능은 미구현    |
| 화면 흐름·모바일·접근성·KRDS 참고 | [UI/UX](UI_UX.md)                                     |
| 한글 폰트·외부 다운로드 방식 선택 | [폰트](FONTS.md). 기본 설정 유지 가능                 |
| 입력 폼·서버 검증                 | [유효성 검사](VALIDATION.md)                          |
| 비밀값·권한·공개 범위 검토        | [보안](SECURITY.md). 관련 기능 개발·외부 공개 전 확인 |
| 페이지·서버 오류 분석             | [오류 확인과 전달](TROUBLESHOOTING.md)                |

요구사항 분석·계획 → DB 분석·필요 시 수정 → 서버 처리 → 화면 구현 → 연결 검증 순으로 필요한 단계를 진행합니다. 채팅에 분석·계획과 변경안을 먼저 제시하고 승인된 범위에서 적용합니다. 이미 승인한 같은 범위를 단계마다 반복 승인할 필요는 없습니다. 계획 파일은 필요할 때 작성 여부를 정하며, DB 변경·배포·Git 작업은 각각 승인 범위를 확인합니다.

## 화면을 만들기 전에 역할 구분하기

화면을 계획할 때는 [UI/UX와 KRDS 참고 안내](UI_UX.md)를 함께 확인하세요. 사용자 목표·화면 흐름·모바일·접근성을 검토하고, 일반 서비스의 선택적 참고와 공공 프로젝트의 요구 기준 확인을 구분합니다. 기존 화면을 자동으로 교체하거나 KRDS 준수를 보장하는 설정은 아닙니다.

처음 시작하거나 외부에 공개하기 전에는 [비개발자를 위한 보안 안내](SECURITY.md)를 확인하세요. 비밀값 관리, 관리자·회원별 접근 범위, Supabase 공개 설정, 비용·오용 방지와 키 유출 시 대응을 설명합니다. 안내 문서나 검사 통과만으로 실제 보안 검증이 완료되는 것은 아닙니다.

관리자와 일반 사용자가 있는 서비스라면 역할별로 필요한 화면, 조회·등록·수정·삭제 범위, 로그인·접근 권한을 먼저 계획하세요. 공통으로 사용하는 화면도 함께 정리합니다. 관리자 기능이 필요 없다면 사용자 화면만 계획해도 됩니다. 역할을 구분한다는 이유로 별도 앱이나 폴더를 미리 만들 필요는 없습니다.

예약 서비스라면 다음처럼 정리할 수 있습니다. 설명용 예시이며 이 보일러플레이트에 구현된 기능은 아닙니다.

| 역할        | 화면·기능                    | 접근 범위          |
| ----------- | ---------------------------- | ------------------ |
| 비회원      | 서비스 소개, 로그인·가입     | 공개 정보          |
| 일반 사용자 | 예약 신청, 내 예약 조회·취소 | 본인 예약          |
| 관리자      | 예약 관리, 운영 설정         | 부여받은 관리 범위 |

메뉴나 주소를 나누거나 버튼을 숨기는 것만으로 접근이 제한되지는 않습니다. Server Action·Route Handler 등 실제 서버 처리에서도 로그인 사용자와 역할·데이터 소유권을 확인해야 합니다. 가입 시 사용자가 관리자 역할을 임의로 지정할 수 없도록 관리자 지정·변경 권한도 정하세요. [인증 방식 선택 안내](AUTHENTICATION.md)와 [화면·서버 유효성 검사 안내](VALIDATION.md)를 함께 참고하세요.

여러 단계의 기능은 [계획 양식](../plans/README.md)의 사용자·요구사항, 화면·사용 흐름, 서버 권한 항목에 역할별 계획을 기록할 수 있습니다. 에이전트에는 “관리자와 일반 사용자의 화면·기능·접근 범위를 구분해 계획하고, 필요한 서버 권한 검사를 보여 주세요. 아직 파일은 변경하지 마세요”라고 요청하세요.

## 2. 어디를 수정하나요?

```text
src/
  app/
    page.tsx              첫 화면
    layout.tsx            공통 화면 틀과 페이지 제목
    globals.css           공통 디자인
    favicon.ico           브라우저 탭 아이콘
  lib/
    db.ts                 서버 전용 Prisma 연결
    env.ts                서버 전용 환경 변수 검증
    supabase-ca.ts         공개 CA 파일 읽기
    database-tls.ts        앱 TLS 설정·URL 옵션 정리
    prisma-tls.ts          Prisma CLI의 CA 전달
  generated_prisma/       Prisma Client 자동 생성 코드 (직접 수정하지 않음)
certs/
  supabase-ca.crt          다운로드한 공개 CA 인증서
prisma/
  schema.prisma           DB 연결·클라이언트 생성 설정과 User 모델
public/                   기본 로고와 정적 이미지
docs/                    설치·DB·배포·Codex 안내
plans/                   기능별 작업 계획과 작성 양식
.vscode/                  편집기 설정·확장 추천
.env.example              환경 변수 작성 예시
prisma.config.ts          Prisma CLI의 환경 변수·연결 설정
next.config.ts            Next.js·Tailwind Turbopack·CA 파일 배포 설정
package.json              패키지와 실행 명령
package-lock.json         설치 버전 고정
```

화면은 `src/app/`에 만들고 공통 코드는 `src/lib/`에 둡니다. `src/lib/`는 Next.js가 강제하는 폴더가 아니라 DB 연결과 환경 변수 검증을 모아 둔 폴더입니다. `@/`는 `src/`를 가리킵니다. 예를 들어 `@/lib/db`는 `src/lib/db.ts`입니다.

public/, prisma/, certs/, docs/, plans/와 .env·설정 파일은 프로젝트 루트에 유지합니다. Prisma Client는 src/generated_prisma/에 생성하며, src/lib/db.ts가 @/generated_prisma/client로 불러옵니다. 이 생성 폴더는 직접 수정하지 않습니다.

### 화면 스타일 바꾸기

Tailwind CSS 4가 구성되어 있습니다. 기준 생성 결과처럼 src/app/globals.css에서 불러오고 next.config.ts의 @tailwindcss/turbopack 로더가 빌드에 연결합니다. 별도의 postcss.config.mjs나 tailwind.config 파일은 사용하지 않습니다.

화면의 className에 스타일 이름을 지정해 사용할 수 있습니다.

```tsx
<div className="rounded-lg bg-slate-100 p-4">내용</div>
```

첫 화면은 개발 순서를 설명하는 안내 화면이며 여백과 너비에 Tailwind 클래스를 사용합니다. src/app/globals.css에는 배경·글자색, Geist 폰트 변수와 시스템 설정에 따른 다크 모드가 있습니다. 공통 디자인은 이 파일에서, 화면별 모양은 각 화면의 className에서 조정합니다.

직접 클래스를 외울 필요는 없습니다. Codex에게 “이 화면의 여백과 글자 크기를 Tailwind로 조정하는 변경안을 보여줘”처럼 요청하세요. 클래스 이름은 코드에 완전한 문자열로 작성하고, bg-${색상}처럼 일부를 조합하지 않습니다.

아래 Tailwind 공식 안내는 PostCSS 플러그인 방식의 설치 예시입니다. 이 프로젝트는 이미 구성된 @tailwindcss/turbopack 로더를 사용하므로, 링크의 설치 명령을 다시 실행하거나 postcss.config.mjs를 추가하지 마세요. 현재 화면의 스타일을 바꾸려면 위의 className과 globals.css 설명을 따르면 됩니다.

[Tailwind 공식 Next.js 설치 안내 — PostCSS 방식 참고](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

## 3. Supabase DB 연결하기

DB가 필요할 때 [Supabase DB 설정과 연결하기](SUPABASE_SETUP.md)을 순서대로 따라 하세요. 회원가입·DB 생성, 공개 CA 다운로드, 두 연결 주소 확인, `.env` 등록, 테이블 생성과 오류 해결을 자세히 설명합니다.

| 준비할 항목    | 저장 위치·역할                                                                 |
| -------------- | ------------------------------------------------------------------------------ |
| 공개 CA 인증서 | `certs/supabase-ca.crt`: 앱과 Prisma CLI가 함께 사용하며 저장소에 포함합니다.  |
| `DATABASE_URL` | 프로젝트 루트 `.env`: 앱 실행용 Transaction pooler 연결 주소입니다.            |
| `DIRECT_URL`   | 프로젝트 루트 `.env`: Prisma CLI용 Direct 또는 Session pooler 연결 주소입니다. |

실제 `.env`는 Git에서 제외합니다. `.env.example`에는 비밀값을 넣지 않습니다. 기본 첫 화면은 DB를 사용하지 않으므로 화면 표시만으로 연결 성공을 판단하지 마세요.

설정한 .env 값이 반영되지 않으면 저장 후 개발 서버를 재시작하세요. .env.local이나 이미 실행 중인 터미널의 환경 변수가 .env보다 우선할 수 있으므로 중복 설정도 확인합니다. 실제 비밀값을 출력하거나 공유하지 말고, 자세한 로딩 순서는 [연결 정보 저장 후 확인](SUPABASE_SETUP.md#6-2-저장-후-확인)을 참고하세요.

### TLS 인증서

공식 인증서의 다운로드 위치, 파일 이름 변경과 교체 방법은 [CA 인증서 다운로드와 저장](SUPABASE_SETUP.md#3-ca-인증서-다운로드와-저장)을 확인하세요. 인증서 내용을 코드에 복사하거나 개인 PC의 절대 경로를 `.env`에 등록할 필요는 없습니다. 서버 인증서·호스트명 검증을 끄지 않습니다.

## 4. 테이블이 필요할 때

DB 구조를 변경할 때는 기존 데이터를 유지해야 하는지 먼저 알려 주세요. 보존이 필요하면 에이전트가 변경 영향과 백업·복구·데이터 이관 방법을 제안합니다. 스키마 수정 승인이 데이터 삭제·초기화까지 허용하는 것은 아닙니다. 자세한 내용은 [기존 데이터 보존과 DB 변경](SUPABASE_SETUP.md#기존-데이터-보존과-db-변경)을 확인하세요.

기본 User 모델은 앱용 users 테이블의 정의이며, Supabase Auth 로그인 기능은 포함하지 않습니다. 모델 파일만으로 실제 테이블이 생성되지는 않습니다.

DB를 변경하는 명령과 shadow DB 설정·생성 결과 확인은 [Supabase의 개발 테이블 생성 절차](SUPABASE_SETUP.md#7-2-개발-db에-users-테이블-생성)를 따르세요. 이 단계는 실제 개발 DB를 변경하므로 대상과 변경 범위를 확인한 뒤 진행합니다. 운영 DB에는 개발 마이그레이션 명령을 실행하지 않습니다.

## 5. 검사 명령

```bash
npm run check
npm run db:validate
npm run build
npm audit
```

`check`는 타입·린트·포맷을 검사합니다. 예제 전용 테스트와 테스트 실행 도구는 제거했으며, 서비스 기능을 추가할 때 필요한 테스트를 구성하세요. `db:validate`는 스키마 문법 검사이며 DB 접속 검증은 아닙니다. 실제 .env와 인증서를 준비했다면 별도로 npm run db:check를 실행해 DB 변경 없이 연결을 확인합니다.

**검사 명령도 자동 생성 파일을 만들 수 있습니다.** npm run check는 내부의 typecheck에서 Prisma Client와 Next.js 타입을 생성하고 TypeScript 검사를 실행합니다. 직접 작성한 소스와 실제 DB를 수정하는 명령은 아니지만 src/generated_prisma/, .next/, next-env.d.ts, tsconfig.tsbuildinfo 등의 생성·갱신이 일어날 수 있습니다. 이 파일들은 Git 제외 대상으로 유지합니다. npm run build도 배포용 생성물을 만듭니다.

검증한 의존성은 `package-lock.json`으로 고정됩니다. 재설치는 `npm ci`를 사용하고 업데이트 후 검사를 다시 실행합니다. Node.js 내장 라이브러리 취약점은 `npm audit`만으로 확인할 수 없으므로 런타임 보안 패치도 관리하세요.

여러 단계의 기능 계획을 기록하려면 [계획 작성 방법과 양식](../plans/README.md)을 확인하세요. 실제 계획은 사용자 승인 후 해당 프로젝트에서 생성합니다.

## 6. Vercel에 배포하기

공개할 기능을 로컬에서 검증한 뒤 [Vercel 배포 안내](VERCEL_DEPLOYMENT.md)를 따릅니다. 로컬 .env는 Vercel에 자동 등록되지 않습니다. Preview·Production과 연결 DB 용도를 구분하고 필요한 환경 변수를 등록합니다.

처음 배포를 검증할 때는 [별도 테스트 프로젝트 검증 준비](VERCEL_DEPLOYMENT.md#별도-테스트-프로젝트로-검증-준비)를 참고하세요. 화면 접속·DB 읽기·DB 쓰기·인증과 권한은 각각 확인하며, 초기 보일러플레이트의 첫 화면은 DB 검증을 대신하지 않습니다.

## 새 프로젝트로 바꿀 항목

앱 이름·화면 제목·언어·아이콘·제작자 정보·README 등을 확인하는 [프로젝트 맞춤 설정 안내](CUSTOMIZE_PROJECT.md)를 사용하세요. 기본 Next.js 화면을 먼저 실행한 뒤 필요한 항목만 변경합니다.

## 검사와 배포 결과 확인

작업 결과는 **지침만 제공 / 코드 구현 / 로컬 검증 / DB 검증 / 배포 검증**을 구분해 확인하세요. 안내가 있거나 패키지가 설치됐다고 기능이 구현된 것은 아니며, 빌드 성공이 실제 DB·브라우저·배포 동작 성공을 뜻하지도 않습니다. 해당 기능과 환경에서 실제 확인한 결과·실패·미검증 이유를 에이전트에게 요청하면 됩니다. 관련 기록은 [계획 양식](../plans/README.md)을 참고하세요.

개발 중에는 로컬 터미널에서 npm run check를 실행합니다. Vercel에서는 Build Command를 npm run check && npm run build로 설정해 검사 후 빌드합니다. 검사 실패는 해당 터미널 또는 Vercel 배포의 빌드 로그에서 확인하세요. 자세한 위치는 [배포 안내](VERCEL_DEPLOYMENT.md)에 있습니다.

GitHub Actions는 선택 사항이며 기본 .github/ 폴더는 제공하지 않습니다. Windows·Linux 검사가 필요해졌을 때 [GitHub Actions 사용하기 (선택 사항)](GITHUB_ACTIONS.md)의 예시를 따라 별도로 추가할 수 있습니다. 처음에는 추가하지 않아도 됩니다.

## 실행이 안 될 때

- node 또는 npm 명령을 찾지 못함: Node.js 설치와 터미널 재시작 여부를 확인하세요.
- package.json을 찾지 못함: 터미널이 이 프로젝트 폴더를 가리키는지 확인하세요.
- 의존성 설치 실패: 마지막 오류 메시지를 확인하고 Codex에 전달하세요. lock 파일을 임의로 삭제하지 마세요.
- 브라우저에 접속되지 않음: npm run dev가 실행 중인지, 터미널에 표시된 주소가 맞는지 확인하세요.
- DATABASE_URL 설정 오류: 첫 화면에는 필요하지 않으며 DB 기능을 실행할 때 필요한 설정입니다. .env.example을 참고해 .env에 실제 연결 주소를 입력하고 서버를 재시작하세요.
- DB 연결·인증서 오류: 연결 주소, 비밀번호 인코딩과 Supabase 연결 방식을 확인하세요. TLS 검증을 끄는 방법으로 해결하지 마세요.

해결이 어렵다면 다음 문구를 사용하세요.

> 실행이 되지 않습니다. 현재 폴더와 Node.js 버전, 설치 상태를 확인하고 원인을 설명해 주세요. 수정이나 설치가 필요하면 먼저 변경 내용을 보여주세요.

어떤 명령을 실행했는지와 오류가 발생한 시점을 함께 알려주세요. 로그·화면을 공유하기 전에 비밀키·비밀번호·DB URL·개인정보는 가리세요. 자세한 예시는 [Codex 오류 전달 안내](CODEX_GUIDE.md)를 참고하세요.

## 기본 생성 구성과 추가 항목

**참고용 — 처음 실행할 때는 건너뛰어도 됩니다.** 설치와 화면 실행은 앞의 안내만으로 진행할 수 있습니다. 아래 내용은 생성기와 비교하거나 개발 설정을 이해하고 싶을 때 읽으세요.

다른 프로젝트와 비교할 때 혼동을 줄이도록 **create-next-app 16.4.3의 권장 기본 구성**에 최대한 맞췄습니다. TypeScript·ESLint·Tailwind CSS·App Router·Cache Components를 사용하고 React Compiler는 사용하지 않습니다. 아래 명령은 비교할 새 기본 프로젝트를 만드는 예시입니다. **현재 프로젝트 안에서 다시 실행하지 말고**, 별도 상위 폴더에서 아직 없는 폴더 이름을 지정하세요.

```bash
npx create-next-app@16.4.3 my-next-app --ts --tailwind --eslint --app --src-dir --no-react-compiler --cache-components --import-alias "@/*" --use-npm --no-agents-md --no-agent-feedback --yes
```

| 선택 항목                                       | 이 보일러플레이트의 기준                                   |
| ----------------------------------------------- | ---------------------------------------------------------- |
| TypeScript / ESLint / Tailwind CSS / App Router | 사용                                                       |
| src 폴더                                        | 사용함. src/app/ 사용                                      |
| import alias                                    | @/\*                                                       |
| React Compiler                                  | 사용하지 않음 (권장 기본값)                                |
| Cache Components / Partial Prefetching          | 사용함 (cacheComponents: true, partialPrefetching: true)   |
| 생성기 기본 AGENTS.md / Agent feedback          | 사용하지 않음. 별도로 작성한 AGENTS.md와 .agent/ 지침 유지 |

권장 기본값과 다른 부분은 다음과 같습니다.

- **src 폴더:** 권장 기본값은 루트 app/이지만, 이 프로젝트는 사용자가 선택한 src/app/·src/lib/·src/generated_prisma/ 구성을 유지합니다. 위 명령의 --src-dir가 이 차이를 반영합니다.
- **에이전트 설정:** 생성기의 기본 AGENTS.md와 Agent feedback을 사용하지 않고 기존 프로젝트 지침을 유지합니다. 위 명령의 --no-agents-md·--no-agent-feedback가 이 차이를 반영합니다.
- **추가 기능:** Supabase·Prisma·폼·Prettier·편집기·문서·작성자 설정은 보일러플레이트 용도로 유지합니다. 따라서 생성 결과 전체를 그대로 복제한 프로젝트는 아닙니다.

- **기본 생성 결과를 반영한 부분:** src/app/globals.css, src/app/favicon.ico, public/ 이미지, TypeScript 설정과 src/app/layout.tsx의 폰트·기본 레이아웃입니다. Prettier 적용에 따라 따옴표·줄바꿈은 생성 원본과 다를 수 있습니다.
- **기본 설정에 추가한 부분:** ESLint의 Prettier 연동·생성 코드 제외, next.config.ts의 응답 헤더·CA 파일 배포 포함, .gitignore의 환경 파일 예시 허용·Prisma 생성 코드 제외입니다.
- **보일러플레이트 전용 추가:** src/lib/, prisma/, certs/, .env.example, Prisma CLI 설정, 폼 라이브러리, Prettier·편집기 설정, docs/, AGENTS.md와 .agent/입니다. package.json의 작성자·Node.js 기준·검사 및 DB 명령도 추가 설정입니다.
- **기존 버전을 유지한 부분:** 이미 설치·검증한 Next.js·React 등 의존성 버전을 그대로 유지합니다. 생성기가 제시한 모든 패키지 버전으로 일괄 변경하지는 않습니다. 실제 설치 버전은 package-lock.json을 기준으로 합니다.

### Cache Components를 사용하는 기능 개발

이 항목도 기능 개발 시 참고하는 설명입니다. 처음 실행하기 위해 캐시 설정을 바꿀 필요는 없습니다.

next.config.ts의 cacheComponents와 partialPrefetching은 기준 생성기의 권장 구성과 동일하게 켜져 있습니다. Cache Components는 정적으로 준비한 화면과 요청 시 필요한 동적 영역을 함께 구성하고, Partial Prefetching은 이동할 페이지의 정적 부분을 미리 가져옵니다. React Compiler를 켜기 위한 추가 패키지는 설치하지 않습니다.

DB 조회나 cookies 같은 요청별 값을 사용하는 화면을 추가할 때는 동적 영역을 Suspense로 감싸거나 재사용 가능한 데이터에 적절한 use cache·갱신 정책을 정해야 합니다. 이 설정만으로 모든 Prisma 조회가 자동으로 캐시되는 것은 아닙니다. 사용자별 정보는 공유 캐시에 임의로 넣지 마세요. 현재 기본 화면에는 DB 조회가 없으므로 이 설정을 켜기 위해 DB 연결이나 마이그레이션을 실행할 필요는 없습니다.

자세한 동작은 [Cache Components와 캐싱 공식 안내](https://nextjs.org/docs/app/getting-started/caching)를 참고하세요.

기본 첫 화면은 비개발자가 참고할 수 있는 한국어 개발 순서 안내로 교체했습니다. 요구사항 분석·계획 → DB 분석 → 서버 처리 → 화면 구현 → 연결 검증의 설명·확인 항목·요청 예시를 제공합니다. 자동 개발·DB 실행 기능은 없습니다. src/app/layout.tsx의 언어는 ko이며 제목·설명도 안내 화면에 맞췄습니다. 실제 서비스 제작 시 화면과 메타데이터를 교체하세요. 자세한 사용법은 [Codex 개발 순서 안내](CODEX_GUIDE.md#새-기능을-만드는-기본-순서)를 확인하세요. Geist 폰트는 next/font/google을 사용하므로 처음 빌드할 때 폰트를 다운로드할 네트워크 연결이 필요합니다.

create-next-app@latest의 기본값이나 다른 선택 옵션을 사용하면 생성 결과가 달라질 수 있습니다. 위 버전·옵션과 비교하고, 새로운 생성기 버전을 도입할 때 변경 내용을 검토하세요. [create-next-app 공식 옵션 안내](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## 라이선스

이 보일러플레이트는 [MIT License](../LICENSE)를 사용하며 저작권자는 progdper입니다. 재사용·수정·재배포 시 포함된 저작권·라이선스 고지를 유지하세요. 설치되는 외부 패키지의 라이선스는 각 패키지의 조건을 따릅니다.

## 공식 문서

- [Next.js 프로젝트 구조](https://nextjs.org/docs/app/getting-started/project-structure)
- [Supabase + Prisma](https://supabase.com/docs/guides/database/prisma)
- [Supabase 연결 풀](https://supabase.com/docs/guides/database/connecting-to-postgres/pooling-and-limits)
- [Prisma ORM 7](https://www.prisma.io/docs/orm/v7)
- [Vercel 환경 변수](https://vercel.com/docs/environment-variables)

## 다음 안내

- [프로젝트 맞춤 설정 안내](CUSTOMIZE_PROJECT.md)
- [Codex와 함께 작업하기](CODEX_GUIDE.md)
- [Vercel 배포하기](VERCEL_DEPLOYMENT.md)
- [시작 안내로 돌아가기](../README.md)
