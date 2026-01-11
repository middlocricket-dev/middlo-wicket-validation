export interface BatsmanFormData {
  type: 'batsman';
  name: string;
  city: string;
  playingLevel: string;
  currentBookingMethod: string;
  biggestProblem: string;
  willingnessToPay: string;
  whatsapp: string;
  submittedAt: string;
}

export interface BowlerFormData {
  type: 'bowler';
  name: string;
  role: string;
  experience: string;
  city: string;
  hourlyRate: string;
  availability: string;
  whatsapp: string;
  submittedAt: string;
}

export interface AcademyFormData {
  type: 'academy';
  academyName: string;
  location: string;
  numberOfNets: string;
  freeHours: string;
  pricePerHour: string;
  contactName: string;
  contactPhone: string;
  submittedAt: string;
}

export type FormData = BatsmanFormData | BowlerFormData | AcademyFormData;

const STORAGE_KEY = 'middlo_submissions';

export const saveSubmission = (data: FormData): void => {
  const existing = getSubmissions();
  existing.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getSubmissions = (): FormData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const exportToCSV = (): string => {
  const submissions = getSubmissions();
  if (submissions.length === 0) return '';

  const batsmanHeaders = ['Type', 'Name', 'City', 'Playing Level', 'Current Booking Method', 'Biggest Problem', 'Willingness to Pay', 'WhatsApp', 'Submitted At'];
  const bowlerHeaders = ['Type', 'Name', 'Role', 'Experience', 'City', 'Hourly Rate', 'Availability', 'WhatsApp', 'Submitted At'];
  const academyHeaders = ['Type', 'Academy Name', 'Location', 'Number of Nets', 'Free Hours', 'Price per Hour', 'Contact Name', 'Contact Phone', 'Submitted At'];

  let csv = '';

  // Batsman submissions
  const batsmanData = submissions.filter(s => s.type === 'batsman') as BatsmanFormData[];
  if (batsmanData.length > 0) {
    csv += 'BATSMAN SUBMISSIONS\n';
    csv += batsmanHeaders.join(',') + '\n';
    batsmanData.forEach(d => {
      csv += [d.type, d.name, d.city, d.playingLevel, d.currentBookingMethod, d.biggestProblem, d.willingnessToPay, d.whatsapp, d.submittedAt].map(v => `"${v}"`).join(',') + '\n';
    });
    csv += '\n';
  }

  // Bowler submissions
  const bowlerData = submissions.filter(s => s.type === 'bowler') as BowlerFormData[];
  if (bowlerData.length > 0) {
    csv += 'BOWLER SUBMISSIONS\n';
    csv += bowlerHeaders.join(',') + '\n';
    bowlerData.forEach(d => {
      csv += [d.type, d.name, d.role, d.experience, d.city, d.hourlyRate, d.availability, d.whatsapp, d.submittedAt].map(v => `"${v}"`).join(',') + '\n';
    });
    csv += '\n';
  }

  // Academy submissions
  const academyData = submissions.filter(s => s.type === 'academy') as AcademyFormData[];
  if (academyData.length > 0) {
    csv += 'ACADEMY SUBMISSIONS\n';
    csv += academyHeaders.join(',') + '\n';
    academyData.forEach(d => {
      csv += [d.type, d.academyName, d.location, d.numberOfNets, d.freeHours, d.pricePerHour, d.contactName, d.contactPhone, d.submittedAt].map(v => `"${v}"`).join(',') + '\n';
    });
  }

  return csv;
};

export const downloadCSV = (): void => {
  const csv = exportToCSV();
  if (!csv) {
    alert('No submissions to export');
    return;
  }
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `middlo_submissions_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
