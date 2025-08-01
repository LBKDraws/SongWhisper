import { useState, useEffect } from "react";
import { Song, InsertSong, PracticeCategory } from "@shared/schema";
import { nanoid } from "nanoid";

const STORAGE_KEY = "music-practice-songs";

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);

  // Load songs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSongs(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored songs:", error);
      }
    }
  }, []);

  // Save songs to localStorage whenever songs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
  }, [songs]);

  const addSong = (songData: InsertSong) => {
    const newSong: Song = {
      ...songData,
      id: nanoid(),
    };
    setSongs(prev => [...prev, newSong]);
  };

  const updateSong = (id: string, updates: Partial<Song>) => {
    setSongs(prev => prev.map(song => 
      song.id === id ? { ...song, ...updates } : song
    ));
  };

  const deleteSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  const moveSong = (id: string, newCategory: PracticeCategory) => {
    const updates: Partial<Song> = { category: newCategory };
    
    // If moving to learned, set completion date
    if (newCategory === "learned") {
      updates.dateCompleted = new Date().toISOString().split('T')[0];
    } else {
      updates.dateCompleted = undefined;
    }
    
    updateSong(id, updates);
  };

  const getSongsByCategory = (category: PracticeCategory) => {
    return songs.filter(song => song.category === category);
  };

  const getCategoryCounts = () => {
    return {
      daily: getSongsByCategory("daily").length,
      weekly: getSongsByCategory("weekly").length,
      biweekly: getSongsByCategory("biweekly").length,
      monthly: getSongsByCategory("monthly").length,
      learned: getSongsByCategory("learned").length,
    };
  };

  return {
    songs,
    addSong,
    updateSong,
    deleteSong,
    moveSong,
    getSongsByCategory,
    getCategoryCounts,
  };
}
