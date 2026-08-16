import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { site } from "../../data/site";
import {
  type AdmissionFormValues,
  type FormErrors,
  buildSummary,
  classOptions,
  defaultValues,
  provinces,
  relationships,
  reviewGroups,
  stepFields,
  steps,
  validateAll,
  validateField,
  validateStep,
} from "./formConfig";

const DRAFT_KEY = "sirat-admission-draft";
const OFFICE_WHATSAPP = site.whatsapp.replace(/[^0-9]/g, "");
const OFFICE_EMAIL = site.email;

type FieldProps = {
  id: keyof AdmissionFormValues;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
  hint?: string | undefined;
};

function Field({ id, label, error, children, hint }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

const selectClass =
  "flex min-h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-sm";

export function AdmissionForm() {
  const [values, setValues] = useState<AdmissionFormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"editing" | "submitting" | "success">("editing");
  const [submitted, setSubmitted] = useState<AdmissionFormValues | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(DRAFT_KEY);
      if (stored) setValues({ ...defaultValues, ...JSON.parse(stored) });
    } catch {
      /* ignore unreadable draft */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch {
      /* storage unavailable */
    }
  }, [values]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  const current = steps[step - 1] ?? steps[0];
  const progress = useMemo(() => Math.round(((step - 1) / (steps.length - 1)) * 100), [step]);

  const setField = (field: keyof AdmissionFormValues) => (value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      setErrors((prevErrors) =>
        prevErrors[field] ? { ...prevErrors, [field]: validateField(field, next) } : prevErrors,
      );
      return next;
    });
  };

  const blur = (field: keyof AdmissionFormValues) => () =>
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));

  const inputProps = (field: keyof AdmissionFormValues) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setField(field)(event.target.value),
    onBlur: blur(field),
    "aria-invalid": Boolean(errors[field]),
    ...(errors[field] ? { "aria-describedby": `${field}-error` } : {}),
  });

  const goNext = () => {
    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      const firstField = (stepFields[step] ?? []).find((field) => stepErrors[field]);
      if (firstField) document.getElementById(firstField)?.focus();
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < steps.length) {
      goNext();
      return;
    }
    const allErrors = validateAll(values);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const firstStep = [1, 2, 3, 4].find((s) => (stepFields[s] ?? []).some((f) => allErrors[f]));
      if (firstStep) setStep(firstStep);
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitted(values);
    setStatus("success");
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
    setStep(1);
    setSubmitted(null);
    setStatus("editing");
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
  };

  if (status === "success" && submitted) {
    const summary = buildSummary(submitted);
    const waMessage = `Assalam-o-Alaikum, I would like to submit an admission application.\n\n${summary}`;
    const whatsappHref = `https://wa.me/${OFFICE_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
    const mailtoHref = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
      `Admission Application — ${submitted.studentName} (${submitted.classApplyingFor})`,
    )}&body=${encodeURIComponent(
      `Assalam-o-Alaikum,\n\nPlease find the admission application details below.\n\n${summary}\n\nRegards,\n${submitted.guardianName}\n${submitted.guardianPhone}`,
    )}`;

    return (
      <div
        ref={headingRef}
        className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-royal" />
          <div className="min-w-0">
            <h3 className="text-navy">Application prepared successfully.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your details are saved on this device. Send them to the admissions office using either
              option below, then bring the original documents to the campus for verification.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="min-h-11 w-full">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              <span>Send via WhatsApp</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-11 w-full">
            <a href={mailtoHref}>
              <Mail className="size-4" />
              <span>Send via Email</span>
            </a>
          </Button>
        </div>

        <div className="mt-6 rounded-lg bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Submitted summary
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words font-sans text-sm text-foreground">
            {summary}
          </pre>
        </div>

        <Button variant="ghost" className="mt-5 min-h-11" onClick={reset}>
          <RotateCcw className="size-4" />
          <span>Start a new application</span>
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-8"
    >
      <div ref={headingRef} className="scroll-mt-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">
              Step {step} of {steps.length}
            </p>
            <h3 className="mt-1 truncate text-navy">{current.heading}</h3>
          </div>
          <span className="shrink-0 text-sm font-semibold text-muted-foreground">{progress}%</span>
        </div>

        <div
          className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step}
          aria-label="Application progress"
        >
          <div
            className="h-full rounded-full bg-royal transition-all duration-300"
            style={{ width: `${Math.max(progress, 6)}%` }}
          />
        </div>

        <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {steps.map((item) => {
            const done = item.id < step;
            const active = item.id === step;
            return (
              <li key={item.id} className="flex items-center gap-1.5">
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                    done
                      ? "border-royal bg-royal text-primary-foreground"
                      : active
                        ? "border-royal text-royal"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="size-3" /> : item.id}
                </span>
                <span className={active ? "font-semibold text-navy" : "text-muted-foreground"}>
                  {item.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-7 space-y-5">
        {step === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id="studentName" label="Student full name" error={errors.studentName}>
                <Input
                  {...inputProps("studentName")}
                  placeholder="Kanzul Iman"
                  autoComplete="name"
                />
              </Field>
            </div>
            <Field id="dateOfBirth" label="Date of birth" error={errors.dateOfBirth}>
              <Input {...inputProps("dateOfBirth")} type="date" />
            </Field>
            <Field id="gender" label="Gender" error={errors.gender}>
              <select {...inputProps("gender")} className={selectClass}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>
            <Field
              id="bFormNumber"
              label="B-Form / CNIC number"
              error={errors.bFormNumber}
              hint="Format 42101-1234567-1"
            >
              <Input
                {...inputProps("bFormNumber")}
                inputMode="numeric"
                placeholder="42101-8765432-1"
              />
            </Field>
            <Field id="studentEmail" label="Email address" error={errors.studentEmail}>
              <Input
                {...inputProps("studentEmail")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="kanzuliman2k21@gmail.com"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id="studentPhone"
                label="Phone number"
                error={errors.studentPhone}
                hint="Pakistani format, e.g. +92 300 1234567"
              >
                <Input
                  {...inputProps("studentPhone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+92 300 1234567"
                />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id="guardianName" label="Parent / guardian name" error={errors.guardianName}>
                <Input {...inputProps("guardianName")} placeholder="Muhammad Imran Siddiqui" />
              </Field>
            </div>
            <Field id="relationship" label="Relationship to student" error={errors.relationship}>
              <select {...inputProps("relationship")} className={selectClass}>
                <option value="">Select relationship</option>
                {relationships.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              id="guardianCnic"
              label="CNIC number"
              error={errors.guardianCnic}
              hint="Format 42101-1234567-9"
            >
              <Input {...inputProps("guardianCnic")} inputMode="numeric" />
            </Field>
            <Field id="guardianOccupation" label="Occupation" error={errors.guardianOccupation}>
              <Input {...inputProps("guardianOccupation")} placeholder="Textile Business Owner" />
            </Field>
            <Field
              id="guardianPhone"
              label="Mobile number"
              error={errors.guardianPhone}
              hint="e.g. +92 321 4567890"
            >
              <Input {...inputProps("guardianPhone")} type="tel" inputMode="tel" />
            </Field>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="classApplyingFor" label="Class applying for" error={errors.classApplyingFor}>
              <select {...inputProps("classApplyingFor")} className={selectClass}>
                <option value="">Select class</option>
                {classOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="lastClassPassed" label="Last class passed" error={errors.lastClassPassed}>
              <Input {...inputProps("lastClassPassed")} placeholder="Class VIII" />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id="previousSchool"
                label="Previous school / college"
                error={errors.previousSchool}
              >
                <Input
                  {...inputProps("previousSchool")}
                  placeholder="Sirat-e-Mustaqeem Educational System, Karachi"
                />
              </Field>
            </div>
            <Field id="lastPercentage" label="Last result percentage" error={errors.lastPercentage}>
              <Input {...inputProps("lastPercentage")} inputMode="decimal" placeholder="87" />
            </Field>
            <Field
              id="boardOrSystem"
              label="Board / examination system"
              error={errors.boardOrSystem}
            >
              <Input {...inputProps("boardOrSystem")} placeholder="BSEK Karachi" />
            </Field>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id="addressLine" label="Residential address" error={errors.addressLine}>
                <Input {...inputProps("addressLine")} autoComplete="street-address" />
              </Field>
            </div>
            <Field id="city" label="City" error={errors.city}>
              <Input {...inputProps("city")} placeholder="Karachi" autoComplete="address-level2" />
            </Field>
            <Field id="province" label="Province / territory" error={errors.province}>
              <select {...inputProps("province")} className={selectClass}>
                <option value="">Select province</option>
                {provinces.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="postalCode" label="Postal code" error={errors.postalCode}>
              <Input {...inputProps("postalCode")} inputMode="numeric" placeholder="75300" />
            </Field>
            <Field
              id="emergencyContact"
              label="Emergency contact number"
              error={errors.emergencyContact}
            >
              <Input {...inputProps("emergencyContact")} type="tel" inputMode="tel" />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id="message"
                label="Additional notes (optional)"
                error={errors.message}
                hint={`${values.message.length}/600 characters`}
              >
                <Textarea {...inputProps("message")} rows={4} />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please check every detail before submitting. Use Back, or the Edit link on any
              section, to make changes.
            </p>
            {reviewGroups.map((group, index) => (
              <div key={group.heading} className="rounded-lg border border-border bg-surface p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <h4 className="min-w-0 truncate text-base text-navy">{group.heading}</h4>
                  <button
                    type="button"
                    onClick={() => setStep(index + 1)}
                    className="btn-lightening-glimpse shrink-0 text-sm font-semibold text-royal underline-offset-4 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  {group.fields.map(([key, label]) => (
                    <div key={key} className="min-w-0">
                      <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="break-words text-sm font-medium text-foreground">
                        {values[key]?.trim() ? values[key] : "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 w-full sm:w-auto"
            onClick={goBack}
            disabled={step === 1 || status === "submitting"}
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-h-11 w-full sm:w-auto"
            onClick={reset}
            disabled={status === "submitting"}
          >
            <RotateCcw className="size-4" />
            <span>Reset</span>
          </Button>
        </div>

        {step < steps.length ? (
          <Button type="button" size="lg" className="min-h-11 w-full sm:w-auto" onClick={goNext}>
            <span>Next</span>
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full sm:w-auto"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Preparing…</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Submit application</span>
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
