export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="badge">T</div>
            <div>
              <div style={{ fontWeight: 800 }}>Tools</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>tools.drwan.com</div>
            </div>
          </div>
          <nav className="nav">
            <a href="/">All</a>
            <a href="/bmi">BMI</a>
            <a href="/bmr">BMR</a>
            <a href="/tdee">TDEE</a>
            <a href="/heart-rate">Heart</a>
            <a href="/glucose">Glucose</a>
            <a href="/a1c">A1c</a>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
