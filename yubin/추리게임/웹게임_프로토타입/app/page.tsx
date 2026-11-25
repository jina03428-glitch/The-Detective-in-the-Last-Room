'use client';

import { useMemo, useState } from 'react';
import { sceneMap, scenes, type Choice } from './story';

type Run = 1 | 2;

const firstScene: Record<Run, string> = { 1: 'p00', 2: 'r00' };

export default function Home() {
  const [run, setRun] = useState<Run>(1);
  const [sceneId, setSceneId] = useState(firstScene[1]);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scene = sceneMap[sceneId] ?? sceneMap[firstScene[run]];
  const runScenes = useMemo(() => scenes.filter((item) => item.run === run), [run]);
  const filteredScenes = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko');
    if (!keyword) return runScenes;
    return runScenes.filter((item) =>
      [item.chapter, item.speaker, item.text, item.time]
        .join(' ')
        .toLocaleLowerCase('ko')
        .includes(keyword),
    );
  }, [query, runScenes]);

  const currentIndex = Math.max(0, runScenes.findIndex((item) => item.id === scene.id));

  const moveTo = (nextId: string) => {
    const next = sceneMap[nextId];
    if (!next) return;
    setRun(next.run);
    setSceneId(next.id);
    setSidebarOpen(false);
  };

  const changeRun = (nextRun: Run) => {
    setRun(nextRun);
    setSceneId(firstScene[nextRun]);
    setQuery('');
  };

  const choose = (choice: Choice) => {
    if (choice.next) return moveTo(choice.next);
    if (choice.action === 'unlock') return changeRun(2);
    if (choice.action === 'title' || choice.action === 'reset') changeRun(1);
  };

  const goRelative = (offset: number) => {
    const next = runScenes[currentIndex + offset];
    if (next) moveTo(next.id);
  };

  return (
    <main className="reader-shell">
      <aside className={`scene-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-heading">
          <div>
            <p className="kicker">SCRIPT REVIEW</p>
            <h1>마지막 객실의 탐정</h1>
          </div>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="장면 목록 닫기">×</button>
        </div>

        <div className="run-tabs" aria-label="회차 선택">
          <button className={run === 1 ? 'active' : ''} onClick={() => changeRun(1)}>1회차</button>
          <button className={run === 2 ? 'active' : ''} onClick={() => changeRun(2)}>2회차</button>
        </div>

        <label className="search-box">
          <span>장면 검색</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="인물, 대사, 장면명" />
        </label>

        <div className="scene-count"><span>{run}회차 장면</span><b>{filteredScenes.length}</b></div>
        <nav className="scene-list" aria-label={`${run}회차 장면 목록`}>
          {filteredScenes.map((item) => (
            <button key={item.id} className={item.id === scene.id ? 'active' : ''} onClick={() => moveTo(item.id)}>
              <span>{item.id.toUpperCase()}</span>
              <strong>{item.chapter}</strong>
              <small>{item.speaker} · {item.time}</small>
            </button>
          ))}
          {!filteredScenes.length && <p className="empty-result">검색 결과가 없습니다.</p>}
        </nav>
      </aside>

      {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="장면 목록 닫기" />}

      <section className="script-viewer">
        <header className="viewer-toolbar">
          <button className="list-button mobile-only" onClick={() => setSidebarOpen(true)}>장면 목록</button>
          <p>{run}회차 · {currentIndex + 1} / {runScenes.length}</p>
          <div className="viewer-navigation">
            <button disabled={currentIndex === 0} onClick={() => goRelative(-1)}>이전</button>
            <button disabled={currentIndex === runScenes.length - 1} onClick={() => goRelative(1)}>다음</button>
          </div>
        </header>

        <article className="script-page">
          <header className="scene-header">
            <div><p className="scene-id">SCENE {scene.id.toUpperCase()}</p><h2>{scene.chapter}</h2></div>
            <time>{scene.time}</time>
          </header>

          <div className="script-block">
            <p className="speaker">{scene.speaker}</p>
            <p className="dialogue">{scene.text}</p>
          </div>

          {!!scene.choices.length && (
            <section className="choice-section">
              <div className="choice-heading"><h3>선택지</h3><p>버튼을 누르면 해당 흐름으로 이동합니다.</p></div>
              <div className="reader-choices">
                {scene.choices.map((choice, index) => (
                  <button key={`${scene.id}-${choice.label}`} className={choice.emphasis ? 'emphasis' : ''} onClick={() => choose(choice)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{choice.label}</strong>
                    <small>{choice.next ? `→ ${choice.next.toUpperCase()}` : '→ 장면 전환'}</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          <footer className="scene-footer">
            <span>배경·스프라이트·증거 연출을 제외한 스크립트 검수 화면</span>
            {scene.ending && <b>{scene.ending.toUpperCase()} ENDING</b>}
          </footer>
        </article>
      </section>
    </main>
  );
}


