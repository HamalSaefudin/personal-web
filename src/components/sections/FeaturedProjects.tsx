const projects = [
  {
    title: "DDMS Mobile Apps",
    category: "Mobile app",
    year: "2023",
    tech: ["React Native", "Expo SDK", "Redux"],
    link: "https://play.google.com/store/apps/details?id=id.co.dayagroup.ddms",
  },
  {
    title: "Prohace",
    category: "HR tech",
    year: "2023",
    tech: ["React Native", "Flutter", "Redux Saga"],
    link: "https://play.google.com/store/apps/details?id=com.eksad.cx.prohace",
  },
  {
    title: "Danamas App",
    category: "Fintech",
    year: "2023",
    tech: ["React Native", "TypeScript", "Jest"],
    link: "https://play.google.com/store/apps/details?id=com.danamas.mergingapp",
  },
  {
    title: "Mantis Go",
    category: "Mobile app",
    year: "2022",
    tech: ["React Native", "SQLite", "Redux Toolkit"],
    link: "https://play.google.com/store/apps/details?id=com.mantisgo",
  },
];

export function FeaturedProjects() {
  return (
    <>
      <ol className="work">
        {projects.map((project, index) => (
          <li className="card" key={project.title}>
            <span className="idx" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{project.title}</h3>
            <p className="meta">
              {project.category} · {project.year}
            </p>
            <ul className="tech">
              {project.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="go">
              <a className="link" href={project.link} rel="noopener" target="_blank">
                Open on Play Store
              </a>
            </div>
          </li>
        ))}
      </ol>
      <p className="note">
        More builds, including Miruum and Mirecruit, are shared on request. Code samples live on{" "}
        <a className="link" href="https://github.com/hamalsaefudin" rel="noopener" target="_blank">
          GitHub
        </a>
        .
      </p>
    </>
  );
}
