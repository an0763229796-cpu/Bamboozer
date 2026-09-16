import React, { useState } from 'react';
import { 
  Play, 
  Coins, 
  Menu, 
  X, 
  ArrowRight,
  Gift,
  Mail
} from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenReferral: () => void;
  onOpenVideoDemo: () => void;
  onOpenContact: () => void;
  userCredits: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenReferral,
  onOpenVideoDemo,
  onOpenContact,
  userCredits
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined concise navigation labels that never crowd the bar
  const navLinks = [
    { name: 'Bảo Mật', href: '#pillars' },
    { name: 'Tính Năng', href: '#modules' },
    { name: 'Sàn Giao Dịch', href: '#integrations' },
    { name: 'Bảng Giá', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      id="main-navbar"
      className="bg-[#080c14]/95 backdrop-blur-md border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group select-none" 
            id="brand-logo-link"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md shadow-emerald-500/20 group-hover:border-emerald-400/60 group-hover:shadow-emerald-500/40 transition-all shrink-0 bg-[#0d131f]">
              <img
                src="/logo.jpg"
                alt="Bamboozer Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                  Bamboozer
                </span>
                <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  AI Quant
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block whitespace-nowrap leading-none mt-0.5">
                Non-Custodial Multi-Asset
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Free Credits Wallet Badge */}
            <div 
              onClick={onOpenRegister}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 cursor-pointer hover:bg-emerald-500/20 transition-all shrink-0 whitespace-nowrap"
              title="Ví Credits của bạn - Bấm để nhận thêm"
            >
              <Coins className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Ví:</span>
              <span className="font-mono font-bold text-emerald-300">{userCredits}</span>
              <span className="text-[10px] text-emerald-400/90 uppercase font-mono">CR</span>
            </div>

            {/* Contact Trigger */}
            <button
              id="btn-contact-nav"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shrink-0 whitespace-nowrap"
              title="Gửi email liên hệ trực tiếp"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Liên Hệ</span>
            </button>

            {/* Referral Link Trigger (visible on xl+) */}
            <button
              id="btn-referral-nav"
              onClick={onOpenReferral}
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer shrink-0 whitespace-nowrap"
              title="Chia sẻ link giới thiệu nhận 100 credits"
            >
              <Gift className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Giới Thiệu</span>
              <span className="bg-cyan-400/20 text-cyan-300 text-[10px] px-1 rounded font-mono font-bold">+100</span>
            </button>

            {/* Primary Register CTA */}
            <a
              id="btn-register-nav"
              href="https://www.bamboozer.com/register?ref=81"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Đăng Ký</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Mobile / Tablet Menu Button (shown below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors shrink-0 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800/90 bg-[#0c121e]/98 backdrop-blur-lg rounded-b-2xl mt-1 px-4 shadow-2xl">
            <div className="flex flex-col gap-1.5 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-200 hover:text-emerald-400 py-2 px-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReferral();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Gift className="w-4 h-4 text-cyan-400" />
                <span>Link Giới Thiệu (+100 Credits / Bạn bè)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Liên Hệ Trực Tiếp (Gửi Email)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVideoDemo();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Xem Video Demo 3 Phút</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
              >
                <span>Bắt đầu ngay • Nhận 100 Credits Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
