import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  Server, 
  Globe, 
  Layers,
  ArrowRight,
  Hash,
  Fingerprint
} from 'lucide-react';
import { useLanguage } from '../i18n';

export const BlockchainSecurityVisualizer: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const { t, tContent } = useLanguage();
  const [testSymbol, setTestSymbol] = useState<'BTC' | 'ETH' | 'SOL'>('BTC');
  const [signedHash, setSignedHash] = useState<string>('0x7d94e6fa89c021b3a65e94b210f823dc91e45b90321a8f94');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleSimulateExecution = (sym: 'BTC' | 'ETH' | 'SOL') => {
    setTestSymbol(sym);
    setIsVerifying(true);
    setTimeout(() => {
      const randomHex = Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setSignedHash(`0x${randomHex}`);
      setIsVerifying(false);
    }, 400);
  };

  return (
    <section className="py-20 bg-[#060910] border-t border-slate-800/80 relative overflow-hidden bg-grid-fintech" id="blockchain-security">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3 font-mono">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>{t('blockchainBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('blockchainTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('blockchainDescription')}
          </p>
        </div>

        {/* 4-Stage Cryptographic Pipeline Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Node 1: Client Enclave */}
          <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Key className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                  STAGE 01
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {t('securityStage1')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {tContent('security.1.description', 'API keys are encrypted in the browser with AES-256-GCM.')}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>{t('storageLabel')} Local IndexedDB</span>
              <span className="text-emerald-400 font-bold">Zero-Cloud Leak</span>
            </div>
          </div>

          {/* Node 2: Quant Math & Signal Engine */}
          <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  STAGE 02
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {t('securityStage2')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {tContent('security.2.description', 'AI processes millions of market data points and generates mathematical trade instructions.')}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>{t('processingLatency')} &lt; 15ms</span>
              <span className="text-cyan-400 font-bold">Confidence 84%</span>
            </div>
          </div>

          {/* Node 3: Cryptographic Order Signing */}
          <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Hash className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-400">
                  STAGE 03
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {t('securityStage3')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {tContent('security.3.description', 'Every order payload is cryptographically signed before transmission over TLS 1.3.')}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>{t('signatureStandard')} WebHook HMAC</span>
              <span className="text-teal-400 font-bold">Tamper-Proof</span>
            </div>
          </div>

          {/* Node 4: Exchange Zero-Withdrawal Enclave */}
          <div className="p-5 rounded-2xl bg-[#090e18] border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between shadow-lg shadow-emerald-500/5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  STAGE 04
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {t('securityStage4')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {tContent('security.4.description', 'Binance/OKX API keys permanently disable withdrawals (CanWithdraw = false).')}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>{t('withdrawalPermission')} 0x0</span>
              <span className="text-emerald-400 font-bold">{t('safe100')}</span>
            </div>
          </div>
        </div>

        {/* Live Cryptographic Interactive Terminal Simulator */}
        <div className="bg-[#090e18] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{t('terminalProof')}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">{t('chooseAsset')}</span>
              {(['BTC', 'ETH', 'SOL'] as const).map((sym) => (
                <button
                  key={sym}
                  onClick={() => handleSimulateExecution(sym)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                    testSymbol === sym
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sym}/USDT
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Terminal Left: JSON Payload & Hash */}
            <div className="lg:col-span-8 bg-[#04060b] rounded-xl p-4 font-mono text-[11px] border border-slate-800/90 leading-relaxed text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-900 mb-2">
                <span>ENCRYPTED_INTENT_DISPATCH.JSON</span>
                <span className="text-emerald-400">
                  {isVerifying ? t('calculating') : 'SHA-256 VERIFIED'}
                </span>
              </div>
              <pre className="text-emerald-400/90">
{`{
  "protocol": "BAMBOOZER_ZERO_CUSTODY_V3",
  "client_enclave_id": "enclave_usr_99812401",
  "pair": "${testSymbol}/USDT",
  "action": "QUANT_BUY_LIMIT",
  "confidence_score": 0.84,
  "leverage": "1x_SPOT",
  "allow_withdrawal": false,
  "signature_sha256": "${signedHash}"
}`}
              </pre>
            </div>

            {/* Terminal Right: Cryptographic Guarantees Checklist */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-[11px]">{t('noCash')}</strong>
                    <span className="text-[11px] text-slate-400">{tContent('terminal.noCashDescription', 'Bamboozer không có ví nạp, không giữ private key rút tiền.')}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-[11px]">{t('disconnectControl')}</strong>
                    <span className="text-[11px] text-slate-400">{tContent('terminal.disconnectDescription', 'Xóa API Key trên sàn của bạn sẽ vô hiệu hóa toàn bộ lệnh ngay tức thì.')}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-[11px]">{t('realtimeAudit')}</strong>
                    <span className="text-[11px] text-slate-400">{tContent('terminal.auditDescription', 'Mọi lệnh khớp xuất hiện trực tiếp trên ứng dụng sàn của bạn.')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>{t('firstConnection')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
