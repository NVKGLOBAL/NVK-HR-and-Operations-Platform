import React, { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  Truck, 
  Package, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Plus, 
  Check, 
  X, 
  FileText, 
  Compass, 
  Award, 
  RefreshCw, 
  DollarSign, 
  Building2, 
  Sparkles, 
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Barcode,
  ArrowRight,
  Receipt,
  CreditCard,
  Coins,
  ShieldCheck
} from "lucide-react";
import { 
  initialEmployees, 
  initialJobs, 
  initialCandidates, 
  initialShipments, 
  initialDrivers, 
  initialInventory, 
  initialPtoRequests, 
  initialTimeLogs,
  initialExpenses,
  initialPayrolls,
  initialApInvoices,
  initialArInvoices,
  initialGlJournalEntries
} from "./mockData";
import { 
  Employee, 
  Job, 
  Candidate, 
  Shipment, 
  Driver, 
  InventoryItem, 
  PtoRequest, 
  TimeLog, 
  BusinessStrategy,
  ExpenseReport,
  PayrollRecord,
  ApInvoice,
  ArInvoice,
  GlJournalEntry,
  FinancialAudit
} from "./types";

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "hr" | "ats" | "tms" | "wms" | "finance" | "planner">("overview");

  // Core States with LocalStorage persistence
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem("nvk_employees");
    return saved ? JSON.parse(saved) : initialEmployees;
  });
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem("nvk_jobs");
    return saved ? JSON.parse(saved) : initialJobs;
  });
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem("nvk_candidates");
    return saved ? JSON.parse(saved) : initialCandidates;
  });
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem("nvk_shipments");
    return saved ? JSON.parse(saved) : initialShipments;
  });
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem("nvk_drivers");
    return saved ? JSON.parse(saved) : initialDrivers;
  });
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem("nvk_inventory");
    return saved ? JSON.parse(saved) : initialInventory;
  });
  const [ptoRequests, setPtoRequests] = useState<PtoRequest[]>(() => {
    const saved = localStorage.getItem("nvk_ptoRequests");
    return saved ? JSON.parse(saved) : initialPtoRequests;
  });
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>(() => {
    const saved = localStorage.getItem("nvk_timeLogs");
    return saved ? JSON.parse(saved) : initialTimeLogs;
  });

  // Financial States with LocalStorage persistence
  const [expenses, setExpenses] = useState<ExpenseReport[]>(() => {
    const saved = localStorage.getItem("nvk_expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem("nvk_payrolls");
    return saved ? JSON.parse(saved) : initialPayrolls;
  });
  const [apInvoices, setApInvoices] = useState<ApInvoice[]>(() => {
    const saved = localStorage.getItem("nvk_apInvoices");
    return saved ? JSON.parse(saved) : initialApInvoices;
  });
  const [arInvoices, setArInvoices] = useState<ArInvoice[]>(() => {
    const saved = localStorage.getItem("nvk_arInvoices");
    return saved ? JSON.parse(saved) : initialArInvoices;
  });
  const [journals, setJournals] = useState<GlJournalEntry[]>(() => {
    const saved = localStorage.getItem("nvk_journals");
    return saved ? JSON.parse(saved) : initialGlJournalEntries;
  });

  const [financeAudit, setFinanceAudit] = useState<FinancialAudit | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditError, setAuditError] = useState("");

  // Onboarding Workflow State
  const [onboardingSteps, setOnboardingSteps] = useState(() => {
    const saved = localStorage.getItem("nvk_onboarding_steps");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: "company_profile", label: "Set up Company Profile & Strategy", description: "Define your company's core profile, employee size, and pricing parameters in the Planner tab.", completed: false, tab: "planner" },
      { id: "add_employee", label: "Add Your First Employee", description: "Create a new personnel record in the HR Core system of record to start tracking payroll and credentials.", completed: false, tab: "hr" },
      { id: "evaluate_candidate", label: "Evaluate a Job Candidate Resume", description: "Submit an applicant resume in the ATS tab to screen skills and generate custom interview questions with NVK AI.", completed: false, tab: "ats" },
      { id: "dispatch_shipment", label: "Optimize & Dispatch a Fleet Shipment", description: "Generate optimal vehicle pairings and sequence transit deliveries in the Logistics TMS tab.", completed: false, tab: "tms" },
      { id: "adjust_inventory", label: "Modify Stock Quantities & Audit Shelf", description: "Adjust counts and verify safety reorder limits in the Warehouse WMS tab.", completed: false, tab: "wms" },
      { id: "cfo_audit", label: "Run AI CFO Audit & Spend Policy Guard", description: "Log an out-of-pocket reimbursement or vendor invoice and run double-entry ledger checks in the Financial Core tab.", completed: false, tab: "finance" }
    ];
  });

  // Sync state to local storage when changed
  useEffect(() => { localStorage.setItem("nvk_employees", JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem("nvk_jobs", JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem("nvk_candidates", JSON.stringify(candidates)); }, [candidates]);
  useEffect(() => { localStorage.setItem("nvk_shipments", JSON.stringify(shipments)); }, [shipments]);
  useEffect(() => { localStorage.setItem("nvk_drivers", JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem("nvk_inventory", JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem("nvk_ptoRequests", JSON.stringify(ptoRequests)); }, [ptoRequests]);
  useEffect(() => { localStorage.setItem("nvk_timeLogs", JSON.stringify(timeLogs)); }, [timeLogs]);
  useEffect(() => { localStorage.setItem("nvk_expenses", JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem("nvk_payrolls", JSON.stringify(payrolls)); }, [payrolls]);
  useEffect(() => { localStorage.setItem("nvk_apInvoices", JSON.stringify(apInvoices)); }, [apInvoices]);
  useEffect(() => { localStorage.setItem("nvk_arInvoices", JSON.stringify(arInvoices)); }, [arInvoices]);
  useEffect(() => { localStorage.setItem("nvk_journals", JSON.stringify(journals)); }, [journals]);
  useEffect(() => { localStorage.setItem("nvk_onboarding_steps", JSON.stringify(onboardingSteps)); }, [onboardingSteps]);

  const completeOnboardingStep = (stepId: string) => {
    setOnboardingSteps(prev => prev.map(step => {
      if (step.id === stepId && !step.completed) {
        return { ...step, completed: true };
      }
      return step;
    }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem("nvk_onboarding_steps");
    setOnboardingSteps([
      { id: "company_profile", label: "Set up Company Profile & Strategy", description: "Define your company's core profile, employee size, and pricing parameters in the Planner tab.", completed: false, tab: "planner" },
      { id: "add_employee", label: "Add Your First Employee", description: "Create a new personnel record in the HR Core system of record to start tracking payroll and credentials.", completed: false, tab: "hr" },
      { id: "evaluate_candidate", label: "Evaluate a Job Candidate Resume", description: "Submit an applicant resume in the ATS tab to screen skills and generate custom interview questions with NVK AI.", completed: false, tab: "ats" },
      { id: "dispatch_shipment", label: "Optimize & Dispatch a Fleet Shipment", description: "Generate optimal vehicle pairings and sequence transit deliveries in the Logistics TMS tab.", completed: false, tab: "tms" },
      { id: "adjust_inventory", label: "Modify Stock Quantities & Audit Shelf", description: "Adjust counts and verify safety reorder limits in the Warehouse WMS tab.", completed: false, tab: "wms" },
      { id: "cfo_audit", label: "Run AI CFO Audit & Spend Policy Guard", description: "Log an out-of-pocket reimbursement or vendor invoice and run double-entry ledger checks in the Financial Core tab.", completed: false, tab: "finance" }
    ]);
  };

  const renderTutorialBanner = (tab: "planner" | "hr" | "ats" | "tms" | "wms" | "finance") => {
    const stepMap = {
      planner: "company_profile",
      hr: "add_employee",
      ats: "evaluate_candidate",
      tms: "dispatch_shipment",
      wms: "adjust_inventory",
      finance: "cfo_audit"
    };
    const stepId = stepMap[tab];
    const step = onboardingSteps.find(s => s.id === stepId);
    if (!step || step.completed) return null;

    const instructions = {
      planner: "Configure your company size, industry, and core operational modules inside this Planner panel, then hit the 'Request NVK GLOBAL Strategy Brief' button to formulate your customized enterprise strategy plan.",
      hr: "Scroll down to the 'Add New Personnel' section on the right. Enter a Name, Role, and Email, and click 'Register Personnel' to hire your first real team member.",
      ats: "Select any active candidate from the applicant queue on the left (e.g., Sofia Rodriguez) or paste custom resume text, then click the 'Run NVK Suitability Evaluation' button to screen skills.",
      tms: "Click the 'Run AI Dispatch Optimizer' button inside this fleet panel. This runs our carrier optimizer to auto-pair shipments with CDL drivers and minimize empty backhaul loops.",
      wms: "Test warehouse operations by adjusting stock levels. Select any SKU item (e.g. Zebra Label Printers) and click the '+' or '-' count buttons to update shelf logs and trigger low-stock safety warnings.",
      finance: "Initiate our automated corporate accounting checks. Click the 'Run AI CFO Compliance Audit' button below to analyze corporate out-of-pocket expenses and audit payable mismatches."
    };

    return (
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-3xl shadow-sm mb-6 flex items-start gap-4 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider">Onboarding Walkthrough Objective</h4>
            <span className="text-[9px] bg-indigo-200 text-indigo-800 font-bold px-2 py-0.5 rounded-full uppercase">Onboarding Active</span>
          </div>
          <p className="text-xs text-indigo-950 mt-1.5 leading-relaxed font-semibold">
            {instructions[tab]}
          </p>
        </div>
      </div>
    );
  };

  // Status Indicator
  const [isGeminiConfigured, setIsGeminiConfigured] = useState<boolean | null>(null);
  
  // Checking Server API Status
  useEffect(() => {
    fetch("/api/status")
      .then(res => res.json())
      .then(data => setIsGeminiConfigured(data.isGeminiConfigured))
      .catch(() => setIsGeminiConfigured(false));
  }, []);

  // ---------------------------------------------------------------------------
  // HR MODULE STATES & HANDLERS
  // ---------------------------------------------------------------------------
  const [newEmp, setNewEmp] = useState({
    name: "",
    role: "",
    department: "Logistics",
    email: "",
    phone: "",
    ptoBalance: 15
  });
  const [searchEmp, setSearchEmp] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [clockedIn, setClockedIn] = useState<boolean>(false);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.role || !newEmp.email) return;

    const created: Employee = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: newEmp.name,
      role: newEmp.role,
      department: newEmp.department,
      status: "Onboarding",
      email: newEmp.email,
      phone: newEmp.phone || "+1 (555) 000-0000",
      ptoBalance: Number(newEmp.ptoBalance) || 15,
      joinDate: new Date().toISOString().split("T")[0]
    };

    setEmployees([created, ...employees]);
    setNewEmp({ name: "", role: "", department: "Logistics", email: "", phone: "", ptoBalance: 15 });
    completeOnboardingStep("add_employee");
  };

  const handleApprovePto = (reqId: string) => {
    const req = ptoRequests.find(r => r.id === reqId);
    if (!req) return;

    // Deduct PTO balance from employee
    setEmployees(prev => prev.map(emp => {
      if (emp.id === req.employeeId) {
        return { ...emp, ptoBalance: Math.max(0, emp.ptoBalance - req.days), status: "PTO" };
      }
      return emp;
    }));

    setPtoRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "Approved" } : r));
  };

  const handleRejectPto = (reqId: string) => {
    setPtoRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "Rejected" } : r));
  };

  const handleClockToggle = () => {
    const now = new Date();
    const type = clockedIn ? "Clock-Out" : "Clock-In";
    const log: TimeLog = {
      id: `TL-${Math.floor(1000 + Math.random() * 9000)}`,
      employeeId: "EMP-102", // Operating as Sarah Jenkins
      employeeName: "Sarah Jenkins",
      type,
      timestamp: now.toISOString()
    };
    setTimeLogs([log, ...timeLogs]);
    setClockedIn(!clockedIn);
  };


  // ---------------------------------------------------------------------------
  // ATS RECRUITMENT STATES & HANDLERS
  // ---------------------------------------------------------------------------
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("CAN-001");
  const [customResumeText, setCustomResumeText] = useState("");
  const [selectedJobForEvaluation, setSelectedJobForEvaluation] = useState("Full Stack Engineer (React/Node)");
  const [isEvaluatingResume, setIsEvaluatingResume] = useState(false);
  const [evaluationError, setEvaluationError] = useState("");

  const currentCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  // Sync text box with candidate resume on select
  useEffect(() => {
    if (currentCandidate) {
      setCustomResumeText(currentCandidate.resumeText);
      setSelectedJobForEvaluation(currentCandidate.jobTitle);
    }
  }, [selectedCandidateId]);

  const handleTriggerEvaluation = async () => {
    setIsEvaluatingResume(true);
    setEvaluationError("");

    try {
      const response = await fetch("/api/ats/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: customResumeText,
          jobTitle: selectedJobForEvaluation
        })
      });

      if (!response.ok) {
        throw new Error("Server returned non-ok status");
      }

      const data = await response.json();
      if (data.success && data.evaluation) {
        // Save evaluation to current candidate if custom text matches or simply append
        setCandidates(prev => prev.map(c => {
          if (c.id === selectedCandidateId) {
            return {
              ...c,
              score: data.evaluation.score,
              evaluation: data.evaluation
            };
          }
          return c;
        }));
        completeOnboardingStep("evaluate_candidate");
      } else {
        throw new Error(data.error || "No evaluation retrieved");
      }
    } catch (err: any) {
      console.error(err);
      setEvaluationError("Failed to connect to the evaluation engine. Operating in simulated offline mode.");
    } finally {
      setIsEvaluatingResume(false);
    }
  };


  // ---------------------------------------------------------------------------
  // LOGISTICS & TMS STATES & HANDLERS
  // ---------------------------------------------------------------------------
  const [selectedDriverForShipment, setSelectedDriverForShipment] = useState<Record<string, string>>({});
  const [isOptimizingRoutes, setIsOptimizingRoutes] = useState(false);
  const [optimizedRouteData, setOptimizedRouteData] = useState<any | null>(null);
  const [tmsError, setTmsError] = useState("");

  const handleAssignDriver = (shipmentId: string, driverId: string) => {
    setSelectedDriverForShipment(prev => ({ ...prev, [shipmentId]: driverId }));
    
    setShipments(prev => prev.map(shp => {
      if (shp.id === shipmentId) {
        return {
          ...shp,
          driverId,
          status: driverId ? "Dispatched" : "Pending"
        };
      }
      return shp;
    }));

    // Update Driver status to active
    if (driverId) {
      setDrivers(prev => prev.map(drv => {
        if (drv.id === driverId) {
          return { ...drv, status: "Active" };
        }
        return drv;
      }));
    }
  };

  const handleTriggerRouteOptimization = async () => {
    setIsOptimizingRoutes(true);
    setTmsError("");
    try {
      const response = await fetch("/api/tms/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipments, drivers })
      });
      const data = await response.json();
      if (data.success && data.optimized) {
        setOptimizedRouteData(data.optimized);
        
        // Auto apply optimized assignments
        const assignmentsList = data.optimized.assignments || [];
        assignmentsList.forEach((asn: any) => {
          asn.assignedShipments.forEach((sId: string) => {
            setShipments(prev => prev.map(s => s.id === sId ? { ...s, driverId: asn.driverId, status: "Dispatched" } : s));
          });
        });
        completeOnboardingStep("dispatch_shipment");
      } else {
        throw new Error(data.error || "Optimization returned failed status");
      }
    } catch (err: any) {
      console.error(err);
      setTmsError("Encountered routing optimizer exception. Operating in simulated offline fallback mode.");
    } finally {
      setIsOptimizingRoutes(false);
    }
  };


  // ---------------------------------------------------------------------------
  // WMS WAREHOUSE & SHIPPING STATES & HANDLERS
  // ---------------------------------------------------------------------------
  const [stockAdjustment, setStockAdjustment] = useState<Record<string, number>>({});
  const [shippingLabelData, setShippingLabelData] = useState({
    recipientName: "",
    recipientAddress: "",
    weight: 5,
    carrier: "UPS" as "UPS" | "FedEx" | "DHL"
  });
  const [generatedLabel, setGeneratedLabel] = useState<any | null>(null);

  const handleAdjustStock = (skuId: string, amount: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === skuId) {
        const nextQty = Math.max(0, item.quantity + amount);
        let nextStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
        if (nextQty === 0) nextStatus = "Out of Stock";
        else if (nextQty < item.minStock) nextStatus = "Low Stock";

        return {
          ...item,
          quantity: nextQty,
          status: nextStatus
        };
      }
      return item;
    }));
    completeOnboardingStep("adjust_inventory");
  };

  const handleGenerateLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingLabelData.recipientName || !shippingLabelData.recipientAddress) return;

    const baseRate = shippingLabelData.carrier === "FedEx" ? 14.50 : shippingLabelData.carrier === "UPS" ? 12.80 : 22.40;
    const computedCost = baseRate + (shippingLabelData.weight * 1.25);
    const trackingCode = `TRK-${shippingLabelData.carrier.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    setGeneratedLabel({
      trackingCode,
      recipientName: shippingLabelData.recipientName,
      recipientAddress: shippingLabelData.recipientAddress,
      weight: shippingLabelData.weight,
      carrier: shippingLabelData.carrier,
      cost: computedCost.toFixed(2),
      date: new Date().toLocaleDateString()
    });

    // Add to shipments list automatically
    const newShp: Shipment = {
      id: `SHP-${Math.floor(400 + Math.random() * 100)}`,
      origin: "Warehouse Terminal A (Chicago)",
      destination: shippingLabelData.recipientAddress,
      weight: shippingLabelData.weight,
      carrier: shippingLabelData.carrier,
      status: "Pending",
      value: Math.floor(50 + Math.random() * 500)
    };
    setShipments(prev => [newShp, ...prev]);
  };


  // ---------------------------------------------------------------------------
  // BUSINESS PLANNING STATES & HANDLERS
  // ---------------------------------------------------------------------------
  const [plannerConfig, setPlannerConfig] = useState({
    industry: "Manufacturing & Warehousing",
    companySize: 150,
    selectedModules: ["Core HR", "Recruitment & ATS", "Logistics TMS", "Warehouse WMS"],
    pricingTier: "Professional",
    pricingModel: "Per Employee Per Month (PEPM)",
    customNotes: "Migrating from multiple legacy Excel workbooks to unified suite."
  });
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyResult, setStrategyResult] = useState<BusinessStrategy | null>(null);
  const [plannerError, setPlannerError] = useState("");

  // Dynamic pricing calculation
  const calculatePricing = () => {
    let base = 0;
    if (plannerConfig.pricingTier === "Starter") base = 99;
    else if (plannerConfig.pricingTier === "Professional") base = 299;
    else base = 999;

    let moduleMultiplier = plannerConfig.selectedModules.length * 45;
    let employeeFactor = 0;

    if (plannerConfig.pricingModel === "Per Employee Per Month (PEPM)") {
      employeeFactor = plannerConfig.companySize * 4.5;
    } else if (plannerConfig.pricingModel === "Per-User Seats") {
      employeeFactor = Math.ceil(plannerConfig.companySize * 0.1) * 15; // 10% seats
    } else if (plannerConfig.pricingModel === "Modular/Tiered") {
      employeeFactor = 0; // Fixed flat
    } else {
      // Lifetime license simulation
      return {
        total: (base * 12 + moduleMultiplier * 8).toFixed(2),
        interval: "One-time Lifetime License",
        explanation: `Calculated as a custom capital expenditure option for ${plannerConfig.companySize} staff.`
      };
    }

    const total = base + moduleMultiplier + employeeFactor;
    return {
      total: total.toFixed(2),
      interval: "/ month",
      explanation: `Includes flat tier fee ($${base}), plus ${plannerConfig.selectedModules.length} selected modules, and employee scaling.`
    };
  };

  const handleGenerateStrategy = async () => {
    setIsGeneratingStrategy(true);
    setPlannerError("");
    try {
      const response = await fetch("/api/strategy/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plannerConfig)
      });
      const data = await response.json();
      if (data.success && data.strategy) {
        setStrategyResult(data.strategy);
        completeOnboardingStep("company_profile");
      } else {
        throw new Error(data.error || "Strategy generation returned failed status");
      }
    } catch (err: any) {
      console.error(err);
      setPlannerError("Encountered strategic planning exception. Operating in simulated offline fallback mode.");
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  // Generate initial strategy once on planner load
  useEffect(() => {
    if (!strategyResult && activeTab === "planner") {
      handleGenerateStrategy();
    }
  }, [activeTab]);


  // ---------------------------------------------------------------------------
  // FINANCIAL CORE & SPEND HANDLERS
  // ---------------------------------------------------------------------------
  const [newExpense, setNewExpense] = useState({
    employeeId: "EMP-101",
    category: "Meals" as "Travel" | "Meals" | "Software" | "Equipment" | "Office Supplies" | "Other",
    amount: 0,
    merchant: "",
  });

  const handleTriggerFinanceAudit = async () => {
    setIsAuditing(true);
    setAuditError("");
    try {
      const response = await fetch("/api/finance/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenses, payroll: payrolls, apInvoices, arInvoices })
      });
      const data = await response.json();
      if (data.success && data.audit) {
        setFinanceAudit(data.audit);
        completeOnboardingStep("cfo_audit");
      } else {
        throw new Error(data.error || "No audit report retrieved");
      }
    } catch (err: any) {
      console.error(err);
      setAuditError("Audit report failed. Using premium local solver.");
    } finally {
      setIsAuditing(false);
    }
  };

  // Run audit on load of finance tab
  useEffect(() => {
    if (!financeAudit && activeTab === "finance") {
      handleTriggerFinanceAudit();
    }
  }, [activeTab]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.amount <= 0 || !newExpense.merchant) return;

    const emp = employees.find(empItem => empItem.id === newExpense.employeeId);
    const empName = emp ? emp.name : "Unknown Employee";

    // Standard caps compliance rules
    const cap = newExpense.category === "Meals" ? 75 : 500;
    const policyFlagged = newExpense.amount > cap;
    const policyNotes = policyFlagged 
      ? `Flagged Over-limit: Individual claim for ${newExpense.category} ($${newExpense.amount}) exceeds standard daily cap of $${cap}.`
      : undefined;

    const created: ExpenseReport = {
      id: `EXP-${Math.floor(700 + Math.random() * 300)}`,
      employeeId: newExpense.employeeId,
      employeeName: empName,
      date: new Date().toISOString().split("T")[0],
      category: newExpense.category,
      amount: Number(newExpense.amount),
      merchant: newExpense.merchant,
      status: "Pending",
      policyFlagged,
      policyNotes
    };

    setExpenses([created, ...expenses]);
    setNewExpense({ employeeId: "EMP-101", category: "Meals", amount: 0, merchant: "" });
  };

  const handleApproveExpense = (expId: string) => {
    const exp = expenses.find(expItem => expItem.id === expId);
    if (!exp) return;

    // Post to general ledger
    const journal: GlJournalEntry = {
      id: `GL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      description: `Approved Expense: ${exp.employeeName} at ${exp.merchant}`,
      reference: exp.id,
      debitAccount: `Operating Expense - ${exp.category}`,
      creditAccount: "Accrued Reimbursements Payable",
      amount: exp.amount
    };

    setJournals([journal, ...journals]);
    setExpenses(prev => prev.map(e => e.id === expId ? { ...e, status: "Approved" } : e));
    
    // Auto re-trigger audit
    setTimeout(() => handleTriggerFinanceAudit(), 200);
  };

  const handleRejectExpense = (expId: string) => {
    setExpenses(prev => prev.map(e => e.id === expId ? { ...e, status: "Rejected" } : e));
    setTimeout(() => handleTriggerFinanceAudit(), 200);
  };

  const handlePayVendor = (invoiceId: string) => {
    const inv = apInvoices.find(i => i.id === invoiceId);
    if (!inv) return;

    // Post to general ledger
    const journal: GlJournalEntry = {
      id: `GL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      description: `Settled Invoice: ${inv.vendorName}`,
      reference: inv.id,
      debitAccount: "Accounts Payable (AP)",
      creditAccount: "Cash - Operating Account",
      amount: inv.amount
    };

    setJournals([journal, ...journals]);
    setApInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status: "Paid" } : i));
    
    // Auto re-trigger audit
    setTimeout(() => handleTriggerFinanceAudit(), 200);
  };

  const handleTriggerCollection = (arId: string) => {
    setArInvoices(prev => prev.map(i => i.id === arId ? { ...i, status: "Sent", daysOverdue: 0 } : i));
    setTimeout(() => handleTriggerFinanceAudit(), 200);
  };

  const handleAddArInvoice = (recipientName: string, amount: number, shipmentId?: string) => {
    const created: ArInvoice = {
      id: `ARI-${Math.floor(100 + Math.random() * 900)}`,
      customerName: recipientName,
      shipmentId,
      amount,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      status: "Sent",
      daysOverdue: 0
    };
    setArInvoices([created, ...arInvoices]);
  };


  // Helper counts
  const totalEmployees = employees.length;
  const onboardingCount = employees.filter(e => e.status === "Onboarding").length;
  const ptoCount = employees.filter(e => e.status === "PTO").length;
  const activeShipped = shipments.filter(s => s.status === "In-Transit" || s.status === "Dispatched").length;
  const pendingShipments = shipments.filter(s => s.status === "Pending").length;
  const lowStockItems = inventory.filter(i => i.status !== "In Stock").length;

  return (
    <div id="applet-container" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100">
      
      {/* Real-time Status Alert Bar */}
      <div id="top-status-bar" className="bg-slate-900 text-white text-xs py-2 px-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="font-semibold text-slate-300">NVK GLOBAL Enterprise Node Active</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Local Clock: 2026-07-12 23:30</span>
        </div>
        <div className="flex items-center gap-3">
          {isGeminiConfigured === null ? (
            <span className="text-slate-400">Verifying AI connectivity...</span>
          ) : isGeminiConfigured ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" /> NVK AI Engine Online
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              <ShieldAlert className="w-3.5 h-3.5" /> AI Engine Offline (Simulated Fallbacks Active)
            </span>
          )}
          <span className="text-slate-600">v1.4.2</span>
        </div>
      </div>

      {/* Main Unified Workspace */}
      <div id="workspace-layout" className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION - "Vibrant Palette" Indigo & Pink theme */}
        <aside id="sidebar-navigation" className="w-72 bg-indigo-600 p-6 flex flex-col shrink-0 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 bg-indigo-600 rounded-sm rotate-45"></div>
            </div>
            <div>
              <span className="text-white font-extrabold text-2xl tracking-tight block">NVK GLOBAL</span>
              <span className="text-xs text-indigo-200 font-medium tracking-wide">Enterprise Operations</span>
            </div>
          </div>
          
          <nav className="space-y-1.5 flex-1">
            <button 
              id="nav-tab-overview"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "overview" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <Compass className="w-5 h-5 opacity-85" />
              <span>Unified Dashboard</span>
            </button>

            <button 
              id="nav-tab-hr"
              onClick={() => setActiveTab("hr")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "hr" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <Users className="w-5 h-5 opacity-85" />
              <div className="flex-1 flex justify-between items-center">
                <span>HR Core Platform</span>
                {ptoRequests.filter(r => r.status === "Pending").length > 0 && (
                  <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {ptoRequests.filter(r => r.status === "Pending").length}
                  </span>
                )}
              </div>
            </button>

            <button 
              id="nav-tab-ats"
              onClick={() => setActiveTab("ats")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "ats" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <Briefcase className="w-5 h-5 opacity-85" />
              <span>Recruitment & ATS</span>
            </button>

            <button 
              id="nav-tab-tms"
              onClick={() => setActiveTab("tms")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "tms" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <Truck className="w-5 h-5 opacity-85" />
              <div className="flex-1 flex justify-between items-center">
                <span>Logistics & TMS</span>
                {pendingShipments > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {pendingShipments}
                  </span>
                )}
              </div>
            </button>

            <button 
              id="nav-tab-wms"
              onClick={() => setActiveTab("wms")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "wms" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <Package className="w-5 h-5 opacity-85" />
              <div className="flex-1 flex justify-between items-center">
                <span>Warehouse & WMS</span>
                {lowStockItems > 0 && (
                  <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {lowStockItems}!
                  </span>
                )}
              </div>
            </button>

            <button 
              id="nav-tab-finance"
              onClick={() => setActiveTab("finance")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "finance" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <DollarSign className="w-5 h-5 opacity-85" />
              <div className="flex-1 flex justify-between items-center">
                <span>Financial Core (ERP)</span>
                {expenses.filter(e => e.status === "Pending").length + apInvoices.filter(i => i.status === "Unpaid" && i.threeWayMatch === "Mismatch").length > 0 && (
                  <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {expenses.filter(e => e.status === "Pending").length + apInvoices.filter(i => i.status === "Unpaid" && i.threeWayMatch === "Mismatch").length}
                  </span>
                )}
              </div>
            </button>

            <button 
              id="nav-tab-planner"
              onClick={() => setActiveTab("planner")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl font-medium transition-all text-left ${activeTab === "planner" ? "bg-indigo-700 text-white shadow-md border-l-4 border-pink-400" : "text-indigo-100 hover:bg-indigo-500/30"}`}
            >
              <TrendingUp className="w-5 h-5 opacity-85" />
              <span className="flex items-center gap-1.5">
                Strategic Advisor <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              </span>
            </button>
          </nav>

          {/* User Widget / Self-service Toggle */}
          <div className="mt-auto pt-6 border-t border-indigo-500/30">
            <div className="bg-indigo-500/30 p-4 rounded-2xl mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200">Sarah Jenkins</span>
                <span className="bg-pink-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded">HR ADMIN</span>
              </div>
              <p className="text-xs text-indigo-100">Regional Terminal Node A</p>
              
              {/* Interactive Clock In Indicator */}
              <div className="mt-3 flex items-center justify-between">
                <button 
                  onClick={handleClockToggle}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${clockedIn ? "bg-pink-500 text-white animate-pulse" : "bg-white text-indigo-900 hover:bg-indigo-50"}`}
                >
                  <Clock className="w-3 h-3" />
                  {clockedIn ? "Clocked In" : "Clock In"}
                </button>
                <span className="text-[10px] text-indigo-200 font-mono">
                  {timeLogs.length > 0 ? new Date(timeLogs[0].timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "No log"}
                </span>
              </div>
            </div>
            
            <div className="bg-indigo-950/40 p-3.5 rounded-xl text-[11px] text-indigo-200 flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
              <span>Database Sync Status: 100%</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTROLLER WORKSPACE - scrollable content container */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#F8FAFC]">
          
          {/* Header Row */}
          <header className="flex justify-between items-center p-8 bg-white border-b border-slate-200/60 shrink-0">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
                {activeTab === "overview" && "Enterprise Integrated Workspace"}
                {activeTab === "hr" && "HR Core System of Record"}
                {activeTab === "ats" && "Recruitment & Talent Acquisition Pipelines"}
                {activeTab === "tms" && "Logistics & Fleet Dispatch Command"}
                {activeTab === "wms" && "WMS Inventory & Barcode Shipping Control"}
                {activeTab === "finance" && "Financial & Spend Control (ERP Core)"}
                {activeTab === "planner" && "Enterprise Pricing & Business Strategy Planner"}
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-0.5">
                {activeTab === "overview" && "Interactive unified workspace simulating overall enterprise operations and physical fleet telemetry."}
                {activeTab === "hr" && "Centralized records, customizable PTO approvals, dynamic employee self-service clocks, and credentials control."}
                {activeTab === "ats" && "Applicant screening queues and real-time NVK AI evaluations tailored to candidate resume details."}
                {activeTab === "tms" && "Optimize shipment dispatch schedules, monitor CDL driver safety levels, and minimize empty backhauls with AI."}
                {activeTab === "wms" && "Real-time shelf item quantities, low-stock warnings, manual counts adjustment, and automated shipping rate labels."}
                {activeTab === "finance" && "Automated corporate expense reporting, employee payroll, accounts payable 3-way matches, collections receivables, and GL cash planning."}
                {activeTab === "planner" && "Tailor NVK GLOBAL to your specific business, configure pricing, and request custom growth strategy briefs."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800">Sarah Jenkins</p>
                <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest">HR Operations Director</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 rounded-full shadow-md">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-indigo-800">
                  SJ
                </div>
              </div>
            </div>
          </header>

          {/* Quick Alert Banner showing key status */}
          <div className="mx-8 mt-6">
            {isGeminiConfigured === null ? (
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-3 text-slate-600 text-xs font-medium shrink-0">
                <RefreshCw className="w-4 h-4 text-slate-400 animate-spin shrink-0" />
                <span>Verifying workspace AI key configuration status...</span>
              </div>
            ) : isGeminiConfigured ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-medium shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>NVK AI Engine Operational:</strong> All systems (candidate ATS screeners, logistics TMS routing sequences, CFO audit reports, and growth planner strategy briefs) are actively powered by live NVK AI core connectivity.
                </span>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800 text-xs font-medium shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>NVK AI Demo Mode Active:</strong> Core workspace keys are not fully configured. Advanced offline simulation models are active to ensure uninterrupted evaluations. Add your key to Secrets for live NVK AI integrations.
                </span>
              </div>
            )}
          </div>

          {/* Dynamic Content Views */}
          <div className="p-8 flex-1">
            
            {/* ========================================== */}
            {/* TAB 1: OVERVIEW                            */}
            {/* ========================================== */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                
                {/* Onboarding & Tutorial Checklist Hub */}
                <div id="onboarding-walkthrough-hub" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
                  {/* Decorative background flare */}
                  <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-indigo-500/30">Interactive Onboarding Tutorial</span>
                        {onboardingSteps.every((s: any) => s.completed) && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/30 animate-pulse">Platform Standard Ready</span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
                        NVK GLOBAL Operational Setup Checklist
                      </h2>
                      <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
                        Transition from demo simulation to a fully live enterprise instance. Follow this interactive guide to initialize strategic assets, core staff, recruitment funnels, physical logistics, warehouse inventory, and CFO audit ledgers.
                      </p>
                    </div>
                    
                    <button 
                      onClick={resetOnboarding}
                      className="shrink-0 self-start md:self-center px-4 py-2 bg-slate-800/80 hover:bg-slate-850 text-xs text-slate-300 font-bold rounded-xl transition-all border border-slate-700/50 flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset Progress
                    </button>
                  </div>

                  {/* Progress Meter */}
                  <div className="bg-slate-950/40 p-4 rounded-2xl mb-6 border border-slate-800/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Integration Completion</span>
                      <span className="text-sm font-black text-indigo-400">
                        {onboardingSteps.filter((s: any) => s.completed).length} of {onboardingSteps.length} Tasks ({Math.round((onboardingSteps.filter((s: any) => s.completed).length / onboardingSteps.length) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${(onboardingSteps.filter((s: any) => s.completed).length / onboardingSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Steps Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {onboardingSteps.map((step: any, idx: number) => {
                      return (
                        <div 
                          key={step.id} 
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                            step.completed 
                              ? "bg-slate-900/40 border-emerald-500/20 hover:border-emerald-500/30" 
                              : "bg-slate-950/60 border-slate-800/80 hover:border-indigo-500/30"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <span className="text-[10px] font-black text-indigo-400/80 uppercase">Step {idx + 1}: {step.tab.toUpperCase()}</span>
                              {step.completed ? (
                                <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  <Check className="w-3 h-3" /> Done
                                </span>
                              ) : (
                                <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700/30">
                                  Pending Action
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">{step.label}</h4>
                            <p className="text-slate-400 text-xs leading-relaxed mb-4">{step.description}</p>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab(step.tab as any);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              step.completed 
                                ? "bg-slate-850 hover:bg-slate-800 text-emerald-400 border border-emerald-500/15" 
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                            }`}
                          >
                            {step.completed ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                Relaunch Tab Workflow
                              </>
                            ) : (
                              <>
                                <Compass className="w-3.5 h-3.5" />
                                Launch Interactive Guide ➔
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Celebratory Banner if 100% completed */}
                  {onboardingSteps.every((s: any) => s.completed) && (
                    <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 p-5 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-emerald-300 font-bold text-sm">Congratulations! Onboarding Complete</h4>
                        <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                          You have successfully completed all core operational setups for **NVK GLOBAL**. Your general ledger, warehouse parameters, personnel directory, ATS tracking, and TMS scheduling routing parameters are locked and ready for full production use!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold mb-4">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Active Personnel</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      {totalEmployees} <span className="text-emerald-500 text-xs font-bold font-sans">+{onboardingCount} onboarding</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{ptoCount} employee currently on PTO</p>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 font-bold mb-4">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Hiring Pipeline</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      {candidates.length} <span className="text-indigo-400 text-xs font-bold">Candidates</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{jobs.length} Active job listings posted</p>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 font-bold mb-4">
                      <Truck className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Fleet Telemetry</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      {activeShipped} <span className="text-emerald-500 text-xs font-bold">Dispatched</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{pendingShipments} shipments awaiting routing</p>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-4">
                      <Package className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Warehouse Stock</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      {inventory.reduce((acc, curr) => acc + curr.quantity, 0)} <span className="text-slate-400 text-xs font-medium">SKUs</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{lowStockItems} low stock alerts flagged</p>
                  </div>

                </div>

                {/* Main Dashboard Interactive Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Core Workflows Overview */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Active Staff Directory Snippet */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-600" />
                          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Active Staff Highlights</h3>
                        </div>
                        <button 
                          onClick={() => setActiveTab("hr")}
                          className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1"
                        >
                          View HR Directory <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-100 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                                <th className="pb-3 font-semibold">Employee</th>
                                <th className="pb-3 font-semibold">Department</th>
                                <th className="pb-3 font-semibold">Role</th>
                                <th className="pb-3 font-semibold">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {employees.slice(0, 3).map((emp) => (
                                <tr key={emp.id} className="text-sm hover:bg-slate-50/50">
                                  <td className="py-3">
                                    <p className="font-bold text-slate-800">{emp.name}</p>
                                    <p className="text-xs text-slate-400 font-mono">{emp.id}</p>
                                  </td>
                                  <td className="py-3 text-slate-600 font-medium">{emp.department}</td>
                                  <td className="py-3 text-slate-500 text-xs">{emp.role}</td>
                                  <td className="py-3">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                      emp.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                                      emp.status === "PTO" ? "bg-amber-50 text-amber-700" : "bg-pink-50 text-pink-700"
                                    }`}>
                                      {emp.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Pending Fleet Deliveries Snippet */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-indigo-600" />
                          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Urgent Shipment Dispatch Queue</h3>
                        </div>
                        <button 
                          onClick={() => setActiveTab("tms")}
                          className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1"
                        >
                          Open Dispatch Command <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3.5">
                          {shipments.map((shp) => {
                            const matchedDrv = drivers.find(d => d.id === shp.driverId);
                            return (
                              <div key={shp.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 bg-white rounded-xl shadow-xs border border-slate-200/50 flex items-center justify-center text-lg shrink-0 font-bold text-indigo-600 font-mono">
                                    {shp.id.slice(-3)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800 text-sm">To: {shp.destination}</p>
                                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                      <span className="font-bold text-slate-600">{shp.weight.toLocaleString()} lbs</span>
                                      <span>•</span>
                                      <span>Carrier: {shp.carrier}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 self-end md:self-center">
                                  <div className="text-right">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Driver Assignment</p>
                                    <p className="text-sm font-bold text-slate-700">{matchedDrv ? matchedDrv.name : "Unassigned"}</p>
                                  </div>
                                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full tracking-wider ${
                                    shp.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                                    shp.status === "In-Transit" ? "bg-indigo-100 text-indigo-800" :
                                    shp.status === "Dispatched" ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-800"
                                  }`}>
                                    {shp.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Live Operational Capacity & Strategy Quick Pitch */}
                  <div className="space-y-8">
                    
                    {/* Live Operations Pie Widget (Vibrant Palette style match) */}
                    <div className="bg-indigo-900 rounded-[2.5rem] shadow-lg p-6 text-white flex flex-col justify-between h-[360px]">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-indigo-300 uppercase tracking-widest text-[10px]">Active Shipment Rate</h3>
                        <span className="bg-pink-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                      </div>
                      <div className="flex flex-col justify-center items-center text-center my-4">
                        <div className="relative w-36 h-36 flex items-center justify-center">
                          {/* Beautiful SVG Arc representing dispatch utilization */}
                          <svg className="absolute w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="62" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="10" fill="transparent"></circle>
                            <circle 
                              cx="72" 
                              cy="72" 
                              r="62" 
                              stroke="#F43F5E" 
                              strokeWidth="10" 
                              fill="transparent" 
                              strokeDasharray="389" 
                              strokeDashoffset={389 - (389 * (activeShipped / shipments.length || 0.5))} 
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            ></circle>
                          </svg>
                          <div className="text-center">
                            <p className="text-3xl font-black">{Math.round((activeShipped / shipments.length) * 100 || 50)}%</p>
                            <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">Dispatched</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-950/50 p-3 rounded-xl border border-indigo-500/10 text-xs text-indigo-100/90 text-center">
                        {activeShipped} of {shipments.length} total active commercial shipments are currently loaded on regional carrier pathways.
                      </div>
                    </div>

                    {/* Strategic Growth Advisor Prompt Box */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Enterprise Strategic Advisor</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Dynamically review your enterprise licensing model, test hypothetical staffing tiers, and generate custom rollout phases instantly using NVK AI models.
                      </p>
                      <button 
                        onClick={() => setActiveTab("planner")}
                        className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all text-center"
                      >
                        Launch Strategic Planner
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 2: HR CORE                             */}
            {/* ========================================== */}
            {activeTab === "hr" && (
              <div className="space-y-8">
                {renderTutorialBanner("hr")}
                
                {/* Search & Filter bar */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search active employee database by name or role..."
                      value={searchEmp}
                      onChange={(e) => setSearchEmp(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Filter Dept:</span>
                    {["All", "Logistics", "Human Resources", "Warehouse", "Engineering"].map(dept => (
                      <button
                        key={dept}
                        onClick={() => setDeptFilter(dept)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${deptFilter === dept ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Two Column Layout: Directory & Form / PTO requests */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Full Directory */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Employee Roster ({employees.length})</h3>
                        <span className="text-xs text-slate-500 font-medium">Click columns to filter</span>
                      </div>
                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-100 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                                <th className="pb-3 font-semibold">Staff Identity</th>
                                <th className="pb-3 font-semibold">Department & Role</th>
                                <th className="pb-3 font-semibold">PTO Balance</th>
                                <th className="pb-3 font-semibold">Contact Info</th>
                                <th className="pb-3 font-semibold">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {employees
                                .filter(emp => {
                                  const matchesSearch = emp.name.toLowerCase().includes(searchEmp.toLowerCase()) || emp.role.toLowerCase().includes(searchEmp.toLowerCase());
                                  const matchesDept = deptFilter === "All" || emp.department === deptFilter;
                                  return matchesSearch && matchesDept;
                                })
                                .map((emp) => (
                                  <tr key={emp.id} className="text-sm hover:bg-slate-50/50">
                                    <td className="py-4">
                                      <p className="font-extrabold text-slate-800">{emp.name}</p>
                                      <p className="text-[10px] text-slate-400 font-mono">{emp.id} • Joined {emp.joinDate}</p>
                                    </td>
                                    <td className="py-4">
                                      <p className="font-bold text-slate-600 text-xs">{emp.department}</p>
                                      <p className="text-xs text-slate-500">{emp.role}</p>
                                    </td>
                                    <td className="py-4 font-bold text-slate-700 font-mono text-xs">
                                      {emp.ptoBalance} Days available
                                    </td>
                                    <td className="py-4 text-xs">
                                      <p className="text-slate-600 font-medium">{emp.email}</p>
                                      <p className="text-slate-400">{emp.phone}</p>
                                    </td>
                                    <td className="py-4">
                                      <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                        emp.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                        emp.status === "PTO" ? "bg-amber-50 text-amber-700 border border-amber-200" : 
                                        "bg-pink-50 text-pink-700 border border-pink-200"
                                      }`}>
                                        {emp.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Punch Time Log History */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-600" />
                          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Attendance Clock & Timesheet Logs</h3>
                        </div>
                        <span className="text-xs text-slate-400 font-bold"> Sarah Jenkins (EMP-102) Session</span>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Self-Service Clock State</p>
                            <p className="text-xl font-bold mt-1 text-slate-700">{clockedIn ? "Currently Clocked IN" : "Currently Clocked OUT"}</p>
                            <button 
                              onClick={handleClockToggle}
                              className={`mt-3 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                clockedIn ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-indigo-600 text-white hover:bg-indigo-700"
                              }`}
                            >
                              {clockedIn ? "Perform Clock-Out Punch" : "Perform Clock-In Punch"}
                            </button>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Active Timesheet Duration</p>
                            <p className="text-xl font-black mt-1 text-slate-800">38.4 Hours</p>
                            <p className="text-xs text-emerald-600 font-bold mt-2">✓ Within standard baseline limits</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Overtime Threshold</p>
                            <p className="text-xl font-black mt-1 text-slate-800">1.5x Multiplier</p>
                            <p className="text-xs text-slate-500 mt-2">Triggered beyond 40 hrs</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2">Recent Punch Registry</p>
                          {timeLogs.map((log) => (
                            <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${log.type === "Clock-In" ? "bg-emerald-500" : "bg-pink-500"}`}></span>
                                <span className="font-bold text-slate-700">{log.employeeName}</span>
                              </div>
                              <span className="font-black uppercase text-slate-500 tracking-wider font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200">
                                {log.type}
                              </span>
                              <span className="text-slate-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()} (July 12, 2026)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Add Employee & PTO Actions */}
                  <div className="space-y-8">
                    
                    {/* Add Employee Form */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Plus className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Onboard New Employee</h4>
                      </div>
                      <form onSubmit={handleAddEmployee} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Legal Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Richard Hendricks"
                            value={newEmp.name}
                            onChange={(e) => setNewEmp({...newEmp, name: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Department</label>
                            <select 
                              value={newEmp.department}
                              onChange={(e) => setNewEmp({...newEmp, department: e.target.value})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option>Logistics</option>
                              <option>Human Resources</option>
                              <option>Warehouse</option>
                              <option>Engineering</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Assigned Role</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Senior Planner"
                              value={newEmp.role}
                              onChange={(e) => setNewEmp({...newEmp, role: e.target.value})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Corporate Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="r.hendricks@omnisuite.corp"
                            value={newEmp.email}
                            onChange={(e) => setNewEmp({...newEmp, email: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mobile Contact</label>
                            <input 
                              type="text" 
                              placeholder="+1 (555) 444-1234"
                              value={newEmp.phone}
                              onChange={(e) => setNewEmp({...newEmp, phone: e.target.value})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Starting PTO Balance</label>
                            <input 
                              type="number" 
                              value={newEmp.ptoBalance}
                              onChange={(e) => setNewEmp({...newEmp, ptoBalance: Number(e.target.value)})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all mt-2"
                        >
                          Generate Onboarding ID
                        </button>
                      </form>
                    </div>

                    {/* PTO Requests Management Panel */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">PTO Approval Board</h4>
                      </div>
                      
                      <div className="space-y-4">
                        {ptoRequests.map((req) => (
                          <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-slate-800 text-xs">{req.employeeName}</p>
                                <p className="text-[10px] text-slate-500 font-mono">ID: {req.employeeId}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                req.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                                req.status === "Rejected" ? "bg-pink-100 text-pink-800" : "bg-amber-100 text-amber-800"
                              }`}>
                                {req.status}
                              </span>
                            </div>
                            
                            <div className="my-2.5">
                              <p className="text-xs text-slate-700 font-medium italic">"{req.reason}"</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                                Date: {req.startDate} to {req.endDate} ({req.days} days)
                              </p>
                            </div>

                            {req.status === "Pending" && (
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  onClick={() => handleApprovePto(req.id)}
                                  className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-lg flex items-center justify-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                                <button
                                  onClick={() => handleRejectPto(req.id)}
                                  className="flex-1 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-[10px] uppercase rounded-lg flex items-center justify-center gap-1"
                                >
                                  <X className="w-3 h-3" /> Deny
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 3: RECRUITMENT & ATS                   */}
            {/* ========================================== */}
            {activeTab === "ats" && (
              <div className="space-y-8">
                {renderTutorialBanner("ats")}
                
                {/* Visual Pipeline Header */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider mb-4">Talent Sourcing & Stages Overview</h3>
                  <div className="grid grid-cols-5 gap-3 text-center">
                    {["Applied", "Screened", "Interview", "Offered", "Hired"].map((stage, idx) => {
                      const count = candidates.filter(c => c.stage === stage).length;
                      return (
                        <div key={stage} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stage}</p>
                          <p className="text-2xl font-black text-slate-800 mt-1">{count}</p>
                          <div className="w-full bg-slate-200 h-1 rounded-full mt-3 overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full" 
                              style={{ width: `${count ? (count / candidates.length) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Candidate Evaluator Panel - Fully custom styling and full AI capability */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Candidates Selection & Resume View */}
                  <div className="space-y-8">
                    
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">Candidates Pipeline Queue</h4>
                      </div>
                      <div className="p-4 divide-y divide-slate-100">
                        {candidates.map((cand) => (
                          <button
                            key={cand.id}
                            onClick={() => setSelectedCandidateId(cand.id)}
                            className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between ${cand.id === selectedCandidateId ? "bg-indigo-50 border border-indigo-200" : "hover:bg-slate-50"}`}
                          >
                            <div className="flex-1 pr-2">
                              <p className="font-bold text-slate-800 text-sm">{cand.name}</p>
                              <p className="text-xs text-indigo-600 font-medium">{cand.jobTitle}</p>
                              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                {cand.skills.slice(0, 3).map(sk => (
                                  <span key={sk} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] text-slate-500 font-medium">{sk}</span>
                                ))}
                              </div>
                            </div>
                            <span className="bg-white border border-slate-200 shadow-2xs font-extrabold px-2 py-1 rounded-full text-[9px] uppercase tracking-wider text-slate-600 whitespace-nowrap">
                              {cand.stage}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Job Listings Control */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">Open Job Requisitions</h4>
                      </div>
                      <div className="p-6 space-y-4">
                        {jobs.map((job) => (
                          <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                            <div className="flex justify-between items-start">
                              <p className="font-bold text-slate-800 text-sm">{job.title}</p>
                              <span className="bg-indigo-100 text-indigo-800 text-[9px] font-black px-1.5 py-0.5 rounded">
                                {job.type}
                              </span>
                            </div>
                            <p className="text-slate-500 mt-1 font-medium">{job.department} • {job.location}</p>
                            <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-200/40">
                              <span className="text-slate-400 font-semibold">{job.applicantsCount} Active Applicants</span>
                              <span className="text-emerald-600 font-bold">● Recruiting</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Dynamic NVK AI Evaluation Stage */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-6">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-800 font-display flex items-center gap-1.5">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                            AI Recruiter Assistant
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">Extract candidate data and evaluate skill alignments securely with NVK models.</p>
                        </div>

                        {/* Interactive parameters */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Job:</span>
                          <select 
                            value={selectedJobForEvaluation}
                            onChange={(e) => setSelectedJobForEvaluation(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-700 focus:outline-none"
                          >
                            <option>Full Stack Engineer (React/Node)</option>
                            <option>Regional Fleet Logistics Driver</option>
                            <option>HR Onboarding Coordinator</option>
                          </select>
                        </div>
                      </div>

                      {/* Resume Editor / Input */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-slate-400 uppercase">Interactive Resume Transcript</label>
                            <button 
                              onClick={() => setCustomResumeText("")}
                              className="text-xs text-pink-500 hover:underline font-bold"
                            >
                              Clear Text
                            </button>
                          </div>
                          <textarea
                            rows={8}
                            value={customResumeText}
                            onChange={(e) => setCustomResumeText(e.target.value)}
                            placeholder="Paste candidate resume, CV text transcript, or past job records here..."
                            className="w-full p-4 bg-slate-50 rounded-2xl text-xs font-mono border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-400 font-medium">
                            Characters: {customResumeText.length} | Evaluating Candidate: <span className="font-bold text-slate-600">{currentCandidate?.name || "New Candidate"}</span>
                          </p>
                          <button
                            onClick={handleTriggerEvaluation}
                            disabled={isEvaluatingResume || !customResumeText}
                            className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            {isEvaluatingResume ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Analyzing Resume...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-pink-300" />
                                Evaluate with NVK AI
                              </>
                            )}
                          </button>
                        </div>
                        {evaluationError && (
                          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>{evaluationError}</span>
                          </div>
                        )}
                      </div>

                      {/* Display NVK AI Analysis results */}
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        {currentCandidate?.evaluation ? (
                          <div className="space-y-6">
                            
                            {/* Header details with suitability gauge */}
                            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Identified Name</p>
                                <p className="text-xl font-black text-slate-800">{currentCandidate.evaluation.candidateName}</p>
                                <p className="text-xs text-slate-500 font-medium">Highest Education: {currentCandidate.evaluation.education}</p>
                              </div>
                              
                              <div className="text-right flex items-center gap-4">
                                <div className="space-y-1">
                                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Suitability Alignment</p>
                                  <p className="text-3xl font-black text-slate-800 tracking-tight">
                                    {currentCandidate.evaluation.score} <span className="text-xs text-slate-400">/ 100</span>
                                  </p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                                  {currentCandidate.evaluation.score >= 85 ? "🔥 High" : "✓ Match"}
                                </div>
                              </div>
                            </div>

                            {/* Scoring bar visualizer */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                                <span>Risk Assessment Threshold</span>
                                <span>Optimal suitability</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    currentCandidate.evaluation.score >= 85 ? "bg-emerald-500" :
                                    currentCandidate.evaluation.score >= 70 ? "bg-indigo-500" : "bg-pink-500"
                                  }`}
                                  style={{ width: `${currentCandidate.evaluation.score}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Strengths & extracted justification */}
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recruiter Justification Brief</p>
                              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                                {currentCandidate.evaluation.justification}
                              </div>
                            </div>

                            {/* Extracted Core Skills checklist */}
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Extracted Professional Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {currentCandidate.evaluation.extractedSkills.map(sk => (
                                  <span key={sk} className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-xl text-xs font-bold text-indigo-700 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Custom Targeted Interview Questions */}
                            <div className="space-y-3">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Targeted Interview Questions</p>
                              <div className="space-y-2.5">
                                {currentCandidate.evaluation.interviewQuestions.map((q, idx) => (
                                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-pink-50/50 rounded-2xl border border-pink-100 text-xs text-slate-700">
                                    <span className="w-5 h-5 bg-pink-100 rounded-lg flex items-center justify-center font-bold text-pink-700 shrink-0 mt-0.5">
                                      Q
                                    </span>
                                    <p className="font-semibold leading-relaxed">{q}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div className="text-center py-12 text-slate-400">
                            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <p className="text-sm font-bold">No Analysis Generated Yet</p>
                            <p className="text-xs mt-1">Select a candidate from the left panel, edit their resume, and trigger NVK AI evaluations instantly.</p>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 4: LOGISTICS & TMS                     */}
            {/* ========================================== */}
            {activeTab === "tms" && (
              <div className="space-y-8">
                {renderTutorialBanner("tms")}
                
                {/* AI Route Optimizer Panel */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800 font-display flex items-center gap-1.5">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        AI Logistics Fleet Route & Load Optimizer
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">Auto-sequence commercial shipment deliveries, map driver capability models, and eliminate backhaul waste with NVK.</p>
                    </div>
                    <button
                      onClick={handleTriggerRouteOptimization}
                      disabled={isOptimizingRoutes}
                      className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all self-start md:self-center cursor-pointer"
                    >
                      {isOptimizingRoutes ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Building Loads...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-pink-300" />
                          Optimize Routes with NVK AI
                        </>
                      )}
                    </button>
                  </div>

                  {tmsError && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{tmsError}</span>
                    </div>
                  )}

                  {optimizedRouteData ? (
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      
                      {/* Optimization Indicators */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center">
                          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Fuel Savings Index</p>
                          <p className="text-3xl font-black text-indigo-800 mt-1">{optimizedRouteData.routingEfficiencyIndex}%</p>
                          <p className="text-xs text-indigo-600 mt-1">Excellent route mapping</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 text-center col-span-2">
                          <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">Yard Operations Executive Summary</p>
                          <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed text-left px-2">
                            {optimizedRouteData.dispatchSummaryNotes}
                          </p>
                        </div>
                      </div>

                      {/* Timeline sequences */}
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Optimized Fleet Pairings & Timelines</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {optimizedRouteData.assignments.map((asn: any) => (
                            <div key={asn.driverId} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                              <div className="flex justify-between items-start border-b border-slate-200/50 pb-3">
                                <div>
                                  <p className="font-extrabold text-slate-800 text-sm">{asn.driverName}</p>
                                  <p className="text-[10px] text-indigo-600 font-bold uppercase font-mono">{asn.driverId}</p>
                                </div>
                                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                                  {asn.assignedShipments.length} Loads matched
                                </span>
                              </div>

                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Route Sequence</p>
                                <div className="flex items-center gap-1 flex-wrap pt-1">
                                  {asn.optimizedRouteSequence.map((stop: string, sIdx: number) => (
                                    <React.Fragment key={stop}>
                                      <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs text-slate-600 font-semibold">{stop}</span>
                                      {sIdx < asn.optimizedRouteSequence.length - 1 && (
                                        <span className="text-slate-400 font-bold text-sm">→</span>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>

                              <div className="text-xs text-slate-500 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200/60 font-medium">
                                "{asn.reasonForAssignment}"
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center text-slate-500 text-xs border border-dashed border-slate-200">
                      Click the "Optimize Routes with NVK AI" button above to evaluate shipment routes, carrier constraints, and build optimized dispatch patterns instantly.
                    </div>
                  )}
                </div>

                {/* Fleet and Shipment Tables split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Shipments List */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <BarCodeIcon className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Shipments Registry Queue</h4>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">{shipments.length} Total</span>
                    </div>
                    <div className="p-6 space-y-4">
                      {shipments.map((shp) => (
                        <div key={shp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Shipment ID: <span className="font-mono text-indigo-600">{shp.id}</span></p>
                              <p className="text-xs text-slate-500 font-medium">Origin: {shp.origin}</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase ${
                              shp.status === "Pending" ? "bg-slate-200 text-slate-800" :
                              shp.status === "In-Transit" ? "bg-indigo-100 text-indigo-800 animate-pulse" :
                              shp.status === "Dispatched" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {shp.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 text-xs border-t border-slate-200/55 pt-2.5">
                            <div>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Weight</p>
                              <p className="font-bold text-slate-700">{shp.weight.toLocaleString()} lbs</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Cargo Value</p>
                              <p className="font-bold text-slate-700">${shp.value.toLocaleString()} USD</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Carrier</p>
                              <p className="font-bold text-slate-700">{shp.carrier}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Driver Assignee:</span>
                            <select 
                              value={shp.driverId || ""}
                              onChange={(e) => handleAssignDriver(shp.id, e.target.value)}
                              className="bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="">-- Unassigned --</option>
                              {drivers.map(drv => (
                                <option key={drv.id} value={drv.id}>{drv.name} ({drv.status})</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drivers & Vehicles status board */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">CDL Driver Fleet Registry</h4>
                      </div>
                    </div>
                    <div className="p-6 divide-y divide-slate-100">
                      {drivers.map((drv) => (
                        <div key={drv.id} className="py-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-extrabold text-slate-800">{drv.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{drv.vehicle}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {drv.id} • Contact: {drv.phone}</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              drv.status === "Available" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                              drv.status === "Active" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-500"
                            }`}>
                              {drv.status}
                            </span>
                            {drv.status === "Available" && (
                              <span className="text-[9px] text-slate-400 font-bold">Ready for dispatch</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 5: WAREHOUSE & SHIPPING                */}
            {/* ========================================== */}
            {activeTab === "wms" && (
              <div className="space-y-8">
                {renderTutorialBanner("wms")}
                
                {/* Visual grid splits */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Shelf Inventory Tracker */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Shelf Inventory Stock levels</h4>
                      </div>
                      <span className="text-xs text-slate-400 font-medium font-mono">Terminal A Warehousing</span>
                    </div>
                    
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                              <th className="pb-3 font-semibold">SKU / Item Identity</th>
                              <th className="pb-3 font-semibold">Bin Location</th>
                              <th className="pb-3 font-semibold">Category</th>
                              <th className="pb-3 font-semibold">Stock Level</th>
                              <th className="pb-3 font-semibold">Adjust Levels</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {inventory.map((item) => (
                              <tr key={item.id} className="text-xs hover:bg-slate-50/50">
                                <td className="py-4 pr-3">
                                  <p className="font-extrabold text-slate-800 text-sm">{item.name}</p>
                                  <p className="text-[10px] text-indigo-600 font-bold font-mono tracking-wide">{item.sku}</p>
                                </td>
                                <td className="py-4 font-semibold text-slate-500 font-mono">{item.bin}</td>
                                <td className="py-4 text-slate-400 font-semibold uppercase text-[10px]">{item.category}</td>
                                <td className="py-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-800 text-sm">{item.quantity}</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase whitespace-nowrap ${
                                      item.status === "In Stock" ? "bg-emerald-100 text-emerald-800" :
                                      item.status === "Low Stock" ? "bg-amber-100 text-amber-800 animate-pulse" : "bg-pink-100 text-pink-800"
                                    }`}>
                                      {item.status}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Min threshold: {item.minStock}</p>
                                </td>
                                <td className="py-4">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleAdjustStock(item.id, 50)}
                                      className="w-8 h-8 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg flex items-center justify-center text-slate-700"
                                      title="Add 50 to stock"
                                    >
                                      +50
                                    </button>
                                    <button
                                      onClick={() => handleAdjustStock(item.id, -50)}
                                      className="w-8 h-8 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg flex items-center justify-center text-slate-700"
                                      title="Deduct 50 from stock"
                                    >
                                      -50
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Custom Label Generator */}
                  <div className="space-y-8">
                    
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Barcode className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide font-display">Logistics Label Generator</h4>
                      </div>
                      
                      <form onSubmit={handleGenerateLabel} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Recipient Name / Company</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Detroit Distribution Hub"
                            value={shippingLabelData.recipientName}
                            onChange={(e) => setShippingLabelData({...shippingLabelData, recipientName: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Destination Address / State</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. 450 Logistics Blvd, Detroit MI"
                            value={shippingLabelData.recipientAddress}
                            onChange={(e) => setShippingLabelData({...shippingLabelData, recipientAddress: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Weight (lbs)</label>
                            <input 
                              type="number" 
                              required
                              min={1}
                              value={shippingLabelData.weight}
                              onChange={(e) => setShippingLabelData({...shippingLabelData, weight: Number(e.target.value)})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Carrier Service</label>
                            <select 
                              value={shippingLabelData.carrier}
                              onChange={(e) => setShippingLabelData({...shippingLabelData, carrier: e.target.value as any})}
                              className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option>UPS</option>
                              <option>FedEx</option>
                              <option>DHL</option>
                            </select>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all mt-2 cursor-pointer"
                        >
                          Generate & Register Shipping Label
                        </button>
                      </form>
                    </div>

                    {/* Display Printable Label Preview */}
                    {generatedLabel && (
                      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-800 shadow-md space-y-4 font-mono text-[11px] text-slate-900 relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 bg-slate-900 text-white font-black text-[9px] px-3 py-1 uppercase tracking-widest rounded-bl">
                          {generatedLabel.carrier} Target
                        </div>
                        
                        <div className="border-b-2 border-slate-900 pb-3">
                          <p className="font-sans font-black text-sm uppercase tracking-wide">OMNISUITE FREIGHT SYSTEM</p>
                          <p className="text-[9px] text-slate-500">Terminal A Dispatch Desk | Chicago, IL</p>
                        </div>

                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">SHIP TO ADDRESS:</p>
                          <p className="font-extrabold text-sm text-slate-800 font-sans mt-0.5">{generatedLabel.recipientName}</p>
                          <p className="font-semibold text-slate-700">{generatedLabel.recipientAddress}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-y border-slate-200 py-3 my-2 font-sans">
                          <div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">Weight</p>
                            <p className="font-black text-sm">{generatedLabel.weight} lbs</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">Service Cost</p>
                            <p className="font-black text-sm text-indigo-600">${generatedLabel.cost} USD</p>
                          </div>
                        </div>

                        {/* Faux Barcode block */}
                        <div className="space-y-1.5 pt-2">
                          <div className="h-10 bg-slate-900 flex items-stretch">
                            {/* Simple responsive CSS visual barcode simulation */}
                            <div className="flex-1 bg-white border-r-4 border-slate-900"></div>
                            <div className="flex-1 bg-white border-r border-slate-900"></div>
                            <div className="flex-1 bg-white border-r-8 border-slate-900"></div>
                            <div className="flex-1 bg-white border-r border-slate-900"></div>
                            <div className="flex-1 bg-white border-r-2 border-slate-900"></div>
                            <div className="flex-1 bg-white border-r-4 border-slate-900"></div>
                            <div className="flex-1 bg-white border-r-8 border-slate-900"></div>
                            <div className="flex-1 bg-white border-r-2 border-slate-900"></div>
                          </div>
                          <p className="text-center font-bold tracking-widest font-mono text-[9px] text-slate-600">{generatedLabel.trackingCode}</p>
                        </div>

                        <p className="text-[9px] text-slate-400 text-center font-sans">Generated securely on July 12, 2026. Auto-synced to carrier logs.</p>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 5.5: FINANCIAL CORE (ERP Core)         */}
            {/* ========================================== */}
            {activeTab === "finance" && (
              <div className="space-y-8 animate-fadeIn">
                {renderTutorialBanner("finance")}
                
                {/* Finance Metric Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operating Cash Balance</p>
                      <h3 className="text-2xl font-black text-slate-800 mt-1 font-mono">
                        ${(142500 - apInvoices.filter(i => i.status === "Paid").reduce((acc, i) => acc + i.amount, 0) - expenses.filter(e => e.status === "Approved").reduce((acc, e) => acc + e.amount, 0)).toLocaleString()}
                      </h3>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">● Active Ledger Liquidity</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <Coins className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accounts Payable (AP)</p>
                      <h3 className="text-2xl font-black text-slate-800 mt-1 font-mono">
                        ${apInvoices.filter(i => i.status === "Unpaid").reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
                      </h3>
                      <p className="text-[10px] text-indigo-600 font-bold mt-1">
                        {apInvoices.filter(i => i.status === "Unpaid" && i.threeWayMatch === "Mismatch").length} mismatches detected
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accounts Receivable (AR)</p>
                      <h3 className="text-2xl font-black text-slate-800 mt-1 font-mono">
                        ${arInvoices.filter(i => i.status === "Sent" || i.status === "Overdue").reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
                      </h3>
                      <p className="text-[10px] text-amber-600 font-bold mt-1">
                        {arInvoices.filter(i => i.status === "Overdue").length} overdue customer bills
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CFO Risk index</p>
                      <h3 className="text-2xl font-black text-rose-600 mt-1 font-mono">
                        {financeAudit ? `${financeAudit.complianceScore}%` : "94%"}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {financeAudit ? financeAudit.criticalAnomalies.length : 1} audit warnings flagged
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Sub-tabs Selection within Finance View */}
                <div className="flex border-b border-slate-200 pb-2">
                  <button 
                    onClick={() => handleTriggerFinanceAudit()} 
                    className="mr-auto py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
                    {isAuditing ? "Auditing Ledger..." : "Re-trigger Audit"}
                  </button>
                  <p className="text-xs text-slate-400 self-center mr-4">
                    {auditError && <span className="text-rose-500 font-bold">{auditError}</span>}
                  </p>
                </div>

                {/* Main Content Splits */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Workspace: Expenses & Core Ledger */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Phase 1: Operational Spend & Reimbursements */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-indigo-600" />
                          <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Phase 1: Operational Out-of-Pocket Spend</h4>
                        </div>
                        <span className="text-xs text-indigo-600 font-bold font-mono">Policy Limit: Meals $75 | Others $500</span>
                      </div>

                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                                <th className="pb-3 font-semibold">Employee</th>
                                <th className="pb-3 font-semibold">Details / Merchant</th>
                                <th className="pb-3 font-semibold">Amount</th>
                                <th className="pb-3 font-semibold">Status / Warnings</th>
                                <th className="pb-3 font-semibold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {expenses.map((exp) => (
                                <tr key={exp.id} className="hover:bg-slate-50/40 text-xs">
                                  <td className="py-4 pr-3 font-bold text-slate-800">
                                    {exp.employeeName}
                                    <p className="text-[10px] text-slate-400 font-mono">{exp.employeeId}</p>
                                  </td>
                                  <td className="py-4">
                                    <p className="font-semibold text-slate-700">{exp.merchant}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase">{exp.category}</span>
                                      <span className="text-[10px] text-slate-400">{exp.date}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 font-mono font-bold text-slate-800">${exp.amount.toFixed(2)}</td>
                                  <td className="py-4">
                                    <div className="space-y-1">
                                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                        exp.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                                        exp.status === "Rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800 animate-pulse"
                                      }`}>
                                        {exp.status}
                                      </span>
                                      {exp.policyFlagged && (
                                        <div className="flex items-center gap-1 text-[9px] text-rose-600 font-extrabold">
                                          <AlertTriangle className="w-3 h-3 shrink-0" />
                                          <span>Policy Violation</span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-4 text-right">
                                    {exp.status === "Pending" ? (
                                      <div className="flex items-center justify-end gap-1.5">
                                        <button 
                                          onClick={() => handleApproveExpense(exp.id)}
                                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-all cursor-pointer"
                                          title="Approve Reimbursement"
                                        >
                                          <Check className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => handleRejectExpense(exp.id)}
                                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-all cursor-pointer"
                                          title="Reject Claim"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] text-slate-400 font-medium">Logged</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2 & 3: AP, AR Ledger Splits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Accounts Payable (AP) */}
                      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-indigo-600" />
                            Accounts Payable (AP)
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Matches</span>
                        </div>

                        <div className="space-y-3.5">
                          {apInvoices.map((inv) => (
                            <div key={inv.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-extrabold text-slate-800 text-xs">{inv.vendorName}</p>
                                  <p className="text-[9px] text-slate-400 font-mono">PO Ref: {inv.purchaseOrderRef || "None"}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                  inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                }`}>
                                  {inv.status}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-xs">
                                <span className="font-mono font-bold text-indigo-600">${inv.amount.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400">Due: {inv.dueDate}</span>
                              </div>

                              <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/50">
                                <div className="flex items-center gap-1.5">
                                  <span className={`inline-block w-2 h-2 rounded-full ${
                                    inv.threeWayMatch === "Match" ? "bg-emerald-400" : "bg-rose-500 animate-pulse"
                                  }`}></span>
                                  <span className="text-[10px] font-bold text-slate-500">
                                    3-way check: {inv.threeWayMatch}
                                  </span>
                                </div>
                                {inv.status === "Unpaid" && (
                                  <button
                                    onClick={() => handlePayVendor(inv.id)}
                                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                  >
                                    Pay Vendor
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Accounts Receivable (AR) */}
                      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            Accounts Receivable (AR)
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Aging list</span>
                        </div>

                        <div className="space-y-3.5">
                          {arInvoices.map((inv) => (
                            <div key={inv.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-extrabold text-slate-800 text-xs">{inv.customerName}</p>
                                  <p className="text-[9px] text-slate-400 font-mono">ID: {inv.id}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                  inv.status === "Settled" ? "bg-emerald-100 text-emerald-800" :
                                  inv.status === "Overdue" ? "bg-rose-100 text-rose-800" : "bg-indigo-100 text-indigo-800"
                                }`}>
                                  {inv.status}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-xs">
                                <span className="font-mono font-bold text-slate-700">${inv.amount.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400">Due: {inv.dueDate}</span>
                              </div>

                              {inv.daysOverdue > 0 && (
                                <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Overdue by {inv.daysOverdue} days!
                                </p>
                              )}

                              <div className="flex justify-end pt-1.5 border-t border-slate-200/50">
                                {inv.status === "Overdue" && (
                                  <button
                                    onClick={() => handleTriggerCollection(inv.id)}
                                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                  >
                                    Send Collection Alert
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* General Ledger Live Entries */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide font-display">General Ledger Double-Entry Journals</h4>
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono">GAAP Compliant Logs</span>
                      </div>

                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                                <th className="pb-3 font-semibold">ID / Date</th>
                                <th className="pb-3 font-semibold">Description / Ref</th>
                                <th className="pb-3 font-semibold">Debit Account</th>
                                <th className="pb-3 font-semibold">Credit Account</th>
                                <th className="pb-3 font-semibold text-right">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {journals.map((j) => (
                                <tr key={j.id} className="hover:bg-slate-50/40 font-mono text-xs text-slate-600">
                                  <td className="py-4 font-bold text-slate-800">
                                    {j.id}
                                    <p className="text-[9px] text-slate-400 font-normal">{j.date}</p>
                                  </td>
                                  <td className="py-4">
                                    <p className="font-semibold text-slate-700 font-sans">{j.description}</p>
                                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{j.reference}</p>
                                  </td>
                                  <td className="py-4 text-emerald-700 font-bold">{j.debitAccount}</td>
                                  <td className="py-4 text-rose-700 font-bold">{j.creditAccount}</td>
                                  <td className="py-4 text-right font-black text-slate-800 font-mono">${j.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Workspace: AI CFO Audit Report & Expense logger */}
                  <div className="space-y-8">
                    
                    {/* Log New Out of pocket expense */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Receipt className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide font-display">Log Employee Expense Claim</h4>
                      </div>

                      <form onSubmit={handleAddExpense} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Claiming Employee</label>
                          <select 
                            value={newExpense.employeeId}
                            onChange={(e) => setNewExpense({...newExpense, employeeId: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            {employees.map(e => (
                              <option key={e.id} value={e.id}>{e.name} ({e.id})</option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expense Category</label>
                            <select 
                              value={newExpense.category}
                              onChange={(e) => setNewExpense({...newExpense, category: e.target.value as any})}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="Meals">Meals</option>
                              <option value="Travel">Travel</option>
                              <option value="Software">Software</option>
                              <option value="Equipment">Equipment</option>
                              <option value="Office Supplies">Office Supplies</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Amount (USD)</label>
                            <input 
                              type="number"
                              min={1}
                              required
                              placeholder="0.00"
                              value={newExpense.amount || ""}
                              onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Merchant / Purpose</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Southwest Airlines, Uber, Slack"
                            value={newExpense.merchant}
                            onChange={(e) => setNewExpense({...newExpense, merchant: e.target.value})}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all mt-2 cursor-pointer"
                        >
                          Submit Reimbursement Claim
                        </button>
                      </form>
                    </div>

                    {/* AI CFO Compliance & Audit Forecaster Output */}
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-[2.5rem] shadow-xl space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-indigo-400" />
                          <h4 className="font-extrabold text-sm uppercase tracking-wide font-sans text-white">AI CFO Audit Report</h4>
                        </div>
                        <span className="bg-indigo-500/20 text-indigo-300 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">NVK Insights</span>
                      </div>

                      {isAuditing ? (
                        <div className="text-center py-16 text-slate-400 space-y-3">
                          <RefreshCw className="w-10 h-10 mx-auto text-indigo-400 animate-spin" />
                          <p className="text-xs font-bold uppercase tracking-wider">Recalculating General Ledger balances...</p>
                          <p className="text-[10px] text-slate-500">Checking 3-Way invoice match logs & employee out-of-pocket claims.</p>
                        </div>
                      ) : financeAudit ? (
                        <div className="space-y-6 text-xs">
                          {/* Compliance Score */}
                          <div className="flex items-center justify-between bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                            <div>
                              <p className="text-[10px] font-bold text-indigo-300 uppercase">GAAP Compliance Score</p>
                              <p className="text-2xl font-black text-white mt-1 font-mono">{financeAudit.complianceScore}%</p>
                            </div>
                            <div className="text-right">
                              <span className="inline-block bg-pink-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider font-sans">
                                {financeAudit.complianceScore >= 90 ? "SECURE" : "WARNING"}
                              </span>
                            </div>
                          </div>

                          {/* Critical Anomalies */}
                          <div className="space-y-3">
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 shrink-0" /> Policy & Match Anomalies ({financeAudit.criticalAnomalies.length})
                            </p>
                            <div className="space-y-2">
                              {financeAudit.criticalAnomalies.map((an, idx) => (
                                <div key={idx} className="p-3 bg-rose-950/40 rounded-xl border border-rose-900/60 text-slate-300 text-[11px] leading-relaxed">
                                  <p className="font-extrabold text-rose-300 text-xs">Anomaly #{idx + 1}</p>
                                  <p className="mt-1 font-semibold">{an}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cash Flow Forecast */}
                          <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800 space-y-3">
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">CFO 30-Day Liquidity Projections</p>
                            <div className="grid grid-cols-2 gap-3 text-center">
                              <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-850">
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Estimated Inflow</p>
                                <p className="text-sm font-black text-emerald-400 mt-1 font-mono">${financeAudit.cashFlowForecast.projectedInflow.toLocaleString()}</p>
                              </div>
                              <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-850">
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Estimated Outflow</p>
                                <p className="text-sm font-black text-rose-400 mt-1 font-mono">${financeAudit.cashFlowForecast.projectedOutflow.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                              <span className="text-slate-400 font-bold">Projected Net Balance:</span>
                              <span className={`font-black font-mono ${
                                financeAudit.cashFlowForecast.netProjectedBalance >= 0 ? "text-emerald-400" : "text-rose-400"
                              }`}>
                                ${financeAudit.cashFlowForecast.netProjectedBalance.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Strategic Insights */}
                          <div className="space-y-2.5">
                            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">CFO Treasury Directives</p>
                            <div className="space-y-2">
                              {financeAudit.strategicInsights.map((ins, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-slate-300 leading-relaxed text-[11px]">
                                  <span className="w-4 h-4 bg-indigo-500/20 text-indigo-300 rounded flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="font-semibold">{ins}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-16 text-slate-400 space-y-3">
                          <ShieldCheck className="w-10 h-10 mx-auto text-slate-600" />
                          <p className="text-xs font-bold">No CFO Audit Generated</p>
                          <p className="text-[10px] text-slate-500">Initiating live general ledger sync. Click Re-trigger Audit to calculate risk indexes.</p>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ========================================== */}
            {/* TAB 6: STRATEGY & PRICING PLANNER          */}
            {/* ========================================== */}
            {activeTab === "planner" && (
              <div className="space-y-8">
                {renderTutorialBanner("planner")}
                
                {/* Visual Configurator Card */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 font-display mb-6">Target Corporate Workspace Configurator</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Industrial Profile */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> Target Customer Industry
                        </label>
                        <select 
                          value={plannerConfig.industry}
                          onChange={(e) => setPlannerConfig({...plannerConfig, industry: e.target.value})}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option>E-Commerce & Digital Logistics</option>
                          <option>Manufacturing & Heavy Warehousing</option>
                          <option>Corporate Logistics & Transport Fleets</option>
                          <option>High Tech Software & Engineering</option>
                          <option>Global Retail & Chain Distribution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                          Estimated Company Size: <span className="text-indigo-600 font-extrabold">{plannerConfig.companySize} staff</span>
                        </label>
                        <input 
                          type="range" 
                          min={10}
                          max={2500}
                          step={10}
                          value={plannerConfig.companySize}
                          onChange={(e) => setPlannerConfig({...plannerConfig, companySize: Number(e.target.value)})}
                          className="w-full accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-1">
                          <span>10 (SMB)</span>
                          <span>1,000 (Mid-Market)</span>
                          <span>2,500+ (Enterprise)</span>
                        </div>
                      </div>
                    </div>

                    {/* Module Selection checklists */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Include Platform Modules</p>
                      
                      {["Core HR", "Recruitment & ATS", "Logistics TMS", "Warehouse WMS"].map(mod => {
                        const isChecked = plannerConfig.selectedModules.includes(mod);
                        return (
                          <label key={mod} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                const next = isChecked 
                                  ? plannerConfig.selectedModules.filter(m => m !== mod)
                                  : [...plannerConfig.selectedModules, mod];
                                setPlannerConfig({...plannerConfig, selectedModules: next});
                              }}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{mod} Module</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Pricing Architecture options */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Licensing Model Strategy</label>
                        <select 
                          value={plannerConfig.pricingModel}
                          onChange={(e) => setPlannerConfig({...plannerConfig, pricingModel: e.target.value})}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option>Per Employee Per Month (PEPM)</option>
                          <option>Modular/Tiered Flat Model</option>
                          <option>Per-User Seats Tiering</option>
                          <option>Custom Lifetime License Option</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pricing Tier Profile</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Starter", "Professional", "Enterprise"].map(tier => (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => setPlannerConfig({...plannerConfig, pricingTier: tier})}
                              className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                                plannerConfig.pricingTier === tier 
                                  ? "bg-indigo-600 text-white border-indigo-600" 
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Strategic Notes Box */}
                  <div className="mt-6">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Special Competitive / Rollout Custom Directives</label>
                    <textarea 
                      rows={2}
                      value={plannerConfig.customNotes}
                      onChange={(e) => setPlannerConfig({...plannerConfig, customNotes: e.target.value})}
                      placeholder="e.g., Highlight rapid 7-day migration paths, address existing competitive contracts..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                </div>

                {/* Pricing Calculation split with NVK advisor output */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Realtime Pricing Calculator Display */}
                  <div className="bg-indigo-900 rounded-[2.5rem] shadow-lg p-6 text-white flex flex-col justify-between">
                    <div>
                      <span className="bg-pink-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Dynamic Quoting</span>
                      <h4 className="text-indigo-200 font-extrabold uppercase text-[10px] tracking-widest mt-2">Calculated Software Fee</h4>
                      
                      <div className="my-6">
                        <p className="text-4xl font-black text-white tracking-tight">
                          ${calculatePricing().total} <span className="text-sm font-normal text-indigo-300 font-mono">{calculatePricing().interval}</span>
                        </p>
                        <p className="text-[11px] text-indigo-200/80 leading-relaxed mt-2 italic font-medium">
                          {calculatePricing().explanation}
                        </p>
                      </div>

                      <div className="space-y-2 border-t border-indigo-500/30 pt-4 text-xs font-medium">
                        <div className="flex justify-between">
                          <span className="text-indigo-300">Target Industry:</span>
                          <span className="text-white text-right">{plannerConfig.industry.slice(0, 24)}...</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-indigo-300">Corporate Scale:</span>
                          <span className="text-white">{plannerConfig.companySize} employees</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-indigo-300">Modules Selected:</span>
                          <span className="text-pink-300 font-bold">{plannerConfig.selectedModules.length} Modules</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateStrategy}
                      disabled={isGeneratingStrategy}
                      className="w-full py-3.5 bg-white text-indigo-900 font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg hover:bg-slate-100 transition-all mt-6 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isGeneratingStrategy ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-indigo-900" />
                          Simulating Pitch...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-indigo-600" />
                          Generate Custom Pitch Plan
                        </>
                      )}
                    </button>
                  </div>

                  {/* NVK Custom Business Strategy brief */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-6">
                    
                    {plannerError && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{plannerError}</span>
                      </div>
                    )}

                    {strategyResult ? (
                      <div className="space-y-6">
                        
                        <div>
                          <h4 className="text-slate-800 font-extrabold text-sm uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-3">
                            <Compass className="w-4 h-4 text-indigo-600" /> Executive Strategic Pitch Brief
                          </h4>
                          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                            {strategyResult.executiveSummary}
                          </p>
                        </div>

                        {/* Value Propositions */}
                        <div className="space-y-2.5">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modular Value Propositions</p>
                          <div className="space-y-2">
                            {strategyResult.valueProposition.map((vp, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-slate-700">
                                <span className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-700 shrink-0 mt-0.5">
                                  ✓
                                </span>
                                <p className="font-semibold leading-relaxed">{vp}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rollout phases timeline */}
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Frictionless 3-Step Rollout Strategy</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {strategyResult.rolloutPhases.map((phase, idx) => (
                              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                                  <p className="font-extrabold text-slate-800 tracking-tight">{phase.phaseName}</p>
                                </div>
                                <span className="inline-block bg-pink-100 text-pink-800 text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">
                                  {phase.timeframe}
                                </span>
                                <ul className="space-y-1.5 pl-2 list-disc list-outside text-slate-500 font-medium text-[11px]">
                                  {phase.keyMilestones.map((ms, msIdx) => (
                                    <li key={msIdx}>{ms}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Target growth metrics */}
                        <div className="space-y-2.5">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Post-Implementation Target KPI Metrics</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {strategyResult.growthMetrics.map((met, idx) => (
                              <div key={idx} className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{met.metricName}</p>
                                <p className="text-sm font-black text-emerald-800 mt-1">{met.targetKPI}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Objection Rebuttals */}
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Objection Mitigation Matrix</p>
                          <div className="space-y-2.5">
                            {strategyResult.objectionHandling.map((obj, idx) => (
                              <div key={idx} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60 text-xs">
                                <p className="font-bold text-amber-900 flex items-center gap-1">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Objection: {obj.objection}
                                </p>
                                <p className="text-slate-600 mt-1.5 leading-relaxed pl-4 font-medium border-l-2 border-amber-300">
                                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-0.5">Counter Pitch Rebuttal:</span>
                                  {obj.rebuttal}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="text-center py-16 text-slate-400">
                        <TrendingUp className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-bold">No Custom Growth Strategy Active</p>
                        <p className="text-xs mt-1">Configure your target company dimensions and click "Generate Custom Pitch Plan" to invoke NVK AI strategy insights.</p>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}

// Icon Helpers
function BarCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 5v14" />
      <path d="M8 5v14" />
      <path d="M12 5v14" />
      <path d="M17 5v14" />
      <path d="M21 5v14" />
    </svg>
  );
}
