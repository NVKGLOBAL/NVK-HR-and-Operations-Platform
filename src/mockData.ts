import { Employee, Job, Candidate, Shipment, Driver, InventoryItem, PtoRequest, TimeLog, ExpenseReport, PayrollRecord, ApInvoice, ArInvoice, GlJournalEntry } from "./types";

export const initialEmployees: Employee[] = [
  {
    id: "EMP-101",
    name: "Marcus Vance",
    role: "Warehouse Operations Supervisor",
    department: "Logistics",
    status: "Active",
    email: "m.vance@omnisuite.corp",
    phone: "+1 (555) 234-8901",
    ptoBalance: 14,
    joinDate: "2023-04-12"
  },
  {
    id: "EMP-102",
    name: "Sarah Jenkins",
    role: "Senior HR Specialist",
    department: "Human Resources",
    status: "Active",
    email: "s.jenkins@omnisuite.corp",
    phone: "+1 (555) 789-3210",
    ptoBalance: 18,
    joinDate: "2022-09-01"
  },
  {
    id: "EMP-103",
    name: "David Chen",
    role: "Fleet Logistics Dispatcher",
    department: "Logistics",
    status: "Active",
    email: "d.chen@omnisuite.corp",
    phone: "+1 (555) 456-1122",
    ptoBalance: 12,
    joinDate: "2024-01-15"
  },
  {
    id: "EMP-104",
    name: "Elena Rostova",
    role: "Lead Front-end Developer",
    department: "Engineering",
    status: "PTO",
    email: "e.rostova@omnisuite.corp",
    phone: "+1 (555) 987-6543",
    ptoBalance: 8,
    joinDate: "2021-06-30"
  },
  {
    id: "EMP-105",
    name: "Jordan Sparks",
    role: "Receiving Coordinator",
    department: "Warehouse",
    status: "Onboarding",
    email: "j.sparks@omnisuite.corp",
    phone: "+1 (555) 321-7890",
    ptoBalance: 20,
    joinDate: "2026-07-01"
  }
];

export const initialJobs: Job[] = [
  {
    id: "JOB-401",
    title: "Full Stack Engineer (React/Node)",
    department: "Engineering",
    location: "Chicago, IL (Hybrid)",
    type: "Full-time",
    description: "Looking for an experienced engineer to build out core state modules, real-time analytics dashboards, and custom service APIs. Requires 4+ years of React and Node experience.",
    applicantsCount: 14,
    status: "Active"
  },
  {
    id: "JOB-402",
    title: "Regional Fleet Logistics Driver",
    department: "Logistics",
    location: "Houston, TX (On-Site)",
    type: "Full-time",
    description: "Seeking Class-A CDL commercial drivers to run regional freight lines. Responsible for timely dispatches, load safety audits, and digital proof-of-delivery reporting.",
    applicantsCount: 6,
    status: "Active"
  },
  {
    id: "JOB-403",
    title: "HR Onboarding Coordinator",
    department: "Human Resources",
    location: "Remote",
    type: "Full-time",
    description: "Manage end-to-end recruitment pipelines, coordinate orientation classes, execute e-sign agreements, and provision IT credentials across multiple corporate divisions.",
    applicantsCount: 22,
    status: "Active"
  }
];

export const initialCandidates: Candidate[] = [
  {
    id: "CAN-001",
    name: "Alex Rivera",
    jobTitle: "Full Stack Engineer (React/Node)",
    stage: "Interview",
    email: "alex.rivera.dev@gmail.com",
    skills: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    resumeText: "ALEX RIVERA\nFull Stack Developer | Denver, CO\n\nPROFESSIONAL SUMMARY\nHighly motivated developer with 5 years of experience building modern React web applications. Proven expert in TypeScript, Tailwind CSS, Express backends, and state management optimization.\n\nEXPERIENCE\n- Senior Developer at TechLoop (2023 - Present)\n  * Rebuilt core client-side dashboards using React and Vite, compressing load times by 40%.\n  * Mentored 4 junior engineers on custom React hooks and scalable file structuring.\n- Software Engineer at DevSync (2021 - 2023)\n  * Built server-side REST APIs in Express processing 5M+ weekly web triggers.\n  * Standardized state patterns preventing critical re-render lags.\n\nEDUCATION\nB.S. in Computer Science - University of Colorado"
  },
  {
    id: "CAN-002",
    name: "Brandon Miller",
    jobTitle: "Regional Fleet Logistics Driver",
    stage: "Screened",
    email: "bmiller.trucking@yahoo.com",
    skills: ["Class-A CDL", "Route Planning", "Fuel Optimization", "Load Auditing"],
    resumeText: "BRANDON MILLER\nProfessional CDL Driver | Dallas, TX\n\nSUMMARY\nReliable and safety-oriented commercial truck driver with an active Class-A CDL and clean driving record. Over 8 years of over-the-road (OTR) and regional hauling experience. Fluent in digital logbook setups and route tracking.\n\nEXPERIENCE\n- Heavy Fleet Driver at Vanguard Transport (2020 - Present)\n  * Safely dispatched 400+ freight shipments over 150k miles with 99.4% on-time delivery.\n  * Consistently scored top 5% in fleet fuel-efficiency through intelligent route throttling.\n- Regional Driver at LoneStar Freight (2018 - 2020)\n  * Managed safe cargo securement, pre-trip vehicle inspections, and physical bills of lading."
  },
  {
    id: "CAN-003",
    name: "Sofia Rodriguez",
    jobTitle: "HR Onboarding Coordinator",
    stage: "Applied",
    email: "sofia.rodriguez.hr@outlook.com",
    skills: ["Talent Acquisition", "Employee Relations", "E-Sign Forms", "HRIS Setup"],
    resumeText: "SOFIA RODRIGUEZ\nHR Professional | Miami, FL\n\nSUMMARY\nDetail-oriented Human Resources specialist with 3+ years managing digital employee onboarding, onboarding pipelines, and training courses.\n\nEXPERIENCE\n- HR Generalist at PeopleFirst Corp (2024 - Present)\n  * Orchestrated digital transition for onboarding documents, saving $12k in print overhead.\n  * Coordinated with IT department to automate credentials provisioning on day one."
  }
];

export const initialShipments: Shipment[] = [
  {
    id: "SHP-301",
    origin: "Warehouse Terminal A (Chicago)",
    destination: "Indianapolis Retail Hub",
    weight: 12450,
    carrier: "UPS",
    status: "In-Transit",
    driverId: "DRV-01",
    value: 45000
  },
  {
    id: "SHP-302",
    origin: "Warehouse Terminal A (Chicago)",
    destination: "Detroit Freight Hub",
    weight: 18200,
    carrier: "FedEx",
    status: "Dispatched",
    driverId: "DRV-02",
    value: 62000
  },
  {
    id: "SHP-303",
    origin: "Warehouse Terminal A (Chicago)",
    destination: "Milwaukee Fulfillment Center",
    weight: 6800,
    carrier: "Pending",
    status: "Pending",
    value: 15500
  },
  {
    id: "SHP-304",
    origin: "Warehouse Terminal A (Chicago)",
    destination: "Minneapolis Distribution Depot",
    weight: 24500,
    carrier: "Pending",
    status: "Pending",
    value: 89000
  }
];

export const initialDrivers: Driver[] = [
  {
    id: "DRV-01",
    name: "John 'Jack' Kowalski",
    vehicle: "Volvo VNL 860 Semi (FTL Capable)",
    status: "Active",
    phone: "+1 (555) 888-0099"
  },
  {
    id: "DRV-02",
    name: "Samantha 'Sam' Miller",
    vehicle: "Freightliner Cascadia (FTL Capable)",
    status: "Active",
    phone: "+1 (555) 777-1122"
  },
  {
    id: "DRV-03",
    name: "Aiden Fletcher",
    vehicle: "Isuzu NPR Box Truck (LTL Capable)",
    status: "Available",
    phone: "+1 (555) 666-4455"
  },
  {
    id: "DRV-04",
    name: "Elena Gomez",
    vehicle: "Kenworth T680 Heavy Loader",
    status: "Off-Duty",
    phone: "+1 (555) 555-8833"
  }
];

export const initialInventory: InventoryItem[] = [
  {
    id: "INV-901",
    sku: "OMNI-BOX-MD",
    name: "Industrial Reinforced Shipping Carton (Medium)",
    category: "Packaging Supplies",
    quantity: 4200,
    minStock: 1000,
    bin: "Row A - Shelf 3 - Slot B",
    status: "In Stock"
  },
  {
    id: "INV-902",
    sku: "OMNI-LABEL-X2",
    name: "Direct Thermal Carrier Labels (4x6 Roll)",
    category: "Office & Labeling",
    quantity: 850,
    minStock: 1500,
    bin: "Row C - Shelf 1 - Slot A",
    status: "Low Stock"
  },
  {
    id: "INV-903",
    sku: "OMNI-STRETCH-HD",
    name: "High-Density Heavy Duty Pallet Stretch Wrap",
    category: "Warehouse Core",
    quantity: 120,
    minStock: 100,
    bin: "Row H - Shelf 4 - Slot C",
    status: "In Stock"
  },
  {
    id: "INV-904",
    sku: "OMNI-TAPE-R1",
    name: "Reinforced Water-Activated Packaging Tape",
    category: "Packaging Supplies",
    quantity: 0,
    minStock: 250,
    bin: "Row B - Shelf 2 - Slot D",
    status: "Out of Stock"
  },
  {
    id: "INV-905",
    sku: "OMNI-PALLET-WD",
    name: "Standard GMA Treated Four-Way Wooden Pallet",
    category: "Warehouse Core",
    quantity: 580,
    minStock: 200,
    bin: "Yard Storage Area C",
    status: "In Stock"
  }
];

export const initialPtoRequests: PtoRequest[] = [
  {
    id: "PTO-501",
    employeeId: "EMP-104",
    employeeName: "Elena Rostova",
    startDate: "2026-07-15",
    endDate: "2026-07-22",
    days: 5,
    reason: "Summer Family Trip to Rocky Mountains",
    status: "Approved"
  },
  {
    id: "PTO-502",
    employeeId: "EMP-101",
    employeeName: "Marcus Vance",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    days: 2,
    reason: "Routine Medical Operations & Recovery",
    status: "Pending"
  }
];

export const initialTimeLogs: TimeLog[] = [
  {
    id: "TL-601",
    employeeId: "EMP-101",
    employeeName: "Marcus Vance",
    type: "Clock-In",
    timestamp: "2026-07-12T07:54:12-07:00"
  },
  {
    id: "TL-602",
    employeeId: "EMP-103",
    employeeName: "David Chen",
    type: "Clock-In",
    timestamp: "2026-07-12T08:02:44-07:00"
  }
];

export const initialExpenses: ExpenseReport[] = [
  {
    id: "EXP-701",
    employeeId: "EMP-101",
    employeeName: "Marcus Vance",
    date: "2026-07-08",
    category: "Travel",
    amount: 342.50,
    merchant: "Delta Airlines",
    status: "Approved",
    policyFlagged: false
  },
  {
    id: "EXP-702",
    employeeId: "EMP-104",
    employeeName: "Elena Rostova",
    date: "2026-07-09",
    category: "Software",
    amount: 149.00,
    merchant: "JetBrains IDE License",
    status: "Approved",
    policyFlagged: false
  },
  {
    id: "EXP-703",
    employeeId: "EMP-103",
    employeeName: "David Chen",
    date: "2026-07-10",
    category: "Meals",
    amount: 185.00,
    merchant: "Fleming's Steakhouse",
    status: "Pending",
    policyFlagged: true,
    policyNotes: "Excessive tips / Individual meal price exceeds standard $75 daily cap policy."
  },
  {
    id: "EXP-704",
    employeeId: "EMP-102",
    employeeName: "Sarah Jenkins",
    date: "2026-07-11",
    category: "Equipment",
    amount: 1250.00,
    merchant: "Apple Store",
    status: "Pending",
    policyFlagged: false
  }
];

export const initialPayrolls: PayrollRecord[] = [
  {
    id: "PAY-801",
    employeeId: "EMP-101",
    employeeName: "Marcus Vance",
    period: "June 2026",
    baseSalary: 4800,
    overtimeWages: 320,
    taxWithholdings: 1120,
    benefitDeductions: 350,
    netPay: 3650,
    status: "Paid",
    paymentMethod: "Direct Deposit"
  },
  {
    id: "PAY-802",
    employeeId: "EMP-104",
    employeeName: "Elena Rostova",
    period: "June 2026",
    baseSalary: 7200,
    overtimeWages: 0,
    taxWithholdings: 1840,
    benefitDeductions: 420,
    netPay: 4940,
    status: "Paid",
    paymentMethod: "Direct Deposit"
  },
  {
    id: "PAY-803",
    employeeId: "EMP-103",
    employeeName: "David Chen",
    period: "June 2026",
    baseSalary: 4200,
    overtimeWages: 150,
    taxWithholdings: 910,
    benefitDeductions: 300,
    netPay: 3140,
    status: "Processed",
    paymentMethod: "Direct Deposit"
  }
];

export const initialApInvoices: ApInvoice[] = [
  {
    id: "API-901",
    vendorName: "PackCo Logistics Corp",
    poNumber: "PO-2204",
    receivingSlipId: "REC-1122",
    amount: 2450.00,
    invoiceDate: "2026-07-02",
    dueDate: "2026-08-02",
    status: "Unpaid",
    threeWayMatch: "Matched",
    matchDetails: "PO-2204, receiving slip REC-1122, and supplier invoice quantities & rates match perfectly (4200 units)."
  },
  {
    id: "API-902",
    vendorName: "Thermal Label Kings",
    poNumber: "PO-2208",
    receivingSlipId: "REC-1125",
    amount: 980.00,
    invoiceDate: "2026-07-05",
    dueDate: "2026-07-15",
    status: "Unpaid",
    threeWayMatch: "Mismatch",
    matchDetails: "Flagged Mismatch: Supplier invoiced for 1,500 rolls ($980), but Warehouse receiving slip REC-1125 indicates only 850 rolls were accepted due to package crushing."
  },
  {
    id: "API-903",
    vendorName: "Global Pallet Co.",
    poNumber: "PO-2210",
    receivingSlipId: "REC-1130",
    amount: 1420.00,
    invoiceDate: "2026-07-01",
    dueDate: "2026-07-31",
    status: "Paid",
    threeWayMatch: "Matched",
    matchDetails: "Auto-matched. Handled via early-payment electronic dispatch."
  }
];

export const initialArInvoices: ArInvoice[] = [
  {
    id: "ARI-101",
    customerName: "Indianapolis Retail Hub",
    shipmentId: "SHP-301",
    amount: 12500.00,
    issueDate: "2026-07-01",
    dueDate: "2026-07-31",
    status: "Sent",
    daysOverdue: 0
  },
  {
    id: "ARI-102",
    customerName: "Detroit Freight Hub",
    shipmentId: "SHP-302",
    amount: 18400.00,
    issueDate: "2026-06-10",
    dueDate: "2026-07-10",
    status: "Overdue",
    daysOverdue: 3
  },
  {
    id: "ARI-103",
    customerName: "Milwaukee Fulfillment Center",
    shipmentId: "SHP-303",
    amount: 6200.00,
    issueDate: "2026-07-11",
    dueDate: "2026-08-11",
    status: "Draft",
    daysOverdue: 0
  }
];

export const initialGlJournalEntries: GlJournalEntry[] = [
  {
    id: "GL-1001",
    date: "2026-07-01",
    description: "June Employee Payroll Execution",
    reference: "PAY-801",
    debitAccount: "Operating Expense - Salaries",
    creditAccount: "Cash - Payroll Account",
    amount: 16200.00
  },
  {
    id: "GL-1002",
    date: "2026-07-02",
    description: "Settled Vendor Invoice - Global Pallet",
    reference: "API-903",
    debitAccount: "Cost of Goods Sold (COGS)",
    creditAccount: "Cash - Operating Account",
    amount: 1420.00
  },
  {
    id: "GL-1003",
    date: "2026-07-08",
    description: "Flight Reimbursement Approval",
    reference: "EXP-701",
    debitAccount: "Operating Expense - Travel",
    creditAccount: "Accrued Reimbursements Payable",
    amount: 342.50
  },
  {
    id: "GL-1004",
    date: "2026-07-12",
    description: "Automated Receivable Billing",
    reference: "ARI-101",
    debitAccount: "Accounts Receivable (AR)",
    creditAccount: "Revenue - Logistics Shipping",
    amount: 12500.00
  }
];

