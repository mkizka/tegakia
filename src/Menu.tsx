import React, { useState, useEffect } from "react";

import { Note } from "./useNote";
import styles from "./Menu.module.css";

type Props = {
  note: Note;
  onPageChanged: () => void;
};

const Menu: React.VFC<Props> = ({ note, onPageChanged }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(12);

  useEffect(() => {
    /**
     * useEffect内でdepsを更新することで無限ループする
     * 再生開始の場合
     * 1. isPlayingが変化
     * 2. setTimeout発火
     * 3. pageIndexが変化
     * 4. setTimeout発火 以降ループ
     */
    const playInterval = setTimeout(() => {
      if (!isPlaying) return;
      if (note.pageIndex == note.pages.length - 1) {
        note.setPageIndex(0);
      } else {
        note.setPageIndex(note.pageIndex + 1);
      }
      onPageChanged();
    }, 1000 / fps);
    return () => clearInterval(playInterval);
  }, [note.pageIndex, isPlaying]);

  const play = () => {
    setIsPlaying(!isPlaying);
  };

  const pushPage = () => {
    note.backPage();
    onPageChanged();
  };

  const backPage = () => {
    note.pushPage();
    onPageChanged();
  };

  return (
    <div className={styles.menu}>
      <button onClick={pushPage}>{"<"}</button>
      <button onClick={backPage}>{">"}</button>
      <button onClick={play}>{isPlaying ? "stop" : "play"}</button>
      {note.pageIndex + 1}/{note.pages.length}
      <input
        type="number"
        value={fps}
        onChange={(e) => setFps(parseInt(e.target.value) || 0)}
      />
      fps
    </div>
  );
};

export default Menu;
