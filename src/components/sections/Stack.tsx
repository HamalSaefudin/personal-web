const core = [
  {
    name: "React Native",
    detail: "Primary tool for shipping Android and iOS apps.",
  },
  {
    name: "ReactJS",
    detail: "Where I started: web interfaces at Quadrant Synergy and Danamas.",
  },
  {
    name: "Flutter",
    detail: "Used for freelance client apps at KODEGIRI.",
  },
  {
    name: "TypeScript",
    detail: "Typed code across React and React Native projects.",
  },
];

const tools = [
  { label: "Platforms", value: "Android, iOS" },
  { label: "Web", value: "JavaScript, HTML, CSS" },
  { label: "Data & APIs", value: "REST APIs, JSON" },
  { label: "Tooling", value: "Git, Android Studio, Xcode, Figma" },
];

export function Stack() {
  return (
    <>
      <ul className="core">
        {core.map((item) => (
          <li key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ul>
      <dl className="tools">
        {tools.map((tool) => (
          <div key={tool.label}>
            <dt>{tool.label}</dt>
            <dd>{tool.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
