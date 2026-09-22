import React from 'react';
import {
  Trophy,
  Layers,
  LineChart,
  Award,
  User,
  Shield,
  Activity,
  Menu,
  X,
  Flame,
} from 'lucide-react';

export type AppView =
  | 'campaigns_hub'
  | 'sprint_challenge'
  | 'leaderboard_only'
  | 'trader_dashboard'
  | 'admin_dashboard'
  | 'telemetry_view';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenRegister: () => void;
  onOpenAdminAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenRegister,
  onOpenAdminAuth,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems: { label: string; view: AppView; icon: any; badge?: string }[] = [
    { label: 'Tất Cả Chiến Dịch', view: 'campaigns_hub', icon: Layers, badge: 'MỚI' },
    { label: '7-Day Sprint Mùa 04', view: 'sprint_challenge', icon: Trophy, badge: 'HOT' },
    { label: 'Góc Trader Của Tôi', view: 'trader_dashboard', icon: User },
    { label: 'Telemetry (ref=81)', view: 'telemetry_view', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070b12]/95 backdrop-blur-md border-b border-slate-800 text-white font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('sprint_challenge')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C076] to-cyan-400 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#070b12] rounded-[10px] flex items-center justify-center">
              <span className="text-[#00C076] font-black text-lg">B</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#00C076] transition-colors">
                BAMBOOZER
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00C076]/20 text-[#00C076] font-bold">
                CHALLENGE
              </span>
            </div>
            <div className="text-[9px] text-slate-500 tracking-wider">QUANT TRADING LEAGUE</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-[#00C076] font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1 rounded ${
                      item.badge === 'HOT'
                        ? 'bg-amber-500/20 text-amber-400 font-bold'
                        : 'bg-emerald-500/20 text-emerald-400 font-bold'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Admin Gateway */}
          <button
            onClick={onOpenAdminAuth}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'admin_dashboard'
                ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900'
            }`}
            title="Cổng Ban Giám Sát (PIN: 8888)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Ban Giám Sát</span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00C076] hover:bg-[#00d684] shadow-md shadow-[#00C076]/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>GHI DANH $1,140</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-400 hover:text-white p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0c121e] border-b border-slate-800 px-4 py-4 space-y-2 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  isActive ? 'bg-slate-800 text-[#00C076] font-bold' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              onOpenAdminAuth();
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 text-amber-400"
          >
            <Shield className="w-4 h-4" />
            <span>Cổng Ban Giám Sát (Admin)</span>
          </button>

          <button
            onClick={() => {
              onOpenRegister();
              setMobileOpen(false);
            }}
            className="w-full mt-2 py-3 rounded-xl font-bold text-center text-black bg-[#00C076] cursor-pointer"
          >
            GHI DANH TRANH GIẢI $1,140
          </button>
        </div>
      )}
    </header>
  );
};
