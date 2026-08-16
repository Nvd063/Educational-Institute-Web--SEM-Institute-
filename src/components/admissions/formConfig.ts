export type AdmissionFormValues = {
  // Step 1 — Student
  studentName: string;
  dateOfBirth: string;
  gender: string;
  bFormNumber: string;
  studentEmail: string;
  studentPhone: string;
  // Step 2 — Parent / Guardian
  guardianName: string;
  relationship: string;
  guardianCnic: string;
  guardianOccupation: string;
  guardianPhone: string;
  // Step 3 — Academic
  classApplyingFor: string;
  previousSchool: string;
  lastClassPassed: string;
  lastPercentage: string;
  boardOrSystem: string;
  // Step 4 — Contact
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  emergencyContact: string;
  message: string;
};

export const defaultValues: AdmissionFormValues = {
  studentName: "",
  dateOfBirth: "",
  gender: "",
  bFormNumber: "",
  studentEmail: "",
  studentPhone: "",

  guardianName: "",
  relationship: "Father",
  guardianCnic: "42101-1234567-9",
  guardianOccupation: "Textile Business Owner",
  guardianPhone: "+92 321 4567890",

  classApplyingFor: "Class IX",
  previousSchool: "Sirat-e-Mustaqeem Educational System, Karachi",
  lastClassPassed: "Class VIII",
  lastPercentage: "87",
  boardOrSystem: "Board of Secondary Education Karachi (BSEK)",

  addressLine: "House 24, Block 7, Gulshan-e-Iqbal",
  city: "Karachi",
  province: "Sindh",
  postalCode: "75300",
  emergencyContact: "+92 333 7654321",
  message: "Applying for Class IX (Science group) for the upcoming academic session.",
};

export const provinces = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
  "Islamabad Capital Territory",
];

export const classOptions = [
  "Play Group",
  "Nursery",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
];

export const relationships = ["Father", "Mother", "Guardian", "Elder Brother", "Uncle"];

export const steps = [
  { id: 1, label: "Student", heading: "Student Information" },
  { id: 2, label: "Guardian", heading: "Parent / Guardian Information" },
  { id: 3, label: "Academic", heading: "Academic Information" },
  { id: 4, label: "Contact", heading: "Contact Information" },
  { id: 5, label: "Review", heading: "Review & Submit" },
] as const;

export type FormErrors = Partial<Record<keyof AdmissionFormValues, string>>;

const pkPhone = /^(\+92|0)[\s-]?3\d{2}[\s-]?\d{7}$/;
const cnic = /^\d{5}-\d{7}-\d$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const required = (value: string, label: string) =>
  value.trim().length === 0 ? `${label} is required.` : undefined;

export const stepFields: Record<number, (keyof AdmissionFormValues)[]> = {
  1: ["studentName", "dateOfBirth", "gender", "bFormNumber", "studentEmail", "studentPhone"],
  2: ["guardianName", "relationship", "guardianCnic", "guardianOccupation", "guardianPhone"],
  3: ["classApplyingFor", "previousSchool", "lastClassPassed", "lastPercentage", "boardOrSystem"],
  4: ["addressLine", "city", "province", "postalCode", "emergencyContact", "message"],
  5: [],
};

export function validateField(
  field: keyof AdmissionFormValues,
  values: AdmissionFormValues,
): string | undefined {
  const value = values[field] ?? "";
  switch (field) {
    case "studentName":
      return (
        required(value, "Student name") ??
        (value.trim().length < 3 ? "Enter the full name." : undefined)
      );
    case "dateOfBirth": {
      const base = required(value, "Date of birth");
      if (base) return base;
      return new Date(value) > new Date() ? "Date of birth cannot be in the future." : undefined;
    }
    case "gender":
      return required(value, "Gender");
    case "bFormNumber":
      return (
        required(value, "B-Form number") ??
        (cnic.test(value.trim()) ? undefined : "Use the format 42101-1234567-1.")
      );
    case "studentEmail":
      return (
        required(value, "Email") ??
        (email.test(value.trim()) ? undefined : "Enter a valid email address.")
      );
    case "studentPhone":
    case "guardianPhone":
    case "emergencyContact": {
      const label =
        field === "studentPhone"
          ? "Phone number"
          : field === "guardianPhone"
            ? "Guardian phone"
            : "Emergency contact";
      return (
        required(value, label) ??
        (pkPhone.test(value.trim()) ? undefined : "Use a Pakistani number, e.g. +92 300 1234567.")
      );
    }
    case "guardianName":
      return required(value, "Guardian name");
    case "relationship":
      return required(value, "Relationship");
    case "guardianCnic":
      return (
        required(value, "CNIC") ??
        (cnic.test(value.trim()) ? undefined : "Use the format 42101-1234567-9.")
      );
    case "guardianOccupation":
      return required(value, "Occupation");
    case "classApplyingFor":
      return required(value, "Class applying for");
    case "previousSchool":
      return required(value, "Previous school / college");
    case "lastClassPassed":
      return required(value, "Last class passed");
    case "lastPercentage": {
      const base = required(value, "Last result percentage");
      if (base) return base;
      const num = Number(value);
      return Number.isNaN(num) || num < 0 || num > 100
        ? "Enter a percentage between 0 and 100."
        : undefined;
    }
    case "boardOrSystem":
      return required(value, "Board / examination system");
    case "addressLine":
      return required(value, "Address");
    case "city":
      return required(value, "City");
    case "province":
      return required(value, "Province");
    case "postalCode":
      return (
        required(value, "Postal code") ??
        (/^\d{5}$/.test(value.trim()) ? undefined : "Postal code must be 5 digits.")
      );
    case "message":
      return value.trim().length > 600 ? "Please keep this under 600 characters." : undefined;
    default:
      return undefined;
  }
}

export function validateStep(step: number, values: AdmissionFormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of stepFields[step] ?? []) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

export function validateAll(values: AdmissionFormValues): FormErrors {
  return [1, 2, 3, 4].reduce<FormErrors>(
    (acc, step) => ({ ...acc, ...validateStep(step, values) }),
    {},
  );
}

export const reviewGroups: { heading: string; fields: [keyof AdmissionFormValues, string][] }[] = [
  {
    heading: "Student Information",
    fields: [
      ["studentName", "Full name"],
      ["dateOfBirth", "Date of birth"],
      ["gender", "Gender"],
      ["bFormNumber", "B-Form number"],
      ["studentEmail", "Email"],
      ["studentPhone", "Phone"],
    ],
  },
  {
    heading: "Parent / Guardian",
    fields: [
      ["guardianName", "Name"],
      ["relationship", "Relationship"],
      ["guardianCnic", "CNIC"],
      ["guardianOccupation", "Occupation"],
      ["guardianPhone", "Phone"],
    ],
  },
  {
    heading: "Academic Information",
    fields: [
      ["classApplyingFor", "Class applying for"],
      ["previousSchool", "Previous school / college"],
      ["lastClassPassed", "Last class passed"],
      ["lastPercentage", "Last result (%)"],
      ["boardOrSystem", "Board / system"],
    ],
  },
  {
    heading: "Contact Information",
    fields: [
      ["addressLine", "Address"],
      ["city", "City"],
      ["province", "Province"],
      ["postalCode", "Postal code"],
      ["emergencyContact", "Emergency contact"],
      ["message", "Additional notes"],
    ],
  },
];

export function buildSummary(values: AdmissionFormValues) {
  return reviewGroups
    .map((group) => {
      const lines = group.fields
        .map(([key, label]) => (values[key]?.trim() ? `${label}: ${values[key]}` : null))
        .filter(Boolean)
        .join("\n");
      return `${group.heading}\n${lines}`;
    })
    .join("\n\n");
}
