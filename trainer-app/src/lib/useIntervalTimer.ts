import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export type TimerPhase = 'bereit' | 'belastung' | 'pause' | 'fertig';

export type IntervalConfig = { work: number; rest: number; rounds: number };

const KEEP_AWAKE_TAG = 'interval-timer';

function buzz(type: Haptics.NotificationFeedbackType) {
  if (Platform.OS === 'web') return;
  Haptics.notificationAsync(type).catch(() => {});
}

/**
 * Intervall-Timer (Belastung/Pause × Runden). Hält während des Laufens den
 * Bildschirm wach und vibriert bei jedem Phasenwechsel.
 */
export function useIntervalTimer(config: IntervalConfig) {
  const [phase, setPhase] = useState<TimerPhase>('bereit');
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(config.work);
  const [running, setRunning] = useState(false);
  const configRef = useRef(config);
  configRef.current = config;

  const reset = useCallback(() => {
    setRunning(false);
    setPhase('bereit');
    setRound(1);
    setSecondsLeft(configRef.current.work);
  }, []);

  // Einstellungen geändert → Timer zurücksetzen.
  useEffect(reset, [config.work, config.rest, config.rounds, reset]);

  useEffect(() => {
    if (running) {
      activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => {});
      return () => {
        deactivateKeepAwake(KEEP_AWAKE_TAG).catch(() => {});
      };
    }
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Phasenwechsel, sobald die Zeit abgelaufen ist.
  useEffect(() => {
    if (!running || secondsLeft > 0) return;
    const { work, rest, rounds } = configRef.current;
    if (phase === 'belastung' && rest > 0 && round < rounds) {
      setPhase('pause');
      setSecondsLeft(rest);
      buzz(Haptics.NotificationFeedbackType.Warning);
    } else if (round < rounds) {
      setPhase('belastung');
      setRound((r) => r + 1);
      setSecondsLeft(work);
      buzz(Haptics.NotificationFeedbackType.Success);
    } else {
      setPhase('fertig');
      setRunning(false);
      buzz(Haptics.NotificationFeedbackType.Success);
    }
  }, [secondsLeft, running, phase, round]);

  const start = useCallback(() => {
    if (phase === 'fertig') {
      setRound(1);
      setSecondsLeft(configRef.current.work);
    }
    if (phase === 'bereit' || phase === 'fertig') setPhase('belastung');
    setRunning(true);
  }, [phase]);

  const pause = useCallback(() => setRunning(false), []);

  return { phase, round, secondsLeft: Math.max(0, secondsLeft), running, start, pause, reset };
}

export function formatSeconds(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
