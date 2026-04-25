"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, GripVertical, CheckCircle2, Clock, Activity, ArrowUpRight, Trash2, ChevronDown } from "lucide-react";
import { api } from "~/trpc/react";

type Task = {
  id: string;
  title: string;
  category: string | null;
  status: string;
  priority: string;
  description: string | null;
};

export function ExecutionBoard({
  profileId,
  tier,
  stage,
  goal
}: {
  profileId: string;
  tier: string;
  stage: string | null;
  goal: string | null;
}) {
  const utils = api.useUtils();
  const { data: serverTasks, isLoading } = api.task.getUserTasks.useQuery(
    { profileId },
    { enabled: !!profileId }
  );
  const createTaskMutation = api.task.createTask.useMutation({
    onSuccess: () => utils.task.getUserTasks.invalidate(),
  });
  const updateTaskStatusMutation = api.task.updateTaskStatus.useMutation({
    onSuccess: () => utils.task.getUserTasks.invalidate(),
  });
  const deleteTaskMutation = api.task.deleteTask.useMutation({
    onSuccess: () => utils.task.getUserTasks.invalidate(),
  });

  // Seed initial tasks if none exist
  useEffect(() => {
    if (!profileId) return;
    if (!isLoading && serverTasks && serverTasks.length === 0) {
      const isGTM = goal?.includes("Distribution");
      const isCapital = goal?.includes("Capital");
      const isOps = goal?.includes("Operational");
      const isProduct = goal?.includes("Product Engagement");

      const seed = (title: string, cat: string, status: string, prio: string) => {
        createTaskMutation.mutate({ profileId, title, category: cat, status, priority: prio });
      };

      if (isGTM) {
        seed("Define precise ICP and list top 50 outreach targets", "GTM / Distribution", "in_progress", "high");
        seed("Launch multi-channel outbound experiment (Email/LinkedIn)", "Growth", "todo", "high");
        seed("Set up automated CRM tracking for funnel velocity", "Systems", "todo", "medium");
      } else if (isCapital) {
        seed("Refine 10-slide core pitch deck narrative", "Fundraising", "in_progress", "high");
        seed("Build targeted list of 100 relevant investors/VCs", "Strategy", "todo", "high");
        seed("Draft warm intro blurb and identify connectors in network", "Networking", "todo", "medium");
      } else if (isOps) {
        seed("Audit founder time & identify top 3 delegation targets", "Operations", "in_progress", "high");
        seed("Draft scorecard for first key operational/GTM hire", "Hiring", "todo", "high");
        seed("Implement weekly OS cadence (L10 meetings)", "Management", "todo", "medium");
      } else if (isProduct) {
        seed("Map core user journey and identify churn hotspots", "Product", "in_progress", "high");
        seed("Conduct 5 deep-dive user interviews on active features", "Research", "todo", "high");
        seed("Implement minimum viable analytics (Mixpanel/Amplitude)", "Data", "todo", "medium");
      } else {
        seed(`Map out key metrics for ${stage || "current"} phase`, "Strategy", "in_progress", "high");
        seed("Define 90-day execution sprints for core blocker", "Operations", "todo", "high");
        seed(`Review ${tier} tier ecosystem perks & partnerships`, "Network", "todo", "medium");
      }
      seed("Complete Founder Clarity Intake & System Init", "Onboarding", "done", "high");
    }
  }, [isLoading, serverTasks, goal, profileId]);

  const tasks = serverTasks || [];

  const columns: { id: "todo" | "in_progress" | "done"; label: string; icon: React.ReactNode }[] = [
    { id: "todo", label: "To Do", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "in_progress", label: "Active", icon: <Activity className="w-3.5 h-3.5" /> },
    { id: "done", label: "Completed", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    category: "Execution",
    priority: "medium",
    description: "",
  });

  const addTask = () => {
    if (!newTaskData.title.trim()) return;
    createTaskMutation.mutate({
      profileId,
      ...newTaskData,
      status: "todo",
    });
    setNewTaskData({ title: "", category: "Execution", priority: "medium", description: "" });
    setIsAddingTask(false);
  };

  const updateTask = () => {
    if (!editingTask) return;
    // For now, we only have updateStatus in the backend, but we should probably add updateTask details too.
    // I'll stick to closing for now or implement update details if I have the router ready.
    setEditingTask(null);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    const id = e.dataTransfer.getData("taskId");
    updateTaskStatusMutation.mutate({ taskId: id, status });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col pt-8 pb-16">
      {/* Header section */}
      <div className="flex items-end justify-between mb-10 px-4">
        {/* <div>
          <p className="text-[10px] tracking-widest uppercase text-foreground/40 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgba(212,175,55,0.8)] animate-pulse" />
            Execution Matrix
          </p>
          <h2 className="font-heading text-3xl tracking-tight">System Active</h2>
        </div> */}
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors border border-foreground/10 bg-foreground/[0.02] px-4 py-2 hover:bg-foreground/[0.05]"
        >
          <Plus className="w-3 h-3" /> New Node
        </button>
      </div>

      {/* New Task Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-foreground/10 p-8 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
            >
              {/* Gold top line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent" />

              <h3 className="font-heading text-xl mb-6">Initialize New Node</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5 block">Node Title</label>
                  <input
                    autoFocus
                    placeholder="e.g. Launch Beta to first 50 users"
                    value={newTaskData.title}
                    onChange={(e) => setNewTaskData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-foreground/[0.03] border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5 block">Category</label>
                    <input
                      placeholder="GTM, Product, Hiring..."
                      value={newTaskData.category}
                      onChange={(e) => setNewTaskData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-foreground/[0.03] border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5 block">Priority</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                        className="w-full bg-foreground/[0.03] border border-foreground/10 px-4 py-3 text-sm text-left focus:outline-none focus:border-foreground/30 transition-colors flex items-center justify-between"
                      >
                        <span className="capitalize">{newTaskData.priority} Priority</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPriorityOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isPriorityOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="absolute top-full left-0 right-0 mt-1 bg-[#0a0a0a] border border-foreground/10 z-[70] shadow-2xl"
                          >
                            {['low', 'medium', 'high'].map((prio) => (
                              <button
                                key={prio}
                                type="button"
                                onClick={() => {
                                  setNewTaskData(prev => ({ ...prev, priority: prio }));
                                  setIsPriorityOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-xs text-left hover:bg-foreground/[0.05] transition-colors capitalize ${newTaskData.priority === prio ? 'text-[rgba(212,175,55,0.8)] bg-foreground/[0.02]' : 'text-foreground/50'}`}
                              >
                                {prio} Priority
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5 block">Strategic Context (Optional)</label>
                  <textarea
                    placeholder="Detail the expected outcome or specific steps..."
                    rows={3}
                    value={newTaskData.description}
                    onChange={(e) => setNewTaskData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-foreground/[0.03] border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsAddingTask(false)}
                    className="flex-1 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground/60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTask}
                    disabled={!newTaskData.title.trim()}
                    className="flex-1 bg-foreground text-background dark:bg-foreground dark:text-background px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-30"
                  >
                    Deploy Node
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {editingTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-foreground/10 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[rgba(212,175,55,0.8)] font-bold mb-1 block">{editingTask.category}</span>
                  <h3 className="font-heading text-2xl">{editingTask.title}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[9px] uppercase tracking-widest font-bold ${editingTask.priority === 'high' ? 'border-[rgba(212,175,55,0.4)] text-[rgba(212,175,55,0.8)] bg-[rgba(212,175,55,0.05)]' : 'border-foreground/10 text-foreground/40'
                  }`}>
                  {editingTask.priority} Priority
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-foreground/20 mb-2 block">Context & Description</label>
                  <p className="text-sm text-foreground/60 leading-relaxed bg-foreground/[0.02] p-4 border border-foreground/5 min-h-[100px]">
                    {editingTask.description || "No additional context provided for this node."}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground border border-foreground/10 hover:bg-foreground/5 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex flex-col h-full bg-foreground/[0.01] border border-foreground/5 p-4 rounded-xl"
            onDrop={(e) => handleDrop(e, col.id)}
            onDragOver={handleDragOver}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-foreground/10">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground/60">
                {col.icon} {col.label}
              </div>
              <span className="text-xs font-mono text-foreground/30">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            {/* Tasks */}
            <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
              {tasks
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, task.id)}
                    className="group bg-background border border-foreground/10 p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-[rgba(212,175,55,0.3)] transition-colors relative overflow-hidden"
                  >
                    {/* Priority Accent Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.priority === "high" ? "bg-[rgba(212,175,55,0.8)]" :
                      task.priority === "medium" ? "bg-foreground/20" : "bg-foreground/5"
                      }`} />

                    <div className="flex items-start justify-between gap-3 ml-2">
                      <div className="flex-1">
                        <span className="text-[9px] tracking-wider uppercase text-foreground/40 mb-2 block font-medium">
                          {task.category}
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-foreground/90">
                          {task.title}
                        </p>
                      </div>
                      <GripVertical className="w-4 h-4 text-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>

                    <div className="mt-4 ml-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${task.priority === "high" ? "bg-[rgba(212,175,55,0.8)] shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "bg-foreground/20"
                          }`} />
                        <span className="text-[10px] text-foreground/40 capitalize">{task.priority} Priority</span>
                      </div>

                      {task.status !== "done" && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTaskMutation.mutate({ taskId: task.id });
                            }}
                            className="text-foreground/20 hover:text-red-500/60 transition-colors p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingTask(task)}
                            className="text-[10px] text-foreground/40 hover:text-[rgba(212,175,55,0.9)] transition-colors flex items-center gap-1"
                          >
                            Open <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
