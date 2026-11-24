const toast = document.querySelector('.toast');
const dialog = document.querySelector('.settings-dialog');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.action === 'start') showToast('사건 파일을 준비하고 있습니다…');
    if (button.dataset.action === 'continue') showToast('이어할 사건 기록이 없습니다.');
    if (button.dataset.action === 'settings') {
      dialog.showModal();
      document.querySelectorAll('.range-control input').forEach(syncSlider);
    }
    if (button.dataset.action === 'exit') showToast('게임을 종료하려면 브라우저 탭을 닫아주세요.');
    if (button.dataset.action === 'settings-quit') showToast('게임을 종료하려면 브라우저 탭을 닫아주세요.');
    if (button.dataset.action === 'settings-home') {
      dialog.close();
      showToast('메인 화면으로 돌아갑니다.');
    }
    if (button.dataset.action === 'settings-reset') {
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

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());

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
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !dialog.open) document.querySelector('[data-action="start"]').click();
  if (event.key === 'Escape' && dialog.open) dialog.close();
});
