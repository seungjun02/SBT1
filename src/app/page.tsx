const steps = [
  {
    id: 'requirements',
    title: '요구사항 분석·계획',
    summary: '무엇을 만들고, 어디까지 만들지 먼저 정합니다.',
    tasks: [
      '누가 사용하는 기능인지, 어떤 문제를 해결할지 설명합니다.',
      '사용자가 화면에서 시작해 결과를 확인하는 흐름을 정합니다.',
      '수정할 파일과 작업 순서, 완료 기준을 확인합니다.',
      '여러 단계의 작업은 작성자를 확인하고, 승인 후 plans/에 계획을 기록합니다.',
    ],
    checkpoint:
      '기능·범위·완료 기준이 분명하고, 계획 파일이 필요하면 작성자와 생성 범위를 확인했나요?',
    prompt:
      '[만들고 싶은 기능]의 요구사항과 계획 초안을 보여 주세요. 사용 흐름, DB 필요 여부, 변경 파일과 완료 기준을 설명하고, 계획 파일이 필요하면 plans/ 경로와 작성자 식별자를 확인해 주세요. 아직 파일은 생성하거나 수정하지 마세요.',
  },
  {
    id: 'database',
    title: 'DB 분석',
    summary: '저장할 데이터와 기존 DB 구조를 확인합니다.',
    tasks: [
      '저장할 항목과 데이터 사이의 관계를 검토합니다.',
      '기존 모델을 사용할 수 있는지, Prisma 수정이 필요한지 확인합니다.',
      '기존 데이터에 미치는 영향과 실제 DB 변경 여부를 구분합니다.',
    ],
    checkpoint: '모델 파일 수정과 실제 DB 마이그레이션을 구분했나요?',
    prompt:
      '계획한 기능에 필요한 데이터와 기존 Prisma 모델을 분석해 주세요. 변경이 필요하면 이유, 수정안, 기존 데이터에 미치는 영향을 보여 주세요. 실제 DB 변경과 마이그레이션은 별도 승인 전 실행하지 마세요.',
  },
  {
    id: 'server',
    title: '서버 처리',
    summary: '입력을 확인하고 데이터를 안전하게 처리합니다.',
    tasks: [
      '서버에서 입력값을 검증하고 사용자 권한을 확인합니다.',
      '필요한 저장·조회·수정·삭제 처리를 구현합니다.',
      '실패했을 때 화면에 전달할 결과와 오류 처리 방식을 정합니다.',
    ],
    checkpoint: '허용된 사용자만 필요한 데이터를 처리할 수 있나요?',
    prompt:
      '승인한 계획에 따라 서버 처리를 구현해 주세요. 입력 검증, 권한 확인, DB 처리와 오류 응답을 포함하고 기존 구조를 유지하세요. 승인 범위를 벗어나는 DB 변경이 필요하면 먼저 알려 주세요.',
  },
  {
    id: 'interface',
    title: '화면 구현',
    summary: '서버 처리에 맞춰 사용하기 쉬운 화면을 만듭니다.',
    tasks: [
      '계획 단계에서 정한 화면 흐름과 입력 항목을 구현합니다.',
      '처리 중·성공·오류·데이터 없음 상태를 보여 줍니다.',
      '작은 화면, 키보드 사용과 중복 제출도 확인합니다.',
    ],
    checkpoint: '사용자가 다음 행동과 처리 결과를 쉽게 알 수 있나요?',
    prompt:
      '승인한 화면 흐름에 맞춰 서버 처리와 연결되는 화면을 구현해 주세요. 입력 폼, 로딩, 성공·오류와 데이터가 없는 상태를 포함하고 모바일에서도 확인해 주세요.',
  },
  {
    id: 'verification',
    title: '연결·권한·동작 검증',
    summary: '화면부터 DB까지 기능이 이어지는지 확인합니다.',
    tasks: [
      '정상 입력, 잘못된 입력과 권한이 없는 경우를 확인합니다.',
      '실제 데이터 처리는 승인된 대상과 확인용 데이터로 검증합니다.',
      '타입·린트·서식·빌드를 확인하고 미검증 항목을 구분합니다.',
    ],
    checkpoint: '확인한 결과와 아직 확인하지 않은 범위가 구분되나요?',
    prompt:
      '승인된 범위에서 화면·서버·DB 연결과 권한을 검증해 주세요. 타입·린트·서식·빌드 결과, 정상·실패 동작, 미검증 항목을 구분해 알려 주세요. 실제 DB 쓰기와 배포는 별도 승인 범위를 확인하세요.',
  },
] as const;

const guides = [
  ['docs/SETUP.md', '설치·실행과 프로젝트 구조'],
  ['docs/CODEX_GUIDE.md', '단계별 요청·승인·검증 방법'],
  ['docs/CUSTOMIZE_PROJECT.md', '새 프로젝트로 바꿀 항목'],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        <header className="mb-10 sm:mb-14">
          <p className="mb-5 text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            바이브 코딩 시작 안내
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight break-keep sm:text-5xl">
            원하는 기능을,
            <br />한 단계씩 만들어 보세요.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 break-keep text-zinc-600 dark:text-zinc-400">
            데이터 저장이 필요한 새 기능을 만들 때 참고하는 기본 흐름입니다.
            먼저 계획을 확인하고, 승인한 범위에서 구현과 검증을 이어 가세요.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            이 화면은 참고 안내입니다. 기능 개발이나 DB 변경을 자동으로 실행하지
            않습니다.
          </p>
        </header>

        <nav aria-label="개발 단계 바로가기" className="mb-8">
          <ol className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-indigo-400 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:text-indigo-300"
                >
                  <span className="text-zinc-400">0{index + 1}</span>
                  {step.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <aside
          aria-label="진행 전에 확인할 원칙"
          className="mb-10 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-5 text-sm leading-7 text-indigo-950 sm:px-6 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-100"
        >
          <p className="font-semibold">필요한 단계만, 승인한 범위에서</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              DB가 필요 없으면 모델 수정은 생략하고, 문구·스타일 수정은 관련
              단계만 진행합니다.
            </li>
            <li>
              화면 설계는 계획부터 함께 검토합니다. 기존 승인 범위에서는 계속
              진행하며, 범위가 넓어질 때 확인합니다.
            </li>
            <li>
              Prisma 스키마 수정, 실제 DB 마이그레이션, 데이터 쓰기와 배포는
              각각 승인 범위를 확인합니다.
            </li>
          </ul>
        </aside>

        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li key={step.id}>
              <article
                id={step.id}
                aria-labelledby={`${step.id}-title`}
                className="scroll-mt-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 font-mono text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h2
                      id={`${step.id}-title`}
                      className="text-xl font-semibold tracking-tight sm:text-2xl"
                    >
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {step.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <h3 className="text-sm font-semibold">이 단계에서 할 일</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {step.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-zinc-50 p-5 dark:bg-zinc-950">
                    <h3 className="text-sm font-semibold">다음 단계 전 확인</h3>
                    <p className="mt-3 text-sm leading-7 break-keep text-zinc-600 dark:text-zinc-400">
                      {step.checkpoint}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <label
                    htmlFor={`${step.id}-prompt`}
                    className="text-sm font-semibold"
                  >
                    Codex에 이렇게 요청하세요
                  </label>
                  <p
                    id={`${step.id}-help`}
                    className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400"
                  >
                    문장을 선택해 복사한 뒤, 내 기능과 승인 범위에 맞게 바꿔
                    요청하세요.
                  </p>
                  <textarea
                    id={`${step.id}-prompt`}
                    aria-describedby={`${step.id}-help`}
                    readOnly
                    value={step.prompt}
                    rows={4}
                    className="mt-3 block min-h-32 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <footer className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">더 자세한 안내가 필요하다면</h2>
          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            편집기에서 아래 문서를 열어 보세요. 실제 서비스 제작 시 이 안내
            화면은 원하는 첫 화면으로 교체하면 됩니다.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {guides.map(([file, description]) => (
              <li
                key={file}
                className="min-w-0 rounded-xl bg-white p-4 dark:bg-zinc-900"
              >
                <p className="font-mono text-xs break-all text-indigo-600 dark:text-indigo-400">
                  {file}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  );
}
