import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import BuffIcon from '../components/BuffIcon';
import AbilitySlot from '../components/AbilitySlot';
import IntroSplash from '../components/IntroSplash';
import HandInDialog from '../components/HandInDialog';
import DungeonScene from '@/components/DungeonScene';

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

  // Job application hand-in animation state
  const [isDraggingNote, setIsDraggingNote] = useState(false);
  const [showHandInDialog, setShowHandInDialog] = useState(false);
  const [noteHandedIn, setNoteHandedIn] = useState(false);
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const noteRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [noteAnimPos, setNoteAnimPos] = useState<{ x: number; y: number } | null>(null);

  const handleNoteClick = useCallback(() => {
    if (noteHandedIn || isDraggingNote) return;

    // Get positions for animation
    const noteEl = noteRef.current;
    const portraitEl = portraitRef.current;
    if (!noteEl || !portraitEl) {
      setShowHandInDialog(true);
      return;
    }

    const noteRect = noteEl.getBoundingClientRect();
    const portraitRect = portraitEl.getBoundingClientRect();

    // Start position (note location)
    setNoteAnimPos({
      x: noteRect.left + noteRect.width / 2,
      y: noteRect.top + noteRect.height / 2,
    });
    setIsDraggingNote(true);

    setInteractionLog(prev => [...prev, 'You pick up the Formal Note...']);

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
  }, [noteHandedIn, isDraggingNote]);

  const handleHandInComplete = useCallback(() => {
    setShowHandInDialog(false);
    setNoteHandedIn(true);
    setInteractionLog(prev => [
      ...prev,
      'You have given Formal Note: Unity Job Application to Shawn.',
      'Shawn says, "I\'ll review this with great interest. Your dedication is impressive."',
      'You have gained experience!',
    ]);
  }, []);

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  const character = {
    name: 'Encrypted',
    race: 'Gnome Rogue',
    class: 'Unity Programmer',
    level: 60,
    alignment: 'Agnostic',
  };

  // Stats as game-style numbers (like the M&M screenshot: 18-29 range)
  const stats = [
    { abbr: 'STR', value: 29, full: 'Strength', description: 'C# mastery & backend power', details: ['2 years intensive .NET education', '6+ months professional development', 'Built complex full-stack applications', 'Deep OOP & Entity Framework proficiency'] },
    { abbr: 'STA', value: 29, full: 'Stamina', description: 'Work ethic & dedication', details: ['Worked full-time while studying programming', 'Completed 2-year intensive program', 'Dedicated spare time to Unity learning', 'Never gives up on challenging problems'] },
    { abbr: 'AGI', value: 26, full: 'Agility', description: 'Learning speed & adaptability', details: ['Self-taught programming from scratch', 'Mastered React, Angular & TypeScript rapidly', 'Currently learning Unity in spare time', 'Quick to adopt new frameworks'] },
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
    head:      { name: 'Architecture', icon: '\u2656', type: 'Armor' as const, description: 'System design & architecture thinking', stats: ['+45 Design Patterns', '+35 Scalability'] },
    face:      { name: 'Git',          icon: '\u2318', type: 'Tool' as const, description: 'Version control mastery', stats: ['+50 Version Control', '+40 Branching'] },
    ear2:      { name: 'Docker',       icon: '\u25C8', type: 'Tool' as const, description: 'Containerization specialist', stats: ['+45 Environment Consistency', '+35 Deployment'] },
    // Left side
    chest:     { name: 'C#',           icon: '\u2616', type: 'Armor' as const, description: 'Primary programming language', stats: ['+50 Code Clarity', '+40 Type Safety', '+30 Performance'] },
    arms:      { name: 'Entity FW',    icon: '\u2720', type: 'Weapon' as const, description: 'ORM & data access layer', stats: ['+40 Data Modeling', '+35 Query Building'] },
    wrist1:    { name: 'TypeScript',   icon: '\u25CE', type: 'Weapon' as const, description: 'Typed JavaScript mastery', stats: ['+40 Type Safety', '+35 Frontend Power'] },
    belt:      { name: 'SOLID',        icon: '\u2726', type: 'Artifact' as const, description: 'Design principles mastery', stats: ['+40 Code Quality', '+35 Maintainability'] },
    finger1:   { name: 'VS Code',      icon: '\u25C7', type: 'Tool' as const, description: 'Primary IDE', stats: ['+40 Productivity', '+30 Extension Mastery'] },
    legs:      { name: 'Linux',        icon: '\u25BD', type: 'Armor' as const, description: 'Server & OS proficiency', stats: ['+35 DevOps', '+30 Shell Scripting'] },
    // Right side
    cape:      { name: 'Portfolio',    icon: '\u2742', type: 'Artifact' as const, description: 'Project portfolio & open source', stats: ['+40 Credibility', '+35 Showcase'] },
    shoulders: { name: '.NET',         icon: '\u2694', type: 'Weapon' as const, description: 'Framework expertise', stats: ['+45 Backend Power', '+35 API Design'] },
    wrist2:    { name: 'Blazor',       icon: '\u25CE', type: 'Weapon' as const, description: 'Full-stack .NET UI framework', stats: ['+35 UI Development', '+30 Component Design'] },
    hands:     { name: 'Debugging',    icon: '\u2736', type: 'Tool' as const, description: 'Tracking down & fixing issues', stats: ['+45 Bug Detection', '+35 Root Cause Analysis'] },
    finger2:   { name: 'React',        icon: '\u25C7', type: 'Tool' as const, description: 'Frontend framework', stats: ['+40 UI Development', '+30 Component Design'] },
    boots:     { name: 'Bash',         icon: '\u25B3', type: 'Tool' as const, description: 'Shell scripting & CLI tools', stats: ['+35 Automation', '+30 Scripting'] },
    // Weapons row
    primary:   { name: 'Unity',        icon: '\u2694', type: 'Weapon' as const, description: 'Game engine - currently leveling', stats: ['+35 Game Dev', '+25 Scene Design'] },
    secondary: { name: 'PostgreSQL',   icon: '\u25C6', type: 'Artifact' as const, description: 'Database expertise', stats: ['+45 Query Optimization', '+35 Data Modeling'] },
    range:     { name: 'REST API',     icon: '\u279B', type: 'Tool' as const, description: 'API design & implementation', stats: ['+40 Endpoint Design', '+30 Integration'] },
  };

  // Inventory items (smaller tools/skills) - 8 slots like the screenshot
  const inventoryItems = [
    { icon: '\u25CE', name: 'HTML5', count: undefined },
    { icon: '\u25C6', name: 'CSS3', count: undefined },
    { icon: '\u2726', name: 'JavaScript', count: 1 },
    { icon: '\u25A3', name: 'SQL', count: 1 },
    { icon: '\u25C8', name: 'Angular', count: undefined },
    { icon: '\u25A1', name: 'npm', count: 12 },
    { icon: '\u2736', name: 'xUnit', count: 1 },
    { icon: '\u25C7', name: 'JSON', count: undefined },
    { icon: '\u25CE', name: 'LINQ', count: undefined },
    { icon: '\u2699', name: 'ASP.NET', count: undefined },
  ];

  // Bag categories
  const bags = [
    { icon: '\u25A3', name: 'Backend' },
    { icon: '\u25A3', name: 'Frontend' },
    { icon: '\u25A3', name: 'DevOps' },
    { icon: '\u25A3', name: 'GameDev' },
  ];

  const buffs = [
    { name: 'Employed', icon: '\u2605', effect: '+Professional Experience' },
    { name: 'Learning Unity', icon: '\u25C6', effect: '+Game Dev Skills' },
    { name: 'Seeking M&M', icon: '\u2606', effect: '+Motivation +100' },
    { name: 'Open Source', icon: '\u25CE', effect: '+Community Contribution' },
  ];

  const abilities = [
    { name: 'Problem Solving', icon: '\u25C8', description: 'Break down complex challenges' },
    { name: 'Code Review', icon: '\u25C6', description: 'Evaluate and improve code quality' },
    { name: 'Debugging', icon: '\u2736', description: 'Track down and fix issues' },
    { name: 'Refactoring', icon: '\u25CE', description: 'Improve code structure' },
    { name: 'Documentation', icon: '\u25C7', description: 'Write clear technical docs' },
    { name: 'Collaboration', icon: '\u2605', description: 'Work effectively with others' },
    { name: 'Git Commit', icon: '\u25C8', description: 'Version control operations' },
    { name: 'API Design', icon: '\u279B', description: 'Design RESTful interfaces' },
    { name: 'DB Query', icon: '\u25A3', description: 'Optimize data operations' },
    { name: 'Deploy', icon: '\u2694', description: 'Ship to production' },
  ];

  const quests = {
    mainQuest: {
      title: 'Join the Monsters & Memories Guild',
      description: 'Prove your worth as a Unity Programmer and join the legendary team building a classic MMORPG',
      objectives: [
        { text: 'Master C# programming', completed: true },
        { text: 'Learn client-server architecture', completed: true },
        { text: 'Develop Unity skills', completed: false, progress: 65 },
        { text: 'Build impressive portfolio', completed: true },
        { text: 'Create unique application', completed: true },
        { text: 'Convince Shawn & Ali of your potential', completed: false },
      ],
      reward: 'Career advancement, passion project involvement',
    },
    completedQuests: [
      { title: '.NET Software Developer Training', xp: 5000, reward: 'C# Mastery +50' },
      { title: 'Full-Stack Internship at LearningWell', xp: 3000, reward: 'Professional Experience +40' },
      { title: 'Build PetPal Application', xp: 1500, reward: 'Full-Stack Skills +30' },
      { title: 'Master Blazor Framework', xp: 1200, reward: 'UI Development +25' },
      { title: 'Docker & CI/CD Implementation', xp: 1000, reward: 'DevOps Knowledge +20' },
    ],
    sideQuests: [
      { title: 'Contribute to game dev community', progress: 30 },
      { title: 'Build Unity multiplayer prototype', progress: 45 },
      { title: 'Study classic MMORPG design', progress: 70 },
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

      <div style={{ background: '#1C1A16', minHeight: '100vh', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
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
                    onClick={() => setPersonaOpen(!personaOpen)}
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
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden', flexShrink: 0 }}
                      >
                        {/* PERSONA */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Persona</div>
                          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', color: '#D4AF37', textAlign: 'center', marginBottom: '0.2rem', textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                            {character.name}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#C4B5A0', lineHeight: '1.5' }}>
                            <div>Level {character.level}</div>
                            <div>{character.race}</div>
                            <div>{character.class}</div>
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
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px', background: 'linear-gradient(180deg, #1C1A16 0%, #16140E 100%)' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{'\u2694'}</div>
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
                            <span style={{ color: '#C4B5A0' }}>Armor Class</span>
                            <span style={{ color: '#E8D5B7' }}>69</span>
                          </div>
                        </div>

                        {/* STATISTICS */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Statistics</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                            {/* Left column: STR, STA, AGI, DEX */}
                            <div>
                              {stats.filter(s => ['STR','STA','AGI','DEX'].includes(s.abbr)).map((stat) => (
                                <div key={stat.abbr} className="stat-row-compact" title={`${stat.full}: ${stat.description}`}>
                                  <span className="stat-abbr">{stat.abbr}</span>
                                  <span className="stat-num">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                            {/* Right column: INT, WIS, CHA */}
                            <div>
                              {stats.filter(s => ['INT','WIS','CHA'].includes(s.abbr)).map((stat) => (
                                <div key={stat.abbr} className="stat-row-compact" title={`${stat.full}: ${stat.description}`}>
                                  <span className="stat-abbr">{stat.abbr}</span>
                                  <span className="stat-num">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* RESISTANCES */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                          <div className="section-label">Resistances</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                            {resistances.map((res) => (
                              <div key={res.abbr} className="resistance-row" title={res.full}>
                                <span className="resistance-name">{res.abbr}</span>
                                <span className="resistance-value">{res.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* DEVOTION */}
                        <div className="dark-panel-shallow" style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.65rem', color: '#8B7E71', fontFamily: 'Courier New, monospace' }}>Devotion</div>
                          <div className="animate-glow" style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>0</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ══════ MAIN CENTER AREA - Equipment + Inventory ══════ */}
                <div className="center-character-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>

                  {/* Equipment around portrait */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>

                    {/* Top equipment row: Ear, Neck, Head, Face, Ear */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'flex-end' }}>
                      <EquipSlotMini slot="Ear" {...equipment.ear1} />
                      <EquipSlotMini slot="Neck" {...equipment.neck} />
                      <EquipSlotMini slot="Head" {...equipment.head} />
                      <EquipSlotMini slot="Face" {...equipment.face} />
                      <EquipSlotMini slot="Ear" {...equipment.ear2} />
                    </div>

                    {/* Middle row: Left slots | Portrait | Right slots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', width: '100%', justifyContent: 'center' }}>
                      {/* Left side slots: Chest, Arms, Wrist, Belt, Finger, Legs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                        <EquipSlotMini slot="Cape" {...equipment.cape} />
                        <EquipSlotMini slot="Shoulders" {...equipment.shoulders} />
                        <EquipSlotMini slot="Wrist" {...equipment.wrist2} />
                        <EquipSlotMini slot="Hands" {...equipment.hands} />
                        <EquipSlotMini slot="Finger" {...equipment.finger2} />
                        <EquipSlotMini slot="Boots" {...equipment.boots} />
                      </div>
                    </div>

                    {/* Weapon slots row: Primary, Secondary, Range, Ammo */}
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
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
                        <div key={i} className="inv-slot" title={item.name}>
                          <span>{item.icon}</span>
                          {item.count !== undefined && (
                            <span className="inv-count">{item.count}</span>
                          )}
                        </div>
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

                  {/* Bags row with Drop/Destroy buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <div className="dark-panel-shallow" style={{ padding: '0.5rem', flex: 1 }}>
                      <div className="section-label">Bags</div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 36px)',
                        gap: '2px',
                        justifyContent: 'center',
                      }}>
                        {bags.map((bag, i) => (
                          <div key={i} className="inv-slot" title={bag.name}>
                            <span>{bag.icon}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Drop & Destroy buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '80px' }}>
                      <button className="stone-button stone-button-primary" style={{ fontSize: '0.55rem', padding: '0.3rem 0.4rem' }}>
                        Drop
                      </button>
                      <button className="stone-button stone-button-danger" style={{ fontSize: '0.55rem', padding: '0.3rem 0.4rem' }}>
                        Destroy
                      </button>
                    </div>
                  </div>

                  {/* Currency and Weight bar */}
                  <div className="currency-weight-bar">
                    <div className="currency-section">
                      <span className="currency-label">Currency</span>
                      <span className="currency-values">0</span>
                      <span className="currency-values">19</span>
                      <span className="currency-values">236</span>
                      <span className="currency-values">792</span>
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
            {/* FACTIONS TAB - Detailed Stats       */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'factions' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Core Attributes</div>
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.abbr}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      marginBottom: '0.5rem',
                      background: 'linear-gradient(135deg, #1C1A16 0%, #16140E 100%)',
                      border: '1px solid #3A3530',
                    }}
                  >
                    <div style={{ width: '50px', textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', fontWeight: 'bold' }}>{stat.abbr}</div>
                      <div style={{ fontSize: '1.1rem', color: '#E8D5B7', fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}>{stat.value}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.2rem' }}>{stat.full}</div>
                      <div style={{ fontSize: '0.65rem', color: '#8B7E71', fontStyle: 'italic', marginBottom: '0.3rem' }}>{stat.description}</div>
                      {stat.details.map((detail, j) => (
                        <div key={j} style={{ fontSize: '0.6rem', color: '#5A8A4A', fontFamily: 'Courier New, monospace' }}>
                          &#9656; {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="section-label" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Resistances</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {resistances.map((res) => (
                    <div key={res.abbr} style={{
                      textAlign: 'center',
                      padding: '0.5rem',
                      background: 'linear-gradient(135deg, #1C1A16 0%, #16140E 100%)',
                      border: '1px solid #3A3530',
                    }}>
                      <div style={{ fontSize: '0.6rem', color: '#8B7E71' }}>{res.abbr}</div>
                      <div style={{ fontSize: '1rem', color: res.value > 0 ? '#E8D5B7' : '#8A4A4A', fontWeight: 'bold' }}>{res.value}</div>
                      <div style={{ fontSize: '0.5rem', color: '#8B7E71', marginTop: '0.15rem' }}>{res.full}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* FAITHS TAB - Religion / Devotion    */}
            {/* ═══════════════════════════════════ */}
            {activeTab === 'faiths' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Choose Your Faith</div>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem' }}>
                  {/* Faith list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {[
                      { name: 'Agnostic', active: true },
                      { name: 'Eltindra', active: false },
                      { name: 'Haradrel', active: false },
                      { name: 'Kravvin', active: false },
                      { name: 'Krivea', active: false },
                      { name: 'The Matswar', active: false },
                      { name: 'Porbor', active: false },
                      { name: 'Relle', active: false },
                      { name: 'Sorophal', active: false },
                      { name: 'Tilustra', active: false },
                      { name: 'Trem', active: false },
                      { name: 'Trimminax', active: false },
                      { name: 'Vespyra', active: false },
                    ].map((faith) => (
                      <div
                        key={faith.name}
                        className={`faith-card ${faith.active ? 'faith-card-active' : ''}`}
                        style={{ padding: '0.35rem 0.5rem' }}
                      >
                        <span style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.65rem',
                          color: faith.active ? '#D4AF37' : '#C4B5A0',
                        }}>
                          {faith.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Selected faith detail */}
                  <div className="dark-panel-shallow" style={{ padding: '1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{'\u2606'}</div>
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>AGNOSTIC</h3>
                    </div>
                    <div style={{
                      padding: '0.75rem',
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid #3A3530',
                    }}>
                      <p style={{ fontSize: '0.65rem', color: '#C4B5A0', lineHeight: '1.8', fontFamily: 'Courier New, monospace', textAlign: 'center' }}>
                        Agnostics neither accept nor reject the existence of deities.
                      </p>
                      <div style={{ marginTop: '0.75rem', borderTop: '1px solid #3A3530', paddingTop: '0.75rem' }}>
                        <p style={{ fontSize: '0.6rem', color: '#8B7E71', fontFamily: 'Courier New, monospace', textAlign: 'center', fontStyle: 'italic' }}>
                          &quot;I follow the code, not the doctrine. My devotion is to clean architecture and working software.&quot;
                        </p>
                      </div>
                    </div>
                    <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.55rem', color: '#8B7E71', fontFamily: 'Courier New, monospace' }}>Devotion</div>
                      <div style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>0</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  <p style={{ color: '#C4B5A0', fontSize: '0.65rem', fontStyle: 'italic', fontFamily: 'Courier New, monospace', marginBottom: '0.6rem' }}>
                    {quests.mainQuest.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {quests.mainQuest.objectives.map((obj, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: obj.completed ? '#5A8A4A' : '#8B7E71', fontSize: '0.7rem', flexShrink: 0 }}>
                          {obj.completed ? '\u2713' : '\u25CB'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            color: obj.completed ? '#8B7E71' : '#C4B5A0',
                            fontSize: '0.65rem',
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
                  <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid #3A3530' }}>
                    <p style={{ color: '#8B7E71', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>
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
                        <span style={{ color: '#C4B5A0', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#D4AF37', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>+{quest.xp} XP</span>
                        <br />
                        <span style={{ color: '#8B7E71', fontSize: '0.55rem', fontFamily: 'Courier New, monospace' }}>{quest.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Side Quests</div>
                {quests.sideQuests.map((quest, i) => (
                  <div key={i} className="quest-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#C4B5A0', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      <span style={{ color: '#D4AF37', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>{quest.progress}%</span>
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
                  <p style={{ fontSize: '0.7rem', color: '#C4B5A0', lineHeight: '1.8', fontFamily: 'Courier New, monospace' }}>
                    I&apos;m a passionate gamer and developer who grew up on
                    classic MMORPGs. Building this character sheet wasn&apos;t
                    just a resume exercise &mdash; it&apos;s a love letter to the
                    genre I want to help build.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.75rem', border: '1px solid #3A3530', background: 'rgba(0,0,0,0.2)' }}>
                    <p style={{ fontSize: '0.65rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.3rem' }}>
                      Why M&amp;M?
                    </p>
                    <p style={{ fontSize: '0.6rem', color: '#C4B5A0', lineHeight: '1.7', fontFamily: 'Courier New, monospace' }}>
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
                      padding: '0.3rem 0.6rem',
                      border: '1px solid #3A3530',
                      fontSize: '0.6rem',
                      color: '#C4B5A0',
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
                    <div style={{ fontSize: '0.7rem', color: '#8B7E71', marginBottom: '0.2rem' }}>Character</div>
                    <div style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>{character.name}</div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#8B7E71', marginBottom: '0.2rem' }}>Location</div>
                    <div style={{ fontSize: '0.8rem', color: '#C4B5A0' }}>S&ouml;dermanland, Sweden</div>
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
                    className="interactions-message"
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

      {/* Hand In Dialog */}
      <AnimatePresence>
        {showHandInDialog && (
          <HandInDialog
            npcName="Shawn"
            itemName="Formal Note: Unity Job Application"
            itemIcon="&#128220;"
            onHandIn={handleHandInComplete}
            onClose={() => setShowHandInDialog(false)}
          />
        )}
      </AnimatePresence>
    </>
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
  icon: string;
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
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
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip left-1/2 bottom-full mb-2 w-48 z-50"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            <p className="tooltip-type">{type} &middot; {slot}</p>
            <p style={{ fontStyle: 'italic' }}>{description}</p>
            {stats.length > 0 && (
              <div style={{ marginTop: '0.3rem', borderTop: '1px solid #3A3530', paddingTop: '0.3rem' }}>
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
