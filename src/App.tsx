import { useState, useEffect, useMemo } from 'react';
import feedbacksData from './data/feedback.json';
import mabrukLogo from './assets/mabruk-logo.png';
import abrahemLogo from './assets/abrahem-logo.jpg';

interface Feedback {
  time: string;
  email: string;
  fullName: string;
  sprint: string;
  appLink: string;
  feeling: string;
  benefit: string;
  recomendation: string;
  proud: string;
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});


  useEffect(() => {
    // Load feedbacks from the imported JSON file and shuffle them randomly
    const shuffledFeedbacks = [...feedbacksData].sort(() => Math.random() - 0.5);
    setFeedbacks(shuffledFeedbacks);
  }, []);

  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderSection = (
    label: string,
    text: string,
    sectionKey: string,
  ) => {
    // Don't render if text is empty or just whitespace
    if (!text || text.trim() === '') {
      return null;
    }

    // Count lines by splitting text and estimating 4 lines = ~200 characters
    const estimatedLines = Math.ceil(text.length / 50);
    const isLong = estimatedLines > 4;
    const isExpanded = expandedSections[sectionKey];
    const shouldClamp = isLong && !isExpanded;

    return (
      <div className="card-section relative flex flex-col gap-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-2xl border border-white/10">
        <div className="text-sm font-semibold text-purple-200 uppercase tracking-wide">{label}</div>
        <div className="relative flex-1">
          <p className={`text-slate-100 leading-relaxed ${shouldClamp ? 'line-clamp-4' : ''}`}>
            {text}
          </p>
          {shouldClamp && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900/90 to-transparent" />
          )}
        </div>
        {isLong && (
          <button
            onClick={() => toggleSectionExpand(sectionKey)}
            className="self-start text-sm font-semibold text-purple-300 hover:text-white transition-colors duration-200 mt-2"
          >
            {isExpanded ? 'הצג פחות ↑' : 'קרא עוד ↓'}
          </button>
        )}
      </div>
    );
  };

  const currentFeedback = useMemo(() => {
    if (!feedbacks.length) return null;
    return feedbacks[currentIndex];
  }, [currentIndex, feedbacks]);

  const currentCardId = currentFeedback ? `${currentFeedback.email}-${currentFeedback.time}` : '';

  const handleNext = () => {
    if (!feedbacks.length) return;
    setCurrentIndex(prev => (prev + 1) % feedbacks.length);
  };

  const handlePrev = () => {
    if (!feedbacks.length) return;
    setCurrentIndex(prev => (prev - 1 + feedbacks.length) % feedbacks.length);
  };



  return (
    <div dir="rtl" className="min-h-screen overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white flex flex-col relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-400/10 to-transparent blur-3xl" />
          <div className="absolute right-[-10%] top-10 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400/20 via-sky-300/10 to-transparent blur-3xl" />
          <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400/10 via-indigo-400/10 to-transparent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-8 relative">
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-sky-300">
            מסע פיתוח פרויקט FullStack
          </h1>
          <p className="text-lg text-center mb-6 text-indigo-100/80">
            גלו את החוויות המעצבות של המפתחות המוכשרות שלנו
          </p>
        </div>
      </div>

      {/* Feedback Carousel */}
      <div className="container mx-auto px-4 pb-6 flex-1 lg:overflow-hidden overflow-visible">
        <div className="relative max-w-6xl mx-auto h-full">
          {currentFeedback && (
            <div
              key={`${currentFeedback.email}-${currentFeedback.time}-${currentIndex}`}
              className="group rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 overflow-hidden shadow-2xl animate-fade-in h-full flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid gap-6 lg:grid-cols-[320px,1fr] flex-1 overflow-hidden">
                  {/* Right Side - Cards */}
                  <div className="order-2 lg:order-1 flex flex-col h-full">
                    {/* Student Name and View Button - Above Cards */}
                    <div className="flex flex-col gap-4 mb-6">
                      <div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-sky-300 bg-clip-text text-transparent drop-shadow-2xl">
                          {currentFeedback.fullName}
                        </h3>
                      </div>
                      {currentFeedback.appLink && (
                        <button
                          onClick={() => window.open(currentFeedback.appLink, '_blank', 'noopener,noreferrer')}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-base font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 self-start"
                        >
                          <span aria-hidden>👀</span> צפייה מלאה
                        </button>
                      )}
                    </div>

                    {/* Cards Container */}
                    <div className="space-y-6 flex-1 overflow-y-auto">
                      {renderSection('מה זה תרם לי', currentFeedback.benefit, `${currentCardId}-benefit`)}
                      {renderSection('הישג שאני גאה בו במיוחד', currentFeedback.proud, `${currentCardId}-proud`)}
                    </div>

                    {/* Navigation Controls - Fixed at Bottom */}
                    <div className="flex justify-center mt-6 pt-4 flex-shrink-0">
                      <div className="flex gap-4">
                        <button
                          onClick={handlePrev}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 shadow-lg transition-all duration-200 hover:scale-105 text-lg font-medium"
                        >
                          <span className="text-xl">←</span>
                          הקודם
                        </button>
                        <button
                          onClick={handleNext}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-indigo-900 font-semibold shadow-lg hover:scale-105 transition-all duration-200 text-lg"
                        >
                          הבא
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Left Side - Project Preview */}
                  <div className="order-1 lg:order-2 h-full">
                    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 p-4 rounded-3xl shadow-2xl h-full flex flex-col">
                      {currentFeedback.appLink ? (
                        <div className="relative w-full flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-xl bg-slate-950">
                          <iframe
                            src={currentFeedback.appLink}
                            title={`תצוגה חיה של ${currentFeedback.fullName}`}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                            allowFullScreen
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-indigo-950/80 via-indigo-900/40 to-transparent" />
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-transparent" />
                          <div className="absolute left-4 right-4 bottom-4 flex flex-wrap items-center gap-3 justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-950/80 px-4 py-2 text-sm text-indigo-50 border border-white/10 backdrop-blur">
                              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                              תצוגה חיה — ניתן לשחק וללחוץ בתוך האפליקציה
                            </div>
                            <button
                              onClick={() => window.open(currentFeedback.appLink, '_blank', 'noopener,noreferrer')}
                              className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-900 px-4 py-2 text-sm font-semibold shadow-lg hover:scale-105 transition"
                            >
                              <span aria-hidden>🚀</span> פתיחה בחלון חדש
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 text-indigo-100 shadow-inner">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-5xl">🖼️</div>
                          <p className="text-xl text-center">אין קישור זמין להצגת פרויקט</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>


              </div>
            </div>
          )}

          {/* Status Info */}
          <div className="mt-4 flex items-center justify-center flex-shrink-0">

          </div>
        </div>
      </div>

      {/* Logos positioned at bottom left */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-10">
        <div className="w-48 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300 bg-white p-2">
          <img
            src={mabrukLogo}
            alt="Ma.Bruk Logo"
            className="w-full h-auto object-contain filter drop-shadow-lg"
          />
        </div>
        <div className="w-48 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300">
          <img
            src={abrahemLogo}
            alt="Abrahem Logo"
            className="w-full h-auto object-contain filter drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
