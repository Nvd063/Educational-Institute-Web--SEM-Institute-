import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, useCallback, useMemo } from "react";
import { Search, FileQuestion } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { Panel } from "../components/common/Card";
import { Button } from "../components/ui/button";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { searchByRollNumber } from "../lib/results";
import type { StudentResult } from "../types/results";

export const Route = createFileRoute("/results")({
  beforeLoad: () => {
    throw redirect({ to: "/syllabus", hash: "results" });
  },
});


const title = "Evaluations & Results";
const description = "Search student results and board performance by roll number.";

type SearchStatus = "idle" | "searching" | "found" | "not-found" | "empty";

function ResultsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<StudentResult | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetSearch = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setResult(null);
    setStatus("idle");
  }, []);

  const runSearch = useCallback((rollNumber: string) => {
    const trimmed = rollNumber.trim();
    if (!trimmed) {
      setStatus("empty");
      setResult(null);
      return;
    }

    setStatus("searching");
    setResult(null);

    timeoutRef.current = setTimeout(() => {
      const found = searchByRollNumber(trimmed);
      if (found) {
        setResult(found);
        setStatus("found");
      } else {
        setStatus("not-found");
      }
      timeoutRef.current = null;
    }, 450);
  }, []);

  const performSearch = useCallback(() => {
    runSearch(query);
  }, [query, runSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    },
    [performSearch],
  );

  const exampleRollNumbers = useMemo(
    () => ["2025-101", "2025-103", "2025-202", "2025-401", "2025-601"],
    [],
  );

  const isSearching = status === "searching";

  return (
    <MainLayout>
      <PageHeader eyebrow="Academics" title={title} description={description} />

      <section className="relative section-y overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10 max-w-3xl">
          <Panel className="overflow-hidden">
            <div className="border-b border-border bg-surface px-6 py-5 sm:px-8">
              <h2 className="text-lg">Result search</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the roll number issued on your admit card to view the result card.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="rollNumber" className="sr-only">
                  Roll number
                </label>
                <input
                  id="rollNumber"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  placeholder="e.g. 2025-101"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (status === "empty" || status === "not-found") setStatus("idle");
                    if (result) {
                      resetSearch();
                      setQuery(e.target.value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-royal"
                  aria-invalid={status === "empty"}
                  aria-describedby={status === "empty" ? "search-error" : undefined}
                />
                <Button onClick={performSearch} disabled={isSearching} className="min-w-[8rem]">
                  <Search className="size-4" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {status === "empty" && (
                <p id="search-error" className="mt-3 text-sm text-destructive">
                  Please enter a roll number to search.
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Try a sample roll number:</span>
                {exampleRollNumbers.map((roll) => (
                  <button
                    key={roll}
                    type="button"
                    onClick={() => {
                      setQuery(roll);
                      runSearch(roll);
                    }}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-royal/40 hover:bg-secondary"
                  >
                    {roll}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              {isSearching && <SearchingState />}
              {status === "not-found" && <NotFoundState query={query} />}
              {status === "found" && result && <ResultCard result={result} />}
            </div>
          </Panel>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Results shown are for demonstration. Data is loaded from a local JSON file and no
            personal information beyond the student name is stored or displayed.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}

function SearchingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface py-12 text-center">
      <div className="mb-4 size-8 animate-spin rounded-full border-2 border-border border-t-royal" />
      <p className="text-sm font-medium text-navy">Searching records...</p>
      <p className="mt-1 text-xs text-muted-foreground">This may take a moment.</p>
    </div>
  );
}

function NotFoundState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface py-12 text-center">
      <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="size-6 text-muted-foreground" />
      </div>
      <p className="font-medium text-navy">No result found</p>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        We could not find a record for roll number{" "}
        <strong className="text-foreground">{query}</strong>. Double-check the number and try again.
      </p>
    </div>
  );
}

function ResultCard({ result }: { result: StudentResult }) {
  const gradeColor = getGradeColor(result.grade);

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">
            {result.className} · Session {result.session}
          </p>
          <h3 className="mt-1">{result.studentName}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Roll number: <span className="font-medium text-foreground">{result.rollNumber}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 sm:text-right">
          <div className="rounded-lg bg-navy px-4 py-2 text-navy-foreground">
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Grade</p>
            <p className="font-heading text-2xl font-semibold">{result.grade}</p>
          </div>
          <div className="rounded-lg bg-surface px-4 py-2">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Percentage</p>
            <p className="font-heading text-2xl font-semibold text-navy">{result.percentage}%</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-navy">Subject-wise marks</h4>
        <div className="mt-3 space-y-3">
          {result.subjects.map((subject) => (
            <SubjectRow key={subject.name} subject={subject} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
        <SummaryTile label="Total marks" value={`${result.obtainedMarks} / ${result.totalMarks}`} />
        <SummaryTile label="Percentage" value={`${result.percentage}%`} />
        <SummaryTile label="Grade" value={result.grade} valueClassName={gradeColor} />
      </div>
    </div>
  );
}

function SubjectRow({
  subject,
}: {
  subject: { name: string; totalMarks: number; obtainedMarks: number };
}) {
  const percentage = Math.max(0, Math.min(100, (subject.obtainedMarks / subject.totalMarks) * 100));
  const barColor = percentage >= 80 ? "bg-gold" : percentage >= 60 ? "bg-royal" : "bg-destructive";

  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_6rem] sm:items-center">
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-navy">{subject.name}</span>
          <span className="text-muted-foreground">
            {subject.obtainedMarks} / {subject.totalMarks}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="text-right text-sm font-semibold text-navy sm:pl-2">{percentage.toFixed(1)}%</p>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  valueClassName = "text-navy",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-md bg-surface px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-heading text-xl font-semibold ${valueClassName}`}>{value}</p>
    </div>
  );
}

function getGradeColor(grade: string): string {
  if (grade.startsWith("A+")) return "text-gold";
  if (grade.startsWith("A")) return "text-royal";
  if (grade.startsWith("B")) return "text-navy";
  if (grade.startsWith("C")) return "text-muted-foreground";
  if (grade.startsWith("D")) return "text-destructive";
  if (grade === "F") return "text-destructive";
  return "text-navy";
}
