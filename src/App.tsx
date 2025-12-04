import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import finalsData from './data/hackathon_finals.json';
import finalsNamedData from './data/hackathon_final.json';
import hightecourseLogo from './assets/hackaton2.png';

interface Feedback {
  name?: string;
  time: string;
  email: string;
  fullName: string;
  appLink: string;
  short: string;
  reason: string;
  help: string;
  tool: string;
}

interface FinalProject extends Feedback {
  id: string;
  projectName: string;
}

const finalsProjects = finalsData as Feedback[];
const finalsNamedProjects = finalsNamedData as (Feedback & { name?: string })[];

const deriveProjectName = (short: string, fallbackIndex: number) => {
  if (!short) {
    return `פרויקט ${fallbackIndex + 1}`;
  }

  const firstLine = short
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)[0];

  const raw = firstLine || short.trim();
  const firstSentence = raw.split(/[.!?]/)[0] || raw;
  const normalized = firstSentence.replace(/\s+/g, ' ').trim();

  if (normalized.length > 70) {
    return `${normalized.slice(0, 67)}...`;
  }

  return normalized || `פרויקט ${fallbackIndex + 1}`;
};

const getProjectId = (project: Feedback, index: number) => {
  return `final-${index + 1}`;
};

const projectsWithIds: FinalProject[] = finalsProjects.map((project, index) => {
  const named = finalsNamedProjects[index];
  const projectName = (named?.name && named.name.trim()) || deriveProjectName(project.short, index);

  return {
    ...project,
    id: getProjectId(project, index),
    projectName,
  };
});

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden flex flex-col items-center text-center px-4 pt-16 pb-14">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-300/40 via-blue-200/30 to-transparent blur-3xl" />
        <div className="absolute right-[-10%] top-0 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/40 via-blue-200/30 to-transparent blur-3xl" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-300/30 via-sky-200/30 to-transparent blur-3xl" />
        <div className="absolute right-16 bottom-6 h-40 w-40 rounded-full bg-gradient-to-br from-amber-300/30 via-orange-200/30 to-transparent blur-3xl" />
      </div>
      <div className="relative container mx-auto max-w-5xl flex flex-col items-center gap-6">
        <div className="drop-shadow-2xl">
          <img
            src={hightecourseLogo}
            alt="לוגו האקתון ההייטקורס"
            className="h-72 md:h-96 w-auto object-contain animate-float mx-auto"
          />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold font-sans text-[#f0c419] drop-shadow-lg tracking-tight">האקתון ההייטקורס 2025</h1>
        <p className="text-2xl font-semibold text-orange-200">בונים. מציגים. זוכים!</p>
        <p className="text-lg max-w-3xl text-slate-100/90 leading-relaxed">
          האקתון של ההייטקורס כבר כאן — קצר, כיפי, מקצועי ומתאים בדיוק לך. עם פרסים שווים במיוחד!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => navigate('/finals')}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white px-6 py-3 text-base font-semibold shadow-lg hover:bg-white/15 transition-all duration-200"
          >
            <span aria-hidden>🏆</span> הפרויקטים העולים לגמר
          </button>
        </div>
      </div>
    </section>
  );
};

const FinalsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden flex-shrink-0 min-h-screen flex items-center pb-10">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/30 via-amber-200/30 to-transparent blur-3xl" />
        <div className="absolute right-[-10%] top-10 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300/30 via-orange-200/30 to-transparent blur-3xl" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200/30 via-amber-200/30 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur">
            <span aria-hidden>🏅</span>
            הנה 8 הפרויקטים שעולים לגמר
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-center mt-4 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 drop-shadow-lg">
            פרויקטי הגמר
          </h2>
        </div>

        <div className="grid gap-5 grid-cols-4 grid-rows-2 max-w-6xl mx-auto">
          {projectsWithIds.map(project => (
            <button
              type="button"
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="relative rounded-3xl bg-gradient-to-b from-white/95 via-orange-50/90 to-amber-50/90 border border-orange-100 shadow-xl text-left rtl:text-right transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white text-orange-700 px-3 py-1 text-xs font-semibold border border-orange-200 shadow-sm">
                  <span aria-hidden>🏅</span>
                  עולה לגמר
                </div>
                <img src={hightecourseLogo} alt="לוגו האקתון" className="h-6 w-auto object-contain drop-shadow" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight line-clamp-2">{project.projectName}</h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-800">
                  <div className="h-8 w-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-base font-bold text-orange-700 shadow-inner">
                    <span aria-hidden>👩‍💻</span>
                  </div>
                  <div className="text-lg text-orange-900 leading-tight">{project.fullName}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projects = projectsWithIds;
  const [currentIndex, setCurrentIndex] = useState(() => {
    const found = projects.findIndex(item => item.id === projectId);
    return found >= 0 ? found : 0;
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!projectId) return;
    const found = projects.findIndex(item => item.id === projectId);
    if (found >= 0) {
      setCurrentIndex(found);
    }
  }, [projectId, projects]);

  useEffect(() => {
    if (!projectId && projects.length) {
      navigate(`/projects/${projects[currentIndex].id}`, { replace: true });
    }
  }, [projectId, projects, currentIndex, navigate]);

  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderSection = (label: string, text: string, sectionKey: string) => {
    if (!text || text.trim() === '') {
      return null;
    }

    const estimatedLines = Math.ceil(text.length / 50);
    const isLong = estimatedLines > 4;
    const isExpanded = expandedSections[sectionKey];
    const shouldClamp = isLong && !isExpanded;

    return (
      <div className="card-section relative flex flex-col gap-3 bg-gradient-to-br from-white to-orange-50 p-4 rounded-2xl border border-orange-100">
        <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">{label}</div>
        <div className="relative flex-1">
          <p className={`text-slate-800 leading-relaxed ${shouldClamp ? 'line-clamp-4' : ''}`}>{text}</p>
          {shouldClamp && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-orange-100/90 via-orange-50/60 to-transparent" />
          )}
        </div>
        {isLong && (
          <button
            onClick={() => toggleSectionExpand(sectionKey)}
            className="self-start text-sm font-semibold text-orange-700 hover:text-orange-900 transition-colors duration-200 mt-2"
          >
            {isExpanded ? 'הצג פחות' : 'קרא עוד'}
          </button>
        )}
      </div>
    );
  };

  const currentProject = useMemo(() => {
    if (!projects.length) return null;
    return projects[currentIndex];
  }, [currentIndex, projects]);

  const currentCardId = currentProject ? currentProject.id : '';

  return (
    <div className="relative overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-300/40 via-blue-200/30 to-transparent blur-3xl" />
        <div className="absolute right-[-10%] top-10 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/40 via-blue-200/30 to-transparent blur-3xl" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-300/30 via-sky-200/30 to-transparent blur-3xl" />
      </div>
      <div className="absolute left-4 top-4 z-20">
        <img
          src={hightecourseLogo}
          alt="לוגו הייטקורס"
          className="h-16 md:h-20 w-auto object-contain drop-shadow-xl"
        />
      </div>
      <div className="absolute right-4 top-4 z-20">
        <button
          onClick={() => navigate('/finals')}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 text-orange-800 px-4 py-2 text-sm font-semibold shadow-lg hover:bg-white transition border border-orange-200"
        >
          <span aria-hidden>🏆</span> חזרה לפרויקטי הגמר
        </button>
      </div>
      <div className="container mx-auto px-4 py-8 relative text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 drop-shadow-lg">
          הפרויקטים של ההאקתון
        </h2>
        <p className="text-lg text-orange-100/90 max-w-3xl mx-auto">
          דפדפו בין האפליקציות שבנו הסטודנטיות שלנו במהלך ההאקתון וגלו מה הן יצרו בזמן קצר ומרוכז.
        </p>
      </div>

      <div className="container mx-auto px-4 pb-10 lg:overflow-hidden overflow-visible relative">
        <div className="relative max-w-6xl mx-auto h-full">
          {currentProject && (
            <div
              key={`${currentProject.id}-${currentIndex}`}
              className="group rounded-3xl bg-gradient-to-b from-white via-orange-50 to-amber-50 border border-orange-200 overflow-hidden shadow-2xl animate-fade-in h-full flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid gap-6 lg:grid-cols-[320px,1fr] flex-1 overflow-hidden">
                  <div className="order-2 lg:order-1 flex flex-col h-full">
                    <div className="flex flex-col gap-4 mb-6">
                      <div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
                          {currentProject.fullName}
                        </h3>
                        {currentProject.tool && (
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-orange-700 border border-orange-200">
                            <span className="inline-flex h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                            נבנה באמצעות {currentProject.tool}
                          </div>
                        )}
                        <div className="mt-3 flex flex-col gap-1">
                          <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">שם הפרויקט</span>
                          <div className="text-2xl font-bold text-slate-900 leading-tight">{currentProject.projectName}</div>
                        </div>
                      </div>
                      {currentProject.appLink && (
                        <button
                          onClick={() => window.open(currentProject.appLink, '_blank', 'noopener,noreferrer')}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 py-3 text-base font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 self-start"
                        >
                          <span aria-hidden>🔗</span> צפייה בפרויקט
                        </button>
                      )}
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto">
                      {renderSection('תקציר קצר על הפרויקט', currentProject.short, `${currentCardId}-short`)}
                      {renderSection("למה דווקא הוא עלה לגמר", currentProject.reason, `${currentCardId}-reason`)}
                      {renderSection("איך זה יעזור לג'וניורית בצעד הראשון?", currentProject.help, `${currentCardId}-help`)}
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 h-full">
                    <div className="relative bg-gradient-to-br from-white via-orange-50 to-amber-50 p-4 rounded-3xl shadow-2xl h-full flex flex-col border border-orange-200">
                      {currentProject.appLink ? (
                        <div className="relative w-full flex-1 overflow-hidden rounded-3xl border border-orange-200 shadow-xl bg-white">
                          <iframe
                            src={currentProject.appLink}
                            title={`תצוגה חיה של הפרויקט של ${currentProject.fullName}`}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                            allowFullScreen
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-orange-200/70 via-orange-100/30 to-transparent" />
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-amber-100/70 via-orange-50/30 to-transparent" />
                          <div className="absolute left-4 right-4 bottom-4 flex flex-wrap items-center gap-3 justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/90 px-4 py-2 text-sm text-white border border-orange-200 backdrop-blur">
                              <span className="inline-flex h-2 w-2 rounded-full bg-white animate-pulse" aria-hidden />
                              תצוגה חיה מתוך ההאקתון | טעינה עשויה לקחת כמה שניות
                            </div>
                            <button
                              onClick={() => window.open(currentProject.appLink, '_blank', 'noopener,noreferrer')}
                              className="inline-flex items-center gap-2 rounded-full bg-white text-orange-700 px-4 py-2 text-sm font-semibold shadow-lg hover:scale-105 transition border border-orange-200"
                            >
                              <span aria-hidden>🡥</span> פתיחה בחלון חדש
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-orange-200 bg-orange-50 text-orange-700 shadow-inner">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-5xl">⌛</div>
                          <p className="text-xl text-center">הדגמה של הפרויקט תעלה לכאן בקרוב</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <div
        dir="rtl"
        className="min-h-screen overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-[#004a8f] via-[#0d67b8] to-[#00356e] text-slate-100 flex flex-col relative"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/finals" element={<FinalsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectsPage />} />
        </Routes>

       
      </div>
    </HashRouter>
  );
}

export default App;
