const STORAGE_KEY = "moa-smart-closet-v1";
const ACCOUNT_STORAGE_PREFIX = `${STORAGE_KEY}:`;
const categories = ["전체", "분류 확인", "상의", "하의", "원피스", "아우터", "신발", "가방"];
const itemCategories = categories.filter(category => category !== "전체");
const garmentColors = ["블랙", "네이비", "그레이", "화이트", "아이보리", "베이지", "브라운", "레드", "오렌지", "옐로", "그린", "블루", "퍼플", "핑크", "멀티", "믹스"];
const categoryIcons = { 상의: "👕", 하의: "👖", 원피스: "👗", 아우터: "🧥", 신발: "👟", 가방: "👜", "분류 확인": "🔎" };
const starterItems = [
  { id: "seed-1", name: "데님 셔츠", category: "상의", color: "블루", style: "캐주얼", emoji: "👔", bg: "#eee9df", wears: 4, photo: "assets/closet/cotton-shirt.jpg" },
  { id: "seed-2", name: "화이트 티셔츠", category: "상의", color: "화이트", style: "캐주얼", emoji: "👕", bg: "#e6e9e8", wears: 7, photo: "assets/closet/striped-tee.jpg" },
  { id: "seed-3", name: "핑크 조거 팬츠", category: "하의", color: "핑크", style: "캐주얼", emoji: "👖", bg: "#e9e8e2", wears: 3, photo: "assets/closet/wide-trousers.jpg" },
  { id: "seed-4", name: "데님 팬츠", category: "하의", color: "인디고", style: "캐주얼", emoji: "👖", bg: "#e3e8ed", wears: 9, photo: "assets/closet/denim-jeans.jpg" },
  { id: "seed-5", name: "브라운 집업 재킷", category: "아우터", color: "브라운", style: "캐주얼", emoji: "🧥", bg: "#ede7df", wears: 2, photo: "assets/closet/wool-blazer.jpg" },
  { id: "seed-6", name: "블랙 레더 재킷", category: "아우터", color: "블랙", style: "스트릿", emoji: "🧥", bg: "#e6e9e1", wears: 5, photo: "assets/closet/knit-cardigan.jpg" },
  { id: "seed-7", name: "레드 스니커즈", category: "신발", color: "레드", style: "캐주얼", emoji: "👟", bg: "#efeee9", wears: 6, photo: "assets/closet/canvas-sneakers.jpg" },
  { id: "seed-8", name: "플로럴 하이힐", category: "신발", color: "멀티", style: "포멀", emoji: "👞", bg: "#eee8e0", wears: 1, photo: "assets/closet/loafers.jpg" },
  { id: "seed-9", name: "아이보리 후드 집업", category: "상의", color: "아이보리", style: "캐주얼", emoji: "🧥", bg: "#eeeae2", wears: 0, photo: "assets/closet/hoodie-white.jpg" },
  { id: "seed-10", name: "체커보드 니트", category: "상의", color: "블랙·화이트", style: "스트릿", emoji: "🧶", bg: "#ecebe7", wears: 0, photo: "assets/closet/sweater-checkered.jpg" },
  { id: "seed-11", name: "화이트 블라우스", category: "상의", color: "화이트", style: "포멀", emoji: "👚", bg: "#f0eee9", wears: 0, photo: "assets/closet/blouse-white.jpg" },
  { id: "seed-12", name: "타이 셔츠", category: "상의", color: "화이트", style: "포멀", emoji: "👔", bg: "#e9e8e2", wears: 0, photo: "assets/closet/dress-shirt.jpg" },
  { id: "seed-13", name: "그레이 미디 스커트", category: "하의", color: "그레이", style: "미니멀", emoji: "👗", bg: "#e7e9ef", wears: 0, photo: "assets/closet/skirt-blue.jpg" },
  { id: "seed-14", name: "데님 쇼츠", category: "하의", color: "라이트 블루", style: "캐주얼", emoji: "🩳", bg: "#e8edf0", wears: 0, photo: "assets/closet/denim-shorts.jpg" },
  { id: "seed-15", name: "레드 플레어 원피스", category: "원피스", color: "레드", style: "페미닌", emoji: "👗", bg: "#f0e5e2", wears: 0, photo: "assets/closet/red-dress.jpg" },
  { id: "seed-16", name: "블랙 앵클 부츠", category: "신발", color: "블랙", style: "미니멀", emoji: "🥾", bg: "#ecebe8", wears: 0, photo: "assets/closet/boots-black.jpg" },
  { id: "seed-17", name: "네이비 백팩", category: "가방", color: "네이비", style: "캐주얼", emoji: "🎒", bg: "#e8ebee", wears: 0, photo: "assets/closet/backpack.jpg" },
  { id: "seed-18", name: "블랙 숄더백", category: "가방", color: "블랙", style: "미니멀", emoji: "👜", bg: "#ebe9e7", wears: 0, photo: "assets/closet/handbag.jpg" },
  { id: "seed-19", name: "네이비 수트 재킷", category: "아우터", color: "네이비", style: "포멀", emoji: "🧥", bg: "#e6e9ef", wears: 0, photo: "assets/closet/formal-pants-alt.jpg", photoPosition: "center 20%" },
  { id: "seed-20", name: "네이비 수트 팬츠", category: "하의", color: "네이비", style: "포멀", emoji: "👖", bg: "#e6e9ef", wears: 0, photo: "assets/closet/formal-pants-alt.jpg", photoPosition: "center 82%" },
  { id: "seed-21", name: "그린 아란 니트", category: "상의", color: "그린", style: "미니멀", emoji: "🧶", bg: "#e5ebe2", wears: 0, photo: "assets/closet/green-aran-sweater.jpg" },
  { id: "seed-22", name: "옐로 스트라이프 니트", category: "상의", color: "옐로·골드", style: "캐주얼", emoji: "🧶", bg: "#f1ead6", wears: 0, photo: "assets/closet/yellow-striped-sweater.jpg" },
  { id: "seed-23", name: "퍼플 블라우스", category: "상의", color: "퍼플", style: "페미닌", emoji: "👚", bg: "#eee7f1", wears: 0, photo: "assets/closet/purple-blouse.jpg" },
  { id: "seed-24", name: "베이지 양털 코트", category: "아우터", color: "베이지", style: "캐주얼", emoji: "🧥", bg: "#eee8dd", wears: 0, photo: "assets/closet/beige-lamb-coat.jpg" }
];
const starterItemsById = new Map(starterItems.map(item => [item.id, item]));
const defaultState = {
  items: starterItems,
  saved: [],
  profile: { gender: "", style: "미니멀", height: "", weight: "", topSize: "", bottomSize: "", onepieceSize: "", shoeSize: "" },
  selectedOccasion: "일상",
  weather: null
};
let state = structuredClone(defaultState);
let activeUser = null;
let activeStorageKey = STORAGE_KEY;
let supabaseClient = null;
let closetDataClient = null;
let activeSession = null;
let lastAccountLoadError = null;
let authMode = "login";
let accountLoadPromise = null;
let syncedUserId = "";
let authLoadVersion = 0;
let accountCacheDatabasePromise = null;
let activeCloudUpdatedAt = "";
let cloudSaveTimer = null;
let cloudSaveRetryTimer = null;
let cloudReadRetryTimer = null;
let cloudSaveSequence = 0;
let pendingCloudSave = null;
let cloudSaveInProgress = false;
let cloudSaveRetryAttempt = 0;
let cloudReadRetryAttempt = 0;
let backgroundRemovalModelPromise = null;
let backgroundRemovalQueue = Promise.resolve();
let bulkBackgroundRemovalInProgress = false;
let cloudSaveStatus = "local";
let activeView = "home";
let activeCategories = new Set();
let recommendationFilter = "all";
let recommendationOffset = 0;
let recommendationPoolSize = 0;
let recommendationCacheInputKey = "";
let recommendationResultCache = new Map();
let closetPhotoObserver = null;
let outfitPhotoResizeObserver = null;
const observedOutfitFrames = new Set();
let selectedClosetItemIds = new Set();
let appliedClosetItemIds = new Set();
let weatherCoordinates = null;
let weatherRefreshTimer = null;
let weatherLastUpdatedAt = 0;
let weatherRequestInProgress = false;
let toastTimer;

function mergeStoredState(stored) {
  if (!stored || !Array.isArray(stored.items)) {
    throw new Error("저장된 옷장 데이터 형식이 올바르지 않습니다.");
  }
  const items = stored.items.map(item => {
    if (!item || typeof item !== "object" || typeof item.id !== "string") {
      throw new Error("옷장에 아이템 정보가 올바르지 않습니다.");
    }
    const starter = starterItemsById.get(item.id);
    const merged = starter ? { ...starter, ...item, photo: item.photo || starter.photo } : { ...item };
    if (/옷 종류 확인 필요|종류 확인 필요/.test(merged.name || "")) {
      merged.autoTitle = true;
      merged.name = generatedGarmentTitle(merged);
    }
    return merged;
  });
  if (stored.saved != null && !Array.isArray(stored.saved)) {
    throw new Error("저장한 코디 데이터 형식이 올바르지 않습니다.");
  }
  const saved = (stored.saved || []).map(outfit => ({
    ...outfit,
    picks: (outfit.picks || []).map(pick => items.find(item => item.id === pick.id) || pick)
  }));
  return { ...defaultState, ...stored, items, saved, profile: { ...defaultState.profile, ...stored.profile } };
}
function shouldPreferCachedClosetState(cachedState, cloudState, cloudUpdatedAt) {
  if (!cachedState) return false;
  const cacheTimestamp = Date.parse(cachedState.updatedAt || "");
  const cloudStateTimestamp = Date.parse(cloudState.updatedAt || "");
  const cloudTimestamp = Number.isFinite(cloudStateTimestamp) ? cloudStateTimestamp : Date.parse(cloudUpdatedAt || "");
  if (Number.isFinite(cacheTimestamp)) {
    return !Number.isFinite(cloudTimestamp) || cacheTimestamp > cloudTimestamp;
  }
  return !Number.isFinite(cloudStateTimestamp) && JSON.stringify(cachedState) !== JSON.stringify(cloudState);
}
function loadState(key = STORAGE_KEY) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? structuredClone(defaultState) : mergeStoredState(JSON.parse(stored));
  } catch (error) {
    console.warn("저장된 옷장 데이터를 불러오지 못했습니다.", error);
    throw new Error(error instanceof Error ? `이 브라우저에 저장된 옷장 데이터를 읽지 못했습니다: ${error.message}` : "이 브라우저에 저장된 옷장 데이터를 읽지 못했습니다.");
  }
}
function createStorageSnapshot() {
  const snapshot = structuredClone(state);
  const currentItemIds = new Set(snapshot.items.map(item => item.id));
  snapshot.saved = snapshot.saved.map(outfit => ({
    ...outfit,
    picks: outfit.picks.map(pick => currentItemIds.has(pick.id) ? { id: pick.id } : pick)
  }));
  return snapshot;
}
function openAccountCacheDatabase() {
  if (!accountCacheDatabasePromise) {
    accountCacheDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("moa-account-cache", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("closets");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("옷장 캐시를 열 수 없습니다."));
    }).catch(error => {
      accountCacheDatabasePromise = null;
      throw error;
    });
  }
  return accountCacheDatabasePromise;
}
async function readAccountCache(userId) {
  let record = null;
  try {
    const database = await openAccountCacheDatabase();
    record = await new Promise((resolve, reject) => {
      const transaction = database.transaction("closets", "readonly");
      const request = transaction.objectStore("closets").get(userId);
      transaction.oncomplete = () => resolve(request.result || null);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    if (record) record.state = mergeStoredState(record.state);
  } catch (error) {
    record = null;
    console.warn("브라우저 옷장 캐시를 읽지 못했습니다.", error);
  }
  // Keep existing caches readable, including a newer localStorage fallback.
  try {
    const key = `${ACCOUNT_STORAGE_PREFIX}${userId}`;
    if (localStorage.getItem(key) !== null) {
      const legacyState = loadState(key);
      if (!record || Date.parse(legacyState.updatedAt || "") > Date.parse(record.state.updatedAt || "")) {
        record = { state: legacyState, cloudUpdatedAt: "" };
      }
    }
  } catch (error) {
    console.warn("기존 옷장 캐시를 읽지 못했습니다.", error);
  }
  return record;
}
async function writeAccountCache(userId, snapshot, cloudUpdatedAt = "") {
  try {
    const database = await openAccountCacheDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction("closets", "readwrite");
      transaction.objectStore("closets").put({ state: snapshot, cloudUpdatedAt }, userId);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    return true;
  } catch (error) {
    try {
      localStorage.setItem(`${ACCOUNT_STORAGE_PREFIX}${userId}`, JSON.stringify(snapshot));
      return true;
    } catch (fallbackError) {
      console.error("기기에 옷장을 저장하지 못했습니다.", error, fallbackError);
      return false;
    }
  }
}
function persist() {
  state.updatedAt = new Date().toISOString();
  const snapshot = createStorageSnapshot();
  if (activeUser) {
    const userId = activeUser.id;
    writeAccountCache(userId, snapshot, activeCloudUpdatedAt).then(saved => {
      if (!saved && activeUser?.id === userId) notify("이 기기에 옷장을 저장하지 못했어요.");
    });
  } else {
    try { localStorage.setItem(activeStorageKey, JSON.stringify(snapshot)); }
    catch (error) { notify("이 기기에 옷장을 저장하지 못했어요."); console.error("옷장 로컬 저장 실패", error); }
  }
  if (!activeUser || !supabaseClient) return;
  if (syncedUserId !== activeUser.id) {
    setCloudSaveStatus("pending");
    scheduleCloudReadRetry(activeUser);
    return;
  }
  scheduleCloudSave(activeUser.id, snapshot);
}
function scheduleCloudSave(userId, snapshot, delay = 500) {
  clearTimeout(cloudSaveTimer);
  clearTimeout(cloudSaveRetryTimer);
  pendingCloudSave = { userId, snapshot, sequence: ++cloudSaveSequence };
  cloudSaveRetryAttempt = 0;
  setCloudSaveStatus("pending");
  cloudSaveTimer = setTimeout(flushPendingCloudSave, delay);
}
function retryPendingCloudSave() {
  if (!activeUser || !supabaseClient) return;
  if (!pendingCloudSave && syncedUserId !== activeUser.id) {
    clearTimeout(cloudReadRetryTimer);
    loadAuthenticatedUser(activeUser);
    return;
  }
  if (!pendingCloudSave) scheduleCloudSave(activeUser.id, createStorageSnapshot(), 0);
  clearTimeout(cloudSaveTimer);
  clearTimeout(cloudSaveRetryTimer);
  cloudSaveTimer = setTimeout(flushPendingCloudSave, 0);
}
function setCloudSaveStatus(status) {
  cloudSaveStatus = status;
  const indicator = document.getElementById("cloud-save-status");
  if (!indicator) return;
  indicator.dataset.status = status;
  const labels = {
    local: "이 기기에 저장됨",
    saving: "클라우드에 저장 중…",
    pending: "기기에 저장됨 · 클라우드 동기화 대기",
    saved: "클라우드 동기화 완료",
    error: "기기에는 저장됨 · 클라우드 연결 확인 필요"
  };
  indicator.querySelector("[data-cloud-save-label]").textContent = labels[status];
  indicator.querySelector("[data-action='retry-cloud-save']").hidden = status !== "error";
  indicator.hidden = false;
}
async function flushPendingCloudSave() {
  if (cloudSaveInProgress || !pendingCloudSave || !navigator.onLine) return;
  cloudSaveInProgress = true;
  const job = pendingCloudSave;
  const retryDelays = [0, 1000, 3000];
  let lastError;
  try {
    for (const delay of retryDelays) {
      if (pendingCloudSave?.sequence !== job.sequence) return;
      if (delay) await new Promise(resolve => setTimeout(resolve, delay));
      if (pendingCloudSave?.sequence !== job.sequence) return;
      setCloudSaveStatus("saving");
      try {
        await saveClosetToCloud(job.userId, job.snapshot);
        if (pendingCloudSave?.sequence === job.sequence) {
          pendingCloudSave = null;
          cloudSaveRetryAttempt = 0;
          setCloudSaveStatus("saved");
        }
        return;
      } catch (error) {
        lastError = error;
      }
    }
    if (pendingCloudSave?.sequence === job.sequence) {
      cloudSaveRetryAttempt++;
      setCloudSaveStatus("error");
      console.error("옷장 클라우드 저장에 실패했습니다. 로컬 데이터는 보존했으며 자동 재시도합니다.", lastError);
      notify("기기에는 저장했지만 클라우드 동기화에 실패했어요. 다시 저장을 시도합니다.");
      const retryDelay = Math.min(60000, 5000 * (2 ** Math.min(cloudSaveRetryAttempt - 1, 4)));
      cloudSaveRetryTimer = setTimeout(flushPendingCloudSave, retryDelay);
    }
  } finally {
    cloudSaveInProgress = false;
    if (pendingCloudSave && pendingCloudSave.sequence !== job.sequence) {
      clearTimeout(cloudSaveTimer);
      cloudSaveTimer = setTimeout(flushPendingCloudSave, 0);
    }
  }
}
function scheduleCloudReadRetry(user) {
  clearTimeout(cloudReadRetryTimer);
  cloudReadRetryAttempt++;
  const delay = Math.min(60000, 5000 * (2 ** Math.min(cloudReadRetryAttempt - 1, 4)));
  cloudReadRetryTimer = setTimeout(() => {
    if (activeUser?.id === user.id && syncedUserId !== user.id) loadAuthenticatedUser(user);
  }, delay);
}
function getClosetDataClient(userId) {
  if (!closetDataClient || !activeSession?.access_token || activeSession.user?.id !== userId) {
    throw Object.assign(new Error("로그인 연결이 만료되었어요. 다시 로그인해 주세요."), { status: 401 });
  }
  return closetDataClient;
}
function isTemporaryClosetError(error) {
  const status = Number(error?.status || 0);
  if (status) return status === 408 || status === 429 || status >= 500;
  return error?.code === "CLOSET_READ_TIMEOUT" || /fetch|network|offline|timeout|timed out|abort|연결|시간.*초과/i.test(error?.message || "");
}
async function readClosetRecord(userId, columns, loadVersion) {
  for (let attempt = 0; attempt < 2; attempt++) {
    if (activeUser?.id !== userId || authLoadVersion !== loadVersion) throw new Error("계정 전환으로 조회를 취소했습니다.");
    const controller = new AbortController();
    let timeout;
    try {
      const result = await Promise.race([
        getClosetDataClient(userId).from("user_closets").select(columns).eq("user_id", userId).maybeSingle().retry(false).abortSignal(controller.signal),
        new Promise((_, reject) => {
          timeout = setTimeout(() => {
            reject(Object.assign(new Error("옷장 서버 응답 시간이 초과되었습니다."), { code: "CLOSET_READ_TIMEOUT" }));
            controller.abort();
          }, columns === "updated_at" ? 15000 : 45000);
        })
      ]);
      if (result.error) throw Object.assign(new Error(result.error.message || "옷장 연결에 실패했습니다."), result.error, { status: result.status });
      return result;
    } catch (error) {
      clearTimeout(timeout);
      if (attempt || !isTemporaryClosetError(error)) throw error;
      lastAccountLoadError = { userId, message: error.message };
      if (activeUser?.id !== userId || authLoadVersion !== loadVersion) throw error;
      const status = document.getElementById("account-load-status");
      if (status) status.textContent = "연결이 지연되어 한 번 더 시도하고 있어요… (2/2)";
      await new Promise(resolve => setTimeout(resolve, 750));
    } finally {
      clearTimeout(timeout);
    }
  }
}
async function saveClosetToCloud(userId, snapshot) {
  const controller = new AbortController();
  const request = getClosetDataClient(userId)
    .from("user_closets")
    .upsert({ user_id: userId, state: snapshot, updated_at: snapshot.updatedAt || new Date().toISOString() }, { onConflict: "user_id" })
    .abortSignal(controller.signal);
  let timeout;
  let result;
  try {
    result = await Promise.race([
      request,
      new Promise((_, reject) => {
        timeout = setTimeout(() => {
          controller.abort();
          reject(new Error("클라우드 저장 응답 시간이 45초를 초과했습니다."));
        }, 45000);
      })
    ]);
  } finally {
    clearTimeout(timeout);
  }
  const { error } = result;
  if (error) throw error;
  if (activeUser?.id === userId) {
    activeCloudUpdatedAt = snapshot.updatedAt;
    // Do not replace edits made while this upload was in flight.
    await writeAccountCache(userId, createStorageSnapshot(), activeCloudUpdatedAt);
  }
}
function clearPendingCloudSave() {
  clearTimeout(cloudSaveTimer);
  clearTimeout(cloudSaveRetryTimer);
  clearTimeout(cloudReadRetryTimer);
  pendingCloudSave = null;
  cloudSaveSequence++;
  cloudSaveRetryAttempt = 0;
  cloudReadRetryAttempt = 0;
  setCloudSaveStatus("local");
}
function showAuthScreen(mode = "login", message = "", busy = false, options = {}) {
  authMode = mode === "signup" ? "signup" : "login";
  const screen = document.getElementById("auth-screen");
  screen.hidden = false;
  document.getElementById("app-shell").hidden = true;
  const isSignup = authMode === "signup";
  const configured = Boolean(supabaseClient);
  const email = options.email || "";
  const canResendConfirmation = options.canResendConfirmation === true;
  screen.innerHTML = `<section class="auth-card">
    <a class="brand auth-brand" href="#" aria-label="모아 홈"><span class="brand-mark">m</span><span>moa<span class="brand-dot">.</span></span></a>
    <span class="eyebrow">YOUR PRIVATE WARDROBE</span>
    <h1>${isSignup ? "나만의 옷장을 시작해요" : "다시 만나요"}</h1>
    <p class="auth-intro">${isSignup ? "이메일로 가입하고 나만의 옷장을 안전하게 보관하세요." : "로그인하면 나만의 옷장과 코디를 확인할 수 있어요."}</p>
    ${message ? `<p class="auth-message" role="status">${escapeHtml(message)}${canResendConfirmation ? `<br><button type="button" class="subtle-link" data-auth-resend>인증 메일 다시 보내기</button>` : ""}</p>` : ""}
    ${!configured ? `<p class="auth-setup-note"><strong>Supabase 설정이 필요합니다.</strong><br>프로젝트 URL과 공개 anon 키를 <code>supabase-config.js</code>에 입력하고, <code>supabase-schema.sql</code>을 Supabase SQL Editor에서 실행해 주세요. 비밀번호나 service_role 키는 코드에 넣지 마세요.</p>` : ""}
    <form class="auth-form" id="auth-form">
      ${isSignup ? `<label>이름<input name="name" type="text" autocomplete="name" maxlength="80" required placeholder="이름"></label>` : ""}
      <label>이메일<input name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@example.com" value="${escapeHtml(email)}"></label>
      <label>비밀번호<input name="password" type="password" autocomplete="${isSignup ? "new-password" : "current-password"}" minlength="8" maxlength="72" required placeholder="8자 이상"></label>
      <button class="primary-button auth-submit" type="submit" ${!configured || busy ? "disabled" : ""}>${busy ? "처리 중…" : isSignup ? "회원가입" : "로그인"}</button>
    </form>
    <p class="auth-switch">${isSignup ? "이미 계정이 있나요?" : "처음 방문하셨나요?"} <button type="button" class="subtle-link" data-auth-mode="${isSignup ? "login" : "signup"}">${isSignup ? "로그인" : "회원가입"}</button></p>
  </section>`;
  screen.querySelector("[data-auth-mode]").addEventListener("click", event => showAuthScreen(event.currentTarget.dataset.authMode));
  const resendButton = screen.querySelector("[data-auth-resend]");
  if (resendButton) {
    resendButton.addEventListener("click", async () => {
      resendButton.disabled = true;
      resendButton.textContent = "전송 중…";
      try {
        const { error } = await supabaseClient.auth.resend({ type: "signup", email });
        if (error) throw error;
        showAuthScreen("login", "인증 메일을 다시 보냈어요. 받은편지함과 스팸함을 확인해 주세요.", false, { email });
      } catch (error) {
        console.error("인증 메일 재전송에 실패했습니다.", error);
        showAuthScreen("login", error.message || "인증 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.", false, { email, canResendConfirmation: true });
      }
    });
  }
  const form = screen.querySelector("#auth-form");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!supabaseClient) return;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const button = form.querySelector(".auth-submit");
    button.disabled = true;
    button.textContent = isSignup ? "가입 중…" : "로그인 중…";
    try {
      if (isSignup) {
        const name = String(formData.get("name") || "").trim();
        const { data, error } = await supabaseClient.auth.signUp({ email, password, options: { data: { name } } });
        if (error) throw error;
        if (data.session && data.user) {
          activeSession = data.session;
          await loadAuthenticatedUser(data.user);
        }
        else showAuthScreen("login", "가입 신청을 완료했어요. 이메일 인증을 마친 뒤 로그인해 주세요.");
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        activeSession = data.session;
        await loadAuthenticatedUser(data.user);
      }
    } catch (error) {
      console.error("인증 요청에 실패했습니다.", error);
      const emailUnconfirmed = /email not confirmed|email_not_confirmed/i.test(error.message || "");
      const message = emailUnconfirmed
        ? "이메일 인증이 완료되지 않았어요. 받은편지함의 인증 링크를 눌러 주세요."
        : /invalid login credentials/i.test(error.message || "")
        ? "이메일 또는 비밀번호를 확인해 주세요."
        : /user already registered/i.test(error.message || "")
          ? "이미 가입된 이메일입니다. 로그인해 주세요."
          : error.message || "요청을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      showAuthScreen(authMode, message, false, { email, canResendConfirmation: emailUnconfirmed });
    }
  });
}
function showAccountLoadError(error) {
  console.error("계정 옷장을 불러오지 못했습니다.", error);
  const screen = document.getElementById("auth-screen");
  screen.hidden = false;
  document.getElementById("app-shell").hidden = true;
  screen.innerHTML = `<section class="auth-card"><a class="brand auth-brand" href="#" aria-label="모아 홈"><span class="brand-mark">m</span><span>moa<span class="brand-dot">.</span></span></a><span class="eyebrow">PRIVATE WARDROBE</span><h1>옷장을 불러오지 못했어요</h1><p class="auth-message" role="alert">${escapeHtml(error.message || "옷장 서버에 연결하지 못했어요.")}${error.code ? `<br>오류 코드: ${escapeHtml(error.code)}` : ""}</p><p class="auth-intro">저장된 옷장은 변경하지 않았어요. 연결을 확인한 뒤 다시 시도하거나 다시 로그인해 주세요.</p><div class="auth-actions"><button type="button" class="primary-button" data-auth-retry>다시 시도</button><button type="button" class="secondary-button" data-auth-logout>로그아웃</button></div></section>`;
  screen.querySelector("[data-auth-retry]").addEventListener("click", () => loadAuthenticatedUser(activeUser));
  screen.querySelector("[data-auth-logout]").addEventListener("click", signOut);
}
async function loadAuthenticatedUser(user) {
  if (!user || !supabaseClient) return;
  if (syncedUserId === user.id) {
    document.getElementById("auth-screen").hidden = true;
    document.getElementById("app-shell").hidden = false;
    return;
  }
  if (accountLoadPromise?.userId === user.id) return accountLoadPromise.promise;
  if (activeUser?.id !== user.id) {
    clearPendingCloudSave();
    clearClosetOutfitSelections();
    activeCloudUpdatedAt = "";
    lastAccountLoadError = null;
    document.getElementById("app-shell").hidden = true;
    document.getElementById("auth-screen").hidden = false;
  }
  activeUser = user;
  const loadVersion = ++authLoadVersion;
  const task = (async () => {
    activeStorageKey = `${ACCOUNT_STORAGE_PREFIX}${user.id}`;
    const cachedRecord = await readAccountCache(user.id);
    if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
    let cachedState = cachedRecord?.state || null;
    activeCloudUpdatedAt = cachedRecord?.cloudUpdatedAt || "";
    if (cachedState) {
      state = cachedState;
      document.getElementById("auth-screen").hidden = true;
      document.getElementById("app-shell").hidden = false;
      render();
      setCloudSaveStatus("pending");
    } else {
      document.getElementById("auth-screen").hidden = false;
      const previousError = lastAccountLoadError?.userId === user.id ? lastAccountLoadError.message : "";
      document.getElementById("auth-screen").innerHTML = `<section class="auth-card"><span class="brand-mark">m</span><h1>나만의 옷장을 불러오는 중…</h1><p class="auth-intro" id="account-load-status" role="status">계정 데이터를 확인하고 있어요.</p>${previousError ? `<p class="auth-message">이전 연결 오류: ${escapeHtml(previousError)}</p>` : ""}<button type="button" class="secondary-button" data-auth-logout>로그아웃</button></section>`;
      document.getElementById("auth-screen").querySelector("[data-auth-logout]").addEventListener("click", signOut);
    }
    try {
      let cloudUnchanged = false;
      const request = (async () => {
        if (cachedState && activeCloudUpdatedAt) {
          const metadata = await readClosetRecord(user.id, "updated_at", loadVersion);
          if (metadata.data && Date.parse(metadata.data.updated_at) === Date.parse(activeCloudUpdatedAt)) {
            cloudUnchanged = true;
            return { data: { state: cachedState, updated_at: metadata.data.updated_at }, error: null };
          }
        }
        return readClosetRecord(user.id, "state, updated_at", loadVersion);
      })();
      const result = await request;
      const { data, error } = result;
      if (error) throw error;
      if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
      if (data) {
        if (!data.state || !Array.isArray(data.state.items)) throw new Error("저장된 옷장 데이터 형식이 올바르지 않습니다.");
        const cloudState = mergeStoredState(data.state);
        cachedState = (await readAccountCache(user.id))?.state || cachedState;
        if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
        if (shouldPreferCachedClosetState(cachedState, cloudState, data.updated_at)
          || (cloudUnchanged && Date.parse(cachedState?.updatedAt || "") > Date.parse(data.updated_at))) {
          state = cachedState;
          if (!Number.isFinite(Date.parse(state.updatedAt || ""))) state.updatedAt = new Date().toISOString();
          scheduleCloudSave(user.id, createStorageSnapshot(), 0);
        } else {
          state = cloudState;
        }
      } else {
        cachedState = (await readAccountCache(user.id))?.state || cachedState;
        if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
        const hasLegacyData = localStorage.getItem(STORAGE_KEY) !== null;
        if (cachedState) state = cachedState;
        else if (hasLegacyData && window.confirm("이 브라우저에 남아 있는 기존 옷장을 이 계정으로 옮길까요? 취소하면 이 계정에 새 옷장을 만들고 기존 브라우저 데이터는 그대로 둡니다.")) state = loadState(STORAGE_KEY);
        else state = structuredClone(defaultState);
        if (!Number.isFinite(Date.parse(state.updatedAt || ""))) state.updatedAt = new Date().toISOString();
        scheduleCloudSave(user.id, createStorageSnapshot(), 0);
      }
      activeCloudUpdatedAt = data?.updated_at || "";
      // Cache large photos without blocking the first render on a disk write.
      void writeAccountCache(user.id, createStorageSnapshot(), activeCloudUpdatedAt);
      document.getElementById("auth-screen").hidden = true;
      document.getElementById("app-shell").hidden = false;
      render();
      syncedUserId = user.id;
      lastAccountLoadError = null;
      clearTimeout(cloudReadRetryTimer);
      cloudReadRetryAttempt = 0;
      setCloudSaveStatus(pendingCloudSave ? "pending" : "saved");
      reanalyzeStoredColors();
    } catch (error) {
      if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
      lastAccountLoadError = { userId: user.id, message: error.message };
      if (cachedState) {
        state = (await readAccountCache(user.id))?.state || cachedState;
        if (activeUser?.id !== user.id || authLoadVersion !== loadVersion) return;
        document.getElementById("auth-screen").hidden = true;
        document.getElementById("app-shell").hidden = false;
        render();
        setCloudSaveStatus("error");
        console.error("클라우드 옷장을 확인하지 못했습니다. 기기에 저장된 옷장은 그대로 유지합니다.", error);
        scheduleCloudReadRetry(user);
      } else {
        showAccountLoadError(error);
      }
    }
  })();
  accountLoadPromise = { userId: user.id, promise: task };
  try { await task; }
  finally { if (accountLoadPromise?.promise === task) accountLoadPromise = null; }
}
async function signOut() {
  if (!supabaseClient) return;
  clearTimeout(cloudSaveTimer);
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("로그아웃에 실패했습니다.", error);
    notify("로그아웃하지 못했어요. 다시 시도해 주세요.");
    return;
  }
  activeUser = null;
  activeSession = null;
  lastAccountLoadError = null;
  activeCloudUpdatedAt = "";
  activeStorageKey = STORAGE_KEY;
  syncedUserId = "";
  authLoadVersion++;
  clearPendingCloudSave();
  clearClosetOutfitSelections();
  state = structuredClone(defaultState);
  showAuthScreen("login", "안전하게 로그아웃했어요.");
}
async function initializeAuthentication() {
  const config = window.MOA_SUPABASE_CONFIG;
  if (!window.supabase?.createClient || !config?.url || !config?.anonKey) {
    showAuthScreen("login");
    return;
  }
  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  // Use the session already delivered by Auth instead of reacquiring its lock
  // for every database request. Auth remains responsible for token refresh.
  closetDataClient = window.supabase.createClient(config.url, config.anonKey, {
    accessToken: async () => activeSession?.access_token || null
  });
  showAuthScreen("login");
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      activeSession = session;
      const shouldLoad = activeUser?.id !== session.user.id || !lastAccountLoadError || event === "TOKEN_REFRESHED";
      if (shouldLoad) setTimeout(() => {
        if (activeSession?.user?.id === session.user.id
          && (activeUser?.id !== session.user.id || !lastAccountLoadError || event === "TOKEN_REFRESHED")) loadAuthenticatedUser(session.user);
      }, 0);
    }
    else if (event === "SIGNED_OUT") {
      activeUser = null;
      activeSession = null;
      lastAccountLoadError = null;
      activeCloudUpdatedAt = "";
      activeStorageKey = STORAGE_KEY;
      syncedUserId = "";
      authLoadVersion++;
      clearPendingCloudSave();
      clearClosetOutfitSelections();
      state = structuredClone(defaultState);
      showAuthScreen("login");
    }
  });
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.error("로그인 상태를 확인하지 못했습니다.", error);
    showAuthScreen("login", "로그인 상태를 확인하지 못했습니다. 새로고침해 다시 시도해 주세요.");
    return;
  }
  if (data.session?.user) {
    activeSession = data.session;
    await loadAuthenticatedUser(data.session.user);
  }
}
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function photoFor(item) { return item.image || item.photo || ""; }
function generatedGarmentTitle(item) {
  const category = item.category && item.category !== "분류 확인" ? item.category : "";
  const color = item.color && item.color !== "분석 중" ? item.color : "";
  if (category && color) return `${color} ${category}`;
  if (category) return `${category} 아이템`;
  if (color) return `${color} 패션 아이템`;
  return "새 패션 아이템";
}
function garmentDisplayName(item) {
  const name = String(item?.name || "").trim();
  return /옷 종류 확인 필요|종류 확인 필요/.test(name) ? generatedGarmentTitle(item) : name || generatedGarmentTitle(item);
}
function photoRotationAttribute(item) {
  return [0, 90, 180, 270].includes(item.photoRotation) ? item.photoRotation : "auto";
}
function sizeFieldFor(item) {
  if (item.category === "상의" || item.category === "아우터") return "topSize";
  if (item.category === "하의") return "bottomSize";
  if (item.category === "원피스") return "onepieceSize";
  if (item.category === "신발") return "shoeSize";
  return "";
}
function garmentGender(item) {
  if (item.gender === "male" || item.gender === "female" || item.gender === "unisex") return item.gender;
  const description = `${item.name || ""} ${item.category || ""} ${item.style || ""}`.toLocaleLowerCase("ko-KR");
  if (/남성|남자|맨즈|men's|mens|male|수트|정장|타이 셔츠/.test(description)) return "male";
  if (/여성|여자|레이디|ladies|women|female|원피스|드레스|dress|스커트|치마|블라우스|blouse|하이힐|플레어|미디|페미닌|숄더백/.test(description)) return "female";
  return "unisex";
}
function profileGenderLabel(gender = state.profile.gender) {
  return gender === "male" ? "남성용" : gender === "female" ? "여성용" : "";
}
function isGarmentForProfile(item) {
  const gender = state.profile.gender;
  return !gender || garmentGender(item) === "unisex" || garmentGender(item) === gender;
}
function sizeStatusFor(item) {
  const field = sizeFieldFor(item);
  if (!field) return "not-applicable";
  const profileSize = state.profile[field];
  if (!profileSize || !item.size) return "unknown";
  return String(profileSize).toUpperCase() === String(item.size).toUpperCase() ? "match" : "mismatch";
}
function fitScoreFor(items) {
  const fittedItems = items.filter(item => sizeFieldFor(item));
  if (!fittedItems.length) return 50;
  return fittedItems.reduce((sum, item) => {
    const status = sizeStatusFor(item);
    return sum + (status === "match" ? 100 : status === "unknown" ? 35 : 0);
  }, 0) / fittedItems.length;
}
function colorFamily(value = "") {
  const color = value.toLowerCase();
  if (/멀티|체커|믹스|패턴/.test(color)) return "pattern";
  if (/네이비/.test(color)) return "navy";
  if (/인디고|데님|블루|파랑/.test(color)) return "blue";
  if (/화이트|흰색/.test(color)) return "white";
  if (/아이보리|크림/.test(color)) return "ivory";
  if (/블랙|검정/.test(color)) return "black";
  if (/그레이|회색|차콜/.test(color)) return "gray";
  if (/베이지|카멜/.test(color)) return "beige";
  if (/브라운|갈색/.test(color)) return "brown";
  if (/올리브|카키/.test(color)) return "olive";
  if (/그린|녹색/.test(color)) return "green";
  if (/핑크|분홍/.test(color)) return "pink";
  if (/레드|빨강|버건디/.test(color)) return "red";
  if (/옐로|노랑|노란/.test(color)) return "yellow";
  if (/오렌지|주황/.test(color)) return "orange";
  if (/퍼플|보라/.test(color)) return "purple";
  return "unknown";
}
function colorHarmonyScore(items) {
  const garments = items.filter(item => item.category !== "가방");
  const colors = garments.map(item => (item.color || "").split(/[,·/+&]/).map(value => colorFamily(value.trim())).filter(Boolean));
  if (colors.length < 2) return 80;
  const neutralColors = new Set(["black", "white", "ivory", "gray"]);
  const baseColors = new Set(["beige", "navy", "olive", "brown"]);
  const warmColors = new Set(["red", "orange", "yellow"]);
  const coolColors = new Set(["blue", "purple"]);
  const popularPairs = new Set([
    "beige:blue", "beige:green", "beige:navy", "beige:olive", "beige:white",
    "black:gray", "black:white", "blue:white", "brown:ivory", "gray:navy",
    "gray:pink", "gray:white", "ivory:navy", "navy:white", "olive:white",
    "pink:white", "red:white"
  ]);
  const pairScore = (a, b) => {
    if (a === b) return 96;
    if (a === "unknown" || b === "unknown") return 70;
    if (a === "pattern" || b === "pattern") {
      const other = a === "pattern" ? b : a;
      return neutralColors.has(other) || baseColors.has(other) ? 88 : 74;
    }
    if (popularPairs.has([a, b].sort().join(":"))) return 100;
    if (neutralColors.has(a) || neutralColors.has(b)) return 91;
    if (baseColors.has(a) && baseColors.has(b)) return 92;
    if (baseColors.has(a) || baseColors.has(b)) return 86;
    if ((warmColors.has(a) && warmColors.has(b)) || (coolColors.has(a) && coolColors.has(b))) return 87;
    if (a === "green" || b === "green" || a === "pink" || b === "pink") return 80;
    return 58;
  };
  let pairTotal = 0, pairs = 0;
  for (let first = 0; first < colors.length; first++) {
    for (let second = first + 1; second < colors.length; second++) {
      for (const a of colors[first]) for (const b of colors[second]) {
        pairTotal += pairScore(a, b);
        pairs++;
      }
    }
  }
  const distinctColors = new Set(colors.flat().filter(color => color !== "pattern" && color !== "unknown"));
  const colorCountScore = distinctColors.size <= 1 ? 90 : distinctColors.size <= 3 ? 100 : distinctColors.size === 4 ? 76 : 58;
  const patternCount = colors.flat().filter(color => color === "pattern").length;
  const patternScore = patternCount <= 1 ? 100 : 62;
  const brightBottomCount = garments.filter(item =>
    item.category === "하의" && /화이트|아이보리|크림|라이트|스카이|파스텔|옐로|노랑|핑크|레드|오렌지|주황/i.test(item.color || "")
  ).length;
  const brightBottomAdjustment = Math.min(brightBottomCount * 7, 14);
  const pairAverage = pairs ? pairTotal / pairs : 80;
  return Math.max(0, Math.round(pairAverage * 0.7 + colorCountScore * 0.2 + patternScore * 0.1 - brightBottomAdjustment));
}
function dateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "short" }).format(date);
}
function weatherDateKey(weather, date = new Date()) {
  const timezone = weather?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}
function hasCurrentRainForecast(weather) {
  return weather?.rainForecastSource === "hourly_remaining_day"
    && weather.rainForecastDate === weatherDateKey(weather);
}
function weatherLabel() {
  const value = state.weather;
  if (!value) return { temp: "오늘 날씨", description: "위치를 설정해 확인해 보세요", icon: "⛅", location: "위치 설정" };
  const code = value.code;
  const icon = code === 0 ? "☀️" : code <= 3 ? "⛅" : (code >= 71 && code <= 77) || (code >= 85 && code <= 86) ? "❄️" : code >= 51 && code <= 82 ? "🌧️" : "☁️";
  const updatedAt = value.updatedAt ? ` · ${new Date(value.updatedAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 기준` : "";
  const rainForecast = hasCurrentRainForecast(value) ? ` · 오늘 남은 시간 강수확률 ${Math.round(value.rain)}%` : "";
  return { temp: `${Math.round(value.temp)}°`, description: `${value.description}${rainForecast}${updatedAt}`, icon, location: value.location || "내 위치" };
}
function weatherAdvice() {
  const weather = state.weather;
  if (!weather) return { kind: "unknown", title: "오늘 날씨를 확인해 보세요", message: "현재 기온과 날씨에 맞는 옷차림을 알려드릴게요.", detail: "위치를 설정하면 실시간 날씨를 확인할 수 있어요." };
  const temp = Number.isFinite(weather.temp) ? weather.temp : null;
  const windSpeed = Number.isFinite(weather.windSpeed) ? weather.windSpeed : null;
  const code = Number(weather.code);
  const rain = hasCurrentRainForecast(weather) && Number.isFinite(weather.rain) ? weather.rain : null;
  const precipitation = Number(weather.precipitation);
  const raining = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || precipitation > 0;
  const rainExpected = raining || (rain !== null && rain >= 60);
  const condition = `${weather.description || "날씨 확인"}${Number.isFinite(temp) ? ` · ${Math.round(temp)}°` : ""}`;
  const windDetail = Number.isFinite(windSpeed) ? `바람 ${Math.round(windSpeed)}km/h` : "";
  const rainDetail = rain !== null ? `오늘 남은 시간 강수확률 ${Math.round(rain)}%` : "";
  const detail = [condition, rainDetail, windDetail].filter(Boolean).join(" · ");

  if (rainExpected) {
    return {
      kind: "rain",
      title: raining ? "비가 오니 우산을 챙겨요" : "비 소식이 있어요",
      message: raining ? "우산과 함께 젖어도 괜찮은 신발이나 방수되는 겉옷을 준비해 보세요." : "외출할 때 우산을 챙기고, 젖어도 괜찮은 신발을 신어 보세요.",
      detail
    };
  }
  if (Number.isFinite(windSpeed) && windSpeed >= 25 && Number.isFinite(temp) && temp <= 18) {
    return { kind: "wind", title: "바람이 강해 쌀쌀하게 느껴질 수 있어요", message: "체감온도가 낮아질 수 있으니 바람막이나 겉옷을 하나 챙겨 보세요.", detail };
  }
  if (Number.isFinite(temp) && temp <= 5) {
    return { kind: "cold", title: "날씨가 추우니 겉옷을 하나 챙기는 게 어떠세요?", message: "코트나 패딩처럼 따뜻한 옷을 입고 목도리도 함께 준비해 보세요.", detail };
  }
  if (Number.isFinite(temp) && temp <= 14) {
    return { kind: "cool", title: "쌀쌀한 날씨예요", message: "니트나 가벼운 재킷을 겹쳐 입으면 따뜻하게 보낼 수 있어요.", detail };
  }
  if (Number.isFinite(windSpeed) && windSpeed >= 25) {
    return { kind: "wind", title: "바람이 많이 불어요", message: "가벼운 바람막이를 챙기면 바람을 막는 데 도움이 돼요.", detail };
  }
  if (Number.isFinite(temp) && temp >= 27) {
    return { kind: "hot", title: "기온이 높으니 시원하게 입어 보세요", message: "통풍이 잘되는 얇은 옷과 가벼운 신발로 편안하게 준비해 보세요.", detail };
  }
  return { kind: "mild", title: "오늘은 가볍게 겹쳐 입기 좋아요", message: "현재 날씨에 맞춰 얇은 겉옷을 준비하면 실내외 온도 차에도 편안해요.", detail };
}
function temperatureOutfitGuidance(temp) {
  if (!Number.isFinite(temp)) return "날씨를 연결하면 현재 기온에 어울리는 옷을 추천해요.";
  if (temp <= 5) return `${Math.round(temp)}° 기준 · 추운 날씨라 코트·패딩·니트 등 따뜻한 옷을 우선해요.`;
  if (temp <= 14) return `${Math.round(temp)}° 기준 · 쌀쌀한 날씨라 니트와 아우터를 우선해요.`;
  if (temp <= 22) return `${Math.round(temp)}° 기준 · 선선한 날씨에 맞춰 긴팔과 가벼운 겉옷을 고려해요.`;
  if (temp <= 27) return `${Math.round(temp)}° 기준 · 따뜻한 날씨라 가벼운 상의를 고려해요.`;
  return `${Math.round(temp)}° 기준 · 더운 날씨라 반팔·쇼츠처럼 시원한 옷을 우선해요.`;
}
function temperatureSuitabilityScore(items, temp) {
  if (!Number.isFinite(temp)) return 50;
  const garments = items.filter(item => item.category !== "가방");
  if (!garments.length) return 50;
  const cold = temp <= 14;
  const hot = temp > 25;
  const adjustments = garments.map(item => {
    const name = garmentDisplayName(item).toLowerCase();
    const light = /반팔|민소매|나시|린넨|쇼츠|반바지|샌들|얇은|시어서커/.test(name);
    const warm = /니트|스웨터|울|기모|플리스|패딩|다운|코트|목폴라|터틀넥|두꺼운/.test(name);
    const shortBottom = item.category === "하의" && /쇼츠|반바지|숏팬츠|미니스커트/.test(name);
    const warmFootwear = item.category === "신발" && /부츠|앵클/.test(name);
    const lightFootwear = item.category === "신발" && /샌들|슬리퍼/.test(name);
    if (cold) {
      return (item.category === "아우터" ? 18 : 0)
        + (warm ? 22 : 0)
        + (shortBottom || light ? -28 : 0)
        + (warmFootwear ? 8 : 0)
        + (lightFootwear ? -18 : 0);
    }
    if (hot) {
      return (light ? 22 : 0)
        + (warm ? -28 : 0)
        + (item.category === "아우터" ? -24 : 0)
        + (shortBottom || lightFootwear ? 12 : 0);
    }
    return (warm ? 7 : 0)
      + (item.category === "아우터" && temp <= 18 ? 9 : 0)
      + (light ? 4 : 0)
      + (shortBottom && temp <= 18 ? -10 : 0);
  });
  const adjustment = adjustments.reduce((sum, value) => sum + value, 0) / garments.length;
  return Math.max(0, Math.min(100, Math.round(68 + adjustment)));
}
function render() {
  pruneClosetOutfitSelections();
  document.getElementById("today-date").textContent = dateLabel();
  document.getElementById("nav-count").textContent = state.items.length;
  document.getElementById("account-name").textContent = activeUser?.user_metadata?.name || activeUser?.email || "내 계정";
  document.getElementById("profile-style-label").textContent = [profileGenderLabel().replace("용", ""), state.profile.style && `${state.profile.style} 스타일`].filter(Boolean).join(" · ") || "스타일 설정하기";
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === activeView));
  const labels = { home: "오늘의 옷장", closet: "내 옷장", saved: "저장한 코디", insights: "옷장 리포트" };
  document.getElementById("breadcrumb-current").textContent = labels[activeView] || labels.home;
  const container = document.getElementById("view-container");
  if (activeView === "home") container.innerHTML = renderHome();
  if (activeView === "closet") container.innerHTML = renderCloset();
  if (activeView === "saved") container.innerHTML = renderSaved();
  if (activeView === "insights") container.innerHTML = renderInsights();
  setCloudSaveStatus(cloudSaveStatus);
  bindDynamicEvents();
  orientWidePhotos(container);
}
function orientWidePhotos(root) {
  if (typeof ResizeObserver === "function") {
    if (!outfitPhotoResizeObserver) {
      outfitPhotoResizeObserver = new ResizeObserver(entries => {
        entries.forEach(({ target }) => target.querySelectorAll("img[data-auto-portrait]").forEach(applyImageOrientation));
      });
    }
    for (const frame of observedOutfitFrames) {
      if (!frame.isConnected) {
        outfitPhotoResizeObserver.unobserve(frame);
        observedOutfitFrames.delete(frame);
      }
    }
    root.querySelectorAll(".outfit-art").forEach(frame => {
      if (!observedOutfitFrames.has(frame)) {
        observedOutfitFrames.add(frame);
        outfitPhotoResizeObserver.observe(frame);
      }
    });
  }
  root.querySelectorAll("img[data-auto-portrait]").forEach(image => {
    const applyOrientation = () => applyImageOrientation(image);
    if (image.dataset.closetPhoto) {
      if (!("IntersectionObserver" in window)) {
        const item = state.items.find(entry => entry.id === image.dataset.closetPhoto);
        if (item) {
          image.addEventListener("load", applyOrientation, { once: true });
          image.src = photoFor(item);
        }
        return;
      }
      if (!closetPhotoObserver) {
        closetPhotoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          closetPhotoObserver.unobserve(target);
          const item = state.items.find(candidate => candidate.id === target.dataset.closetPhoto);
          if (!item) return;
          target.addEventListener("load", () => {
            if (target.isConnected) applyImageOrientation(target);
          }, { once: true });
          target.src = photoFor(item);
        }), { rootMargin: "240px" });
      }
      closetPhotoObserver.observe(image);
      return;
    }
    if (image.complete) applyOrientation();
    else image.addEventListener("load", applyOrientation, { once: true });
  });
}
function applyImageOrientation(image) {
  const savedRotation = image.dataset.photoRotation;
  const rotation = savedRotation === "auto"
    ? (image.naturalWidth > image.naturalHeight ? 90 : 0)
    : Number(savedRotation);
  const frame = image.parentElement;
  if (frame?.classList.contains("outfit-piece")) {
    const width = frame.clientWidth;
    const height = frame.clientHeight;
    if (!width || !height) return;
    // Swap the image's box before a quarter turn so its rotated bounds stay
    // inside the tile. object-fit: contain preserves the entire garment.
    const quarterTurn = Math.abs(rotation % 180) === 90;
    image.style.width = `${quarterTurn ? height : width}px`;
    image.style.height = `${quarterTurn ? width : height}px`;
    image.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  } else {
    image.style.transform = rotation ? `rotate(${rotation}deg)` : "none";
  }
}
function outfitCards(savedOnly = false) {
  const outfits = getRecommendations();
  if (savedOnly) return state.saved;
  return outfits;
}
function occasionSuitabilityScore(items, occasion, lookStyle) {
  const stylesByOccasion = {
    일상: ["캐주얼", "미니멀"],
    학교: ["캐주얼", "스트릿", "미니멀"],
    데이트: ["페미닌", "미니멀", "포멀"],
    면접: ["포멀", "미니멀"],
    여행: ["캐주얼", "스트릿", "미니멀"]
  };
  const preferredStyles = stylesByOccasion[occasion] || stylesByOccasion.일상;
  const styleScores = items.map(item => {
    const name = garmentDisplayName(item);
    if (item.category === "가방") {
      const isBackpack = /백팩|배낭|책가방|backpack/i.test(name);
      if (occasion === "학교" || occasion === "여행") return isBackpack ? 100 : 72;
      if (occasion === "데이트") return isBackpack ? 15 : 100;
      return 65;
    }
    if (occasion === "데이트" && item.category === "하의" && /스커트|치마/.test(name)) return 100;
    if (occasion === "면접") return item.style === "포멀" ? 100 : item.style === "미니멀" ? 85 : 20;
    if (occasion === "데이트") {
      if (item.style === "페미닌") return 100;
      if (item.style === "미니멀") return 92;
      if (item.style === "포멀") return 85;
      if (item.style === "캐주얼") return 60;
      if (item.style === "스트릿") return 20;
    }
    if (item.style === lookStyle) return 100;
    if (preferredStyles.includes(item.style)) return 88;
    return 45;
  });
  let score = styleScores.reduce((sum, value) => sum + value, 0) / Math.max(styleScores.length, 1);
  const hasCategory = category => items.some(item => item.category === category);
  if (occasion === "학교" || occasion === "여행") {
    if (hasCategory("가방")) score += 15;
    if (hasCategory("신발") && items.some(item => item.category === "신발" && ["캐주얼", "스트릿", "미니멀"].includes(item.style))) score += 8;
  } else if (occasion === "데이트") {
    if (hasCategory("가방") && items.some(item => item.category === "가방" && !/백팩|배낭|책가방|backpack/i.test(garmentDisplayName(item)))) score += 12;
    if (items.some(item => item.category === "신발" && ["페미닌", "미니멀", "포멀"].includes(item.style))) score += 10;
    if (items.some(item => item.category === "하의" && /스커트|치마/.test(garmentDisplayName(item)))) score += 10;
  } else if (occasion === "면접") {
    if (hasCategory("아우터") && items.some(item => item.category === "아우터" && ["포멀", "미니멀"].includes(item.style))) score += 12;
    if (items.some(item => item.category === "하의" && ["포멀", "미니멀"].includes(item.style))) score += 8;
  }
  return Math.min(100, score);
}
function recommendationInputKey() {
  return JSON.stringify({
    user: activeUser?.id || activeStorageKey,
    occasion: state.selectedOccasion,
    temperature: Number.isFinite(state.weather?.temp) ? state.weather.temp : null,
    profile: state.profile,
    updatedAt: state.updatedAt || "",
    pinned: [...appliedClosetItemIds].sort(),
    items: state.items.map(item => [
      item.id, item.name, item.category, item.color, item.style, item.size,
      item.gender, item.recommendationExcluded
    ])
  });
}
function getRecommendations() {
  const inputKey = recommendationInputKey();
  if (inputKey !== recommendationCacheInputKey) {
    recommendationCacheInputKey = inputKey;
    recommendationResultCache.clear();
  }
  const cached = recommendationResultCache.get(recommendationOffset);
  if (cached) {
    recommendationPoolSize = cached.poolSize;
    return cached.looks;
  }
  const looks = computeRecommendations();
  recommendationResultCache.set(recommendationOffset, { poolSize: recommendationPoolSize, looks });
  if (recommendationResultCache.size > 24) {
    recommendationResultCache.delete(recommendationResultCache.keys().next().value);
  }
  return looks;
}
function computeRecommendations() {
  const looksByOccasion = {
    일상: [
      { title: "가벼운 주말 산책", style: "캐주얼", preferred: [["seed-1", "seed-2"], ["seed-4", "seed-3"], ["seed-7", "seed-16"], ["seed-18", "seed-17"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "편안한 하루", style: "캐주얼", preferred: [["seed-9", "seed-2"], ["seed-3", "seed-4"], ["seed-5", "seed-6"], ["seed-7", "seed-16"]], roles: ["상의", "하의", "아우터", "신발"] },
      { title: "포근한 니트 데일리", style: "미니멀", preferred: [["seed-10", "seed-1"], ["seed-4", "seed-13"], ["seed-6", "seed-5"], ["seed-16", "seed-7"]], roles: ["상의", "하의", "아우터", "신발"] }
    ],
    학교: [
      { title: "가방까지 챙긴 캠퍼스 룩", style: "캐주얼", preferred: [["seed-9", "seed-2"], ["seed-4", "seed-3"], ["seed-7", "seed-16"], ["seed-17"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "활동하기 편한 등교 룩", style: "캐주얼", preferred: [["seed-2", "seed-9"], ["seed-14", "seed-4"], ["seed-7"], ["seed-17"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "니트와 스커트 강의 룩", style: "스트릿", preferred: [["seed-10"], ["seed-13", "seed-4"], ["seed-16", "seed-7"], ["seed-17"]], roles: ["상의", "하의", "신발", "가방"] }
    ],
    데이트: [
      { title: "원피스 데이트 룩", style: "페미닌", preferred: [["seed-15"], ["seed-6", "seed-5"], ["seed-8", "seed-16"], ["seed-18"]], roles: ["원피스", "아우터", "신발", "가방"] },
      { title: "니트와 미디 스커트", style: "미니멀", preferred: [["seed-10", "seed-11"], ["seed-13"], ["seed-16", "seed-8"], ["seed-18"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "블라우스 플레어 스커트", style: "페미닌", preferred: [["seed-11", "seed-1"], ["seed-13", "seed-3"], ["seed-8"], ["seed-18", "seed-17"]], roles: ["상의", "하의", "신발", "가방"] }
    ],
    면접: [
      { title: "네이비 수트 면접 룩", style: "포멀", preferred: [["seed-12", "seed-11"], ["seed-20"], ["seed-19"], ["seed-16", "seed-8"]], roles: ["상의", "하의", "아우터", "신발"] },
      { title: "블라우스 비즈니스 룩", style: "포멀", preferred: [["seed-11", "seed-12"], ["seed-20", "seed-13"], ["seed-19"], ["seed-8", "seed-16"]], roles: ["상의", "하의", "아우터", "신발"] },
      { title: "단정한 재킷 코디", style: "포멀", preferred: [["seed-12", "seed-11"], ["seed-4", "seed-20"], ["seed-19"], ["seed-16", "seed-8"]], roles: ["상의", "하의", "아우터", "신발"] }
    ],
    여행: [
      { title: "가볍게 떠나는 여행 룩", style: "캐주얼", preferred: [["seed-2", "seed-9"], ["seed-14", "seed-4"], ["seed-7"], ["seed-17"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "많이 걸어도 편안하게", style: "캐주얼", preferred: [["seed-9", "seed-2"], ["seed-4", "seed-3"], ["seed-16", "seed-7"], ["seed-17"]], roles: ["상의", "하의", "신발", "가방"] },
      { title: "쌀쌀한 날 여행 코디", style: "스트릿", preferred: [["seed-10", "seed-9"], ["seed-4", "seed-13"], ["seed-6", "seed-5"], ["seed-16", "seed-7"]], roles: ["상의", "하의", "아우터", "신발"] }
    ]
  };
  const occasionSlugs = { 일상: "daily", 학교: "school", 데이트: "date", 면접: "interview", 여행: "travel" };
  const occasion = looksByOccasion[state.selectedOccasion] ? state.selectedOccasion : "일상";
  const pinnedItems = state.items.filter(item => appliedClosetItemIds.has(item.id) && isClosetOutfitSelectable(item));
  appliedClosetItemIds = new Set(pinnedItems.map(item => item.id));
  const pinnedByCategory = new Map(pinnedItems.map(item => [item.category, item]));
  const profileHasSizes = ["topSize", "bottomSize", "onepieceSize", "shoeSize"].some(field => state.profile[field]);
  const availableCategories = new Set(state.items.filter(isClosetOutfitSelectable).map(item => item.category));
  const formalAlternativeCategories = new Set(["상의", "하의", "아우터", "신발"].filter(category =>
    state.items.some(item => item.category === category && isClosetOutfitSelectable(item) && ["포멀", "미니멀"].includes(item.style))
  ));
  const hasNonBackpackBag = state.items.some(item => item.category === "가방" && isClosetOutfitSelectable(item) && !/백팩|배낭|책가방|backpack/i.test(garmentDisplayName(item)));
  const isUsefulContextRole = category => category !== "가방" || occasion !== "데이트" || pinnedByCategory.has("가방") || hasNonBackpackBag;
  const recommendationCandidates = looksByOccasion[occasion].map((look, lookIndex) => {
    let roles = look.roles.filter(isUsefulContextRole);
    if (pinnedItems.length) {
      const contextRoles = look.roles.filter(category => (availableCategories.has(category) || pinnedByCategory.has(category)) && isUsefulContextRole(category));
      if (pinnedByCategory.has("원피스")) {
        roles = ["원피스", ...contextRoles.filter(category => !["상의", "하의", "원피스"].includes(category))];
      } else if (pinnedByCategory.has("상의") || pinnedByCategory.has("하의")) {
        roles = [
          "상의",
          "하의",
          ...contextRoles.filter(category => !["상의", "하의", "원피스"].includes(category))
        ];
      } else {
        roles = [...contextRoles];
      }
    }
    for (const item of pinnedItems) {
      if (!roles.includes(item.category)) roles.push(item.category);
    }
    const pools = roles.map((category, roleIndex) => state.items
      .filter(item => item.category === category
        && (!pinnedByCategory.has(category) || item.id === pinnedByCategory.get(category).id)
        && (occasion !== "면접" || !formalAlternativeCategories.has(category) || pinnedByCategory.has(category) || ["포멀", "미니멀"].includes(item.style))
        && isClosetOutfitSelectable(item))
      .sort((a, b) => {
        const preferred = look.preferred[roleIndex] || [];
        const aRank = preferred.indexOf(a.id), bRank = preferred.indexOf(b.id);
        const aPreferred = aRank < 0 ? 0 : preferred.length - aRank;
        const bPreferred = bRank < 0 ? 0 : preferred.length - bRank;
        return (sizeStatusFor(b) === "match" ? 1 : 0) - (sizeStatusFor(a) === "match" ? 1 : 0) || bPreferred - aPreferred;
      })
      .slice(0, 12));
    if (pools.some(pool => !pool.length)) return null;
    const combinations = [];
    const current = [];
    const collect = roleIndex => {
      if (roleIndex === pools.length) {
        const colors = colorHarmonyScore(current);
        const fit = fitScoreFor(current);
        const occasionFit = occasionSuitabilityScore(current, occasion, look.style);
        const temperatureFit = temperatureSuitabilityScore(current, state.weather?.temp);
        const profileStyle = current.reduce((sum, item) => sum + (item.style === state.profile.style ? 100 : 50), 0) / current.length;
        const preferredScore = current.reduce((sum, item, index) => sum + ((look.preferred[index] || []).includes(item.id) ? 100 : 0), 0) / current.length;
        combinations.push({ picks: [...current], paletteScore: colors, fitScore: fit, occasionScore: occasionFit, temperatureScore: temperatureFit, score: Math.round(colors * 0.24 + fit * 0.21 + occasionFit * 0.3 + profileStyle * 0.03 + preferredScore * 0.02 + temperatureFit * 0.2) });
        return;
      }
      for (const item of pools[roleIndex]) {
        current.push(item);
        collect(roleIndex + 1);
        current.pop();
      }
    };
    collect(0);
    combinations.sort((a, b) => b.score - a.score || b.paletteScore - a.paletteScore);
    return { ...look, roles, lookIndex, combinations };
  }).filter(Boolean);

  const uniqueCandidates = new Map();
  for (const look of recommendationCandidates) {
    for (const combination of look.combinations) {
      const signature = combination.picks.map(item => item.id).sort().join("|");
      const mainPieces = combination.picks.filter(item => ["상의", "하의", "원피스"].includes(item.category));
      const outfitSignature = (mainPieces.length ? mainPieces : combination.picks.filter(item => item.category === "아우터"))
        .map(item => item.id)
        .sort()
        .join("|");
      const uniqueSignature = pinnedItems.length ? signature : outfitSignature;
      const existing = uniqueCandidates.get(uniqueSignature);
      if (!existing || combination.score > existing.combination.score) uniqueCandidates.set(uniqueSignature, { look, combination, signature });
    }
  }
  const rankedCandidates = [...uniqueCandidates.values()].sort((a, b) =>
    b.combination.score - a.combination.score ||
    b.combination.paletteScore - a.combination.paletteScore ||
    a.signature.localeCompare(b.signature)
  );
  const recommendationSets = new Map();
  const partialRecommendationSets = new Map();
  for (let start = 0; start < rankedCandidates.length && recommendationSets.size < 30; start++) {
    const selected = [];
    for (let step = 0; step < rankedCandidates.length && selected.length < 3; step++) {
      const candidate = rankedCandidates[(start + step) % rankedCandidates.length];
      const candidateIds = new Set(candidate.combination.picks.map(item => item.id));
      const overlapsTooMuch = selected.some(existing => {
        let overlap = 0;
        for (const item of existing.combination.picks) {
          if (candidateIds.has(item.id) && ++overlap > 1) return true;
        }
        return false;
      });
      if (!overlapsTooMuch) selected.push(candidate);
    }
    if (selected.length) {
      const setSignature = selected.map(candidate => candidate.signature).sort().join("||");
      if (selected.length === 3) recommendationSets.set(setSignature, selected);
      else partialRecommendationSets.set(setSignature, selected);
    }
  }
  const recommendationOptions = pinnedItems.length
    ? rankedCandidates.map(candidate => [candidate])
    : recommendationSets.size
      ? [...recommendationSets.values()]
      : [...partialRecommendationSets.values()];
  recommendationPoolSize = recommendationOptions.length;
  const selectedLooks = [];
  const selectedCandidates = recommendationOptions.length
    ? recommendationOptions[recommendationOffset % recommendationOptions.length]
    : [];
  for (let index = 0; index < selectedCandidates.length; index++) {
    const { look, combination, signature } = selectedCandidates[index];
    const fitItems = combination.picks.filter(item => sizeFieldFor(item));
    const matchedSizes = fitItems.filter(item => sizeStatusFor(item) === "match").length;
    const unknownSizes = fitItems.filter(item => sizeStatusFor(item) === "unknown").length;
    const mainPieces = combination.picks.filter(item => ["상의", "하의", "원피스"].includes(item.category));
    if (!mainPieces.length) mainPieces.push(...combination.picks.filter(item => item.category === "아우터"));
    selectedLooks.push({
      id: `look-${occasionSlugs[occasion]}-${encodeURIComponent(signature)}`,
      title: `${mainPieces.map(item => item.name).join(" · ") || look.title} 코디`,
      style: look.style, occasion, tone: ["", "tone-1", "tone-2"][index],
      picks: combination.picks, score: combination.score, paletteScore: Math.round(combination.paletteScore),
      fitSummary: fitItems.length ? `${matchedSizes}/${fitItems.length} 사이즈 일치${unknownSizes ? ` · ${unknownSizes}벌 확인 필요` : ""}` : "사이즈 해당 없음",
      profileHasSizes
    });
  }
  return selectedLooks;
}
function renderLookCard(outfit) {
  const saved = state.saved.some(item => item.id === outfit.id);
  const pieceClasses = { 상의: "piece-top", 하의: "piece-bottom", 원피스: "piece-dress", 아우터: "piece-outer", 신발: "piece-shoes", 가방: "piece-bag" };
  const pieces = outfit.picks.map((item, index) => `<div class="outfit-piece ${pieceClasses[item.category] || "piece-other"}" data-category="${escapeHtml(item.category)}" data-piece-index="${index}" aria-label="${escapeHtml(garmentDisplayName(item))}">${photoFor(item) ? `<img data-auto-portrait loading="lazy" decoding="async" data-photo-rotation="${photoRotationAttribute(item)}" src="${escapeHtml(photoFor(item))}" alt="${escapeHtml(garmentDisplayName(item))}" style="object-position:${escapeHtml(item.photoPosition || "center")}">` : `<span>${escapeHtml(item.emoji || categoryIcons[item.category] || "👚")}</span>`}</div>`).join("");
  const displayTitle = outfitDisplayTitle(outfit);
  return `<article class="outfit-card">
    <div class="outfit-art ${outfit.tone || ""}">
      <span class="outfit-score">추천 점수 ${outfit.score ?? 0}</span>
      <button class="save-button ${saved ? "saved" : ""}" data-save="${escapeHtml(outfit.id)}" aria-label="코디 저장">${saved ? "♥" : "♡"}</button>${pieces}
    </div>
    <div class="outfit-details">
      <div class="outfit-title-row"><h3>${escapeHtml(displayTitle)}</h3><small>${escapeHtml(outfit.occasion)}</small></div>
      <p class="outfit-meta">${outfit.picks.map(item => escapeHtml(item.color || garmentDisplayName(item))).join(" · ")}</p>
      <p class="outfit-fit">${escapeHtml(outfit.fitSummary || "사이즈 정보 없음")} · 색 조합 ${outfit.paletteScore ?? 0}점</p>
      <div class="outfit-footer"><span class="tag">${escapeHtml(outfit.style)}</span><button class="try-on-button" type="button" data-outfit-details="${escapeHtml(outfit.id)}" aria-haspopup="dialog">옷·사이즈 보기</button><button class="wear-button" data-wear="${escapeHtml(outfit.id)}">오늘 입었어요 ↗</button></div>
    </div>
  </article>`;
}
function outfitDisplayTitle(outfit) {
  const mainPieces = outfit.picks.filter(item => ["상의", "하의", "원피스"].includes(item.category));
  return /옷 종류 확인 필요|종류 확인 필요/.test(outfit.title || "")
    ? `${(mainPieces.length ? mainPieces : outfit.picks).map(garmentDisplayName).join(" · ")} 코디`
    : outfit.title;
}
function tryOnSizeLabel(item) {
  const field = sizeFieldFor(item);
  if (!field) return "사이즈 해당 없음";
  const profileSize = state.profile[field];
  if (item.size && profileSize) return `옷장 ${escapeHtml(item.size)} · 내 사이즈 ${escapeHtml(profileSize)}${sizeStatusFor(item) === "match" ? " ✓" : ""}`;
  if (item.size) return `옷장 등록 ${escapeHtml(item.size)} · 프로필 사이즈 미입력`;
  if (profileSize) return `프로필 ${escapeHtml(profileSize)} · 옷 사이즈 미입력`;
  return "사이즈 정보 미입력";
}
function showTryOnModal(outfit) {
  const pieces = outfit.picks.map(item => `<li class="try-on-item"><span class="try-on-item-photo">${photoFor(item) ? `<img data-auto-portrait data-photo-rotation="${photoRotationAttribute(item)}" src="${escapeHtml(photoFor(item))}" alt="">` : escapeHtml(item.emoji || categoryIcons[item.category] || "👚")}</span><span class="try-on-item-copy"><strong>${escapeHtml(garmentDisplayName(item))}</strong><small>${escapeHtml(item.category)} · ${escapeHtml(item.color || "")}</small><small>${tryOnSizeLabel(item)}</small></span></li>`).join("");
  const modal = document.getElementById("modal");
  modal.classList.add("try-on-modal");
  modal.innerHTML = `<div class="modal-heading"><div><span class="eyebrow">OUTFIT DETAILS</span><h2 id="modal-title">${escapeHtml(outfitDisplayTitle(outfit))}</h2><p>${escapeHtml(outfit.fitSummary || "등록된 사이즈 정보를 확인해 주세요.")}</p></div><button class="modal-close" data-close aria-label="닫기">×</button></div>
    <div class="try-on-details"><h3>추천 옷과 사이즈</h3><ul class="try-on-items">${pieces}</ul></div>
    <p class="try-on-disclaimer">내 신체 사이즈와 옷장에 등록한 옷 사이즈를 함께 표시해요. 옷 사이즈가 입력되지 않은 아이템은 옷장 화면에서 등록할 수 있습니다.</p>
    <div class="modal-actions"><button class="secondary-button" data-close>닫기</button><button class="primary-button" type="button" data-view-link="closet">옷장 사이즈 관리</button></div>`;
  showModal();
  orientWidePhotos(modal);
  modal.querySelector("[data-view-link='closet']").addEventListener("click", () => { closeModal(); switchView("closet"); });
}
function renderHome() {
  const weather = weatherLabel();
  const advice = weatherAdvice();
  const occasionButtons = ["일상", "학교", "데이트", "면접", "여행"].map(value => `<button class="choice-chip ${state.selectedOccasion === value ? "selected" : ""}" data-occasion="${value}">${value}</button>`).join("");
  const recommendations = getRecommendations().slice(0, 3);
  const eligibleItemCount = state.items.filter(isGarmentForProfile).length;
  const profileSizeFields = ["topSize", "bottomSize", "onepieceSize", "shoeSize"].filter(field => state.profile[field]).length;
  const registeredSizes = state.items.filter(item => sizeFieldFor(item) && state.profile[sizeFieldFor(item)] && item.size).length;
  const sizeSetupMessage = !profileSizeFields
    ? `프로필에서 상의·하의·원피스·신발 사이즈를 설정하면 내 사이즈 기준으로 추천해요. <button class="subtle-link" data-action="profile">사이즈 설정 ↗</button>`
    : `${registeredSizes}벌의 옷 사이즈가 확인됐어요. 옷장 카드에서 ‘사이즈 미입력’을 바꾸면, 사이즈가 다른 옷은 추천에서 제외돼요. <button class="subtle-link" data-view-link="closet">옷 사이즈 입력 ↗</button>`;
  const genderLabel = profileGenderLabel();
  const recommendationHeading = `${appliedClosetItemIds.size ? "선택한 옷을 포함한 " : ""}${escapeHtml(state.selectedOccasion)} 코디 추천`;
  const recommendationDescription = appliedClosetItemIds.size
    ? `내 옷장에서 고른 ${appliedClosetItemIds.size}벌을 포함해 어울리는 조합을 골랐어요.`
    : `${genderLabel ? `${genderLabel} 및 공용 옷 중 ` : ""}${eligibleItemCount}벌 중에서 ${escapeHtml(state.selectedOccasion)}에 어울리는 조합을 골랐어요`;
  return `<div class="page">
    <section class="welcome"><div><span class="eyebrow">TODAY, YOUR WAY</span><h1>오늘은 <em>무엇을 입을까요?</em></h1><p>내 옷장에서 찾은 오늘의 가장 좋은 조합을 확인해 보세요.</p></div></section>
    <section class="hero-grid">
      <section class="weather-hero-card weather-advice-${advice.kind}" aria-label="오늘의 날씨 안내">
        <div class="weather-hero-copy"><span class="hero-tag">TODAY'S WEATHER</span><div class="weather-hero-reading"><span class="weather-hero-icon" aria-hidden="true">${weather.icon}</span><strong>${escapeHtml(weather.temp)}</strong></div><p class="weather-hero-detail">${escapeHtml(advice.detail)}</p><h2>${escapeHtml(advice.title)}</h2><p class="weather-hero-message">${escapeHtml(advice.message)}</p><button class="weather-refresh-button" data-action="weather">${state.weather ? "날씨 업데이트 ↗" : "날씨 확인하기 ↗"}</button></div>
        <div class="weather-hero-decoration" aria-hidden="true"><span>${weather.icon}</span><i></i><i></i></div>
      </section>
      <div class="upload-card"><div class="upload-top"><div><h3>새 옷을 옷장에 담아보세요</h3><p>사진의 배경은 기기에서 제거하고, 파일명과 대표 색상으로 이름을 자동 생성해요.</p></div></div><div class="upload-drop" data-action="upload"><div><span class="upload-cloud">↑</span><strong>사진을 끌어오거나 클릭하기</strong><small>JPG, PNG · 첫 사용에는 AI 모델을 다운로드해요</small></div></div></div>
    </section>
    <section class="section-heading"><div><h2>${recommendationHeading}</h2><p>${recommendationDescription}</p></div><button class="subtle-link" data-action="refresh-recommendations">추천 다시 보기 <span>↗</span></button></section>
    <div class="occasion-options">${occasionButtons}</div>
    <aside class="recommendation-guide"><strong>추천 기준</strong><span>색 조화 24% · 사이즈 21% · 상황 30% · 취향 3% · 기본 조합 2% · 기온 20%</span><p class="color-guidance">${escapeHtml(temperatureOutfitGuidance(state.weather?.temp))}</p><p class="color-guidance">색은 2~3가지 중심으로 맞추고, 무채색·베이스톤으로 정리해요. 강한 색과 밝은 하의는 포인트로 신중하게 반영합니다. <span>참고 글: <a href="https://blog.naver.com/tidy0789/222302810346" target="_blank" rel="noopener noreferrer">색 조합표</a> · <a href="https://blog.naver.com/joeundayy/222997442025" target="_blank" rel="noopener noreferrer">컬러 스타일링 팁</a></span></p><p>추천에서 빼거나 다시 추가할 옷은 <button class="subtle-link" data-view-link="closet">내 옷장에서 관리 ↗</button></p><p>${sizeSetupMessage}</p></aside>
    ${recommendations.length ? `<section class="outfit-grid">${recommendations.map(renderLookCard).join("")}</section>` : `<div class="empty-state"><span>📏</span><h3>추천할 수 있는 코디가 아직 없어요</h3><p>옷 사이즈를 확인하거나 추천에서 제외한 옷을 다시 추가해 보세요.</p><button class="primary-button" data-view-link="closet">옷장 추천 상태 관리</button></div>`}
    <section class="bottom-grid">
      <div class="mini-panel"><div class="mini-panel-heading"><h3>오늘의 날씨 한눈에</h3><button data-action="weather">날씨 업데이트 ↗</button></div><div class="weather-forecast"><span class="forecast-icon">${weather.icon}</span><span class="forecast-main">${escapeHtml(weather.description)}<small>날씨에 맞는 옷차림을 추천해 드려요</small></span><strong>${escapeHtml(weather.temp)}</strong></div></div>
      <div class="mini-panel"><div class="mini-panel-heading"><h3>내 옷장 활용 팁</h3><button data-view-link="insights">리포트 보기 ↗</button></div><div class="weather-forecast"><span class="forecast-icon">✳</span><span class="forecast-main">${state.items.length ? `가장 자주 입은 옷은 ${escapeHtml(mostWorn()?.name || "등록된 옷")}이에요.` : "옷을 등록하면 활용 팁을 알려드려요."}<small>새로운 조합으로 옷장 속 아이템을 발견해 보세요</small></span></div></div>
    </section>
    <p class="ai-note">추천 점수는 색 조화·등록된 의류 사이즈·선호 스타일을 반영한 규칙 기반 점수예요. 사이즈 미입력 옷은 사이즈 확인이 필요하다고 표시됩니다.</p>
  </div>`;
}
function garmentCard(item) {
  const sizes = item.category === "신발" ? Array.from({ length: 15 }, (_, index) => String(220 + index * 5)) : ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const sizeControl = sizeFieldFor(item) ? `<label class="garment-size-control"><span>옷 사이즈</span><select data-item-size="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)} 사이즈"><option value="">사이즈 미입력</option>${sizes.map(size => `<option value="${size}" ${item.size === size ? "selected" : ""}>${size}</option>`).join("")}</select></label>` : "";
  const categoryControl = `<label class="garment-category-control"><span>종류</span><select data-item-category="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)} 종류">${itemCategories.map(category => `<option value="${category}" ${category === "분류 확인" ? "" : item.category === category ? "selected" : ""}>${category === "분류 확인" ? "종류 선택" : category}</option>`).join("")}</select></label>`;
  const extraColorOption = item.color && !garmentColors.includes(item.color) ? `<option value="${escapeHtml(item.color)}" selected>${escapeHtml(item.color)}</option>` : "";
  const colorControl = `<label class="garment-category-control"><span>색상</span><select data-item-color="${escapeHtml(item.id)}" aria-label="${escapeHtml(garmentDisplayName(item))} 색상">${extraColorOption}${garmentColors.map(color => `<option value="${color}" ${item.color === color ? "selected" : ""}>${color}</option>`).join("")}</select></label>`;
  const excluded = item.recommendationExcluded === true;
  const gender = garmentGender(item);
  const genderControl = `<label class="garment-category-control"><span>추천 성별</span><select data-item-gender="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)} 추천 성별"><option value="male" ${gender === "male" ? "selected" : ""}>남성용</option><option value="female" ${gender === "female" ? "selected" : ""}>여성용</option><option value="unisex" ${gender === "unisex" ? "selected" : ""}>공용</option></select></label>`;
  const recommendationAction = excluded ? "추천에 다시 추가" : "추천에서 제외";
  const displayCategory = item.category === "분류 확인" ? "패션 아이템" : item.category;
  const displayName = garmentDisplayName(item);
  const selectedForOutfit = selectedClosetItemIds.has(item.id);
  const selectionDisabledReason = closetOutfitSelectionDisabledReason(item);
  return `<article class="garment-card ${selectedForOutfit ? "is-outfit-selected" : ""}"><div class="garment-photo ${item.backgroundRemoved ? "is-background-removed" : ""}" style="background:${escapeHtml(item.bg || "#eeeae2")}">${photoFor(item) ? `<img data-auto-portrait data-closet-photo="${escapeHtml(item.id)}" loading="lazy" decoding="async" fetchpriority="low" data-photo-rotation="${photoRotationAttribute(item)}" alt="${escapeHtml(displayName)}" style="object-position:${escapeHtml(item.photoPosition || "center")}"><button type="button" class="photo-rotate-button" data-photo-rotate="${escapeHtml(item.id)}" aria-label="${escapeHtml(displayName)} 사진 90도 회전">사진 회전 ↻</button>${item.backgroundRemoved ? `<span class="background-removed-chip">배경 제거됨</span>` : item.image ? `<button type="button" class="photo-background-button" data-remove-background="${escapeHtml(item.id)}">누끼 따기</button>` : ""}` : `<span class="garment-emoji">${escapeHtml(item.emoji || categoryIcons[item.category] || "👚")}</span>`}<span class="garment-chip">${escapeHtml(displayCategory)} · ${escapeHtml(item.color || "분석 완료")}</span>${selectedForOutfit ? `<span class="closet-outfit-selected-badge">코디 선택됨 ✓</span>` : ""}${excluded ? `<span class="garment-excluded-badge">추천 제외</span>` : ""}</div><div class="garment-info"><strong>${escapeHtml(displayName)}</strong><small>${escapeHtml(item.style || "데일리")} · ${item.wears || 0}회 착용</small>${categoryControl}${colorControl}${genderControl}${sizeControl}<button type="button" class="closet-outfit-toggle ${selectedForOutfit ? "is-selected" : ""}" data-closet-outfit-toggle="${escapeHtml(item.id)}" ${selectionDisabledReason ? `disabled title="${escapeHtml(selectionDisabledReason)}"` : ""}>${selectionDisabledReason ? "코디 선택 불가" : selectedForOutfit ? "코디에서 빼기" : "코디에 담기"}</button><div class="garment-actions"><button class="recommendation-toggle ${excluded ? "is-excluded" : ""}" type="button" data-recommendation-toggle="${escapeHtml(item.id)}" aria-label="${escapeHtml(displayName)} ${recommendationAction}">${recommendationAction}</button><button class="garment-delete-button" type="button" data-delete-garment="${escapeHtml(item.id)}" aria-label="${escapeHtml(displayName)} 옷장에서 삭제">삭제</button></div></div></article>`;
}
function renderClosetResults() {
  pruneClosetOutfitSelections();
  const items = state.items.filter(item => {
    const matchesRecommendation = recommendationFilter === "excluded"
      ? item.recommendationExcluded === true
      : recommendationFilter === "included" ? item.recommendationExcluded !== true : true;
    const matchesCategory = activeCategories.size === 0 || activeCategories.has(item.category);
    return matchesRecommendation && matchesCategory;
  });
  if (items.length) return `<div class="closet-grid">${items.map(garmentCard).join("")}</div>`;
  return `<div class="empty-state"><span>🧺</span><h3>${state.items.length ? "선택한 종류의 옷이 없어요" : "옷장을 채워볼까요?"}</h3><p>${state.items.length ? "다른 종류를 선택하거나 ‘전체’를 눌러 옷을 확인해 보세요." : "사진을 올리고 옷의 종류와 색상을 등록하면<br>나만의 디지털 옷장이 완성돼요."}</p></div>`;
}
function normalizedColorGroup(value) {
  const color = String(value || "").trim();
  if (!color || /분석 중|분류 확인|확인 필요/.test(color)) return "미분류";
  if (/멀티|믹스|패턴|블랙.?화이트|화이트.?블랙|옐로.?골드/.test(color)) return "멀티";
  if (/블랙/.test(color)) return "블랙";
  if (/네이비|인디고/.test(color)) return "네이비";
  if (/그레이|회색/.test(color)) return "그레이";
  if (/아이보리/.test(color)) return "아이보리";
  if (/화이트|흰색/.test(color)) return "화이트";
  if (/베이지/.test(color)) return "베이지";
  if (/브라운|갈색/.test(color)) return "브라운";
  if (/레드|빨강/.test(color)) return "레드";
  if (/오렌지|주황/.test(color)) return "오렌지";
  if (/옐로|골드|노랑/.test(color)) return "옐로";
  if (/그린|초록/.test(color)) return "그린";
  if (/블루|파랑/.test(color)) return "블루";
  if (/퍼플|보라/.test(color)) return "퍼플";
  if (/핑크|분홍/.test(color)) return "핑크";
  return "기타";
}
function renderColorDistribution() {
  const colorPalette = {
    블랙: "#242424", 네이비: "#1d3155", 그레이: "#92979b", 화이트: "#f4f4ef",
    아이보리: "#e9e1d0", 베이지: "#cdb98d", 브라운: "#78533e", 레드: "#d53e50",
    오렌지: "#e68432", 옐로: "#e8c43a", 그린: "#577e47", 블루: "#4b8dbb",
    퍼플: "#8a5ba5", 핑크: "#e58ba8", 멀티: "#7d7890", 기타: "#aaa99f", 미분류: "#d9d9d3"
  };
  const counts = new Map();
  state.items.forEach(item => {
    const color = normalizedColorGroup(item.color);
    counts.set(color, (counts.get(color) || 0) + 1);
  });
  const total = state.items.length;
  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"));
  let currentAngle = 0;
  const segments = entries.map(([color, count]) => {
    const endAngle = currentAngle + count / Math.max(total, 1) * 360;
    const segment = `${colorPalette[color]} ${currentAngle.toFixed(2)}deg ${endAngle.toFixed(2)}deg`;
    currentAngle = endAngle;
    return segment;
  });
  const mostCommon = entries[0];
  const mostCommonPercent = mostCommon ? Math.round(mostCommon[1] / total * 100) : 0;
  const gradient = segments.length ? `conic-gradient(${segments.join(", ")})` : "conic-gradient(#e9e9e3 0deg 360deg)";
  const summary = entries.map(([color, count]) => `${color} ${count}벌`).join(", ");
  return `<section class="color-distribution" aria-labelledby="color-distribution-title">
    <div class="color-distribution-heading"><div><h2 id="color-distribution-title">옷 색상 분포</h2><p>내 옷장 ${total}벌의 색상을 모아봤어요.</p></div></div>
    <div class="color-distribution-content">
      <div class="color-distribution-overview">
        <div class="color-donut" role="img" aria-label="옷 색상 분포: ${escapeHtml(summary || "등록된 옷 없음")}" style="background:${gradient}"><div class="color-donut-hole"><strong>${total}</strong><span>전체 옷</span></div></div>
        <div class="color-distribution-lead">${mostCommon ? `<span class="color-swatch" style="--swatch-color:${colorPalette[mostCommon[0]]}"></span><div><strong>${escapeHtml(mostCommon[0])}</strong><span>${mostCommonPercent}% · ${mostCommon[1]}벌</span></div>` : `<span>아직 등록된 옷이 없어요.</span>`}</div>
      </div>
      ${entries.length ? `<ul class="color-distribution-list">${entries.map(([color, count]) => `<li><span class="color-distribution-name"><span class="color-swatch" style="--swatch-color:${colorPalette[color]}"></span>${escapeHtml(color)}</span><span class="color-distribution-count">${count}벌 <small>${Math.round(count / total * 100)}%</small></span></li>`).join("")}</ul>` : ""}
    </div>
  </section>`;
}
function closetOutfitSelectionDisabledReason(item) {
  if (!["상의", "하의", "원피스", "아우터", "신발", "가방"].includes(item.category)) return "옷 종류를 먼저 선택해 주세요.";
  if (item.recommendationExcluded) return "추천에서 제외된 옷이에요.";
  if (!isGarmentForProfile(item)) return "프로필 성별에 맞지 않는 옷이에요.";
  if (sizeStatusFor(item) === "mismatch") return "프로필 사이즈와 맞지 않는 옷이에요.";
  return "";
}
function isClosetOutfitSelectable(item) {
  return Boolean(item && !closetOutfitSelectionDisabledReason(item));
}
function pruneClosetOutfitSelections() {
  const normalizeSelection = ids => {
    const selected = new Set();
    const categories = new Set();
    let hasOnepiece = false;
    let hasSeparates = false;
    for (const id of ids) {
      const item = state.items.find(entry => entry.id === id);
      if (!isClosetOutfitSelectable(item) || categories.has(item.category)) continue;
      if (item.category === "원피스" && hasSeparates) continue;
      if (["상의", "하의"].includes(item.category) && hasOnepiece) continue;
      selected.add(id);
      categories.add(item.category);
      hasOnepiece ||= item.category === "원피스";
      hasSeparates ||= ["상의", "하의"].includes(item.category);
    }
    return selected;
  };
  selectedClosetItemIds = normalizeSelection(selectedClosetItemIds);
  appliedClosetItemIds = normalizeSelection(appliedClosetItemIds);
}
function clearClosetOutfitSelections() {
  selectedClosetItemIds.clear();
  appliedClosetItemIds.clear();
  recommendationOffset = 0;
}
function toggleClosetOutfitSelection(itemId) {
  const item = state.items.find(entry => entry.id === itemId);
  if (!item || !isClosetOutfitSelectable(item)) {
    notify(item ? closetOutfitSelectionDisabledReason(item) : "옷장 아이템을 찾을 수 없어요.");
    return;
  }
  if (selectedClosetItemIds.has(item.id)) {
    selectedClosetItemIds.delete(item.id);
  } else {
    const conflictingCategories = item.category === "원피스"
      ? ["원피스", "상의", "하의"]
      : ["상의", "하의"].includes(item.category) ? [item.category, "원피스"] : [item.category];
    for (const selectedId of selectedClosetItemIds) {
      const selectedItem = state.items.find(entry => entry.id === selectedId);
      if (selectedItem && conflictingCategories.includes(selectedItem.category)) selectedClosetItemIds.delete(selectedId);
    }
    selectedClosetItemIds.add(item.id);
  }
  render();
}
function renderCloset() {
  const pendingBackgroundRemovalCount = state.items.filter(item => item.image && !item.backgroundRemoved).length;
  return `<div class="page"><section class="view-title"><span class="eyebrow">MY DIGITAL WARDROBE</span><h1>내 옷장</h1><p>내가 가진 옷을 한눈에 보고, 사진의 회전 방향도 바로잡을 수 있어요.</p></section>
    <section class="closet-outfit-selection" aria-labelledby="closet-outfit-selection-title"><div><h2 id="closet-outfit-selection-title">내 옷으로 코디 추천</h2><p>사진을 보고 입고 싶은 옷을 선택하면, 그 옷을 포함한 조합을 추천해요. 종류별 한 벌씩 선택할 수 있어요.</p></div><div class="closet-outfit-selection-actions"><span role="status" aria-live="polite">${selectedClosetItemIds.size}벌 선택됨</span><button type="button" class="primary-button" data-action="apply-closet-outfit" ${selectedClosetItemIds.size ? "" : "disabled"}>선택한 옷으로 추천</button><button type="button" class="secondary-button" data-action="clear-closet-outfit" ${selectedClosetItemIds.size || appliedClosetItemIds.size ? "" : "disabled"}>선택 해제</button></div></section>
    <div class="closet-toolbar"><div class="closet-category-filters" role="group" aria-label="옷 종류 필터"><button type="button" class="choice-chip ${activeCategories.size === 0 ? "selected" : ""}" data-category-toggle="all" aria-pressed="${activeCategories.size === 0}">전체</button>${itemCategories.filter(category => category !== "분류 확인").map(category => `<button type="button" class="choice-chip ${activeCategories.has(category) ? "selected" : ""}" data-category-toggle="${escapeHtml(category)}" aria-pressed="${activeCategories.has(category)}">${escapeHtml(category)}</button>`).join("")}</div><select class="filter-select" id="recommendation-filter" aria-label="추천 포함 상태"><option value="all" ${recommendationFilter === "all" ? "selected" : ""}>추천 상태 전체</option><option value="included" ${recommendationFilter === "included" ? "selected" : ""}>추천 중</option><option value="excluded" ${recommendationFilter === "excluded" ? "selected" : ""}>추천 제외</option></select><button class="primary-button" data-action="upload">＋ 옷 추가하기</button></div>
    ${pendingBackgroundRemovalCount ? `<section class="background-removal-tools"><p>${pendingBackgroundRemovalCount}장의 기존 사진은 아직 배경을 제거하지 않았어요. 한 번에 처리할 수 있습니다.</p><button class="secondary-button" type="button" data-action="remove-all-backgrounds" ${bulkBackgroundRemovalInProgress ? "disabled" : ""}>${bulkBackgroundRemovalInProgress ? "누끼 제거 중…" : `기존 사진 ${pendingBackgroundRemovalCount}장 모두 누끼 따기`}</button></section>` : ""}
    ${renderColorDistribution()}
    <p class="photo-rotation-help">사진 방향이 잘못됐나요? 각 옷 사진 오른쪽 아래의 <strong>사진 회전 ↻</strong> 버튼을 누르면 90도씩 돌아가고 자동 저장돼요.</p>
    <div id="closet-results">${renderClosetResults()}</div>
    <p class="ai-note">색상은 사진 속 옷 영역에서 자동으로 추정해요. 사진 배경 때문에 다르게 분류되면 카드의 ‘색상’ 메뉴에서 직접 수정할 수 있습니다.</p></div>`;
}
function renderSaved() {
  return `<div class="page"><section class="view-title"><span class="eyebrow">YOUR FAVORITES</span><h1>저장한 코디</h1><p>마음에 드는 조합을 모아두고 언제든 다시 확인해 보세요.</p></section>${state.saved.length ? `<div class="outfit-grid">${state.saved.map(renderLookCard).join("")}</div>` : `<div class="empty-state"><span>♡</span><h3>아직 저장한 코디가 없어요</h3><p>오늘의 추천 카드에서 하트를 눌러<br>마음에 드는 코디를 저장해 보세요.</p><button class="primary-button" data-view-link="home">코디 둘러보기</button></div>`}</div>`;
}
function mostWorn() { return [...state.items].sort((a, b) => (b.wears || 0) - (a.wears || 0))[0]; }
function renderInsights() {
  const totalWears = state.items.reduce((sum, item) => sum + (item.wears || 0), 0);
  const idle = state.items.filter(item => !item.wears || item.wears < 2).length;
  const most = mostWorn();
  const topItems = [...state.items].sort((a, b) => (b.wears || 0) - (a.wears || 0)).slice(0, 5);
  return `<div class="page"><section class="view-title"><span class="eyebrow">YOUR WARDROBE, INSIGHTS</span><h1>옷장 리포트</h1><p>내 옷의 활용도를 살펴보고 새로운 조합을 찾아보세요.</p></section><div class="report-stats"><div class="stat-card"><small>옷장 아이템</small><strong>${state.items.length}<em> 벌</em></strong></div><div class="stat-card"><small>기록된 착용 횟수</small><strong>${totalWears}<em> 회</em></strong></div><div class="stat-card"><small>더 입어볼 옷</small><strong>${idle}<em> 벌</em></strong></div></div><div class="report-card"><div class="mini-panel-heading"><h3>자주 입는 아이템</h3><span class="tag">TOP ${topItems.length}</span></div><div class="usage-list">${topItems.map(item => `<div class="usage-row"><span class="usage-thumb">${photoFor(item) ? `<img data-auto-portrait data-photo-rotation="${photoRotationAttribute(item)}" src="${escapeHtml(photoFor(item))}" alt="" style="width:100%;height:100%;object-fit:contain;border-radius:7px">` : escapeHtml(item.emoji || "👚")}</span><span class="usage-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} · ${escapeHtml(item.color || "")}</small></span><span class="usage-number">${item.wears || 0}회</span></div>`).join("") || "아직 등록된 옷이 없어요."}</div></div><div class="report-card"><div class="mini-panel-heading"><h3>옷장 한 줄 분석</h3></div><p style="font-size:10px;color:#777a71;line-height:1.9;margin:0">${most ? `${escapeHtml(most.name)}을(를) 가장 자주 입고 있어요. ${idle ? `아직 자주 입지 않은 옷 ${idle}벌도 다른 아이템과 매치해 보세요.` : "옷장 아이템을 골고루 활용하고 있네요!"}` : "옷을 등록하면 활용도 분석을 시작할게요."}</p></div></div>`;
}
function bindDynamicEvents() {
  const closetResults = document.getElementById("closet-results");
  if (closetResults) closetResults.addEventListener("click", event => {
    if (event.target.closest("[data-action='upload']")) openFilePicker();
    const outfitSelectionButton = event.target.closest("[data-closet-outfit-toggle]");
    if (outfitSelectionButton) {
      toggleClosetOutfitSelection(outfitSelectionButton.dataset.closetOutfitToggle);
      return;
    }
    const rotateButton = event.target.closest("[data-photo-rotate]");
    if (rotateButton) {
      const item = state.items.find(entry => entry.id === rotateButton.dataset.photoRotate);
      if (!item) return;
      const image = rotateButton.closest(".garment-photo").querySelector("img");
      const currentRotation = photoRotationAttribute(item) === "auto"
        ? (image.naturalWidth > image.naturalHeight ? 90 : 0)
        : item.photoRotation;
      item.photoRotation = (currentRotation + 90) % 360;
      state.saved.forEach(outfit => {
        outfit.picks = (outfit.picks || []).map(pick => pick.id === item.id ? item : pick);
      });
      persist();
      closetResults.innerHTML = renderClosetResults();
      orientWidePhotos(closetResults);
      notify(`${item.name} 사진을 ${item.photoRotation}도 회전했어요.`);
      return;
    }
    const deleteButton = event.target.closest("[data-delete-garment]");
    if (deleteButton) {
      const item = state.items.find(entry => entry.id === deleteButton.dataset.deleteGarment);
      if (!item) {
        notify("삭제할 옷을 찾을 수 없어요. 옷장 목록을 새로고침해 주세요.");
        return;
      }
      if (!window.confirm(`${garmentDisplayName(item)}을(를) 내 옷장에서 삭제할까요? 이 작업은 되돌릴 수 없어요.`)) return;
      state.items = state.items.filter(entry => entry.id !== item.id);
      selectedClosetItemIds.delete(item.id);
      appliedClosetItemIds.delete(item.id);
      recommendationOffset = 0;
      persist();
      render();
      notify(`${garmentDisplayName(item)}을(를) 내 옷장에서 삭제했어요.`);
      return;
    }
    const toggle = event.target.closest("[data-recommendation-toggle]");
    if (!toggle) return;
    const item = state.items.find(entry => entry.id === toggle.dataset.recommendationToggle);
    if (!item) return;
    item.recommendationExcluded = item.recommendationExcluded !== true;
    persist();
    render();
    notify(item.recommendationExcluded ? `${item.name}을(를) 추천에서 제외했어요.` : `${item.name}을(를) 추천에 다시 추가했어요.`);
  });
  if (closetResults) closetResults.addEventListener("change", event => {
    const colorSelector = event.target.closest("[data-item-color]");
    if (colorSelector) {
      const item = state.items.find(entry => entry.id === colorSelector.dataset.itemColor);
      if (!item) return;
      item.color = colorSelector.value;
      item.colorSource = "manual";
      if (item.autoTitle) item.name = generatedGarmentTitle(item);
      state.saved.forEach(outfit => {
        outfit.picks = (outfit.picks || []).map(pick => pick.id === item.id ? item : pick);
      });
      persist();
      render();
      notify(`${item.name} 색상을 ${item.color}(으)로 저장했어요.`);
      return;
    }
    const genderSelector = event.target.closest("[data-item-gender]");
    if (genderSelector) {
      const item = state.items.find(entry => entry.id === genderSelector.dataset.itemGender);
      if (!item) return;
      item.gender = genderSelector.value;
      state.saved.forEach(outfit => {
        outfit.picks = (outfit.picks || []).map(pick => pick.id === item.id ? item : pick);
      });
      recommendationOffset = 0;
      persist();
      render();
      notify(`${item.name}을(를) ${genderSelector.selectedOptions[0].textContent}으로 분류했어요.`);
      return;
    }
    const categorySelector = event.target.closest("[data-item-category]");
    if (categorySelector) {
      const item = state.items.find(entry => entry.id === categorySelector.dataset.itemCategory);
      if (!item) return;
      item.category = categorySelector.value;
      if (item.autoTitle) item.name = generatedGarmentTitle(item);
      item.emoji = categoryIcons[item.category] || item.emoji;
      state.saved.forEach(outfit => {
        outfit.picks = (outfit.picks || []).map(pick => pick.id === item.id ? item : pick);
      });
      persist();
      render();
      notify(item.category === "분류 확인" ? "종류를 선택해 주세요." : `${item.name}을(를) ${item.category}(으)로 분류했어요.`);
      return;
    }
    const selector = event.target.closest("[data-item-size]");
    if (!selector) return;
    const item = state.items.find(entry => entry.id === selector.dataset.itemSize);
    if (!item) return;
    item.size = selector.value;
    persist();
    render();
    notify(item.size ? `${item.name} 사이즈 ${item.size} 저장했어요.` : `${item.name} 사이즈를 미입력으로 바꿨어요.`);
  });
  document.querySelectorAll("[data-category-toggle]").forEach(button => button.addEventListener("click", () => {
    const category = button.dataset.categoryToggle;
    if (category === "all") activeCategories.clear();
    else if (activeCategories.has(category)) activeCategories.delete(category);
    else activeCategories.add(category);
    render();
  }));
  const recommendationStatus = document.getElementById("recommendation-filter");
  if (recommendationStatus) recommendationStatus.addEventListener("change", event => { recommendationFilter = event.target.value; render(); });
  document.querySelectorAll("[data-occasion]").forEach(button => button.addEventListener("click", () => { state.selectedOccasion = button.dataset.occasion; recommendationOffset = 0; persist(); render(); }));
  document.querySelectorAll("[data-action='apply-closet-outfit']").forEach(button => button.addEventListener("click", () => {
    pruneClosetOutfitSelections();
    if (!selectedClosetItemIds.size) {
      notify("코디에 넣을 옷을 먼저 선택해 주세요.");
      return;
    }
    const previousSelection = appliedClosetItemIds;
    appliedClosetItemIds = new Set(selectedClosetItemIds);
    recommendationOffset = 0;
    if (!getRecommendations().length) {
      appliedClosetItemIds = previousSelection;
      getRecommendations();
      notify("선택한 옷과 함께 입을 수 있는 조합이 없어요. 다른 종류의 옷도 추가해 주세요.");
      return;
    }
    activeView = "home";
    render();
    document.querySelector(".section-heading")?.scrollIntoView({ behavior: "smooth" });
    notify("옷장에서 고른 옷을 포함해 코디를 추천했어요.");
  }));
  document.querySelectorAll("[data-action='clear-closet-outfit']").forEach(button => button.addEventListener("click", () => {
    selectedClosetItemIds.clear();
    appliedClosetItemIds.clear();
    recommendationOffset = 0;
    render();
    notify("코디에 선택한 옷을 모두 해제했어요.");
  }));
  document.querySelectorAll("[data-save]").forEach(button => button.addEventListener("click", () => toggleSave(button.dataset.save)));
  document.querySelectorAll("[data-outfit-details]").forEach(button => button.addEventListener("click", () => {
    const outfit = getRecommendations().find(item => item.id === button.dataset.outfitDetails) || state.saved.find(item => item.id === button.dataset.outfitDetails);
    if (outfit) showTryOnModal(outfit);
  }));
  document.querySelectorAll("[data-wear]").forEach(button => button.addEventListener("click", () => wearOutfit(button.dataset.wear)));
  document.querySelectorAll("[data-action='upload']").forEach(button => button.addEventListener("click", openFilePicker));
  document.querySelectorAll("[data-remove-background]").forEach(button => button.addEventListener("click", () => removeExistingGarmentBackground(button)));
  document.querySelectorAll("[data-action='remove-all-backgrounds']").forEach(button => button.addEventListener("click", () => removeAllGarmentBackgrounds(button)));
  document.querySelectorAll("[data-action='weather']").forEach(button => button.addEventListener("click", fetchWeather));
  document.querySelectorAll("[data-action='profile']").forEach(button => button.addEventListener("click", showProfileModal));
  document.querySelectorAll("[data-action='logout']").forEach(button => button.addEventListener("click", signOut));
  document.querySelectorAll("[data-action='retry-cloud-save']").forEach(button => button.addEventListener("click", retryPendingCloudSave));
  document.querySelectorAll("[data-action='recommend']").forEach(button => button.addEventListener("click", () => { activeView = "home"; document.querySelector(".section-heading")?.scrollIntoView({ behavior: "smooth" }); }));
  document.querySelectorAll("[data-action='refresh-recommendations']").forEach(button => button.addEventListener("click", () => {
    const recommendations = getRecommendations();
    if (recommendationPoolSize <= 1) {
      notify("새 코디를 만들려면 옷을 더 등록해 주세요.");
      return;
    }
    recommendationOffset = (recommendationOffset + 1) % recommendationPoolSize;
    render();
    document.querySelector(".section-heading")?.scrollIntoView({ behavior: "smooth" });
    notify("새로운 옷 조합으로 추천을 바꿨어요.");
  }));
  document.querySelectorAll("[data-view-link]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.viewLink)));
  const drop = document.querySelector(".upload-drop");
  if (drop) {
    drop.addEventListener("dragover", event => { event.preventDefault(); drop.classList.add("dragover"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));
    drop.addEventListener("drop", event => { event.preventDefault(); drop.classList.remove("dragover"); handleFiles(event.dataTransfer.files); });
  }
}
function switchView(view) { activeView = view; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
function notify(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2500);
}
function openFilePicker() { document.getElementById("photo-input").click(); }
function guessCategory(name) {
  const filename = name.toLocaleLowerCase("ko-KR");
  if (/shoes?|sneakers?|trainers?|boots?|heels?|loafers?|신발|운동화|스니커즈|부츠|구두|힐/.test(filename)) return "신발";
  if (/bags?|backpacks?|tote|가방|백팩|토트백/.test(filename)) return "가방";
  if (/dress|one[\s_-]?piece|원피스|드레스/.test(filename)) return "원피스";
  if (/pants?|jeans?|denim|trousers?|slacks?|shorts?|leggings?|joggers?|skirt|하의|바지|청바지|데님|슬랙스|팬츠|조거|레깅스|치마|반바지/.test(filename)) return "하의";
  if (/coat|jacket|cardigan|outer|parka|puffer|windbreaker|blazer|jumper|코트|자켓|재킷|가디건|아우터|파카|패딩|점퍼|바람막이|블레이저/.test(filename)) return "아우터";
  if (/shirt|tee|t[\s_-]?shirt|sweatshirt|hoodie|sweater|knit|blouse|top|상의|티셔츠|셔츠|맨투맨|후드|니트|블라우스/.test(filename)) return "상의";
  return "분류 확인";
}
function analyzeColor(imageData, persistAfterAnalysis = true) {
  return detectGarmentColor(imageData).then(color => {
    const item = state.items.find(entry => entry.image === imageData);
    if (!item) return false;
    item.color = color;
    item.colorSource = "auto";
    if (item.autoTitle) item.name = generatedGarmentTitle(item);
    if (persistAfterAnalysis) {
      persist();
      render();
    }
    return true;
  }).catch(error => {
    console.error("옷 사진의 색상을 분석하지 못했습니다.", error);
    return false;
  });
}
function detectGarmentColor(imageData) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 80;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) { reject(new Error("색상 분석용 캔버스를 만들 수 없습니다.")); return; }
      const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const offsetX = (canvas.width - width) / 2;
      const offsetY = (canvas.height - height) / 2;
      context.drawImage(image, offsetX, offsetY, width, height);
      let data;
      try {
        data = context.getImageData(0, 0, canvas.width, canvas.height).data;
      } catch (error) {
        reject(error);
        return;
      }
      const pixel = (x, y) => {
        const index = (y * canvas.width + x) * 4;
        return [data[index], data[index + 1], data[index + 2], data[index + 3]];
      };
      const border = [];
      for (let i = 0; i < 80; i += 4) {
        border.push(pixel(i, 2), pixel(i, 77), pixel(2, i), pixel(77, i));
      }
      const median = channel => {
        const values = border.filter(sample => sample[3] >= 180).map(sample => sample[channel]).sort((a, b) => a - b);
        return values.length ? values[Math.floor(values.length / 2)] : 255;
      };
      const background = [median(0), median(1), median(2)];
      const classify = (r8, g8, b8) => {
        const r = r8 / 255, g = g8 / 255, b = b8 / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
        const brightness = max;
        const saturation = max === 0 ? 0 : delta / max;
        let hue = 0;
        if (delta) {
          if (max === r) hue = 60 * (((g - b) / delta) % 6);
          else if (max === g) hue = 60 * ((b - r) / delta + 2);
          else hue = 60 * ((r - g) / delta + 4);
          if (hue < 0) hue += 360;
        }
        if (brightness < 0.28) return "블랙";
        if (saturation < 0.17) {
          if (brightness < 0.74) return "그레이";
          return r8 - b8 > 12 && brightness < 0.96 ? "아이보리" : "화이트";
        }
        if (hue < 12 || hue >= 345) return "레드";
        if (hue < 38) return brightness < 0.62 ? "브라운" : "오렌지";
        if (hue < 65) return saturation < 0.36 ? "베이지" : brightness > 0.58 ? "옐로" : "브라운";
        if (hue < 165) return "그린";
        if (hue < 255) return brightness < 0.43 && hue >= 195 ? "네이비" : "블루";
        if (hue < 300) return "퍼플";
        return "핑크";
      };
      const analyzeRegion = threshold => {
        const counts = new Map();
        let count = 0;
        const startX = Math.max(4, Math.floor(offsetX + width * 0.12));
        const endX = Math.min(76, Math.ceil(offsetX + width * 0.88));
        const startY = Math.max(4, Math.floor(offsetY + height * 0.12));
        const endY = Math.min(76, Math.ceil(offsetY + height * 0.88));
        for (let y = startY; y < endY; y++) {
          for (let x = startX; x < endX; x++) {
            const [r, g, b, alpha] = pixel(x, y);
            if (alpha < 180) continue;
            const distance = Math.hypot(r - background[0], g - background[1], b - background[2]);
            if (distance < threshold) continue;
            const color = classify(r, g, b);
            counts.set(color, (counts.get(color) || 0) + 1);
            count++;
          }
        }
        return { counts, count };
      };
      let result = analyzeRegion(38);
      if (result.count < width * height * 0.035) result = analyzeRegion(18);
      if (!result.count) result = analyzeRegion(0);
      if (!result.count) { reject(new Error("옷 사진에서 색상 표본을 찾지 못했습니다.")); return; }
      const ranked = [...result.counts.entries()].sort((a, b) => b[1] - a[1]);
      const [dominantColor, dominantCount] = ranked[0];
      resolve(dominantCount / result.count < 0.25 ? "멀티" : dominantColor);
    };
    image.onerror = () => reject(new Error("이미지를 불러오지 못해 색상을 분석할 수 없습니다."));
    image.src = imageData;
  });
}
async function reanalyzeStoredColors() {
  const items = state.items.filter(item => item.image && item.colorSource !== "manual" && item.colorSource !== "auto");
  if (!items.length) return;
  const results = [];
  for (let index = 0; index < items.length; index += 6) {
    const batch = await Promise.all(items.slice(index, index + 6).map(async item => {
      try {
        return [item, await detectGarmentColor(item.image)];
      } catch (error) {
        console.error(`${item.name} 색상을 다시 분석하지 못했습니다.`, error);
        return null;
      }
    }));
    results.push(...batch);
  }
  let changed = false;
  results.forEach(result => {
    if (!result) return;
    const [item, color] = result;
    item.color = color;
    item.colorSource = "auto";
    if (item.autoTitle) item.name = generatedGarmentTitle(item);
    changed = true;
  });
  if (changed) {
    persist();
    render();
  }
}
function compressImage(imageData) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 900 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      const sourceWidth = Math.max(1, Math.round(image.naturalWidth * scale));
      const sourceHeight = Math.max(1, Math.round(image.naturalHeight * scale));
      const rotateToPortrait = image.naturalWidth > image.naturalHeight;
      canvas.width = rotateToPortrait ? sourceHeight : sourceWidth;
      canvas.height = rotateToPortrait ? sourceWidth : sourceHeight;
      const context = canvas.getContext("2d");
      if (!context) { resolve(imageData); return; }
      if (rotateToPortrait) {
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(Math.PI / 2);
        context.drawImage(image, -sourceWidth / 2, -sourceHeight / 2, sourceWidth, sourceHeight);
      } else {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    image.onerror = () => reject(new Error("이미지를 처리할 수 없습니다."));
    image.src = imageData;
  });
}
async function loadBackgroundRemovalModel() {
  if (!backgroundRemovalModelPromise) {
    backgroundRemovalModelPromise = (async () => {
      const ort = await import("https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/+esm");
      ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/";
      ort.env.wasm.numThreads = 1;
      const response = await fetch("https://huggingface.co/Ko033/isnet-general-use-onnx/resolve/5349b617911fd60c619b52f32e2b593517b78df3/onnx/model_quantized.onnx");
      if (!response.ok) throw new Error(`배경 제거 AI 모델을 내려받지 못했습니다. (${response.status})`);
      const chunks = [];
      const reader = response.body?.getReader();
      if (!reader) throw new Error("AI 모델 다운로드 응답을 읽을 수 없습니다.");
      const total = Number(response.headers.get("content-length")) || 0;
      let loaded = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total) setBackgroundRemovalStatus(`누끼 제거 AI 다운로드 중 · ${Math.floor(loaded / total * 100)}%`);
      }
      const modelData = new Uint8Array(loaded);
      let offset = 0;
      chunks.forEach(chunk => {
        modelData.set(chunk, offset);
        offset += chunk.length;
      });
      const session = await ort.InferenceSession.create(modelData, { executionProviders: ["wasm"] });
      return { ort, session };
    })().catch(error => {
      backgroundRemovalModelPromise = null;
      throw error;
    });
  }
  return backgroundRemovalModelPromise;
}
function removeGarmentBackground(imageData) {
  const task = backgroundRemovalQueue.then(async () => {
    const { ort, session } = await loadBackgroundRemovalModel();
    const source = new Image();
    await new Promise((resolve, reject) => {
      source.onload = resolve;
      source.onerror = () => reject(new Error("사진을 배경 제거용으로 불러오지 못했습니다."));
      source.src = imageData;
    });
    const modelSize = 1024;
    const inputCanvas = document.createElement("canvas");
    inputCanvas.width = modelSize;
    inputCanvas.height = modelSize;
    const inputContext = inputCanvas.getContext("2d", { willReadFrequently: true });
    if (!inputContext) throw new Error("AI 분석용 사진을 준비하지 못했습니다.");
    inputContext.drawImage(source, 0, 0, modelSize, modelSize);
    const sourcePixels = inputContext.getImageData(0, 0, modelSize, modelSize).data;
    const planeSize = modelSize * modelSize;
    const input = new Float32Array(planeSize * 3);
    for (let index = 0; index < planeSize; index++) {
      input[index] = sourcePixels[index * 4] / 255 - 0.5;
      input[planeSize + index] = sourcePixels[index * 4 + 1] / 255 - 0.5;
      input[planeSize * 2 + index] = sourcePixels[index * 4 + 2] / 255 - 0.5;
    }
    const inputTensor = new ort.Tensor("float32", input, [1, 3, modelSize, modelSize]);
    const result = await session.run({ [session.inputNames[0]]: inputTensor });
    const mask = result[session.outputNames[0]].data;
    if (mask.length !== planeSize) throw new Error("AI가 생성한 배경 마스크 크기가 올바르지 않습니다.");
    let minimum = Infinity;
    let maximum = -Infinity;
    for (const value of mask) {
      minimum = Math.min(minimum, value);
      maximum = Math.max(maximum, value);
    }
    const range = maximum - minimum;
    if (!Number.isFinite(range) || range <= 0) throw new Error("AI가 사진에서 옷을 구분하지 못했습니다.");
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = modelSize;
    maskCanvas.height = modelSize;
    const maskContext = maskCanvas.getContext("2d");
    if (!maskContext) throw new Error("배경 마스크를 만들지 못했습니다.");
    const maskPixels = maskContext.createImageData(modelSize, modelSize);
    for (let index = 0; index < planeSize; index++) {
      const alpha = Math.round(Math.max(0, Math.min(1, (mask[index] - minimum) / range)) * 255);
      const pixelOffset = index * 4;
      maskPixels.data[pixelOffset] = 255;
      maskPixels.data[pixelOffset + 1] = 255;
      maskPixels.data[pixelOffset + 2] = 255;
      maskPixels.data[pixelOffset + 3] = alpha;
    }
    maskContext.putImageData(maskPixels, 0, 0);
    const canvas = document.createElement("canvas");
    canvas.width = source.naturalWidth;
    canvas.height = source.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("사진 편집용 캔버스를 만들지 못했습니다.");
    context.drawImage(source, 0, 0);
    context.globalCompositeOperation = "destination-in";
    context.drawImage(maskCanvas, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.9);
  });
  backgroundRemovalQueue = task.catch(() => {});
  return task;
}
async function removeExistingGarmentBackground(button) {
  const item = state.items.find(entry => entry.id === button.dataset.removeBackground);
  if (!item || !item.image || item.backgroundRemoved) return;
  button.disabled = true;
  button.textContent = "처리 중…";
  setBackgroundRemovalStatus("누끼 제거 AI를 준비하고 있어요. 처음 사용할 때는 모델 다운로드로 시간이 걸릴 수 있습니다.");
  try {
    item.image = await removeGarmentBackground(item.image);
    item.backgroundRemoved = true;
    persist();
    render();
    notify("옷 사진의 배경을 제거했어요.");
  } catch (error) {
    console.error("옷 사진 배경을 제거하지 못했습니다.", error);
    button.disabled = false;
    button.textContent = "누끼 다시 시도";
    notify("배경을 제거하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.");
  } finally {
    setBackgroundRemovalStatus("");
  }
}
async function removeAllGarmentBackgrounds(button) {
  if (bulkBackgroundRemovalInProgress) return;
  const items = state.items.filter(item => item.image && !item.backgroundRemoved);
  if (!items.length) return;
  bulkBackgroundRemovalInProgress = true;
  button.disabled = true;
  let completed = 0;
  let failed = 0;
  try {
    for (const item of items) {
      if (item.backgroundRemoved || !item.image) continue;
      setBackgroundRemovalStatus(`기존 사진 누끼 제거 중 · ${completed + failed + 1}/${items.length} · ${garmentDisplayName(item)}`);
      try {
        item.image = await removeGarmentBackground(item.image);
        item.backgroundRemoved = true;
        completed++;
        persistLocalClosetSnapshot();
      } catch (error) {
        failed++;
        console.error(`${item.name} 사진의 배경을 제거하지 못했습니다.`, error);
      }
    }
    if (completed) persist();
    render();
    notify(failed ? `${completed}장 배경을 제거했고, ${failed}장은 실패했어요. 실패한 사진은 다시 시도할 수 있어요.` : `${completed}장 사진의 배경을 모두 제거했어요.`);
  } finally {
    bulkBackgroundRemovalInProgress = false;
    setBackgroundRemovalStatus("");
    if (activeView === "closet") render();
  }
}
function persistLocalClosetSnapshot() {
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(activeStorageKey, JSON.stringify(createStorageSnapshot()));
  } catch (error) {
    notify("기기에 옷장 사진을 저장하지 못했어요.");
    console.error("누끼 제거 사진을 로컬에 저장하지 못했습니다.", error);
    throw error;
  }
}
function setBackgroundRemovalStatus(message) {
  const status = document.getElementById("background-removal-status");
  if (!status) return;
  status.textContent = message;
  status.hidden = !message;
}
function handleFiles(files) {
  const imageFiles = [...files].filter(file => file.type.startsWith("image/"));
  if (!imageFiles.length) { notify("이미지 파일을 선택해 주세요."); return; }
  let processed = 0, failed = 0, cutoutFailed = 0;
  const colorAnalysisPromises = [];
  setBackgroundRemovalStatus("옷 사진의 배경을 제거하고 있어요. 처음 사용할 때는 모델 다운로드로 시간이 걸릴 수 있습니다.");
  const finishFile = () => {
    processed++;
    if (processed !== imageFiles.length) return;
    Promise.all(colorAnalysisPromises).then(() => {
      persist();
      render();
      setBackgroundRemovalStatus("");
      const messages = [`${imageFiles.length - failed}개 옷을 옷장에 추가했어요.`];
      if (cutoutFailed) messages.push(`${cutoutFailed}개는 배경 제거에 실패해 원본 사진으로 저장했어요.`);
      if (failed) messages.push(`${failed}개 이미지는 읽지 못했습니다.`);
      notify(messages.join(" "));
    });
  };
  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = await compressImage(String(reader.result));
        const fileStem = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").trim();
        const category = guessCategory(file.name);
        const genericFileName = /^(img|dsc|pxl|image|photo|kakaotalk|screenshot|화면 캡처|202\d{5,})/i.test(fileStem.replace(/\s/g, ""));
        const item = { id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: genericFileName || !fileStem ? generatedGarmentTitle({ category }) : fileStem, autoTitle: genericFileName || !fileStem, category, color: "분석 중", style: state.profile.style || "데일리", emoji: categoryIcons[category] || "🔎", bg: "#eeeae2", image: base64, wears: 0 };
        state.items.unshift(item);
        try {
          item.image = await removeGarmentBackground(base64);
          item.backgroundRemoved = true;
        } catch (error) {
          cutoutFailed++;
          console.error("업로드한 옷 사진의 배경을 제거하지 못했습니다. 원본 사진은 그대로 저장합니다.", file.name, error);
        }
        colorAnalysisPromises.push(analyzeColor(item.image, false));
      } catch (error) {
        failed++;
        console.error("이미지 파일을 처리하지 못했습니다.", file.name, error);
      } finally {
        finishFile();
      }
    };
    reader.onerror = () => { failed++; console.error("이미지 파일을 읽지 못했습니다.", file.name); finishFile(); };
    reader.readAsDataURL(file);
  });
}
function toggleSave(id) {
  const existing = state.saved.find(item => item.id === id);
  if (existing) { state.saved = state.saved.filter(item => item.id !== id); notify("저장한 코디에서 삭제했어요."); }
  else {
    const outfit = getRecommendations().find(item => item.id === id);
    if (outfit) { state.saved.unshift({ ...outfit, savedAt: new Date().toISOString() }); notify("마음에 드는 코디를 저장했어요."); }
  }
  persist(); render();
}
function wearOutfit(id) {
  const outfit = getRecommendations().find(item => item.id === id) || state.saved.find(item => item.id === id);
  if (!outfit) return;
  outfit.picks.forEach(pick => { const item = state.items.find(entry => entry.id === pick.id); if (item) item.wears = (item.wears || 0) + 1; });
  persist(); render(); notify("착용 횟수에 반영했어요.");
}
function showProfileModal() {
  const profile = state.profile;
  document.getElementById("modal").innerHTML = `<div class="modal-heading"><div><h2 id="modal-title">나의 스타일 설정</h2><p>취향과 사이즈에 맞는 추천을 준비할게요.</p></div><button class="modal-close" data-close aria-label="닫기">×</button></div>
  <form id="profile-form" class="profile-form">
    <div class="form-field full"><label for="profile-gender">성별에 맞는 옷 추천</label><select id="profile-gender"><option value="" ${!profile.gender ? "selected" : ""}>선택 안 함</option><option value="male" ${profile.gender === "male" ? "selected" : ""}>남성</option><option value="female" ${profile.gender === "female" ? "selected" : ""}>여성</option></select><small class="field-help">옷 이름과 종류를 기준으로 남성용·여성용 옷을 자동 분류해 추천해요. 공용 옷은 함께 추천합니다.</small></div>
    <div class="form-field full"><label>선호 스타일</label><div class="style-options">${["캐주얼", "스트릿", "미니멀", "포멀"].map(style => `<button type="button" class="choice-chip ${profile.style === style ? "selected" : ""}" data-style="${style}">${style}</button>`).join("")}</div></div>
    <div class="form-field"><label for="profile-height">키 (cm)</label><input id="profile-height" type="number" min="100" max="230" placeholder="예: 165" value="${escapeHtml(profile.height)}"></div>
    <div class="form-field"><label for="profile-weight">몸무게 (kg)</label><input id="profile-weight" type="number" min="25" max="250" placeholder="예: 55" value="${escapeHtml(profile.weight)}"></div>
    <div class="form-field"><label for="profile-top">상의·아우터 사이즈</label><select id="profile-top"><option value="">선택 안 함</option>${["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size => `<option value="${size}" ${profile.topSize === size ? "selected" : ""}>${size}</option>`).join("")}</select></div>
    <div class="form-field"><label for="profile-bottom">하의 사이즈</label><select id="profile-bottom"><option value="">선택 안 함</option>${["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size => `<option value="${size}" ${profile.bottomSize === size ? "selected" : ""}>${size}</option>`).join("")}</select></div>
    <div class="form-field"><label for="profile-onepiece">원피스 사이즈</label><select id="profile-onepiece"><option value="">선택 안 함</option>${["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size => `<option value="${size}" ${profile.onepieceSize === size ? "selected" : ""}>${size}</option>`).join("")}</select></div>
    <div class="form-field"><label for="profile-shoe">신발 사이즈 (mm)</label><select id="profile-shoe"><option value="">선택 안 함</option>${Array.from({ length: 15 }, (_, index) => String(220 + index * 5)).map(size => `<option value="${size}" ${String(profile.shoeSize) === size ? "selected" : ""}>${size}</option>`).join("")}</select></div>
    <p class="ai-note form-field full">키·몸무게만으로 옷 사이즈를 추측하지 않아요. 프로필과 각 옷의 실제 표기 사이즈가 일치할 때 사이즈가 맞는 옷으로 추천합니다.</p>
    <div class="modal-actions form-field full"><button type="button" class="secondary-button" data-close>취소</button><button type="submit" class="primary-button">저장하기</button></div>
  </form>`;
  showModal();
  document.querySelectorAll("[data-style]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-style]").forEach(option => option.classList.toggle("selected", option === button));
  }));
  document.getElementById("profile-form").addEventListener("submit", event => {
    event.preventDefault();
    const previousGender = profile.gender || "";
    state.profile = { gender: document.getElementById("profile-gender").value, style: document.querySelector("[data-style].selected")?.dataset.style || profile.style, height: document.getElementById("profile-height").value, weight: document.getElementById("profile-weight").value, topSize: document.getElementById("profile-top").value, bottomSize: document.getElementById("profile-bottom").value, onepieceSize: document.getElementById("profile-onepiece").value, shoeSize: document.getElementById("profile-shoe").value };
    if (previousGender !== state.profile.gender) recommendationOffset = 0;
    persist(); closeModal(); render(); notify("스타일 설정을 저장했어요.");
  });
}
function showModal() {
  const backdrop = document.getElementById("modal-backdrop");
  backdrop.hidden = false;
  backdrop.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeModal));
}
function closeModal() {
  document.getElementById("modal-backdrop").hidden = true;
  document.getElementById("modal").classList.remove("try-on-modal");
}
async function updateWeatherAt(coordinates, quiet = false) {
  if (weatherRequestInProgress) return;
  weatherRequestInProgress = true;
  try {
    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: "temperature_2m,precipitation,weather_code,wind_speed_10m",
      hourly: "precipitation_probability",
      wind_speed_unit: "kmh",
      timezone: "auto"
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`날씨 요청 실패: ${response.status}`);
    const data = await response.json();
    if (!Number.isFinite(data.current?.temperature_2m) || !Number.isFinite(data.current?.weather_code)) {
      throw new Error("날씨 응답 데이터 형식이 올바르지 않습니다.");
    }
    if (typeof data.current?.time !== "string"
      || !Array.isArray(data.hourly?.time)
      || !Array.isArray(data.hourly?.precipitation_probability)
      || data.hourly.time.length !== data.hourly.precipitation_probability.length) {
      throw new Error("시간별 강수 예보 데이터 형식이 올바르지 않습니다.");
    }
    const currentTime = data.current.time;
    const currentDate = currentTime.slice(0, 10);
    const remainingRainProbability = data.hourly.time.reduce((maximum, forecastTime, index) => {
      const probability = data.hourly.precipitation_probability[index];
      if (forecastTime < currentTime || !forecastTime.startsWith(currentDate) || !Number.isFinite(probability)) return maximum;
      return Math.max(maximum, probability);
    }, 0);
    const codes = { 0: "맑음", 1: "대체로 맑음", 2: "구름 조금", 3: "흐림", 45: "안개", 48: "안개", 51: "이슬비", 53: "이슬비", 55: "비", 61: "비", 63: "비", 65: "강한 비", 71: "눈", 73: "눈", 75: "강한 눈", 80: "소나기", 81: "소나기", 82: "강한 소나기" };
    const updatedAt = new Date().toISOString();
    state.weather = {
      temp: data.current.temperature_2m,
      code: data.current.weather_code,
      description: codes[data.current.weather_code] || "날씨 확인",
      rain: remainingRainProbability,
      rainForecastDate: currentDate,
      rainForecastSource: "hourly_remaining_day",
      timezone: data.timezone,
      precipitation: Number.isFinite(data.current.precipitation) ? data.current.precipitation : 0,
      windSpeed: Number.isFinite(data.current.wind_speed_10m) ? data.current.wind_speed_10m : null,
      location: "내 위치",
      updatedAt
    };
    weatherLastUpdatedAt = Date.now();
    persist();
    render();
    if (!quiet) notify("현재 날씨를 업데이트했어요. 이후 10분마다 자동으로 확인해요.");
  } catch (error) {
    console.error("날씨 정보를 가져오지 못했습니다.", error);
    if (!quiet) notify("날씨를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.");
  } finally {
    weatherRequestInProgress = false;
  }
}
async function fetchWeather() {
  if (!navigator.geolocation) { notify("이 브라우저에서는 위치 정보를 사용할 수 없어요."); return; }
  notify("위치와 날씨를 확인하고 있어요…");
  navigator.geolocation.getCurrentPosition(position => {
    weatherCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    clearInterval(weatherRefreshTimer);
    weatherRefreshTimer = setInterval(() => {
      if (!document.hidden) updateWeatherAt(weatherCoordinates, true);
    }, 10 * 60 * 1000);
    updateWeatherAt(weatherCoordinates);
  }, error => {
    const messages = { 1: "날씨를 확인하려면 위치 권한을 허용해 주세요.", 2: "현재 위치를 확인할 수 없어요.", 3: "위치 확인 시간이 초과됐어요." };
    notify(messages[error.code] || "위치 정보를 확인하지 못했어요.");
  }, { timeout: 10000, maximumAge: 300000 });
}
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && weatherCoordinates && Date.now() - weatherLastUpdatedAt >= 5 * 60 * 1000) {
    updateWeatherAt(weatherCoordinates, true);
  }
});
document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
document.getElementById("photo-input").addEventListener("change", event => { handleFiles(event.target.files); event.target.value = ""; });
document.getElementById("modal-backdrop").addEventListener("click", event => { if (event.target.id === "modal-backdrop") closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
window.addEventListener("online", retryPendingCloudSave);
window.addEventListener("resize", () => {
  if (typeof ResizeObserver !== "function") {
    document.querySelectorAll(".outfit-piece img[data-auto-portrait]").forEach(applyImageOrientation);
  }
});
initializeAuthentication();
