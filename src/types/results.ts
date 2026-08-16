export type Subject = {
  name: string;
  totalMarks: number;
  obtainedMarks: number;
};

export type StudentResult = {
  rollNumber: string;
  studentName: string;
  className: string;
  session: string;
  subjects: Subject[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
};
