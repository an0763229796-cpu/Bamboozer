import { useState, useEffect } from 'react';

/**
 * Bamboozer Season 04 Event Timeline:
 * - Start: October 10, 2026 at 00:00:00 (GMT+7 / Indochina Time)
 * - Duration: 7 days
 * - End: October 17, 2026 at 23:59:59 (GMT+7)
 */
export const EVENT_START_ISO = '2026-10-10T00:00:00+07:00';
export const EVENT_END_ISO = '2026-10-17T23:59:59+07:00';

export const EVENT_START_DATE = new Date(EVENT_START_ISO);
export const EVENT_END_DATE = new Date(EVENT_END_ISO);

export interface SeasonCountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
  isEnded: boolean;
  totalSeconds: number;
  headerTitle: string;
  badgeLabel: string;
  startDateDisplay: string;
  endDateDisplay: string;
}

export function calculateSeasonCountdown(): SeasonCountdownData {
  const now = Date.now();
  const startMs = EVENT_START_DATE.getTime();
  const endMs = EVENT_END_DATE.getTime();

  const isStarted = now >= startMs;
  const isEnded = now > endMs;

  let targetMs = startMs;
  let headerTitle = 'ĐẾM NGƯỢC KHỞI TRANH (10/10 - 00:00)';
  let badgeLabel = 'SẮP BẮT ĐẦU';

  if (!isStarted) {
    targetMs = startMs;
    headerTitle = 'ĐẾM NGƯỢC KHỞI TRANH MÙA 04 (10/10 00:00)';
    badgeLabel = 'KHỞI TRANH 10/10';
  } else if (!isEnded) {
    targetMs = endMs;
    headerTitle = 'THỜI GIAN CÒN LẠI CỦA MÙA 04';
    badgeLabel = 'COUNTDOWN LIVE';
  } else {
    targetMs = now;
    headerTitle = 'MÙA 04 ĐÃ KẾT THÚC';
    badgeLabel = 'ĐÃ KẾT THÚC';
  }

  const diff = Math.max(0, targetMs - now);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isStarted,
    isEnded,
    totalSeconds,
    headerTitle,
    badgeLabel,
    startDateDisplay: '00:00 Ngày 10/10/2026',
    endDateDisplay: '23:59 Ngày 17/10/2026',
  };
}

export function useSeasonCountdown(): SeasonCountdownData {
  const [countdown, setCountdown] = useState<SeasonCountdownData>(calculateSeasonCountdown);

  useEffect(() => {
    // Initial sync
    setCountdown(calculateSeasonCountdown());

    const timer = setInterval(() => {
      setCountdown(calculateSeasonCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return countdown;
}
