import React, { useState } from 'react';
import { Lock, X, ArrowRight, KeyRound, ShieldAlert } from 'lucide-react';

interface AdminGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminGatewayModal: React.FC<AdminGatewayModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '8888') {
      onSuccess();
      onClose();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl w-full max-w-sm p-6 relative text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-center mb-1">Cổng Quản Trị Giải Đấu</h3>
        <p className="text-xs text-slate-400 text-center mb-6">
          Dành riêng cho Ban Tổ Chức Bamboozer. Nhập mã PIN <code className="text-amber-400 font-mono">8888</code> để mở khóa.
        </p>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
            Mã PIN không chính xác. Thử lại (8888).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">MÃ PIN TRUY CẬP</label>
            <input
              type="password"
              maxLength={6}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-[#05080e] border border-slate-800 focus:border-amber-500 rounded-xl py-3 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-mono font-bold text-xs text-black bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>MỞ KHÓA ADMIN PANEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
