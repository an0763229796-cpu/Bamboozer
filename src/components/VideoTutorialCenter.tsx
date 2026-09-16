import React, { useState } from 'react';
import { VIDEO_TUTORIALS } from '../data/content';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Clock, 
  CheckCircle2, 
  ListOrdered, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { VideoTutorial } from '../types';

export const VideoTutorialCenter: React.FC<{ 
  onOpenRegister: () => void;
  onOpenQuickGuide: (id: string) => void;
}> = ({ onOpenRegister, onOpenQuickGuide }) => {
  const [activeVideoId, setActiveVideoId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(35);

  const activeVideo: VideoTutorial = VIDEO_TUTORIALS.find((v) => v.id === activeVideoId) || VIDEO_TUTORIALS[0];

  const handleSelectVideo = (id: number) => {
    setActiveVideoId(id);
    setIsPlaying(true);
    setVideoProgress(15);
  };

  return (
    <section className="py-24 bg-[#080c14] border-t border-slate-800/80 relative" id="tutorials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bamboozer Academy &amp; Masterclass</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Trung Tâm Video Hướng Dẫn Tính Năng
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Học cách làm chủ toàn bộ nền tảng chỉ trong 15 phút với bộ video trực quan, có thuyết minh chi tiết từng bước cho người mới và trader chuyên nghiệp.
          </p>
        </div>

        {/* Video Player + Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Screen (Left 7 cols) */}
          <div className="lg:col-span-7 bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Simulated Video Player Box */}
            <div className="relative aspect-video bg-[#05080f] flex items-center justify-center overflow-hidden group">
              {/* Decorative Screen Grid & Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

              {/* Dynamic Video Mockup Content depending on video */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-0">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 text-emerald-400 border border-emerald-500/30">
                    BAMBOOZER HD TUTORIAL #{activeVideo.id}
                  </span>
                  <span>{activeVideo.category}</span>
                </div>

                {/* Simulated Visual Presentation */}
                <div className="text-center my-auto">
                  <div className="inline-block p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
                    <Sparkles className="w-8 h-8 mx-auto" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white max-w-md mx-auto mb-2">
                    {activeVideo.vietnameseTitle}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono">
                    Độ dài: {activeVideo.duration} • Thuyết minh chuẩn Studio
                  </p>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Chương hiện tại: {activeVideo.chapters[1]?.title || 'Tổng quan'}</span>
                  <span className="text-emerald-400">1080p 60FPS</span>
                </div>
              </div>

              {/* Play/Pause Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-20 w-16 h-16 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/40 transition-transform group-hover:scale-110 cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-slate-950" />
                ) : (
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                )}
              </button>

              {/* Video Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent z-20 flex flex-col gap-2">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">
                      01:15 / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      Auto Next
                    </span>
                    <Maximize2 className="w-4 h-4 cursor-pointer text-slate-400 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details & Key Takeaways Below Player */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {activeVideo.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {activeVideo.vietnameseTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {activeVideo.description}
              </p>

              {/* Key Takeaways */}
              <div className="bg-[#080c14] rounded-xl p-4 border border-slate-800/80 mb-5">
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Điểm mấu chốt sau video này:</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {activeVideo.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenRegister}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Thực hành ngay với 100 Credits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Playlist Selector (Right 5 cols) */}
          <div className="lg:col-span-5 bg-[#0c121e] border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase">
                <ListOrdered className="w-4 h-4 text-emerald-400" />
                <span>Danh Sách 5 Video Hướng Dẫn</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Tổng: ~20 phút
              </span>
            </div>

            <div className="space-y-2.5">
              {VIDEO_TUTORIALS.map((video) => {
                const isActive = video.id === activeVideoId;
                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                        : 'bg-[#080c14] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isActive ? <Play className="w-4 h-4 fill-slate-950 ml-0.5" /> : `0${video.id}`}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="truncate">{video.category}</span>
                        <span className="font-mono text-emerald-400 shrink-0 ml-2">{video.duration}</span>
                      </div>
                      <div
                        className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isActive ? 'text-emerald-300' : 'text-white'
                        }`}
                      >
                        {video.vietnameseTitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chapters breakdown of currently selected video */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-2">
                Các mốc thời gian (Chapters):
              </div>
              <div className="space-y-1.5 text-[11px] font-mono">
                {activeVideo.chapters.map((ch, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors">
                    <span className="truncate">{ch.title}</span>
                    <span className="text-emerald-400 shrink-0 ml-2">{ch.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
