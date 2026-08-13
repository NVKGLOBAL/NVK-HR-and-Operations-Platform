export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "Active" | "Onboarding" | "PTO";
  email: string;
  phone: string;
  ptoBalance: number;
  joinDate: string;
}

export interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: "Applied" | "Screened" | "Interview" | "Offered" | "Hired";
  email: string;
  skills: string[];
  resumeText: string;
  score?: number;
  evaluation?: {
    candidateName: string;
    extractedSkills: string[];
    experienceSummary: string;
    education: string;
    score: number;
    justification: string;
    interviewQuestions: string[];
  };
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote";
  description: string;
  applicantsCount: number;
  status: "Active" | "Closed";
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  weight: number; // lbs
  carrier: "FedEx" | "UPS" | "DHL" | "Pending";
  status: "Pending" | "Dispatched" | "In-Transit" | "Delivered";
  driverId?: string;
  value: number; // USD
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  status: "Available" | "Active" | "Off-Duty";
  phone: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  bin: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface PtoRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface TimeLog {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Clock-In" | "Clock-Out";
  timestamp: string;
}

export interface BusinessStrategy {
  executiveSummary: string;
  valueProposition: string[];
  rolloutPhases: {
    phaseName: string;
    timeframe: string;
    keyMilestones: string[];
  }[];
  growthMetrics: {
    metricName: string;
    targetKPI: string;
  }[];
  objectionHandling: {
    objection: string;
    rebuttal: string;
  }[];
}

export interface ExpenseReport {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  category: "Travel" | "Meals" | "Software" | "Equipment" | "Office Supplies" | "Other";
  amount: number;
  merchant: string;
  status: "Pending" | "Approved" | "Rejected";
  receiptUrl?: string;
  policyFlagged: boolean;
  policyNotes?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // e.g. "July 2026"
  baseSalary: number;
  overtimeWages: number;
  taxWithholdings: number;
  benefitDeductions: number;
  netPay: number;
  status: "Pending" | "Processed" | "Paid";
  paymentMethod: "Direct Deposit" | "Check" | "Wise/Global";
}

export interface ApInvoice {
  id: string;
  vendorName: string;
  poNumber?: string;
  receivingSlipId?: string; // links to Warehouse receiving
  amount: number;
  invoiceDate: string;
  dueDate: string;
  status: "Unpaid" | "Paid" | "Overdue";
  threeWayMatch: "Matched" | "Mismatch" | "Pending";
  matchDetails?: string;
}

export interface ArInvoice {
  id: string;
  customerName: string;
  shipmentId?: string; // links to Logistics shipping
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  daysOverdue: number;
}

export interface GlJournalEntry {
  id: string;
  date: string;
  description: string;
  reference: string; // e.g., "EXP-701", "PAY-801", "INV-102"
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

export interface FinancialAudit {
  riskScore: number; // 0-100
  potentialSavings: number;
  anomalies: {
    id: string;
    source: "Expense" | "Payroll" | "Payable" | "Receivable";
    description: string;
    severity: "High" | "Medium" | "Low";
    remedy: string;
  }[];
  taxOptimizationTips: string[];
  budgetForecast: {
    month: string;
    projectedInflow: number;
    projectedOutflow: number;
    projectedBalance: number;
  }[];
}
