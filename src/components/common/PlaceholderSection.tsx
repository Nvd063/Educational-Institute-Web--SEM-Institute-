import { Panel } from "./Card";

export function PlaceholderSection({ points }: { points: string[] }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Panel className="max-w-2xl">
          <h2 className="text-xl">Content in preparation</h2>
          <p className="mt-2 text-sm text-muted-foreground">This section will cover:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {points.map((point) => (
              <li key={point} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </section>
  );
}
