'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  dossierCatalog,
  evidenceCatalog,
  sceneMap,
  scenes,
  type Choice,
} from './story';

const firstRunEvidence = [
  'medicine',
  'detectiveId',
  'policeLetter',
  'notebook',
  'fakeWatch',
  'telegram',
  'glove',
  'letterOpener',
  'keyLedger',
  'research',
  'journalistNote',
  'ticket',
];

const firstRunDossiers = ['eleanor', 'margaret', 'thomas', 'jonathan', 'samuel', 'hargreaves'];

export default function Home() {
  const [screen, setScreen] = useState<'title' | 'game'>('title');
  const [sceneId, setSceneId] = useState('p00');
  const [run, setRun] = useState<1 | 2>(1);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [dossiers, setDossiers] = useState<string[]>([]);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [secondRunUnlocked, setSecondRunUnlocked] = useState(false);
  const [toast, setToast] = useState('');

  const scene = sceneMap[sceneId];
  const runScenes = useMemo(() => scenes.filter((item) => item.run === run), [run]);
  const progress = Math.max(
    3,
    ((runScenes.findIndex((item) => item.id === sceneId) + 1) / runScenes.length) * 100,
  );

  useEffect(() => {
    setSecondRunUnlocked(localStorage.getItem('blackthorn-second-run') === 'unlocked');
  }, []);

  const enterScene = (nextId: string) => {
    const nextScene = sceneMap[nextId];
    if (!nextScene) return;

    if (nextScene.evidence?.length) {
      const newItems = nextScene.evidence.filter((item) => !evidence.includes(item));
      if (newItems.length) {
        setEvidence((current) => [
          ...current,
          ...newItems.filter((item) => !current.includes(item)),
        ]);
        setToast(`새 증거: ${newItems.map((item) => evidenceCatalog[item].name).join(', ')}`);
        window.setTimeout(() => setToast(''), 2600);
      }
    }

    if (nextScene.dossiers?.length) {
      setDossiers((current) => [
        ...current,
        ...nextScene.dossiers!.filter((item) => !current.includes(item)),
      ]);
    }

    setSceneId(nextId);
  };

  const startRun = (nextRun: 1 | 2) => {
    setRun(nextRun);
    setEvidence(nextRun === 2 ? firstRunEvidence : []);
    setDossiers(nextRun === 2 ? [...firstRunDossiers] : []);
    setSceneId(nextRun === 1 ? 'p00' : 'r00');
    setNotebookOpen(false);
    setToast('');
    setScreen('game');
  };

  const choose = (choice: Choice) => {
    if (choice.next) enterScene(choice.next);
    if (choice.action === 'title') {
      setScreen('title');
      setNotebookOpen(false);
    }
    if (choice.action === 'reset') startRun(1);
    if (choice.action === 'unlock') {
      localStorage.setItem('blackthorn-second-run', 'unlocked');
      setSecondRunUnlocked(true);
      setScreen('title');
    }
  };

  if (screen === 'title') {
    return (
      <main className="title-screen">
        <div className="film-grain" />
        <div className="title-vignette" />
        <section className="title-card">
          <p className="eyebrow">A BLACKTHORN EXPRESS MYSTERY</p>
          <h1>마지막 객실의 탐정</h1>
          <p className="subtitle">멈춘 시계, 잠긴 객실, 그리고 기억나지 않는 40분.</p>
          <div className="title-actions">
            <button className="primary-button" onClick={() => startRun(1)}>
              1회차 · 사건 시작
            </button>
            <button
              className="secondary-button"
              disabled={!secondRunUnlocked}
              onClick={() => startRun(2)}
            >
              {secondRunUnlocked ? '2회차 · 기억 재구성' : '2회차 · 잠김'}
            </button>
          </div>
          <p className="hint">선택형 미스터리 · 확장 스크립트 · 세 가지 엔딩</p>
        </section>
        <p className="title-footer">1897 · LONDON BOUND · BLACKTHORN EXPRESS</p>
      </main>
    );
  }

  return (
    <main className={`game-shell ending-${scene.ending ?? 'none'}`}>
      <div
        className="scene-background"
        style={{ backgroundImage: `url('/assets/backgrounds/${scene.background}')` }}
      />
      <div className="scene-overlay" />
      <div className="film-grain" />

      <header className="game-header">
        <div>
          <span className="run-badge">{run}회차</span>
          <span>{scene.chapter}</span>
        </div>
        <strong>{scene.time}</strong>
      </header>
      <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>

      <nav className="game-tools" aria-label="게임 메뉴">
        <button onClick={() => setNotebookOpen(true)}>
          사건 수첩 <b>{evidence.length}</b>
        </button>
        <button onClick={() => setScreen('title')}>타이틀</button>
      </nav>

      <section className="scene-label">
        <span>{scene.chapter.split('·')[0]}</span>
        <p>{scene.chapter.split('·').slice(1).join('·')}</p>
      </section>

      {scene.sprite && (
        <img
          key={scene.sprite}
          className={`character-sprite side-${scene.spriteSide ?? 'center'}`}
          src={`/assets/sprites/${scene.sprite}`}
          alt={scene.speaker}
        />
      )}

      <section key={scene.id} className="dialogue-panel" aria-live="polite">
        {scene.ending && (
          <p className={`ending-tag ${scene.ending}`}>{scene.chapter.split('·')[0]}</p>
        )}
        <p className="speaker">{scene.speaker}</p>
        <p className="dialogue-text">{scene.text}</p>
        <div className={`choice-list ${scene.choices.length > 3 ? 'compact' : ''}`}>
          {scene.choices.map((choice, index) => (
            <button
              key={`${scene.id}-${index}`}
              className={choice.emphasis ? 'choice emphasis' : 'choice'}
              onClick={() => choose(choice)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {choice.label}
            </button>
          ))}
        </div>
      </section>

      {toast && <div className="evidence-toast">✦ {toast}</div>}

      {notebookOpen && (
        <div
          className="notebook-backdrop"
          role="presentation"
          onMouseDown={() => setNotebookOpen(false)}
        >
          <aside
            className="notebook"
            role="dialog"
            aria-modal="true"
            aria-label="사건 수첩"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="notebook-header">
              <div><p>ARTHUR BELL&apos;S NOTES</p><h2>사건 수첩</h2></div>
              <button onClick={() => setNotebookOpen(false)} aria-label="닫기">×</button>
            </div>

            <section className="notebook-section">
              <div className="section-heading">
                <h3>증거 기록</h3>
                <span>{evidence.length} / {Object.keys(evidenceCatalog).length}</span>
              </div>
              <div className="evidence-grid">
                {evidence.length ? evidence.map((id, index) => (
                  <article key={id} className={evidenceCatalog[id].run === 2 ? 'truth-evidence' : ''}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{evidenceCatalog[id].name}</h3>
                      <p>{evidenceCatalog[id].detail}</p>
                    </div>
                  </article>
                )) : <p className="empty-note">아직 기록된 증거가 없다.</p>}
              </div>
            </section>

            <section className="notebook-section dossier-section">
              <div className="section-heading">
                <h3>인물 기록</h3>
                <span>{dossiers.length} / {Object.keys(dossierCatalog).length}</span>
              </div>
              <div className="dossier-grid">
                {dossiers.length ? dossiers.map((id) => (
                  <article key={id}>
                    <div className="dossier-title">
                      <h3>{dossierCatalog[id].name}</h3>
                      <span>{dossierCatalog[id].role}</span>
                    </div>
                    <p>{dossierCatalog[id].detail}</p>
                  </article>
                )) : <p className="empty-note">아직 정리된 인물 기록이 없다.</p>}
              </div>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
