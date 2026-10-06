import { useState, type ReactNode } from "react";

type View =
  | "home"
  | "bible"
  | "reader"
  | "reflect"
  | "verse"
  | "journal"
  | "study"
  | "search"
  | "highlights"
  | "theme"
  | "ask"
  | "review"
  | "settings";

type IconName =
  | "home"
  | "book"
  | "journal"
  | "study"
  | "plus"
  | "arrow"
  | "chevron"
  | "search"
  | "type"
  | "sun"
  | "bookmark"
  | "pen"
  | "share"
  | "more"
  | "mic"
  | "check"
  | "settings"
  | "spark";

const paths: Record<IconName, ReactNode> = {
  home: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v10h13V10M9 20v-6h6v6" /></>,
  book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22Z" /></>,
  journal: <><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2Z" /><path d="M8 7h7M8 11h7M8 15h4" /></>,
  study: <><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="m15 18-6-6 6-6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  type: <><path d="M5 7V4h14v3M12 4v16M8 20h8" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
  pen: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z" /><path d="m14 7 3 3" /></>,
  share: <><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  spark: <path d="m12 3 1.3 4.1L17 9l-3.7 1.9L12 15l-1.3-4.1L7 9l3.7-1.9ZM18.5 15l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7Z" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function IconButton({ name, label, onClick, active = false }: { name: IconName; label: string; onClick?: () => void; active?: boolean }) {
  return <button className={`icon-button ${active ? "is-active" : ""}`} onClick={onClick} aria-label={label}><Icon name={name} /></button>;
}

function ScreenHeader({ title, eyebrow, back, right }: { title: string; eyebrow?: string; back?: () => void; right?: ReactNode }) {
  return (
    <header className="screen-header">
      <div className="header-side">{back && <IconButton name="arrow" label="Go back" onClick={back} />}</div>
      <div className="header-title">{eyebrow && <span>{eyebrow}</span>}<strong>{title}</strong></div>
      <div className="header-side header-right">{right}</div>
    </header>
  );
}

const noteTypes = ["Reflection", "Prayer", "Insight", "Application"];

function BottomNav({ view, go }: { view: View; go: (view: View) => void }) {
  const items: { id: View; label: string; icon: IconName }[] = [
    { id: "home", label: "Home", icon: "home" },
    { id: "bible", label: "Bible", icon: "book" },
    { id: "journal", label: "Journal", icon: "journal" },
    { id: "study", label: "Study", icon: "study" },
  ];
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.slice(0, 2).map((item) => <NavItem key={item.id} item={item} active={view === item.id || (item.id === "bible" && ["reader", "verse"].includes(view))} go={go} />)}
      <button className="create-button" onClick={() => go("reflect")} aria-label="Create note"><Icon name="plus" size={22} /></button>
      {items.slice(2).map((item) => <NavItem key={item.id} item={item} active={view === item.id} go={go} />)}
    </nav>
  );
}

function NavItem({ item, active, go }: { item: { id: View; label: string; icon: IconName }; active: boolean; go: (v: View) => void }) {
  return <button className={`nav-item ${active ? "is-active" : ""}`} onClick={() => go(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>;
}

function Home({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen">
      <div className="home-top">
        <div><p className="eyebrow">Tuesday, June 18</p><h1>Good morning, Lucy</h1><p className="subtle">A quiet place to begin.</p></div>
        <IconButton name="settings" label="Settings" onClick={() => go("settings")} />
      </div>

      <section className="continue-card">
        <div className="continue-art"><span className="chapter-mark">23</span><span className="art-line" /></div>
        <div className="continue-copy">
          <p className="eyebrow gold">Continue studying</p>
          <h2>Psalm 23</h2>
          <blockquote>“The Lord is my shepherd; I shall not want.”</blockquote>
          <div className="progress-row"><div className="progress-track"><span className="progress-fill progress-72" /></div><span>72%</span></div>
          <button className="text-action" onClick={() => go("reader")}>Continue reading <Icon name="chevron" size={16} /></button>
        </div>
      </section>

      <section>
        <div className="section-heading"><h2>Today</h2><span>3 gentle steps</span></div>
        <div className="today-list">
          <button onClick={() => go("reader")}><span className="task-check done"><Icon name="check" size={15} /></span><span><strong>Read Psalm 23</strong><small>6 verses · 4 min</small></span><Icon name="chevron" size={17} /></button>
          <button onClick={() => go("reflect")}><span className="task-check" /><span><strong>Reflect & journal</strong><small>Write what you notice</small></span><Icon name="chevron" size={17} /></button>
          <button onClick={() => go("journal")}><span className="task-check" /><span><strong>Review saved insights</strong><small>Return to what mattered</small></span><Icon name="chevron" size={17} /></button>
        </div>
      </section>

      <section className="ai-pattern">
        <div className="ai-heading"><span className="spark-badge"><Icon name="spark" size={15} /></span><div><p className="eyebrow gold">A pattern worth noticing</p><small>Based on your journal</small></div></div>
        <p>You’ve written about control in 5 reflections this month. These reflections often move toward trust and surrender.</p>
        <div className="ai-actions"><button onClick={() => go("theme")}>View pattern</button><button onClick={() => go("search")}>Explore Scripture</button></div>
        <button className="why-link">Why am I seeing this?</button>
      </section>
      <button className="weekly-preview" onClick={() => go("review")}><span><Icon name="book" size={19} /><span><small>Your week in Scripture</small><strong>Psalm 23 kept drawing you back</strong></span></span><Icon name="chevron" size={17} /></button>

      <section>
        <div className="section-heading"><h2>Recent insights</h2><button onClick={() => go("journal")}>See all</button></div>
        <div className="insight-card" onClick={() => go("verse")}>
          <div className="note-meta"><span className="note-label insight">Insight</span><span>Psalm 23:4</span></div>
          <p>“I don’t need to understand the valley to trust that God is walking through it with me.”</p>
          <span className="entry-date">Yesterday · 8:42 PM</span>
        </div>
        <div className="insight-card secondary" onClick={() => go("verse")}>
          <div className="note-meta"><span className="note-label prayer">Prayer</span><span>Matthew 6:34</span></div>
          <p>“Teach me to receive today without borrowing tomorrow’s worry.”</p>
        </div>
      </section>

      <aside className="thought"><Icon name="spark" size={18} /><div><span>Thought for today</span><p>“Attention is the beginning of devotion.”</p></div></aside>
    </main>
  );
}

const bibleGroups = [
  { title: "Law", books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"] },
  { title: "History", books: ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "Kings"] },
  { title: "Poetry", books: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs"] },
  { title: "Gospels", books: ["Matthew", "Mark", "Luke", "John"] },
  { title: "Letters", books: ["Romans", "Corinthians", "Galatians", "Ephesians", "Philippians"] },
];

function Bible({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen">
      <div className="title-row"><div><p className="eyebrow">The Holy Bible</p><h1>Choose a book</h1></div><IconButton name="search" label="Search" onClick={() => go("search")} /></div>
      <button className="translation"><span><small>Translation</small><strong>English Standard Version</strong></span><Icon name="chevron" size={17} /></button>
      <button className="saved-highlights" onClick={() => go("highlights")}><span><Icon name="bookmark" size={18} /> Saved highlights</span><Icon name="chevron" size={17} /></button>
      <p className="testament-label">Old Testament</p>
      {bibleGroups.slice(0, 3).map((group) => <BookGroup key={group.title} {...group} go={go} />)}
      <p className="testament-label new-testament">New Testament</p>
      {bibleGroups.slice(3).map((group) => <BookGroup key={group.title} {...group} go={go} />)}
    </main>
  );
}

function BookGroup({ title, books, go }: { title: string; books: string[]; go: (v: View) => void }) {
  return <section className="book-group"><h3>{title}</h3><div className="book-grid">{books.map((book) => <button key={book} onClick={() => book === "Psalms" ? go("reader") : undefined} className={book === "Psalms" ? "has-progress" : ""}><span>{book}</span>{book === "Psalms" && <small>82%</small>}</button>)}</div></section>;
}

function Reader({ go }: { go: (view: View) => void }) {
  const [selected, setSelected] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <main className="reader-screen">
      <ScreenHeader title="Psalm 23" eyebrow="ESV" back={() => go("home")} right={<IconButton name="search" label="Search" onClick={() => go("search")} />} />
      <div className="reader-tools">
        <button><Icon name="arrow" size={17} /> 22</button>
        <div><IconButton name="type" label="Text size" /><IconButton name="sun" label="Theme" /><IconButton name="bookmark" label="Bookmark chapter" active={bookmarked} onClick={() => setBookmarked(!bookmarked)} /></div>
        <button>24 <Icon name="chevron" size={17} /></button>
      </div>
      <article className="scripture">
        <p><sup>1</sup> The Lord is my shepherd; I shall not want.</p>
        <p><sup>2</sup> He makes me lie down in green pastures. He leads me beside still waters.</p>
        <p><sup>3</sup> He restores my soul. He leads me in paths of righteousness for his name’s sake.</p>
        <button className={`verse ${selected ? "selected" : ""}`} onClick={() => setSelected(true)}>
          <sup>4</sup> Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.
        </button>
        <p><sup>5</sup> You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.</p>
      </article>
      <p className="reader-hint">{selected ? "Psalm 23:4 selected" : "Tap a verse to reflect"}</p>
      {selected && <VerseActions go={go} close={() => setSelected(false)} />}
    </main>
  );
}

function VerseActions({ go, close }: { go: (v: View) => void; close: () => void }) {
  const actions: { icon: IconName; label: string }[] = [
    { icon: "pen", label: "Highlight" }, { icon: "journal", label: "Note" }, { icon: "bookmark", label: "Bookmark" }, { icon: "share", label: "Share" }, { icon: "more", label: "More" },
  ];
  return (
    <div className="sheet-backdrop" onClick={close}>
      <section className="action-sheet" onClick={(event) => event.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="selected-reference"><span>Psalm 23:4</span><p>“Even though I walk through the valley… you are with me.”</p></div>
        <button className="primary-button" onClick={() => go("reflect")}><Icon name="spark" size={18} /> Reflect on this verse</button>
        <div className="action-grid">{actions.map((action) => <button key={action.label}><Icon name={action.icon} /><span>{action.label}</span></button>)}</div>
      </section>
    </div>
  );
}

function Reflection({ go }: { go: (view: View) => void }) {
  const [type, setType] = useState("Reflection");
  const [text, setText] = useState("I’m realizing that I keep waiting for certainty before trusting God.");
  const [saved, setSaved] = useState(false);
  const [prompt, setPrompt] = useState(true);
  const [suggestedTags, setSuggestedTags] = useState(["Trust", "Uncertainty", "Control"]);
  const save = () => { setSaved(true); window.setTimeout(() => go("journal"), 800); };
  return (
    <main className="composer-screen">
      <ScreenHeader title="New reflection" back={() => go("reader")} right={<button className="header-save" onClick={save}>Save</button>} />
      <section className="verse-quote">
        <span>Psalm 23:4</span>
        <p>“Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.”</p>
      </section>
      <div className="type-chips">{noteTypes.map((item) => <button key={item} className={type === item ? "active" : ""} onClick={() => setType(item)}>{item}</button>)}</div>
      <section className="writing-area">
        <label htmlFor="reflection">What are you noticing?</label>
        <textarea id="reflection" value={text} onChange={(event) => setText(event.target.value)} placeholder="I’m reminded that…" autoFocus />
        <IconButton name="mic" label="Use voice input" />
      </section>
      {prompt && <section className="ai-writing-prompt">
        <div><Icon name="spark" size={15} /><span><strong>Want to go deeper?</strong><small>AI-generated suggestion</small></span></div>
        <p>What makes certainty feel necessary right now?</p>
        <div className="ai-actions"><button onClick={() => setText(`${text}\n\nWhat makes certainty feel necessary right now?`)}>Add prompt</button><button onClick={() => setPrompt(false)}>Dismiss</button></div>
      </section>}
      <section className="suggested-tags">
        <div><Icon name="spark" size={13} /><span>Possible themes</span><small>AI-generated suggestions</small></div>
        <div>{suggestedTags.map((tag) => <button key={tag} onClick={() => setSuggestedTags(suggestedTags.filter((item) => item !== tag))}>{tag}<span>×</span></button>)}<button className="edit-tags">Edit</button></div>
      </section>
      <button className="primary-button composer-save" onClick={save}><Icon name="check" size={18} /> Save {type.toLowerCase()}</button>
      {saved && <div className="save-toast"><span><Icon name="check" size={16} /></span> Reflection saved to Psalm 23:4</div>}
    </main>
  );
}

function VerseDetail({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen verse-detail">
      <ScreenHeader title="Psalm 23:4" back={() => go("reader")} right={<IconButton name="more" label="More options" />} />
      <section className="detail-verse"><span className="ornament">23</span><blockquote>“Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.”</blockquote><small>English Standard Version</small></section>
      <div className="section-heading"><h2>Your notes</h2><button onClick={() => go("reflect")}><Icon name="plus" size={16} /> Add</button></div>
      <article className="memory-card"><div className="note-meta"><span className="note-label reflection">Reflection</span><span>Today</span></div><p>I don’t need to understand the valley to trust that God is walking through it with me.</p></article>
      <article className="memory-card prayer-card"><div className="note-meta"><span className="note-label prayer">Prayer</span><span>June 12</span></div><p>Help me trust You even when I cannot see what comes next.</p></article>
      <section className="ai-connections">
        <div className="ai-heading"><span className="spark-badge"><Icon name="spark" size={15} /></span><div><p className="eyebrow gold">Related to your journal</p><small>AI suggestion · 3 related reflections</small></div></div>
        {[
          ["Romans 8:28", "Uncertainty doesn’t mean God is absent."],
          ["Isaiah 41:10", "I need to remember that fear doesn’t mean I’m alone."],
          ["Philippians 4:6", "Bring the worry to God instead of rehearsing it."],
        ].map(([reference, text]) => <button key={reference} onClick={() => go("theme")}><span>{reference}</span><p>“{text}”</p><Icon name="chevron" size={15} /></button>)}
        <button className="why-link">Why am I seeing this?</button>
      </section>
      <div className="connection-line"><span /><p>2 memories connected to this verse</p><span /></div>
      <button className="journal-link" onClick={() => go("journal")}>View reflection in Journal <Icon name="chevron" size={16} /></button>
    </main>
  );
}

const entries = [
  { type: "Insight", ref: "Romans 8:28", text: "I’m beginning to see that redemption is often quieter and slower than I expect.", date: "June 18" },
  { type: "Prayer", ref: "Psalm 23:4", text: "Help me trust You even when I cannot see what comes next.", date: "June 18" },
  { type: "Reflection", ref: "Matthew 6:34", text: "I’ve been worrying about days I haven’t been asked to carry yet.", date: "June 16" },
  { type: "Application", ref: "James 1:19", text: "Today I will listen completely before preparing my answer.", date: "June 14" },
];

function Journal({ go }: { go: (view: View) => void }) {
  const [filter, setFilter] = useState("All");
  return (
    <main className="screen scroll-screen">
      <div className="title-row"><div><p className="eyebrow">Your spiritual memory</p><h1>Journal</h1></div><IconButton name="search" label="Search journal" onClick={() => go("search")} /></div>
      <div className="filter-row">{["All", "Reflections", "Prayers", "Insights"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <section className="journal-themes">
        <div className="section-heading"><h2>Themes in your journal</h2><span>Possible AI-generated themes</span></div>
        <div className="theme-bars">
          {[["Trust", 18, "bar-100"], ["Control", 12, "bar-72"], ["Fear", 9, "bar-54"], ["Prayer", 8, "bar-46"], ["Patience", 6, "bar-35"]].map(([name, count, width]) => (
            <button key={name} onClick={() => go("theme")}><span>{name}</span><i><b className={String(width)} /></i><small>{count} entries</small></button>
          ))}
        </div>
        <button className="ask-action" onClick={() => go("ask")}><Icon name="spark" size={16} /><span><strong>Ask about my journal</strong><small>Explore themes and connections</small></span><Icon name="chevron" size={16} /></button>
      </section>
      <div className="timeline">
        {entries.filter((entry) => filter === "All" || `${entry.type}s` === filter).map((entry, index) => (
          <article className="timeline-entry" key={entry.ref + entry.type} onClick={() => go("verse")}>
            {(index === 0 || entries[index - 1]?.date !== entry.date) && <span className="timeline-date">{entry.date}</span>}
            <div className="timeline-dot" />
            <div className="entry-content"><div className="note-meta"><span className={`note-label ${entry.type.toLowerCase()}`}>{entry.type}</span><span>{entry.ref}</span></div><p>“{entry.text}”</p><div className="entry-tags"><span>Trust</span><span>{index % 2 ? "Prayer" : "Uncertainty"}</span><small><Icon name="spark" size={10} /> Possible themes</small></div><small>Connected to Scripture <Icon name="chevron" size={13} /></small></div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Study({ go }: { go: (view: View) => void }) {
  const [step, setStep] = useState(0);
  const stages = ["Read", "Notice", "Reflect", "Pray", "Apply"];
  return (
    <main className="screen study-screen">
      <ScreenHeader title="Psalm 23" eyebrow="Guided study" back={() => go("home")} />
      <div className="study-progress five">{stages.map((item, index) => <button className={index <= step ? "active" : ""} key={item} onClick={() => setStep(index)}><span>{index < step ? <Icon name="check" size={11} /> : index + 1}</span><small>{item}</small></button>)}</div>
      {step < 2 ? <>
        <section className="study-hero"><span className="large-number">0{step + 1}</span><p className="eyebrow gold">{step === 0 ? "Begin with the text" : "Pause and notice"}</p><h1>{step === 0 ? <>Read slowly.<br />Notice what stays.</> : <>What word or phrase<br />holds your attention?</>}</h1><p>{step === 0 ? "Let the words have your full attention. You don’t need to solve or explain anything yet." : "There is no right answer. Mark the words that seem to ask you to stay a little longer."}</p></section>
        <blockquote className="study-verse">“The Lord is my shepherd; I shall not want.”<span>Psalm 23:1</span></blockquote>
      </> : <section className="study-reflect">
        <p className="eyebrow gold">{stages[step]}</p>
        <h1>{step === 2 ? "Make room for what you noticed." : step === 3 ? "Turn your attention into prayer." : "Carry one thing with you."}</h1>
        {step === 2 && <><label htmlFor="study-note">What does “He restores my soul” mean to you personally?</label><textarea id="study-note" defaultValue="Rest might begin when I stop trying to control every outcome." /><div className="study-ai"><Icon name="spark" size={15} /><div><span>Possible connection</span><p>Your reflection seems connected to recent notes about rest and control.</p><button onClick={() => go("theme")}>Explore connection</button></div></div></>}
        {step === 3 && <textarea aria-label="Write a prayer" placeholder="Help me trust You when…" />}
        {step === 4 && <textarea aria-label="Write an application" placeholder="Today, I will…" />}
      </section>}
      <button className="primary-button" onClick={() => step < 4 ? setStep(step + 1) : go("journal")}>{step === 4 ? "Complete study" : `Continue to ${stages[step + 1]}`} <Icon name="chevron" size={18} /></button>
      <button className="quiet-button" onClick={() => go("home")}>Save for later</button>
    </main>
  );
}

function Search({ go }: { go: (view: View) => void }) {
  const [query, setQuery] = useState("How have I been learning to trust God?");
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState<"success" | "loading" | "empty">("success");
  const results = [
    ["Psalm 23:4", "I’m learning that faith is walking even when I can’t see the whole path."],
    ["Romans 8:28", "I don’t always understand what is happening, but I’m learning that uncertainty doesn’t mean God is absent."],
    ["Isaiah 41:10", "I need to remember that fear doesn’t mean I’m alone."],
    ["Philippians 4:6", "I’ve been carrying the same worry for weeks…"],
  ];
  return (
    <main className="screen scroll-screen">
      <ScreenHeader title="Search your journal" back={() => go("home")} />
      <div className="search-field semantic"><Icon name="search" size={19} /><textarea aria-label="Search" value={query} onChange={(event) => setQuery(event.target.value)} /><button onClick={() => { setStatus("loading"); window.setTimeout(() => setStatus(query ? "success" : "empty"), 650); }}>Search</button></div>
      <div className="filter-row search-filters">{["All", "Scripture", "Themes", "Recent"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      {status === "loading" && <div className="ai-state"><span className="searching-mark"><Icon name="spark" size={16} /></span><strong>Looking through your journal…</strong><small>Finding connections</small></div>}
      {status === "empty" && <div className="ai-state"><span><Icon name="search" size={18} /></span><strong>I couldn’t find a strong connection yet.</strong><small>Try a broader question. Your journal is safe.</small></div>}
      {status === "success" && <><div className="ai-found"><Icon name="spark" size={14} /><span>AI found 6 related reflections</span><small>Related by meaning, not only keywords</small></div>
      <p className="result-label">Your journal <span>6 related reflections</span></p>
      <div className="semantic-results">{results.map(([reference, text], index) => <button key={reference} onClick={() => go("verse")}><span>{reference}</span><b>{index < 2 ? "Strong connection" : "Related"}</b><p>“{text}”</p><small>Reflection · Related to trust</small><Icon name="chevron" size={15} /></button>)}</div>
      <p className="result-label connections-label">Scripture connections <span>Suggested related passages</span></p>
      <div className="passage-chips">{["Psalm 37:5", "Proverbs 3:5–6", "Matthew 6:34"].map((passage) => <button key={passage} onClick={() => go("reader")}>{passage}<Icon name="chevron" size={14} /></button>)}</div></>}
    </main>
  );
}

function ThemeDetail({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen theme-detail">
      <ScreenHeader title="Trust" eyebrow="Journal theme" back={() => go("journal")} right={<IconButton name="more" label="Theme options" />} />
      <section className="theme-hero"><span>Trust</span><h1>Learning to walk<br />without certainty.</h1><div><small>18 journal entries</small><small>7 Bible passages</small><small>4 prayers</small></div></section>
      <section className="theme-summary"><div className="ai-heading"><Icon name="spark" size={15} /><div><p className="eyebrow gold">A pattern in your writing</p><small>AI-generated summary</small></div></div><p>Your recent reflections often connect trust with uncertainty and control.</p><div className="theme-chips"><span>Trust</span><span>Uncertainty</span><span>Control</span></div><button className="why-link">Edit themes · Why am I seeing this?</button></section>
      <div className="section-heading theme-entries-title"><h2>Related entries</h2><span>Most relevant</span></div>
      {entries.slice(0, 3).map((entry) => <article className="theme-entry" key={entry.ref}><span>{entry.ref}</span><p>“{entry.text}”</p><small>{entry.type} · {entry.date}</small></article>)}
      <section className="explore-further"><p className="eyebrow">Explore further</p><div>{["Psalm 23", "Romans 8", "Philippians 4"].map((passage) => <button key={passage} onClick={() => go("reader")}>{passage}<Icon name="chevron" size={14} /></button>)}</div></section>
      <button className="ask-action standalone" onClick={() => go("ask")}><Icon name="spark" size={16} /><span><strong>Ask about this theme</strong><small>Explore your journal gently</small></span><Icon name="chevron" size={16} /></button>
    </main>
  );
}

function AskJournal({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen ask-screen">
      <ScreenHeader title="Ask your journal" back={() => go("theme")} right={<IconButton name="more" label="Conversation options" />} />
      <div className="privacy-line"><Icon name="spark" size={13} />Based only on your private journal</div>
      <section className="journal-question"><span>Your question</span><p>What themes have been showing up in my reflections lately?</p></section>
      <section className="journal-answer">
        <div className="ai-heading"><span className="spark-badge"><Icon name="spark" size={15} /></span><div><p className="eyebrow gold">From your journal</p><small>AI-generated summary</small></div></div>
        <p>You’ve been returning to three themes:</p>
        <ol><li>Trust during uncertainty</li><li>Letting go of control</li><li>Finding peace through prayer</li></ol>
        <p>Your reflections connect these themes across <button onClick={() => go("verse")}>Psalm 23</button>, Philippians 4, Matthew 6, and Romans 8.</p>
        <button className="why-link">Why am I seeing this? · Dismiss</button>
      </section>
      <p className="suggested-label">You could also ask</p>
      <div className="suggested-questions">{["What Scripture do I return to most?", "What have I been praying about?", "Show me my reflections about fear.", "What themes appeared this month?"].map((question) => <button key={question}>{question}<Icon name="chevron" size={15} /></button>)}</div>
      <div className="ask-input"><input aria-label="Ask about your journal" placeholder="Ask about your journal…" /><IconButton name="arrow" label="Send question" /></div>
      <button className="return-journal" onClick={() => go("journal")}><Icon name="journal" size={16} /> Return to Journal</button>
    </main>
  );
}

function WeeklyReview({ go }: { go: (view: View) => void }) {
  return (
    <main className="screen scroll-screen weekly-screen">
      <ScreenHeader title="Your week in Scripture" back={() => go("home")} right={<IconButton name="share" label="Share weekly review" />} />
      <section className="week-opening"><p className="eyebrow gold">June 12–18</p><h1>A week of returning<br />to trust.</h1><p>A quiet look at where you spent time—not a score to improve.</p></section>
      <section className="week-stats">{[["7", "Reflections"], ["4", "Prayers"], ["9", "Highlights"], ["5", "Chapters"]].map(([count, label]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}</section>
      <section className="week-themes"><p className="eyebrow">Your themes</p><div><button onClick={() => go("theme")}>Trust</button><span>Control</span><span>Rest</span></div></section>
      <section className="returned-passage"><div><p className="eyebrow gold">Most returned to</p><h2>Psalm 23</h2><span>Visited 3 times</span></div><span className="week-chapter">23</span></section>
      <section className="week-insight"><div className="ai-heading"><Icon name="spark" size={15} /><div><p className="eyebrow gold">A reflection from your week</p><small>Based on your journal</small></div></div><p>You returned to Psalm 23 three times this week. Your notes often connect the passage with learning to trust during uncertain situations.</p><button className="why-link">Why am I seeing this?</button></section>
      <section className="continue-path"><p className="eyebrow">Continue exploring</p><button onClick={() => go("reader")}><span>Psalm 23</span><Icon name="chevron" size={15} /><span>Romans 8</span><Icon name="chevron" size={15} /><span>Philippians 4</span></button></section>
      <button className="primary-button" onClick={() => go("journal")}>Return to Journal</button>
    </main>
  );
}

const highlights = [
  { category: "Insight", reference: "Psalm 23:1–2", text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures." },
  { category: "Promise", reference: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God." },
  { category: "Prayer", reference: "Philippians 4:6", text: "In everything by prayer and supplication with thanksgiving let your requests be made known to God." },
  { category: "Important", reference: "Matthew 6:34", text: "Do not be anxious about tomorrow, for tomorrow will be anxious for itself." },
];

function Highlights({ go }: { go: (view: View) => void }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Insight", "Question", "Promise", "Prayer", "Important"];
  const visible = highlights.filter((item) => category === "All" || item.category === category);
  return (
    <main className="screen scroll-screen">
      <ScreenHeader title="Highlights" back={() => go("bible")} right={<IconButton name="search" label="Search highlights" onClick={() => go("search")} />} />
      <p className="highlights-intro">Verses that asked you to pause.</p>
      <div className="highlight-filters">{categories.map((item) => <button key={item} className={`${item.toLowerCase()} ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}><span />{item}</button>)}</div>
      {visible.length ? <div className="highlight-list">{visible.map((item) => (
        <article key={item.reference} className={`highlight-entry ${item.category.toLowerCase()}`} onClick={() => go("verse")}>
          <div><span>{item.category}</span><small>{item.reference}</small></div>
          <p>“{item.text}”</p>
          <small>English Standard Version</small>
        </article>
      ))}</div> : <section className="empty-state"><span className="empty-symbol"><Icon name="book" size={26} /></span><h2>No questions yet.</h2><p>When a verse makes you curious, press and hold it to save it here.</p><button className="primary-button" onClick={() => go("reader")}>Open the Bible</button></section>}
    </main>
  );
}

function Settings({ go }: { go: (view: View) => void }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === "dark" ? "Dark" : document.documentElement.dataset.theme === "sepia" ? "Sepia" : "Light");
  const [aiEnabled, setAiEnabled] = useState(true);
  const applyTheme = (nextTheme: string) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme.toLowerCase();
  };
  return (
    <main className="screen scroll-screen">
      <ScreenHeader title="Reading settings" back={() => go("home")} />
      <p className="settings-label">Theme</p>
      <div className="theme-grid">{["Light", "Sepia", "Dark"].map((item) => <button key={item} className={`${item.toLowerCase()} ${theme === item ? "active" : ""}`} onClick={() => applyTheme(item)}><span>Aa</span><small>{item}</small></button>)}</div>
      <p className="settings-label">Reading</p>
      <div className="settings-list">
        {["Text size", "Reading preferences", "Bible translation", "Notifications", "Privacy", "Export journal"].map((item) => <button key={item}><span>{item}</span><span className="setting-value">{item === "Text size" ? "Medium" : item === "Bible translation" ? "ESV" : ""}<Icon name="chevron" size={17} /></span></button>)}
      </div>
      <p className="settings-label">Study Companion</p>
      <section className="ai-privacy">
        <div><span><strong>AI Journal Analysis</strong><small>Allow AI features to analyze your journal to find themes and connections.</small></span><button className={`toggle ${aiEnabled ? "on" : ""}`} onClick={() => setAiEnabled(!aiEnabled)} aria-label="Toggle AI journal analysis"><i /></button></div>
        <button onClick={() => setAiEnabled(false)}>Turn off AI analysis</button><button>Delete AI insights</button><button>Clear AI history</button>
      </section>
      <p className="settings-note">Your journal is private. Reflections are stored securely and are never shared without your permission.</p>
      <div className="wordmark"><span>Bible</span><strong>Notetaker</strong><Icon name="spark" size={11} /></div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const go = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const screens: Record<View, ReactNode> = {
    home: <Home go={go} />, bible: <Bible go={go} />, reader: <Reader go={go} />, reflect: <Reflection go={go} />,
    verse: <VerseDetail go={go} />, journal: <Journal go={go} />, study: <Study go={go} />, search: <Search go={go} />, settings: <Settings go={go} />,
    highlights: <Highlights go={go} />, theme: <ThemeDetail go={go} />, ask: <AskJournal go={go} />, review: <WeeklyReview go={go} />,
  };
  const hideNav = ["reader", "reflect", "verse", "search", "settings", "theme", "ask", "review"].includes(view);
  return <div className="app-shell"><div className="phone-frame">{screens[view]}{!hideNav && <BottomNav view={view} go={go} />}</div></div>;
}
