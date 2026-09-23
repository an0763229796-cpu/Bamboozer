/**
 * App Route & URL Management for Bamboozer Campaigns
 * Supports standard HTML5 pathname (/campaign/bamboozer-7day-sprint),
 * Hash routing (#/campaign/bamboozer-7day-sprint), and Search query (?campaign=...)
 */

export type AppView = 'landing' | 'campaigns' | 'sprint_challenge';

export interface RouteState {
  view: AppView;
  slug?: string;
}

export const CANONICAL_ROUTES = {
  landing: '/',
  campaigns: '/campaigns',
  sprintChallenge: '/campaign/bamboozer-7day-sprint',
  campaignBySlug: (slug: string) => `/campaign/${slug}`,
};

/**
 * Parse current window location into AppView and campaign slug
 */
export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'landing' };
  }

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const queryCampaign = searchParams.get('campaign') || searchParams.get('c');

  // Check query param first
  if (queryCampaign) {
    if (queryCampaign === 'bamboozer-7day-sprint' || queryCampaign === 'sprint' || queryCampaign === 'season-04') {
      return { view: 'sprint_challenge', slug: 'bamboozer-7day-sprint' };
    }
    return { view: 'campaigns', slug: queryCampaign };
  }

  // Combine pathname and hash for matching
  const target = hash ? hash : pathname;

  // Specific Campaign routes
  if (
    target.includes('/campaign/bamboozer-7day-sprint') ||
    target.includes('/campaigns/bamboozer-7day-sprint') ||
    target.includes('/sprint-challenge') ||
    target.includes('/sprint_challenge') ||
    target.includes('/season-04') ||
    target === '/campaign/bamboozer' ||
    target === '/campaign/sprint'
  ) {
    return { view: 'sprint_challenge', slug: 'bamboozer-7day-sprint' };
  }

  // Generic /campaign/:slug
  const campaignMatch = target.match(/^\/campaigns?\/([a-z0-9_-]+)/);
  if (campaignMatch && campaignMatch[1]) {
    const matchedSlug = campaignMatch[1];
    if (matchedSlug === 'bamboozer-7day-sprint' || matchedSlug === 'season-04') {
      return { view: 'sprint_challenge', slug: 'bamboozer-7day-sprint' };
    }
    return { view: 'campaigns', slug: matchedSlug };
  }

  // Campaigns Hub
  if (target === '/campaigns' || target === '/campaign' || target.startsWith('/campaigns/')) {
    return { view: 'campaigns' };
  }

  // Default to landing
  return { view: 'landing' };
}

/**
 * Navigate to a specific route and push to browser history
 */
export function navigateToRoute(view: AppView, slug?: string): string {
  if (typeof window === 'undefined') return '/';

  let targetUrl = '/';
  let pageTitle = 'Bamboozer AI Quant | Non-Custodial Multi-Asset Algorithmic Trading';

  if (view === 'sprint_challenge') {
    targetUrl = CANONICAL_ROUTES.sprintChallenge;
    pageTitle = 'Bamboozer 7-Day Trading Sprint Challenge - Season 04 ($1,140 USDT)';
  } else if (view === 'campaigns') {
    targetUrl = slug ? CANONICAL_ROUTES.campaignBySlug(slug) : CANONICAL_ROUTES.campaigns;
    pageTitle = 'Bamboozer Campaigns & Trading Leagues Hub';
  }

  try {
    // Push state so URL changes without reloading the page
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ view, slug }, pageTitle, targetUrl);
    }
    document.title = pageTitle;
  } catch (_) {
    // Fallback for sandboxed iframes that restrict history.pushState
    try {
      window.location.hash = targetUrl;
    } catch (_) {}
  }

  // Smoothly scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return targetUrl;
}

/**
 * Get full sharable absolute URL for a given campaign
 */
export function getAbsoluteCampaignUrl(slug: string = 'bamboozer-7day-sprint'): string {
  if (typeof window === 'undefined') return `/campaign/${slug}`;
  const origin = window.location.origin;
  return `${origin}/campaign/${slug}`;
}
