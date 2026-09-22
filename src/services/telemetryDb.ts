import { TelemetryClickEvent, KOLPartner } from '../types';

const STORAGE_KEY = 'bamboozer_telemetry_events_v1';

export const AFFILIATE_URL = 'https://www.bamboozer.com/register?ref=81';
export const DEFAULT_REF_CODE = '81';

export const INITIAL_KOLS: KOLPartner[] = [
  { id: 'kol-1', code: '81', name: 'Bamboozer Official (Primary)', channel: 'Direct Platform Campaign', clicksCount: 1420, signupsCount: 284, activeTraders: 142, conversionRate: 20.0 },
  { id: 'kol-2', code: 'QUANT_VIP', name: 'Master Scalper VN', channel: 'Telegram Alpha VIP', clicksCount: 650, signupsCount: 112, activeTraders: 68, conversionRate: 17.2 },
  { id: 'kol-3', code: 'CRYPTO_WHALE', name: 'Trading Insight Asia', channel: 'YouTube Finance', clicksCount: 890, signupsCount: 145, activeTraders: 82, conversionRate: 16.3 },
  { id: 'kol-4', code: 'BOT_COMMUNITY', name: 'AI Quant Vietnam', channel: 'Facebook Group', clicksCount: 520, signupsCount: 98, activeTraders: 54, conversionRate: 18.8 },
];

export function getStoredEvents(): TelemetryClickEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read telemetry data:', e);
    return [];
  }
}

export function logTelemetryEvent(
  sourceComponent: string,
  actionType: TelemetryClickEvent['actionType'] = 'click_affiliate',
  refCode: string = DEFAULT_REF_CODE,
  metadata?: Record<string, any>
): TelemetryClickEvent {
  const event: TelemetryClickEvent = {
    id: 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
    timestamp: new Date().toISOString(),
    refCode,
    targetUrl: `${AFFILIATE_URL}${refCode !== DEFAULT_REF_CODE ? `_${refCode}` : ''}`,
    sourceComponent,
    actionType,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    metadata,
  };

  try {
    const events = getStoredEvents();
    events.unshift(event);
    // Keep last 500 events
    if (events.length > 500) events.length = 500;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to write telemetry data:', e);
  }

  return event;
}

export function trackAndOpenAffiliate(
  sourceComponent: string,
  actionType: TelemetryClickEvent['actionType'] = 'click_affiliate',
  refCode: string = DEFAULT_REF_CODE
) {
  logTelemetryEvent(sourceComponent, actionType, refCode);
  const targetUrl = `https://www.bamboozer.com/register?ref=${refCode}`;
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

export function exportTelemetryAsCsv(): string {
  const events = getStoredEvents();
  if (events.length === 0) return 'No events recorded yet';

  const headers = ['ID', 'Timestamp', 'RefCode', 'ActionType', 'SourceComponent', 'TargetURL'];
  const rows = events.map((e) => [
    e.id,
    e.timestamp,
    e.refCode,
    e.actionType,
    `"${e.sourceComponent.replace(/"/g, '""')}"`,
    e.targetUrl,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export const getTelemetryEvents = getStoredEvents;

export function exportTelemetryAsJson(): string {
  return JSON.stringify(getStoredEvents(), null, 2);
}

export function downloadTelemetryCsv(): void {
  const csv = exportTelemetryAsCsv();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `bamboozer_telemetry_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function clearTelemetryEvents(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
}
