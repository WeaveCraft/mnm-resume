import { useState, useRef, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import BuffIcon from '../components/BuffIcon';
import AbilitySlot from '../components/AbilitySlot';
import IntroSplash from '../components/IntroSplash';
import UnityOverlay from '../components/UnityPlayer';
import DungeonScene from '@/components/DungeonScene';

const UnityIcon = (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z" />
  </svg>
);

const PLAYER_CHATTER = [
  { name: 'Thundrik', msg: 'Does anyone know where the fighter trainer is?' },
  { name: 'Lyranis', msg: 'Looking for the inquisitor trainer, can anyone point me the right way?' },
  { name: 'Grimbold', msg: 'Anyone want to group up for the Abyss dungeon?' },
  { name: 'Selphina', msg: 'Selling Runed Mithril Bracelet, send tell with offer.' },
  { name: 'Arxius', msg: 'How do I get to the Deadlands from here?' },
  { name: 'Veylith', msg: 'Our guild is recruiting healers, PST if interested!' },
];

const TABS = [
  { id: 'inventory', label: 'Inventory' },
  { id: 'factions', label: 'Factions' },
  { id: 'faiths', label: 'Faiths' },
  { id: 'ledger', label: 'Ledger' },
  { id: 'guild', label: 'Guild' },
  { id: 'social', label: 'Social' },
];

export default function CharacterSheet() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');
  const [personaOpen, setPersonaOpen] = useState(true);
  const [personaAnimDone, setPersonaAnimDone] = useState(true);
  const [openBag, setOpenBag] = useState<string | null>(null);
  const [selectedFaith, setSelectedFaith] = useState(0);

  // Job application hand-in animation state
  const [isDraggingNote, setIsDraggingNote] = useState(false);
  const [showHandInDialog, setShowHandInDialog] = useState(false);
  const [noteHandedIn, setNoteHandedIn] = useState(false);
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const noteRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [noteAnimPos, setNoteAnimPos] = useState<{ x: number; y: number } | null>(null);

  const handleNoteClick = useCallback(() => {
    if (noteHandedIn) {
      setInteractionLog(prev => {
        if (prev.length > 0 && prev[prev.length - 1] === 'You have already handed in the Formal Note.') return prev;
        return [...prev, 'You have already handed in the Formal Note.'];
      });
      return;
    }

    if (isDraggingNote || showHandInDialog) return;

    // Get positions for animation
    const noteEl = noteRef.current;
    const portraitEl = portraitRef.current;
    if (!noteEl || !portraitEl) {
      setShowHandInDialog(true);
      return;
    }

    const noteRect = noteEl.getBoundingClientRect();
    const portraitRect = portraitEl.getBoundingClientRect();

    // Clear previous messages and start fresh
    setInteractionLog(['You pick up the Formal Note...']);

    // Start position (note location)
    setNoteAnimPos({
      x: noteRect.left + noteRect.width / 2,
      y: noteRect.top + noteRect.height / 2,
    });
    setIsDraggingNote(true);

    // Animate note flying to portrait, then open dialog
    setTimeout(() => {
      setNoteAnimPos({
        x: portraitRect.left + portraitRect.width / 2,
        y: portraitRect.top + portraitRect.height / 2,
      });
    }, 50);

    setTimeout(() => {
      setIsDraggingNote(false);
      setNoteAnimPos(null);
      setShowHandInDialog(true);
      setInteractionLog(prev => [...prev, 'You approach Shawn and offer the note...']);
    }, 700);
  }, [noteHandedIn, isDraggingNote, showHandInDialog]);

  const handleHandInComplete = useCallback((experience?: number, npcMessage?: string) => {
    setShowHandInDialog(false);
    setNoteHandedIn(true);
    setInteractionLog(prev => [
      ...prev,
      'You have given Formal Note: Unity Job Application to Shawn.',
      `Shawn says, "${npcMessage || "I'll review this with great interest. Your dedication is impressive."}"`,
      `You have gained ${experience || 100} experience!`,
    ]);
  }, []);

  // Ambient player chatter — random players asking about trainers
  useEffect(() => {
    const usedIndices = new Set<number>();
    const timers: ReturnType<typeof setTimeout>[] = [];

    const scheduleNext = (delay: number) => {
      const timer = setTimeout(() => {
        const available = PLAYER_CHATTER
          .map((c, i) => ({ ...c, i }))
          .filter(c => !usedIndices.has(c.i));
        if (available.length === 0) return;

        const pick = available[Math.floor(Math.random() * available.length)];
        usedIndices.add(pick.i);

        setInteractionLog(prev => [
          ...prev,
          `${pick.name} says out of character, "${pick.msg}"`,
        ]);

        // Schedule next message 45–120 seconds later
        scheduleNext(45000 + Math.random() * 75000);
      }, delay);
      timers.push(timer);
    };

    // First message appears 20–60 seconds in (well within 5 minutes)
    scheduleNext(20000 + Math.random() * 40000);

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  const character = {
    name: 'Encrypted',
    race: 'Scandinavian Unity Enchanter',
    class: 'IT Architect | Unity Programmer (Aspiring)',
    level: 32,
    alignment: 'Agnostic',
    title: 'The Infrastructure Keeper & Game Dev Apprentice',
    guild: 'ID North (Current) | Seeking: Monsters & Memories Guild',
  };

  // Stats as game-style numbers (like the M&M screenshot: 18-29 range)
  const stats = [
    { abbr: 'STR', value: 29, full: 'Strength', description: 'C# mastery & backend power', details: ['Software Development education in Sweden', '6+ months professional development', 'Built complex full-stack applications', 'Deep OOP & Entity Framework proficiency'] },
    { abbr: 'STA', value: 29, full: 'Stamina', description: 'Work ethic & dedication', details: ['Working full-time as IT Architect while pursuing game dev passion', 'Led enterprise IAM project at Swedish government organization', 'Grafana monitoring saved production from storage crisis', 'Set up entire database infrastructure (Test, UAT, ACC, PROD)', 'Solo developer on complex integration projects', 'Built full-stack health management platform from scratch while learning new tech stack', 'Never gives up on debugging (even production incidents)', 'Learning Unity Netcode in spare time to be ready for M&M'] },
    { abbr: 'AGI', value: 26, full: 'Agility', description: 'Learning speed & adaptability', details: ['Studied software development in Sweden', 'Mastered React, Angular & TypeScript rapidly', 'Currently learning Unity in spare time', 'Quick to adopt new frameworks'] },
    { abbr: 'DEX', value: 29, full: 'Dexterity', description: 'Versatility across tech stacks', details: ['Backend: C#, .NET, ASP.NET Core', 'Frontend: React, Angular, Blazor, TypeScript', 'Databases: SQL Server, PostgreSQL', 'Tools: Docker, Git, VS Code'] },
    { abbr: 'INT', value: 18, full: 'Intelligence', description: 'Problem-solving & system design', details: ['Architected scalable client-server systems', 'Designed RESTful APIs from scratch', 'Database optimization & query tuning', 'Strategic technical decision-making'] },
    { abbr: 'WIS', value: 26, full: 'Wisdom', description: 'Best practices & code quality', details: ['Professional Git workflows', 'CI/CD pipeline implementation', 'Test-driven development (xUnit)', 'SOLID design patterns'] },
    { abbr: 'CHA', value: 18, full: 'Charisma', description: 'Communication & teamwork', details: ['Agile team environments', 'Clear technical communication', 'Daily stand-ups & code reviews', 'Mentored junior developers'] },
  ];

  // Resistances matching the game screenshot layout
  const resistances = [
    { abbr: 'Cold', value: 100, full: 'Legacy Code Resistance' },
    { abbr: 'Corr', value: 100, full: 'Bug Fixing Resistance' },
    { abbr: 'Dis',  value: 100, full: 'Scope Creep Resistance' },
    { abbr: 'Elec', value: 100, full: 'New Tech Adoption' },
    { abbr: 'Fire', value: 100, full: 'Deadline Resistance' },
    { abbr: 'Holy', value: 0,   full: 'Management Resistance' },
    { abbr: 'Mag',  value: 100, full: 'Refactoring Resistance' },
    { abbr: 'Poi',  value: 100, full: 'Technical Debt Resistance' },
  ];

  // Equipment positioned around character (matching M&M game slots)
  // Top: Ear(L), Neck, Head, Face, Ear(R)
  // Left: Chest, Arms, Wrist(L), Belt, Finger(L), Legs
  // Right: Cape, Shoulders, Wrist(R), Hands, Finger(R), Boots
  // Bottom: Primary, Secondary, Range, Ammo
  const equipment = {
    // Top row
    ear1:      { name: 'Agile',        icon: '\u25C8', type: 'Artifact' as const, description: 'Sprint methodology mastery', stats: ['+35 Team Velocity', '+30 Adaptability'] },
    neck:      { name: 'CI/CD',        icon: '\u2662', type: 'Tool' as const, description: 'Continuous integration pipeline', stats: ['+40 Automation', '+30 Deployment'] },
    head:      { name: 'Architecture', icon: '\u2655', type: 'Armor' as const, description: 'System design & architecture thinking', stats: ['+45 Design Patterns', '+35 Scalability'] },
    face:      { name: 'Git',          icon: '\u2318', type: 'Tool' as const, description: 'Version control mastery', stats: ['+50 Version Control', '+40 Branching'] },
    ear2:      { name: 'Docker',       icon: '\u25C8', type: 'Tool' as const, description: 'Containerization specialist', stats: ['+45 Environment Consistency', '+35 Deployment'] },
    // Left side
    chest:     { name: 'C#',           icon: '\u269C', type: 'Armor' as const, description: 'Primary programming language', stats: ['+50 Code Clarity', '+40 Type Safety', '+30 Performance'] },
    arms:      { name: 'Entity FW',    icon: '\u269A', type: 'Weapon' as const, description: 'ORM & data access layer', stats: ['+40 Data Modeling', '+35 Query Building'] },
    wrist1:    { name: 'TypeScript',   icon: '\u25CE', type: 'Weapon' as const, description: 'Typed JavaScript mastery', stats: ['+40 Type Safety', '+35 Frontend Power'] },
    belt:      { name: 'SOLID',        icon: '\u2726', type: 'Artifact' as const, description: 'Design principles mastery', stats: ['+40 Code Quality', '+35 Maintainability'] },
    finger1:   { name: 'VS Code',      icon: '\u25C7', type: 'Tool' as const, description: 'Primary IDE', stats: ['+40 Productivity', '+30 Extension Mastery'] },
    legs:      { name: 'Linux',        icon: '\u2638', type: 'Armor' as const, description: 'Server & OS proficiency', stats: ['+35 DevOps', '+30 Shell Scripting'] },
    // Right side
    cape:      { name: 'Azure DevOps', icon: '\u2601', type: 'Artifact' as const, description: 'Enterprise infrastructure - Grafana monitoring, database servers, CI/CD pipelines, server health management', stats: ['+50 Infrastructure', '+45 Monitoring & Alerting', '+40 Server Administration', '+35 DevOps Principles'] },
    shoulders: { name: '.NET',         icon: '\u2694', type: 'Weapon' as const, description: 'Framework expertise', stats: ['+45 Backend Power', '+35 API Design'] },
    wrist2:    { name: 'Blazor',       icon: '\u25CE', type: 'Weapon' as const, description: 'Full-stack .NET UI framework', stats: ['+35 UI Development', '+30 Component Design'] },
    hands:     { name: 'Debugging',    icon: '\u2736', type: 'Tool' as const, description: 'Tracking down & fixing issues', stats: ['+45 Bug Detection', '+35 Root Cause Analysis'] },
    finger2:   { name: 'React',        icon: '\u25C7', type: 'Tool' as const, description: 'Frontend framework', stats: ['+40 UI Development', '+30 Component Design'] },
    boots:     { name: 'Bash',         icon: '\u25B3', type: 'Tool' as const, description: 'Shell scripting & CLI tools', stats: ['+35 Automation', '+30 Scripting'] },
    // Weapons row
    primary:   { name: 'Unity Engine', icon: UnityIcon, type: 'Weapon' as const, description: 'Built: NPC hand-in system (this site!), 2D co-op boss fighter, UI Toolkit dialogs. Learning: Netcode multiplayer', stats: ['+45 Game Development', '+40 UI Toolkit', '+35 Scene Design', '+30 Game Logic', '+25 Netcode (Learning)'] },
    secondary: { name: 'MariaDB',      icon: '\u25C6', type: 'Artifact' as const, description: 'Database expertise', stats: ['+45 Query Optimization', '+35 Data Modeling'] },
    range:     { name: 'REST API',     icon: '\u279B', type: 'Tool' as const, description: 'Full-stack client-server architecture - Built health management platform from scratch (PostgreSQL + React + .NET), enterprise IAM systems', stats: ['+50 Client-Server Architecture', '+45 Multi-User Systems', '+40 Enterprise Integration', '+35 API Design'] },
  };

  // Inventory items (smaller tools/skills) - 8 slots like the screenshot
  const inventoryItems = [
    { icon: '\u2630', name: 'HTML5', count: undefined },
    { icon: '\u273F', name: 'CSS3', count: undefined },
    { icon: '\u2604', name: 'JavaScript', count: 1 },
    { icon: '\u2637', name: 'SQL', count: 1 },
    { icon: '\u25C9', name: 'Angular', count: undefined },
    { icon: '\u229E', name: 'npm', count: 12 },
    { icon: '\u2713', name: 'xUnit', count: 1 },
    { icon: '\u25CA', name: 'JSON', count: undefined },
    { icon: '\u21DB', name: 'LINQ', count: undefined },
    { icon: '\u2609', name: 'ASP.NET', count: undefined },
  ];

  // Bag categories with contents
  const bags = [
    { icon: '\u25A3', name: 'Backend', contents: ['C#', '.NET', 'ASP.NET', 'Entity Framework', 'SQL', 'PostgreSQL', 'REST API', 'LINQ', 'Sailpoint IIQ'] },
    { icon: '\u25A3', name: 'Frontend', contents: ['React', 'Angular', 'TypeScript', 'Blazor', 'NextJS', 'Razor Pages', 'HTML5', 'CSS3', 'JavaScript', 'WinForms'] },
    { icon: '\u25A3', name: 'DevOps/Infra', contents: ['Azure DevOps', 'Docker', 'Git', 'CI/CD', 'Linux', 'Bash', 'Grafana', 'Server Admin', 'Database Servers', 'Storage Management'] },
    { icon: '\u25A3', name: 'GameDev', contents: ['Unity', 'C#', 'UI Toolkit', 'Scene Design', 'Game Logic', 'Combat Systems', 'Local Multiplayer', 'Netcode (Learning)'] },
  ];

  const buffs = [
    { name: 'Currently Employed', icon: '\u2605', effect: '+IT Architect at ID North, +Professional Experience' },
    { name: 'IAM/IGA Specialist', icon: '\u25C8', effect: '+Sailpoint IIQ Mastery, +Enterprise Identity Management' },
    { name: 'Grafana Hero', icon: '\u25A3', effect: 'Saved production from storage crisis! +Monitoring +40' },
    { name: 'Unity Apprentice', icon: '\u25C6', effect: 'Learning Netcode, built 2D co-op game & NPC system' },
    { name: 'M&M Devotee', icon: '\u2606', effect: '+Motivation +100, Genuinely loves what you\'re building' },
    { name: 'EQ Culture Enjoyer', icon: '\u265F', effect: 'Knows "Train to Zone!" Never KSes camps. Respects the grind.' },
    { name: 'Honest About Skills', icon: '\u25CE', effect: 'Won\'t claim Netcode mastery (yet), but learning fast!' },
  ];

  const abilities = [
    { name: 'Problem Solving', icon: '\u25C8', description: 'Break down complex challenges' },
    { name: 'Code Review', icon: '\u25C6', description: 'Evaluate and improve code quality' },
    { name: 'Debugging', icon: '\u2736', description: 'Track down and fix issues (saved prod from storage leak!)' },
    { name: 'Refactoring', icon: '\u25CE', description: 'Improve code structure' },
    { name: 'Documentation', icon: '\u25C7', description: 'Write clear technical docs' },
    { name: 'Collaboration', icon: '\u2605', description: 'Work effectively with others' },
    { name: 'Git Commit', icon: '\u25C8', description: 'Version control operations' },
    { name: 'API Design', icon: '\u279B', description: 'Design RESTful interfaces' },
    { name: 'DB Query', icon: '\u25A3', description: 'Optimize data operations (PostgreSQL expert)' },
    { name: 'Deploy', icon: '\u2694', description: 'Ship to production' },
    { name: 'Infrastructure Architecture', icon: '\u2302', description: 'Design & maintain enterprise server infrastructure' },
    { name: 'Grafana Monitoring', icon: '\u25A3', description: 'Set up alerting & dashboards to prevent disasters' },
    { name: 'IAM/IGA Systems', icon: '\u25C8', description: 'Sailpoint IIQ installation, configuration, integration' },
    { name: 'Unity UI Toolkit', icon: '\u25CE', description: 'Built NPC dialogs, hand-in systems, game interfaces' },
    { name: 'Game Combat Design', icon: '\u2694', description: 'Projectile combat, enemy AI, hazard systems (2D co-op)' },
    { name: 'Rapid Prototyping', icon: '\u26A1', description: 'Build functional demos quickly (bar-hopping app, games)' },
    { name: 'Lead Development', icon: '\u2655', description: 'Led enterprise IAM project at government org' },
  ];

  const quests = {
    mainQuest: {
      title: 'Join the Monsters & Memories Guild',
      description: 'Prove your worth to lovingrobot (Shawn) and the legendary M&M team. Hand in your credentials, demonstrate your skills, and convince them that a Swedish IT architect who builds enterprise IAM systems by day and Unity games by night is exactly what they need. (No train-pulling or camp-stealing allowed.)',
      objectives: [
        { text: 'Master C# programming (.NET, enterprise-level)', completed: true },
        { text: 'Build client-server applications (health platform, IAM systems)', completed: true },
        { text: 'Lead enterprise infrastructure projects', completed: true },
        { text: 'Develop Unity game projects (2D co-op, NPC systems, UI)', completed: true },
        { text: 'Master Unity UI Toolkit', completed: true },
        { text: 'Learn Unity Netcode for multiplayer', completed: false, progress: 15 },
        { text: 'Build impressive M&M-themed portfolio', completed: true },
        { text: 'Prove dedication to lovingrobot & the M&M guild', completed: false },
      ],
      reward: 'Epic quest: Career advancement, work on dream MMORPG, learn from masters, raid bosses (in code)',
    },
    completedQuests: [
      { title: '.NET Software Developer Training', xp: 5000, reward: 'C# Mastery +50' },
      { title: 'Full-Stack Developer at LearningWell', xp: 3000, reward: 'Professional Experience +40' },
      { title: 'Build Full-Stack Health Management Platform from Scratch', xp: 3500, reward: 'Full-Stack Architecture +50, PostgreSQL +35, Google Maps API +25' },
      { title: 'Lead Developer - Enterprise IAM System (Sailpoint IIQ)', xp: 4000, reward: 'Identity Management +50, Enterprise Architecture +45' },
      { title: 'Build Server Infrastructure Monitoring System', xp: 2500, reward: 'Grafana Mastery +40, DevOps +35, Saved Production from Storage Crisis!' },
      { title: 'Solo Developer - IT Asset Management Tool', xp: 2000, reward: 'Network Topology +35, Database Design +30' },
      { title: 'Build 2D Co-op Boss Fight Game', xp: 1800, reward: 'Game Development +40, Local Multiplayer +35, Combat Systems +30' },
      { title: 'Create Bar-Hopping Event Demo App', xp: 800, reward: 'Rapid Prototyping +25, Event-Driven Design +20' },
      { title: 'Build PetPal - Pet-Owner Matching App', xp: 1500, reward: 'Full-Stack Skills +30, Social Platform Design +20' },
      { title: 'Master Blazor Framework', xp: 1200, reward: 'UI Development +25' },
      { title: 'Docker & CI/CD Implementation', xp: 1000, reward: 'DevOps Knowledge +20' },
    ],
    sideQuests: [
      { title: 'Master Unity Netcode for Multiplayer (Udemy Course)', progress: 15 },
      { title: 'Build Unity Multiplayer Prototype with Netcode', progress: 10 },
      { title: 'Study M&M Design Philosophy & Classic MMORPGs', progress: 80 },
      { title: 'Contribute to Game Dev Community', progress: 35 },
      { title: 'Install Enterprise IAM for Major Corporation (March)', progress: 70 },
      { title: 'Advanced Unity UI Toolkit Mastery', progress: 65 },
    ],
  };

  const xpPercent = 72;

  return (
    <>
      <Head>
        <title>Viktor Hurtig - Character Inspection</title>
        <meta name="description" content="Viktor Hurtig's interactive resume styled as a Monsters and Memories character sheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ background: '#1A1A1E', minHeight: '100vh', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="stone-frame"
          style={{ maxWidth: '1100px', width: '100%', padding: '0' }}
        >
          {/* TAB NAVIGATION */}
          <div className="stone-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`stone-tab ${activeTab === tab.id ? 'stone-tab-active' : 'stone-tab-inactive'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="dark-panel" style={{ margin: '0 8px 8px 8px', padding: '0.75rem' }}>

            {/* ═══════════════════════════════════ */}
            {/* INVENTORY TAB - Character Sheet    */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'inventory' && (
              <div className="inventory-main-layout" style={{ display: 'flex', gap: '0', minHeight: '600px' }}>

                {/* ══════ COLLAPSIBLE LEFT PERSONA SIDEBAR ══════ */}
                <div style={{ display: 'flex', flexShrink: 0 }}>
                  {/* Toggle Arrow Button */}
                  <button
                    className="persona-toggle"
                    onClick={() => { setPersonaAnimDone(false); setPersonaOpen(!personaOpen); }}
                    title={personaOpen ? 'Collapse Persona' : 'Expand Persona'}
                  >
                    <span style={{ fontSize: '0.8rem' }}>{personaOpen ? '\u25C0' : '\u25B6'}</span>
                  </button>

                  {/* Persona Panel */}
                  <AnimatePresence initial={false}>
                    {personaOpen && (
                      <motion.div
                        className="left-stats-col"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onAnimationComplete={() => setPersonaAnimDone(true)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: personaAnimDone ? 'visible' : 'hidden', flexShrink: 0 }}
                      >
                        {/* PERSONA */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Persona</div>
                          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', color: '#D4AF37', textAlign: 'center', marginBottom: '0.2rem', textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                            {character.name}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#B8B8C0', lineHeight: '1.5' }}>
                            <div>Level {character.level}</div>
                            <div>{character.race}</div>
                            <div>{character.alignment}</div>
                          </div>
                        </div>

                        {/* EXPERIENCE */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Experience</div>
                          <div className="xp-bar-track" style={{ marginBottom: '0.2rem' }}>
                            <motion.div
                              className="xp-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${xpPercent}%` }}
                              transition={{ duration: 2, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Class Icon Area */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px', background: 'linear-gradient(180deg, #1A1A1E 0%, #14141A 100%)' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                                <path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* RESOURCE BARS */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="resource-bar">
                            <span className="resource-bar-label">Health</span>
                            <div className="resource-bar-track">
                              <motion.div className="resource-bar-fill hp" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} />
                            </div>
                            <span className="resource-bar-value">1823/1823</span>
                          </div>
                          <div className="resource-bar">
                            <span className="resource-bar-label">Mana</span>
                            <div className="resource-bar-track">
                              <motion.div className="resource-bar-fill mana" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.2 }} />
                            </div>
                            <span className="resource-bar-value">37/37</span>
                          </div>
                          <div className="resource-bar">
                            <span className="resource-bar-label">Endurance</span>
                            <div className="resource-bar-track">
                              <motion.div className="resource-bar-fill endurance" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.4 }} />
                            </div>
                            <span className="resource-bar-value">100/75</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0.3rem', fontFamily: 'Courier New, monospace', fontSize: '0.65rem' }}>
                            <span style={{ color: '#B8B8C0' }}>Armor Class</span>
                            <span style={{ color: '#E8D5B7' }}>69</span>
                          </div>
                        </div>

                        {/* STATISTICS - Interactive with hover tooltips */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Statistics</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                            {/* Left column: STR, STA, AGI, DEX */}
                            <div>
                              {stats.filter(s => ['STR','STA','AGI','DEX'].includes(s.abbr)).map((stat) => (
                                <StatRowInteractive key={stat.abbr} stat={stat} />
                              ))}
                            </div>
                            {/* Right column: INT, WIS, CHA */}
                            <div>
                              {stats.filter(s => ['INT','WIS','CHA'].includes(s.abbr)).map((stat) => (
                                <StatRowInteractive key={stat.abbr} stat={stat} />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* RESISTANCES - Interactive */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Resistances</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                            {resistances.map((res) => (
                              <ResistanceRowInteractive key={res.abbr} res={res} />
                            ))}
                          </div>
                        </div>

                        {/* DEVOTION */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.65rem', color: '#9494A0', fontFamily: 'Courier New, monospace' }}>Devotion</div>
                          <div className="animate-glow" style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>0</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ══════ MAIN CENTER AREA - Equipment + Inventory ══════ */}
                <div className="center-character-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>

                  {/* Equipment around portrait */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

                    {/* Top equipment row: Ear, Neck, Head, Face, Ear */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '2px' }}>
                      <EquipSlotMini slot="Ear" {...equipment.ear1} />
                      <EquipSlotMini slot="Neck" {...equipment.neck} />
                      <EquipSlotMini slot="Head" {...equipment.head} />
                      <EquipSlotMini slot="Face" {...equipment.face} />
                      <EquipSlotMini slot="Ear" {...equipment.ear2} />
                    </div>

                    {/* Middle row: Left slots | Portrait | Right slots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: '100%', justifyContent: 'center' }}>
                      {/* Left side slots: Chest, Arms, Wrist, Belt, Finger, Legs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center' }}>
                        <EquipSlotMini slot="Chest" {...equipment.chest} />
                        <EquipSlotMini slot="Arms" {...equipment.arms} />
                        <EquipSlotMini slot="Wrist" {...equipment.wrist1} />
                        <EquipSlotMini slot="Belt" {...equipment.belt} />
                        <EquipSlotMini slot="Finger" {...equipment.finger1} />
                        <EquipSlotMini slot="Legs" {...equipment.legs} />
                      </div>

                      {/* PORTRAIT */}
                      <div ref={portraitRef} className="portrait-archway" style={{ width: '260px', height: '340px', flexShrink: 0 }}>
                        <img
                          src="/images/viktor-portrait.png"
                          alt="Viktor Hurtig"
                        />
                      </div>

                      {/* Right side slots: Cape, Shoulders, Wrist, Hands, Finger, Boots */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center' }}>
                        <EquipSlotMini slot="Cape" {...equipment.cape} />
                        <EquipSlotMini slot="Shoulders" {...equipment.shoulders} />
                        <EquipSlotMini slot="Wrist" {...equipment.wrist2} />
                        <EquipSlotMini slot="Hands" {...equipment.hands} />
                        <EquipSlotMini slot="Finger" {...equipment.finger2} />
                        <EquipSlotMini slot="Boots" {...equipment.boots} />
                      </div>
                    </div>

                    {/* Weapon slots row: Primary, Secondary, Range, Ammo */}
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start', marginTop: '2px' }}>
                      <EquipSlotMini slot="Primary" {...equipment.primary} />
                      <EquipSlotMini slot="Secondary" {...equipment.secondary} />
                      <EquipSlotMini slot="Range" {...equipment.range} />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className="equip-slot-label">Ammo</span>
                        <div className="equip-slot" style={{ width: '48px', height: '32px' }}>
                          <span style={{ fontSize: '0.7rem', color: '#E8D5B7', fontFamily: 'Courier New, monospace' }}>997</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Grid - below weapons */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Inventory</div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 36px)',
                      gap: '2px',
                      justifyContent: 'center',
                    }}>
                      {inventoryItems.map((item, i) => (
                        <InvSlotInteractive key={i} item={item} />
                      ))}
                      {/* Formal Note special item */}
                      <div
                        ref={noteRef}
                        className={`inv-slot ${noteHandedIn ? 'formal-note-handed' : 'formal-note-glow'}`}
                        onClick={handleNoteClick}
                        title={noteHandedIn ? 'Already handed in' : 'Click to hand in to Shawn'}
                        style={{ cursor: noteHandedIn ? 'default' : 'pointer' }}
                      >
                        <span>&#128220;</span>
                      </div>
                    </div>
                  </div>

                  {/* Bags */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Bags</div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 36px)',
                      gap: '2px',
                      justifyContent: 'center',
                    }}>
                      {bags.map((bag, i) => (
                        <BagSlotInteractive
                          key={i}
                          bag={bag}
                          isOpen={openBag === bag.name}
                          onToggle={() => setOpenBag(openBag === bag.name ? null : bag.name)}
                        />
                      ))}
                    </div>
                    {/* Expanded bag contents */}
                    <AnimatePresence>
                      {openBag && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="bag-contents-panel">
                            <div className="bag-contents-header">
                              {openBag}
                            </div>
                            <div className="bag-contents-grid">
                              {bags.find(b => b.name === openBag)?.contents.map((item, j) => (
                                <motion.div
                                  key={item}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.03 * j }}
                                  className="bag-content-item"
                                >
                                  {item}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Currency and Weight bar */}
                  <div className="currency-weight-bar">
                    <div className="currency-section">
                      <span className="currency-label">Currency</span>
                      <span className="currency-coin currency-platinum" title="Platinum">&#9670; 0</span>
                      <span className="currency-coin currency-gold" title="Gold">&#9670; 19</span>
                      <span className="currency-coin currency-silver" title="Silver">&#9670; 236</span>
                      <span className="currency-coin currency-copper" title="Copper">&#9670; 792</span>
                    </div>
                    <div className="weight-section">
                      <span className="weight-label">Weight</span>
                      <span className="weight-value">69 / 129</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* FACTIONS TAB - Reputation Standings */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'factions' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Faction Standings</div>
                {[
                  { name: 'The .NET Guild', standing: 'Ally', value: 95, description: 'Core allegiance to the C# and .NET ecosystem', color: '#5A8A4A' },
                  { name: 'React Coalition', standing: 'Warmly', value: 78, description: 'Strong bonds through frontend development', color: '#4A8A7A' },
                  { name: 'Unity Artisans', standing: 'Amiably', value: 65, description: 'Growing reputation through game development studies', color: '#6A7A8A' },
                  { name: 'DevOps Order', standing: 'Kindly', value: 58, description: 'Respected for Docker & CI/CD contributions', color: '#7A7A5A' },
                  { name: 'Database Keepers', standing: 'Warmly', value: 75, description: 'Trusted with PostgreSQL & SQL Server knowledge', color: '#4A8A7A' },
                  { name: 'Agile Brotherhood', standing: 'Ally', value: 90, description: 'Veteran of sprint ceremonies and Scrum rituals', color: '#5A8A4A' },
                  { name: 'Open Source Collective', standing: 'Amiably', value: 60, description: 'Contributing to community projects on GitHub', color: '#6A7A8A' },
                  { name: 'M&M Development Team', standing: 'Apprehensive', value: 35, description: 'Seeking acceptance into the legendary guild', color: '#8A8A4A' },
                ].map((faction, i) => (
                  <motion.div
                    key={faction.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="faction-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>{faction.name}</span>
                      <span style={{ fontSize: '0.72rem', color: faction.color, fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}>{faction.standing}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#B8B8C4', fontStyle: 'italic', marginBottom: '0.4rem', fontFamily: 'Courier New, monospace' }}>
                      {faction.description}
                    </div>
                    <div className="faction-bar-track">
                      <motion.div
                        className="faction-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${faction.value}%` }}
                        transition={{ duration: 1, delay: 0.1 * i, ease: 'easeOut' }}
                        style={{ background: `linear-gradient(90deg, ${faction.color}88 0%, ${faction.color} 100%)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* FAITHS TAB - Religion / Devotion    */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'faiths' && (() => {
              const faiths = [
                { name: 'Agnostic', symbol: '\u2606', domain: 'Independence', devotion: 0, color: '#C4B5A0',
                  description: 'Agnostics neither accept nor reject the existence of deities. They walk their own path, relying on personal conviction rather than divine guidance.',
                  blessing: 'Free Will — Not bound by any doctrine or restriction',
                  philosophy: 'I follow the code, not the doctrine. My devotion is to clean architecture and working software.' },
                { name: 'Eltindra', symbol: '\u2727', domain: 'Travelers', devotion: 42, color: '#5A8A4A',
                  description: 'Eltindra, Goddess of Travelers, watches over those who journey far from home. She guides wanderers through unknown paths and protects those who venture into the world.',
                  blessing: 'Wayfinder — Navigate through unfamiliar territory with confidence',
                  philosophy: 'Every project is a journey into the unknown. Embrace new technologies, explore unfamiliar domains, and never fear the road less traveled.' },
                { name: 'Haradrel', symbol: '\u2694', domain: 'War', devotion: 55, color: '#AA4A4A',
                  description: 'Haradrel, God of War, embodies the brutal necessity of conflict. His followers understand that some battles must be fought, and victory demands both strength and strategy.',
                  blessing: 'Fortitude — Push through the hardest problems without yielding',
                  philosophy: 'Performance optimization is combat. Every millisecond saved is a victory. Never accept slow code when fast code is possible. Fight for quality.' },
                { name: 'Krivea', symbol: '\u2625', domain: 'Harvests', devotion: 48, color: '#8A7A4A',
                  description: 'Krivea, Goddess of Harvests, teaches the patience of cultivation and the rewards of careful tending. Her followers know that great things grow from small seeds.',
                  blessing: 'Cultivate — Grow stronger through iterative improvement',
                  philosophy: 'Every codebase is a living garden. Plant features carefully, tend them with refactoring, and harvest the results when they\'re ripe.' },
                { name: 'The Matswar', symbol: '\u2620', domain: 'Death', devotion: 35, color: '#6A6A7A',
                  description: 'The Matswar, God of Death, is not one deity but many - a council of spirits who govern the end of all things. They teach acceptance of mortality and the cycles of creation and destruction.',
                  blessing: 'Renewal — Let old systems die so new ones can rise',
                  philosophy: 'Legacy code must eventually be deprecated. Embrace the end of outdated systems. Death clears the way for rebirth.' },
                { name: 'Relle', symbol: '\u2740', domain: 'Fertility', devotion: 60, color: '#4A8A6A',
                  description: 'Relle, Goddess of Fertility, brings forth life and abundance. She blesses those who create, nurture, and bring new things into the world.',
                  blessing: 'Abundance — Generate ideas and solutions prolifically',
                  philosophy: 'Innovation comes from creative abundance. Prototype rapidly, experiment fearlessly, and let the best ideas flourish.' },
                { name: 'Sorophal', symbol: '\u2604', domain: 'Inspiration', devotion: 65, color: '#AA6A5A',
                  description: 'Sorophal, God of Inspiration, ignites the creative spark within mortals. His followers are driven by vision and the burning need to create something extraordinary.',
                  blessing: 'Ignite — Transform vision into reality',
                  philosophy: 'The best code is born from inspired vision. Let creativity drive architecture. Build what excites you, and excellence will follow.' },
                { name: 'Tilustra', symbol: '\u2600', domain: 'Knowledge', devotion: 72, color: '#6A8AAA',
                  description: 'Tilustra, Goddess of Knowledge, illuminates the path to understanding. Her followers are eternal students, seeking wisdom in every experience.',
                  blessing: 'Insight — See through complexity to find the truth',
                  philosophy: 'Every bug is a lesson. Every refactor is enlightenment. The pursuit of understanding is the highest calling of an engineer.' },
                { name: 'Trimminax', symbol: '\u2696', domain: 'Plague', devotion: 20, color: '#7A8A5A',
                  description: 'Trimminax, God of Plague, represents the destructive force that tests resilience. His followers understand that systems must be hardened against corruption and decay.',
                  blessing: 'Resilience — Build systems that withstand corruption and attack',
                  philosophy: 'Security is not optional. Every system faces threats. Build defenses, plan for failure, and ensure your code can survive the plague of bugs.' },
                { name: 'Vespyra', symbol: '\u2733', domain: 'Magic', devotion: 68, color: '#8A7AAA',
                  description: 'Vespyra, Goddess of Magic, commands the arcane forces that shape reality. Her followers wield the power to transform the world through mystical understanding.',
                  blessing: 'Enchant — Harness abstract patterns to create powerful solutions',
                  philosophy: 'Advanced algorithms are indistinguishable from magic. Master the arcane arts of computer science and wield them wisely.' },
              ];
              const faith = faiths[selectedFaith];
              return (
              <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Choose Your Faith</div>
                <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem' }}>
                  {/* Faith list */}
                  <div className="faith-list-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '480px', overflowY: 'auto' }}>
                    {faiths.map((f, i) => (
                      <motion.div
                        key={f.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * i }}
                        className={`faith-card ${i === selectedFaith ? 'faith-card-active' : ''}`}
                        onClick={() => setSelectedFaith(i)}
                        style={{ padding: '0.4rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <span style={{ fontSize: '0.75rem', flexShrink: 0, color: i === selectedFaith ? faith.color : '#50505A' }}>{f.symbol}</span>
                        <span style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.72rem',
                          color: i === selectedFaith ? '#D4AF37' : '#C8C8D0',
                        }}>
                          {f.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Selected faith detail */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={faith.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="dark-panel-shallow"
                      style={{ padding: '1rem' }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.35rem', color: faith.color }}>{faith.symbol}</div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem', letterSpacing: '0.15em', fontFamily: 'Cinzel, Georgia, serif', color: '#D4AF37' }}>{faith.name.toUpperCase()}</h3>
                        <div style={{ fontSize: '0.7rem', color: faith.color, fontFamily: 'Courier New, monospace', letterSpacing: '0.1em' }}>{faith.domain}</div>
                      </div>

                      <div style={{
                        padding: '0.75rem',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid #32323A',
                        marginBottom: '0.6rem',
                      }}>
                        <p style={{ fontSize: '0.75rem', color: '#D8D8E0', lineHeight: '1.8', fontFamily: 'Courier New, monospace' }}>
                          {faith.description}
                        </p>
                      </div>

                      {/* Blessing */}
                      <div style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(212, 175, 55, 0.05)',
                        border: '1px solid #32323A',
                        marginBottom: '0.6rem',
                      }}>
                        <div style={{ fontSize: '0.6rem', color: '#ACACB8', fontFamily: 'Courier New, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Blessing</div>
                        <p style={{ fontSize: '0.75rem', color: faith.color, fontFamily: 'Courier New, monospace' }}>
                          {faith.blessing}
                        </p>
                      </div>

                      {/* Philosophy quote */}
                      <div style={{
                        padding: '0.6rem 0.75rem',
                        borderTop: '1px solid #32323A',
                      }}>
                        <p style={{ fontSize: '0.72rem', color: '#B8B8C4', fontFamily: 'Courier New, monospace', fontStyle: 'italic', lineHeight: '1.7' }}>
                          &quot;{faith.philosophy}&quot;
                        </p>
                      </div>

                      {/* Devotion bar */}
                      <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '0.6rem', color: '#9494A0', fontFamily: 'Courier New, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Devotion</span>
                          <span style={{ fontSize: '0.7rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>{faith.devotion}</span>
                        </div>
                        <div className="faction-bar-track">
                          <motion.div
                            className="faction-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${faith.devotion}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{ background: `linear-gradient(90deg, ${faith.color}66 0%, ${faith.color} 100%)` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              );
            })()}

            {/* ═══════════════════════════════════ */}
            {/* LEDGER TAB - Quests & Achievements  */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'ledger' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Main Quest</div>
                <div className="quest-item animate-subtle-pulse" style={{ border: '2px solid #8B6914', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem 0' }}>
                    {quests.mainQuest.title}
                  </h4>
                  <p style={{ color: '#D8D8E0', fontSize: '0.78rem', fontStyle: 'italic', fontFamily: 'Courier New, monospace', marginBottom: '0.6rem' }}>
                    {quests.mainQuest.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {quests.mainQuest.objectives.map((obj, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: obj.completed ? '#5A8A4A' : '#7A7A84', fontSize: '0.7rem', flexShrink: 0 }}>
                          {obj.completed ? '\u2713' : '\u25CB'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            color: obj.completed ? '#8A8A94' : '#D0D0D8',
                            fontSize: '0.75rem',
                            fontFamily: 'Courier New, monospace',
                            textDecoration: obj.completed ? 'line-through' : 'none',
                          }}>
                            {obj.text}
                          </span>
                          {obj.progress !== undefined && !obj.completed && (
                            <div className="quest-progress-track" style={{ marginTop: '0.2rem' }}>
                              <div className="quest-progress-fill" style={{ width: `${obj.progress}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid #32323A' }}>
                    <p style={{ color: '#B0B0BC', fontSize: '0.72rem', fontFamily: 'Courier New, monospace' }}>
                      Reward: {quests.mainQuest.reward}
                    </p>
                  </div>
                </div>

                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Completed Quests</div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {quests.completedQuests.map((quest, i) => (
                    <div key={i} className="quest-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#5A8A4A', fontSize: '0.7rem' }}>{'\u2713'}</span>
                        <span style={{ color: '#D0D0D8', fontSize: '0.75rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontFamily: 'Courier New, monospace' }}>+{quest.xp} XP</span>
                        <br />
                        <span style={{ color: '#B0B0BC', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Side Quests</div>
                {quests.sideQuests.map((quest, i) => (
                  <div key={i} className="quest-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#D0D0D8', fontSize: '0.75rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontFamily: 'Courier New, monospace' }}>{quest.progress}%</span>
                    </div>
                    <div className="quest-progress-track">
                      <div className="quest-progress-fill" style={{ width: `${quest.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* GUILD TAB - M&M Application        */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'guild' && (
              <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Guild Application</div>
                <div className="dark-panel-shallow" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                  <h3 className="animate-glow" style={{ fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
                    Monsters &amp; Memories
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#D8D8E0', lineHeight: '1.8', fontFamily: 'Courier New, monospace' }}>
                    I&apos;m a passionate gamer and developer who grew up on
                    classic MMORPGs. Building this character sheet wasn&apos;t
                    just a resume exercise &mdash; it&apos;s a love letter to the
                    genre I want to help build.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.75rem', border: '1px solid #32323A', background: 'rgba(0,0,0,0.2)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.3rem' }}>
                      Why M&amp;M?
                    </p>
                    <p style={{ fontSize: '0.72rem', color: '#D8D8E0', lineHeight: '1.8', fontFamily: 'Courier New, monospace' }}>
                      Because the best code comes from people who
                      genuinely love what they&apos;re building. I bring
                      strong C#/.NET fundamentals, a growing Unity
                      skillset, and an unwavering passion for classic
                      MMORPG design. I want to be part of making
                      something players will remember for decades.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    'C# Expert',
                    'Full-Stack Developer',
                    'Unity Learner',
                    'MMORPG Veteran',
                    'Team Player',
                    'Quick Learner',
                  ].map((tag) => (
                    <span key={tag} style={{
                      padding: '0.35rem 0.65rem',
                      border: '1px solid #32323A',
                      fontSize: '0.7rem',
                      color: '#D0D0D8',
                      fontFamily: 'Courier New, monospace',
                      background: 'rgba(0,0,0,0.2)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* SOCIAL TAB - Contact               */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'social' && (
              <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Contact</div>
                <div className="dark-panel-shallow" style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#7A7A84', marginBottom: '0.2rem' }}>Character</div>
                    <div style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>{character.name}</div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#7A7A84', marginBottom: '0.2rem' }}>Location</div>
                    <div style={{ fontSize: '0.8rem', color: '#B8B8C0' }}>San Francisco, California</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <a
                      href="https://github.com/WeaveCraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stone-button stone-button-primary"
                    >
                      GitHub - WeaveCraft
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INTERACTIONS BAR */}
          <div className="interactions-bar">
            <div className="interactions-header">
              <span>Interactions</span>
              <div className="interactions-info">
                <span>MP 7 / 139</span>
              </div>
            </div>
            <div className="interactions-log">
              {interactionLog.length === 0 ? (
                <div className="interactions-hint">
                  Click the Formal Note in your inventory to hand it to Shawn...
                </div>
              ) : (
                interactionLog.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={
                      msg.includes('says out of character')
                        ? 'interactions-message interactions-player-chat'
                        : 'interactions-message'
                    }
                  >
                    {msg}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flying Note Animation */}
      <AnimatePresence>
        {isDraggingNote && noteAnimPos && (
          <motion.div
            className="flying-note"
            initial={{
              position: 'fixed',
              left: noteRef.current?.getBoundingClientRect().left ?? 0,
              top: noteRef.current?.getBoundingClientRect().top ?? 0,
              zIndex: 300,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: noteAnimPos.x - 20,
              top: noteAnimPos.y - 20,
              scale: 0.8,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <span style={{ fontSize: '2rem' }}>&#128220;</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unity Hand-In Overlay */}
      <AnimatePresence>
        {showHandInDialog && (
          <UnityOverlay
            itemName="Formal Note: Unity Job Application"
            onComplete={handleHandInComplete}
            onClose={() => setShowHandInDialog(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════ */
/* INTERACTIVE STAT ROW COMPONENT         */
/* ═══════════════════════════════════════ */
function StatRowInteractive({ stat }: { stat: { abbr: string; value: number; full: string; description: string; details: string[] } }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="stat-row-interactive"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="stat-abbr">{stat.abbr}</span>
      <span className="stat-num">{stat.value}</span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="game-tooltip stat-tooltip"
          >
            <h4>{stat.abbr} &middot; {stat.full}</h4>
            <div className="stat-tooltip-value">
              <span className="stat-tooltip-number">{stat.value}</span>
              <div className="stat-tooltip-bar-track">
                <motion.div
                  className="stat-tooltip-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / 30) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>
            <p style={{ fontStyle: 'italic' }}>{stat.description}</p>
            <div style={{ marginTop: '0.3rem', borderTop: '1px solid #32323A', paddingTop: '0.3rem' }}>
              {stat.details.map((detail, j) => (
                <p key={j} className="tooltip-stat">&#9656; {detail}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/* INTERACTIVE RESISTANCE ROW COMPONENT   */
/* ═══════════════════════════════════════ */
function ResistanceRowInteractive({ res }: { res: { abbr: string; value: number; full: string } }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="resistance-row-interactive"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="resistance-name">{res.abbr}</span>
      <span className="resistance-value" style={{ color: res.value > 0 ? '#E8D5B7' : '#8A4A4A' }}>{res.value}</span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip resistance-tooltip"
          >
            <h4>{res.abbr}</h4>
            <p>{res.full}</p>
            <div className="stat-tooltip-bar-track" style={{ marginTop: '0.3rem' }}>
              <motion.div
                className="stat-tooltip-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${res.value}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ background: res.value > 0 ? undefined : 'linear-gradient(90deg, #8A4A4A 0%, #6A2A2A 100%)' }}
              />
            </div>
            <p className="tooltip-stat" style={{ marginTop: '0.2rem' }}>{res.value}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/* INTERACTIVE INVENTORY SLOT COMPONENT   */
/* ═══════════════════════════════════════ */
function InvSlotInteractive({ item }: { item: { icon: string; name: string; count?: number } }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [flipBelow, setFlipBelow] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (slotRef.current) {
      const rect = slotRef.current.getBoundingClientRect();
      setFlipBelow(rect.top < 120);
    }
    setShowTooltip(true);
  };

  return (
    <div
      ref={slotRef}
      className="inv-slot"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span>{item.icon}</span>
      {item.count !== undefined && (
        <span className="inv-count">{item.count}</span>
      )}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            className={`game-tooltip inv-tooltip ${flipBelow ? 'inv-tooltip-below' : ''}`}
          >
            <h4>{item.icon} {item.name}</h4>
            <p className="tooltip-type">Skill</p>
            {item.count !== undefined && (
              <p className="tooltip-stat">Quantity: {item.count}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/* INTERACTIVE BAG SLOT COMPONENT         */
/* ═══════════════════════════════════════ */
function BagSlotInteractive({ bag, isOpen, onToggle }: { bag: { icon: string; name: string; contents: string[] }; isOpen: boolean; onToggle: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [flipBelow, setFlipBelow] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (slotRef.current) {
      const rect = slotRef.current.getBoundingClientRect();
      setFlipBelow(rect.top < 120);
    }
    setShowTooltip(true);
  };

  return (
    <div
      ref={slotRef}
      className={`inv-slot bag-slot ${isOpen ? 'bag-slot-open' : ''}`}
      onClick={onToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span>{bag.icon}</span>
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            className={`game-tooltip inv-tooltip ${flipBelow ? 'inv-tooltip-below' : ''}`}
          >
            <h4>{bag.name}</h4>
            <p className="tooltip-type">Bag &middot; {bag.contents.length} items</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.55rem' }}>Click to open</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/* INLINE MINI EQUIPMENT SLOT COMPONENT   */
/* ═══════════════════════════════════════ */
function EquipSlotMini({
  slot,
  name,
  icon,
  type,
  description,
  stats = [],
}: {
  slot: string;
  name: string;
  icon: React.ReactNode;
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [flipBelow, setFlipBelow] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (slotRef.current) {
      const rect = slotRef.current.getBoundingClientRect();
      setFlipBelow(rect.top < 160);
    }
    setShowTooltip(true);
  };

  return (
    <div
      ref={slotRef}
      className="relative flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="equip-slot-label">{slot}</span>
      <div className="equip-slot">
        <span className="slot-icon">{icon}</span>
      </div>
      <span className="equip-slot-name">{name}</span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: flipBelow ? -5 : 5 }}
            className={`game-tooltip left-1/2 w-48 z-50 ${flipBelow ? 'top-full mt-2' : 'bottom-full mb-2'}`}
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            <p className="tooltip-type">{type} &middot; {slot}</p>
            <p style={{ fontStyle: 'italic' }}>{description}</p>
            {stats.length > 0 && (
              <div style={{ marginTop: '0.3rem', borderTop: '1px solid #32323A', paddingTop: '0.3rem' }}>
                {stats.map((stat, i) => (
                  <p key={i} className="tooltip-stat">{stat}</p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
