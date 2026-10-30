# 개발 및 실행 환경 설정

## 1. 필요한 환경

- 최신 웹 브라우저
- 저장소를 내려받기 위한 Git
- 로컬 정적 웹 서버를 실행하기 위한 Python 3
- 자동 테스트를 실행할 경우 Node.js 20 이상
- 인증·동기화·날씨 조회·외부 라이브러리 및 배경 제거 모델 다운로드를 위한 인터넷 연결

앱은 HTML·CSS·JavaScript로 구성되어 있으며, 별도 빌드 과정이나 Node.js 패키지 설치가 필요하지 않습니다. Python은 앱의 백엔드가 아니라 로컬 파일을 제공하는 용도로만 사용합니다.

## 2. Supabase 연결

현재 저장소의 `supabase-config.js`에는 기존 프로젝트의 URL과 공개 키가 들어 있습니다. 기존 서비스를 그대로 실행한다면 이 설정을 사용합니다.

자신의 Supabase 프로젝트로 실행하려면 다음을 준비합니다.

1. Supabase 프로젝트를 생성합니다.
2. 해당 프로젝트의 SQL Editor에서 저장소의 `supabase-schema.sql` 전체를 실행합니다. `user_closets` 테이블과 사용자별 조회·등록·수정 정책이 설정됩니다.
3. `supabase-config.js`의 `url`과 `anonKey`를 자신의 프로젝트 URL과 공개 publishable 키 또는 anon 키로 변경합니다. `service_role` 키나 비밀 키는 이 파일에 넣지 않습니다.

   ```javascript
   window.MOA_SUPABASE_CONFIG = {
     url: "https://YOUR_PROJECT.supabase.co",
     anonKey: "YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY"
   };
   ```

4. 이메일·비밀번호 인증을 사용할 수 있도록 설정합니다. 이메일 인증을 사용하는 경우 인증 메일의 링크가 자신의 배포 주소 또는 로컬 개발 주소로 돌아오도록 인증 URL도 설정합니다.

기존 운영 프로젝트의 데이터를 새 프로젝트로 복사하는 과정은 포함하지 않습니다. 새 프로젝트에는 별도의 계정을 가입하고 옷을 등록해야 합니다.

## 3. 로컬 실행

프로젝트 폴더에서 실행합니다.

```bash
python -m http.server 3000
```

Windows에서는 다음 명령도 사용할 수 있습니다.

```powershell
py -m http.server 3000
```

브라우저에서 `http://localhost:3000`에 접속합니다. 종료할 때는 서버를 실행한 터미널에서 `Ctrl+C`를 누릅니다.

날씨 기능을 사용하려면 브라우저의 위치 권한을 허용합니다. 배경 제거는 처음 실행할 때 모델을 다운로드하므로 시간이 걸릴 수 있습니다. 로컬 주소와 공개 배포 주소는 브라우저 저장소가 서로 분리됩니다.

## 4. 자동 검증

Node.js가 설치된 환경에서 프로젝트 폴더를 기준으로 실행합니다.

```bash
node --check app.js
node --test tests/login-cache.test.cjs tests/outfit-photos.test.cjs
```

이 테스트는 캐시, 조회 실패 복구, 계정 전환 및 사진 회전·크기 계산을 검증합니다. 실제 계정으로 로그인하거나 실시간 날씨·AI 모델을 호출하는 테스트는 아니므로, 브라우저에서 주요 기능도 별도로 확인해야 합니다.

## 5. 공개 배포

현재 공개 주소는 `https://seungjun02.github.io/SBT1/`입니다. 이 저장소는 `main` 브랜치의 루트 폴더를 GitHub Pages 배포 원본으로 사용합니다.

자신의 저장소에 배포할 때도 GitHub Pages의 배포 원본을 해당 브랜치와 루트 폴더로 설정합니다. 변경 사항을 올린 뒤 Pages 배포가 성공했는지 확인합니다.
