import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { Reveal } from "../components/common/Reveal";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import { site } from "../data/site";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../utilities/cn";

const title = "Contact Us";
const description =
  "Connect with our office, locate our campus map, or submit a Tarbiyah enquiry. We are here to guide your family.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `${title} | Sirat-e-Mustaqeem Educational System` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Sirat-e-Mustaqeem Educational System` },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const successSectionRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject topic is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message details are required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate a brief submission loader
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Scroll to success notification/actions
      setTimeout(() => {
        successSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        successSectionRef.current?.focus();
      }, 100);
    }, 800);
  };

  // Generate mailto and WhatsApp URLs based on form data
  const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`;
  const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

  const whatsappText = `Assalam-o-Alaikum, I have an inquiry:\n\n*Subject*: ${formData.subject}\n*Name*: ${formData.name}\n*Email*: ${formData.email}\n*Phone*: ${formData.phone || "Not provided"}\n\n*Message*:\n${formData.message}`;
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappText)}`;

  // Default quick WhatsApp contact url
  const quickWhatsappUrl = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(site.whatsappMessage)}`;

  return (
    <MainLayout>
      <PageHeader eyebrow="Connect" title={title} description={description} />

      <section className="relative section-y overflow-hidden">
        <GoldenIslamicBackground variant="medium" />
        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12">
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <h2 className="text-xl font-semibold text-navy mb-6">Office Contact Details</h2>

                <div className="flex flex-col gap-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="size-10 rounded-md bg-secondary text-royal flex items-center justify-center shrink-0">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Campus Address
                      </p>
                      <p className="mt-1 text-sm font-medium text-navy leading-relaxed">
                        {site.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="size-10 rounded-md bg-secondary text-royal flex items-center justify-center shrink-0">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${site.phone}`}
                        className="mt-1 block text-sm font-medium text-navy hover:text-royal transition-colors"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="size-10 rounded-md bg-secondary text-royal flex items-center justify-center shrink-0">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 block text-sm font-medium text-navy hover:text-royal transition-colors"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex gap-4">
                    <div className="size-10 rounded-md bg-secondary text-royal flex items-center justify-center shrink-0">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Office Hours
                      </p>
                      <p className="mt-1 text-sm font-medium text-navy">{site.officeHours}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick CTA */}
                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href={quickWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] text-white hover:bg-[#20ba5a] text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="size-4" fill="currentColor" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Interactive Map */}
            <Reveal delay={0.08}>
              <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card h-[280px]">
                <iframe
                  src={site.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sirat-e-Mustaqeem Educational System Campus Map"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="bg-card rounded-lg border border-border p-6 sm:p-8 shadow-card">
                <h2 className="text-xl font-semibold text-navy mb-2">Send an Enquiry</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and our admissions office will review your enquiry.
                </p>

                {submitStatus === "success" ? (
                  <div
                    ref={successSectionRef}
                    tabIndex={-1}
                    className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-emerald-950 focus:outline-none"
                  >
                    <div className="flex gap-3">
                      <CheckCircle2 className="size-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-emerald-900 font-bold font-heading text-lg">
                          Enquiry Form Validated!
                        </h3>
                        <p className="mt-2 text-sm text-emerald-800 leading-relaxed">
                          Your enquiry was successfully validated. Because this runs on the
                          frontend, it is not stored in a remote database.
                        </p>
                        <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
                          However, you can instantly transmit the structured details you just
                          entered to our Tarbiyah office using these direct communication options:
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                          {/* Send via Email Link */}
                          <a
                            href={mailtoUrl}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-navy text-navy-foreground hover:bg-royal px-5 text-sm font-semibold transition-colors cursor-pointer"
                          >
                            <Mail className="size-4" />
                            Send via Email
                          </a>

                          {/* Send via WhatsApp Link */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] text-white hover:bg-[#20ba5a] px-5 text-sm font-semibold transition-colors cursor-pointer"
                          >
                            <MessageSquare className="size-4" />
                            Send via WhatsApp
                          </a>
                        </div>

                        <button
                          onClick={() => {
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              subject: "",
                              message: "",
                            });
                            setSubmitStatus("idle");
                          }}
                          className="mt-6 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline block cursor-pointer"
                        >
                          Fill out a new enquiry form
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          "w-full h-11 px-4 rounded-md border bg-card text-navy text-sm transition-all focus:outline-none focus:ring-1 focus:ring-royal focus:border-royal",
                          errors.name ? "border-rose-500 ring-rose-500" : "border-border",
                        )}
                        placeholder="e.g. kanzul iman"
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold"
                        >
                          <AlertTriangle className="size-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          "w-full h-11 px-4 rounded-md border bg-card text-navy text-sm transition-all focus:outline-none focus:ring-1 focus:ring-royal focus:border-royal",
                          errors.email ? "border-rose-500 ring-rose-500" : "border-border",
                        )}
                        placeholder="e.g. kanzul@example.com"
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold"
                        >
                          <AlertTriangle className="size-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Phone Number{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={cn(
                          "w-full h-11 px-4 rounded-md border bg-card text-navy text-sm transition-all focus:outline-none focus:ring-1 focus:ring-royal focus:border-royal",
                          errors.phone ? "border-rose-500 ring-rose-500" : "border-border",
                        )}
                        placeholder="e.g. 03001234567"
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold"
                        >
                          <AlertTriangle className="size-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={cn(
                          "w-full h-11 px-3 rounded-md border bg-card text-navy text-sm transition-all focus:outline-none focus:ring-1 focus:ring-royal focus:border-royal",
                          errors.subject ? "border-rose-500 ring-rose-500" : "border-border",
                        )}
                      >
                        <option value="">Select subject topic</option>
                        <option value="Admissions Inquiry">Admissions & Tarbiyah Inquiry</option>
                        <option value="Syllabus/Curriculum Question">
                          Syllabus & Qur'an Stream
                        </option>
                        <option value="Fee Details Enquiry">Fee Structure & Details</option>
                        <option value="General Information">General Information</option>
                      </select>
                      {errors.subject && (
                        <p
                          id="subject-error"
                          className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold"
                        >
                          <AlertTriangle className="size-3" /> {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-navy mb-1.5"
                      >
                        Enquiry Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={cn(
                          "w-full p-4 rounded-md border bg-card text-navy text-sm transition-all focus:outline-none focus:ring-1 focus:ring-royal focus:border-royal resize-y min-h-[120px]",
                          errors.message ? "border-rose-500 ring-rose-500" : "border-border",
                        )}
                        placeholder="Please type your message in detail here..."
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold"
                        >
                          <AlertTriangle className="size-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-navy text-navy-foreground hover:bg-royal text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="size-4 animate-spin rounded-full border-2 border-navy-foreground border-t-transparent" />
                          Validating form...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Validate & Send Enquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
