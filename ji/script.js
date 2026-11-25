const toast = document.querySelector('.toast');
const dialog = document.querySelector('.settings-dialog');
const blackScreen = document.querySelector('.black-screen');
const dialogueText = document.querySelector('.dialogue-text');
const dialoguePanel = document.querySelector('.dialogue-panel');
const dialogueUi = document.querySelector('.dialogue-ui');
const dialogueNext = document.querySelector('.dialogue-next');
const dialogueAuto = document.querySelector('.dialogue-auto');
const dialogueFast = document.querySelector('.dialogue-fast');
const dialogueRecord = document.querySelector('.dialogue-record');
const dialogueRecordOverlay = document.querySelector('.dialogue-record-overlay');
const dialogueRecordList = document.querySelector('.dialogue-record-list');
const dialogueRecordClose = document.querySelector('.dialogue-record-close');
const dialogueRecordScrollbar = document.querySelector('.dialogue-record-scrollbar');
const dialogueRecordThumb = document.querySelector('.dialogue-record-scroll-thumb');
const dialogueMenu = document.querySelector('.dialogue-menu-button');
const dialogueMenuOptions = document.querySelector('.dialogue-menu-options');
const dialogueMenuSettings = document.querySelector('[data-menu-action="settings"]');
let toastTimer;
let dialogueIndex = 0;
let dialogueAutoTimer;
let dialogueTypingTimer;
let dialogueTyping = false;
let dialogueAutoEnabled = false;
let dialogueFastEnabled = false;
let dialogueTypingMessage = '';
let dialogueHistory = [];
let dialogueSpeedDelay = Number(localStorage.getItem('dialogueSpeedDelay')) || 65;
const uiEditor = document.querySelector('.ui-editor');
const uiEditorTarget = document.querySelector('#ui-editor-target');
const uiEditorX = document.querySelector('#ui-editor-x');
const uiEditorY = document.querySelector('#ui-editor-y');
const uiEditorStorageKey = 'detectiveUiEditorOffsets';
const uiEditorOffsets = JSON.parse(localStorage.getItem(uiEditorStorageKey) || '{}');
if (!uiEditorOffsets._arrowBaseRepaired) {
  delete uiEditorOffsets['.dialogue-next'];
  uiEditorOffsets['.dialogue-arrow'] = { x: 0, y: 0 };
  uiEditorOffsets._arrowBaseRepaired = true;
  localStorage.setItem(uiEditorStorageKey, JSON.stringify(uiEditorOffsets));
}
let uiEditorDragging = false;
let uiEditorDragStart = null;
let uiEditorCurrent = null;

function getUiEditorTarget() {
  return document.querySelector(uiEditorTarget?.value || '.dialogue-panel');
}

function applyUiEditorOffset(element, offset = { x: 0, y: 0 }) {
  if (!element) return;
  element.dataset.editorX = String(offset.x || 0);
  element.dataset.editorY = String(offset.y || 0);
  element.style.translate = `${offset.x || 0}px ${offset.y || 0}px`;
  if (element.matches('.dialogue-arrow')) {
    const clickTarget = document.querySelector('.dialogue-next');
    if (clickTarget) clickTarget.style.translate = `${offset.x || 0}px ${offset.y || 0}px`;
  }
}

function syncUiEditorFields() {
  uiEditorCurrent = getUiEditorTarget();
  if (!uiEditorCurrent) return;
  const offset = uiEditorOffsets[uiEditorTarget.value] || { x: 0, y: 0 };
  uiEditorX.value = offset.x || 0;
  uiEditorY.value = offset.y || 0;
  document.querySelectorAll('.ui-editor-targeting').forEach((element) => element.classList.remove('ui-editor-targeting'));
  uiEditorCurrent.classList.add('ui-editor-targeting');
}

function setUiEditorOffset() {
  if (!uiEditorCurrent) return;
  const offset = { x: Number(uiEditorX.value) || 0, y: Number(uiEditorY.value) || 0 };
  uiEditorOffsets[uiEditorTarget.value] = offset;
  applyUiEditorOffset(uiEditorCurrent, offset);
  localStorage.setItem(uiEditorStorageKey, JSON.stringify(uiEditorOffsets));
}

function toggleUiEditor(force) {
  if (!uiEditor) return;
  const open = typeof force === 'boolean' ? force : !uiEditor.classList.contains('is-open');
  uiEditor.classList.toggle('is-open', open);
  uiEditor.setAttribute('aria-hidden', String(!open));
  if (open) syncUiEditorFields();
  else document.querySelectorAll('.ui-editor-targeting').forEach((element) => element.classList.remove('ui-editor-targeting'));
}

Object.entries(uiEditorOffsets).forEach(([selector, offset]) => applyUiEditorOffset(document.querySelector(selector), offset));
uiEditorTarget?.addEventListener('change', syncUiEditorFields);
uiEditorX?.addEventListener('input', setUiEditorOffset);
uiEditorY?.addEventListener('input', setUiEditorOffset);
document.querySelector('#ui-editor-save')?.addEventListener('click', () => {
  setUiEditorOffset();
  localStorage.setItem(uiEditorStorageKey, JSON.stringify(uiEditorOffsets));
  showToast('UI 위치를 저장했습니다.');
});
document.querySelector('#ui-editor-reset')?.addEventListener('click', () => {
  delete uiEditorOffsets[uiEditorTarget.value];
  applyUiEditorOffset(uiEditorCurrent, { x: 0, y: 0 });
  syncUiEditorFields();
  localStorage.setItem(uiEditorStorageKey, JSON.stringify(uiEditorOffsets));
});
document.querySelector('#ui-editor-close')?.addEventListener('click', () => toggleUiEditor(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'F2') {
    event.preventDefault();
    toggleUiEditor();
  }
});
document.addEventListener('pointerdown', (event) => {
  if (!uiEditor?.classList.contains('is-open') || !uiEditorCurrent || uiEditor.contains(event.target)) return;
  if (!uiEditorCurrent.contains(event.target) && event.target !== uiEditorCurrent) return;
  event.preventDefault();
  event.stopPropagation();
  const offset = uiEditorOffsets[uiEditorTarget.value] || { x: 0, y: 0 };
  uiEditorDragging = true;
  uiEditorDragStart = { x: event.clientX, y: event.clientY, offsetX: offset.x || 0, offsetY: offset.y || 0 };
  uiEditorCurrent.setPointerCapture?.(event.pointerId);
});
document.addEventListener('pointermove', (event) => {
  if (!uiEditorDragging || !uiEditorDragStart) return;
  uiEditorX.value = Math.round(uiEditorDragStart.offsetX + event.clientX - uiEditorDragStart.x);
  uiEditorY.value = Math.round(uiEditorDragStart.offsetY + event.clientY - uiEditorDragStart.y);
  setUiEditorOffset();
});
document.addEventListener('pointerup', () => {
  uiEditorDragging = false;
  uiEditorDragStart = null;
});
const dialogueLines = [
  '대사 내용이 표시됩니다.',
  '빗소리 사이로 낯선 발소리가 들려왔다.',
  '시계는 멈춰 있었지만, 태엽은 아직 따뜻했다.',
  '누군가 이 방을 급하게 떠난 흔적이 남아 있다.',
  '창문 너머로 희미한 불빛이 한 번 깜박였다.',
  '탁자 위의 잔에는 아직 온기가 남아 있었다.',
  '나는 바닥에 떨어진 작은 열쇠를 집어 들었다.',
  '문고리에는 검은 장갑의 섬유가 걸려 있었다.',
  '기록에 적힌 시간과 현장의 시계가 일치하지 않았다.',
  '범인은 이 열차 안에 아직 있을지도 모른다.',
  '이제 마지막 방에 남은 단서를 확인할 차례다.',
  '복도 끝에서 누군가 문을 여는 소리가 났다.',
  '나는 손전등을 켜고 어두운 객실 안을 살폈다.',
  '책상 서랍 안에는 찢어진 편지 한 장이 있었다.',
  '편지의 잉크는 빗물에 번져 일부만 읽을 수 있었다.',
  '하지만 마지막에 적힌 이름만큼은 선명했다.',
  '그 이름은 사건 기록 어디에도 등장하지 않았다.',
  '창문에 비친 그림자가 내 움직임보다 늦게 따라왔다.',
  '나는 뒤를 돌아보았지만 객실 안에는 아무도 없었다.',
  '침묵이 끝난 뒤, 기차는 다음 역으로 들어서고 있었다.'
];

function typeDialogueText(message) {
  if (!dialogueText) return;
  if (dialogueHistory.at(-1)?.index !== dialogueIndex) {
    dialogueHistory.push({ index: dialogueIndex, message });
    renderDialogueHistory();
  }
  clearTimeout(dialogueTypingTimer);
  dialogueTyping = true;
  dialogueTypingMessage = message;
  dialogueText.textContent = '';
  let index = 0;
  const typeNext = () => {
    dialogueText.textContent = message.slice(0, index);
    index += 1;
    if (index <= message.length) {
      dialogueTypingTimer = window.setTimeout(typeNext, dialogueFastEnabled ? 12 : dialogueSpeedDelay);
    } else {
      dialogueTyping = false;
      if (dialogueAutoEnabled || dialogueFastEnabled) {
        dialogueAutoTimer = window.setTimeout(advanceDialogue, dialogueFastEnabled ? 150 : 700);
      }
    }
  };
  typeNext();
}

function renderDialogueHistory() {
  if (!dialogueRecordList) return;
  dialogueRecordList.replaceChildren(...dialogueHistory.map(({ message }) => {
    const entry = document.createElement('div');
    entry.className = 'dialogue-record-entry';
    const speaker = document.createElement('strong');
    speaker.textContent = '탐정';
    const line = document.createElement('p');
    line.textContent = message;
    entry.append(speaker, line);
    return entry;
  }));
  if (dialogueRecordList.scrollHeight > dialogueRecordList.clientHeight) {
    dialogueRecordList.scrollTop = dialogueRecordList.scrollHeight;
  }
  updateRecordScrollbar();
}

function updateRecordScrollbar() {
  if (!dialogueRecordList || !dialogueRecordScrollbar || !dialogueRecordThumb) return;
  if (!dialogueRecordList.clientHeight) return;
  const maxScroll = dialogueRecordList.scrollHeight - dialogueRecordList.clientHeight;
  const endInset = 0.3 * 96 / 2.54;
  const travel = Math.max(0, dialogueRecordScrollbar.clientHeight - dialogueRecordThumb.clientHeight - endInset);
  if (maxScroll <= 0) {
    dialogueRecordList.scrollTop = 0;
    dialogueRecordThumb.style.top = '0px';
    return;
  }
  const ratio = maxScroll > 0 ? dialogueRecordList.scrollTop / maxScroll : 0;
  dialogueRecordThumb.style.top = `${Math.max(0, travel * ratio)}px`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.action === 'start') {
      dialogueIndex = 0;
      dialogueHistory = [];
      renderDialogueHistory();
      clearTimeout(dialogueAutoTimer);
      clearTimeout(dialogueTypingTimer);
      dialogueAutoEnabled = false;
      dialogueFastEnabled = false;
      blackScreen.classList.remove('show-time');
      blackScreen.classList.add('visible', 'show-image', 'show-dialogue');
      typeDialogueText(dialogueLines[0]);
    }
    if (button.dataset.action === 'continue') showToast('이어할 사건 기록이 없습니다.');
    if (button.dataset.action === 'settings') {
      dialog.showModal();
      document.querySelectorAll('.range-control input').forEach(syncSlider);
    }
    if (button.dataset.action === 'exit') showToast('게임을 종료하려면 브라우저 탭을 닫아주세요.');
    if (button.dataset.action === 'settings-quit') showToast('게임을 종료하려면 브라우저 탭을 닫아주세요.');
    if (button.dataset.action === 'settings-home') {
      dialog.close();
      clearTimeout(dialogueAutoTimer);
      clearTimeout(dialogueTypingTimer);
      dialogueAutoEnabled = false;
      dialogueFastEnabled = false;
      dialogueMenuOptions?.closest('.dialogue-ui')?.classList.remove('menu-open');
      dialogueMenuOptions?.classList.remove('is-open');
      dialogueMenu?.setAttribute('aria-expanded', 'false');
      blackScreen.classList.remove('show-dialogue', 'show-image', 'show-time', 'visible');
      showToast('메인 화면으로 돌아갑니다.');
    }
    if (button.dataset.action === 'settings-reset') {
      dialogueSpeedDelay = 65;
      localStorage.setItem('dialogueSpeedDelay', '65');
      document.querySelectorAll('.range-control input').forEach((input) => {
        input.value = 80;
        syncSlider(input);
      });
      const speedGroup = document.querySelector('.speed-control');
      speedGroup.querySelectorAll('.choice-button').forEach((option) => {
        const selected = option.dataset.value === 'normal';
        option.classList.toggle('active', selected);
        const image = option.querySelector('img[data-light]');
        if (image) image.src = selected ? image.dataset.dark : image.dataset.light;
      });
      showToast('설정을 기본값으로 복원했습니다.');
    }
  });
});

function advanceDialogue() {
  if (!blackScreen.classList.contains('show-dialogue')) return;
  if (dialogueIndex >= dialogueLines.length - 1) {
    clearTimeout(dialogueAutoTimer);
    return;
  }
  dialogueIndex = Math.min(dialogueIndex + 1, dialogueLines.length - 1);
  typeDialogueText(dialogueLines[dialogueIndex]);
  if (dialogueIndex === dialogueLines.length - 1) clearTimeout(dialogueAutoTimer);
}

dialogueNext?.addEventListener('click', advanceDialogue);

dialogueUi?.addEventListener('click', (event) => {
  if (event.target !== dialoguePanel && event.target !== dialogueText) return;
  const panelRect = dialoguePanel.getBoundingClientRect();
  const insetX = panelRect.width * 0.045;
  const insetY = panelRect.height * 0.08;
  const insideDialogueBox = event.clientX >= panelRect.left + insetX
    && event.clientX <= panelRect.right - insetX
    && event.clientY >= panelRect.top + insetY
    && event.clientY <= panelRect.bottom - insetY;
  if (insideDialogueBox) advanceDialogue();
});

dialogueAuto?.addEventListener('click', () => {
  if (!blackScreen.classList.contains('show-dialogue')) return;
  dialogueAutoEnabled = !dialogueAutoEnabled;
  dialogueAuto.setAttribute('aria-pressed', String(dialogueAutoEnabled));
  if (dialogueAutoEnabled && dialogueFastEnabled) {
    dialogueFastEnabled = false;
    dialogueFast?.setAttribute('aria-pressed', 'false');
  }
  clearTimeout(dialogueAutoTimer);
  if (dialogueAutoEnabled && !dialogueTyping) dialogueAutoTimer = window.setTimeout(advanceDialogue, 700);
});

dialogueFast?.addEventListener('click', () => {
  dialogueFastEnabled = !dialogueFastEnabled;
  dialogueFast.setAttribute('aria-pressed', String(dialogueFastEnabled));
  if (dialogueFastEnabled && dialogueAutoEnabled) {
    dialogueAutoEnabled = false;
    clearTimeout(dialogueAutoTimer);
    dialogueAuto?.setAttribute('aria-pressed', 'false');
  }
  clearTimeout(dialogueAutoTimer);
  if (dialogueFastEnabled && dialogueTyping) {
    clearTimeout(dialogueTypingTimer);
    dialogueText.textContent = dialogueTypingMessage;
    dialogueTyping = false;
    dialogueAutoTimer = window.setTimeout(advanceDialogue, 150);
  } else if (dialogueFastEnabled) {
    dialogueAutoTimer = window.setTimeout(advanceDialogue, 150);
  }
});

dialogueRecord?.addEventListener('click', () => {
  if (!blackScreen.classList.contains('show-dialogue')) return;
  renderDialogueHistory();
  dialogueRecordOverlay?.classList.add('is-open');
  dialogueRecordOverlay?.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => {
    if (dialogueRecordList && dialogueRecordList.scrollHeight <= dialogueRecordList.clientHeight) {
      dialogueRecordList.scrollTop = 0;
    }
    updateRecordScrollbar();
  });
});

dialogueRecordClose?.addEventListener('click', () => {
  dialogueRecordOverlay?.classList.remove('is-open');
  dialogueRecordOverlay?.setAttribute('aria-hidden', 'true');
});

let draggingRecordScrollbar = false;
let recordDragStartY = 0;
let recordDragStartTop = 0;

dialogueRecordThumb?.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  draggingRecordScrollbar = true;
  recordDragStartY = event.clientY;
  recordDragStartTop = dialogueRecordThumb.offsetTop;
  dialogueRecordThumb.setPointerCapture(event.pointerId);
  dialogueRecordThumb.classList.add('is-dragging');
});

dialogueRecordThumb?.addEventListener('pointermove', (event) => {
  if (!draggingRecordScrollbar || !dialogueRecordList || !dialogueRecordScrollbar) return;
  const endInset = 0.3 * 96 / 2.54;
  const travel = Math.max(0, dialogueRecordScrollbar.clientHeight - dialogueRecordThumb.clientHeight - endInset);
  const nextTop = Math.max(0, Math.min(travel, recordDragStartTop + event.clientY - recordDragStartY));
  dialogueRecordThumb.style.top = `${nextTop}px`;
  const ratio = travel > 0 ? nextTop / travel : 0;
  dialogueRecordList.scrollTop = ratio * (dialogueRecordList.scrollHeight - dialogueRecordList.clientHeight);
});

const stopRecordScrollbarDrag = () => {
  draggingRecordScrollbar = false;
  dialogueRecordThumb?.classList.remove('is-dragging');
};
dialogueRecordThumb?.addEventListener('pointerup', stopRecordScrollbarDrag);
dialogueRecordThumb?.addEventListener('pointercancel', stopRecordScrollbarDrag);
dialogueRecordList?.addEventListener('scroll', updateRecordScrollbar);
window.addEventListener('resize', updateRecordScrollbar);

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());

dialogueMenuSettings?.addEventListener('click', () => {
  dialogueMenuOptions?.closest('.dialogue-ui')?.classList.remove('menu-open');
  dialogueMenuOptions?.classList.remove('is-open');
  dialogueMenu?.setAttribute('aria-expanded', 'false');
  dialogueMenuOptions?.setAttribute('aria-hidden', 'true');
  dialog.showModal();
  document.querySelectorAll('.range-control input').forEach(syncSlider);
});

function syncSlider(input) {
  const output = input.closest('.range-control').querySelector('output');
  const shell = input.closest('.slider-shell');
  const thumbSize = Math.min(Math.max(window.innerWidth * 0.04, 40), 56);
  const value = Number(input.value) / 100;
  // The source thumb has transparent padding; use its visible diamond bounds
  // rather than the full CSS box when clamping the two endpoints.
  // Keep the visible diamond edge flush with the track ends. The source image
  // has transparent space around the diamond, so this is smaller than half
  // of the CSS thumb box.
  const edgeInset = thumbSize * 0.25;
  const thumbCenter = edgeInset + value * (shell.clientWidth - edgeInset * 2);
  const fillWidth = thumbCenter;
  output.textContent = `${input.value}%`;
  shell.style.setProperty('--value', `${input.value}%`);
  shell.style.setProperty('--fill-width', `${fillWidth}px`);
  shell.style.setProperty('--thumb-left', `${thumbCenter}px`);
}

document.querySelectorAll('.range-control input').forEach((input) => {
  syncSlider(input);
  input.addEventListener('input', () => syncSlider(input));
});
window.addEventListener('resize', () => document.querySelectorAll('.range-control input').forEach(syncSlider));

document.querySelectorAll('.choice-control').forEach((group) => {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('.choice-button');
    if (!button) return;
    group.querySelectorAll('.choice-button').forEach((option) => {
      option.classList.remove('active');
      const image = option.querySelector('img[data-light]');
      if (image) image.src = image.dataset.light;
    });
    button.classList.add('active');
    const selectedImage = button.querySelector('img[data-dark]');
    if (selectedImage) selectedImage.src = selectedImage.dataset.dark;

    if (group.classList.contains('display-control')) {
    if (button.dataset.value === 'fullscreen') {
        document.documentElement.requestFullscreen?.().catch(() => {
          showToast('전체 화면 전환을 사용할 수 없습니다.');
        });
      } else if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    } else if (group.classList.contains('speed-control')) {
      const speedDelays = { slow: 100, normal: 65, fast: 35 };
      dialogueSpeedDelay = speedDelays[button.dataset.value] ?? 65;
      localStorage.setItem('dialogueSpeedDelay', String(dialogueSpeedDelay));
    }
  });
});

const savedSpeedValue = ({ 100: 'slow', 65: 'normal', 35: 'fast' })[dialogueSpeedDelay] ?? 'normal';
document.querySelectorAll('.speed-control .choice-button').forEach((button) => {
  const selected = button.dataset.value === savedSpeedValue;
  button.classList.toggle('active', selected);
  const image = button.querySelector('img[data-light]');
  if (image) image.src = selected ? image.dataset.dark : image.dataset.light;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !dialog.open) document.querySelector('[data-action="start"]').click();
  if (event.key === 'Escape' && dialog.open) dialog.close();
});
