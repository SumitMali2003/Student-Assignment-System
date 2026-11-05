
import { useState } from "react";
import {
  GraduationCap,
  ClipboardList,
  Clock,
  CheckCircle2,
  LogOut,
  ExternalLink,
  CalendarDays,
  AlertCircle,
  Search,
  X,
  Send,
  CircleCheck,
} from "lucide-react";

import { useAssignments } from "../context/AppContext";

function StudentDashboard({ user, onLogout }) {
  const { assignments, submitAssignment } = useAssignments();

  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get assignments assigned to this student
  const myAssignments = assignments.filter(
    (assignment) =>
      assignment.assignedStudentIds.includes(user.id)
  );

  // Calculate statistics
  const totalAssignments = myAssignments.length;

  const submittedCount = myAssignments.filter(
    (assignment) =>
      assignment.submissions?.[user.id] === "submitted"
  ).length;

  const pendingCount = totalAssignments - submittedCount;

  const progress = totalAssignments
    ? Math.round((submittedCount / totalAssignments) * 100)
    : 0;

  // Search assignments
  const filteredAssignments = myAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(
        search.toLowerCase()
      )
  );

  // Format due date
  const formatDate = (date) => {
    if (!date) return "No due date";

    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // Check overdue assignment
  const isOverdue = (date) => {
    if (!date) return false;

    return (
      new Date(date + "T23:59:59").getTime() < Date.now()
    );
  };

  // Open first confirmation
  const openConfirmation = (assignment) => {
    setSelectedAssignment(assignment);
    setShowConfirmation(true);
  };

  // Final submission confirmation
  const confirmSubmission = () => {
    if (!selectedAssignment) return;

    submitAssignment(selectedAssignment.id, user.id);

    setShowConfirmation(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200
        px-5 md:px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Joineazy
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden sm:block text-right">
            <p className="font-semibold text-sm text-slate-800">
              {user.name}
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-600
              hover:text-red-600 transition"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-5 md:p-10">

        {/* WELCOME */}
        <div>

          <p className="text-indigo-600 font-semibold text-sm">
            STUDENT DASHBOARD
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            Welcome, {user.name}!
          </h2>

          <p className="text-slate-500 mt-2">
            Here's an overview of your assignments and progress.
          </p>

        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-3 gap-5 mt-8">

          <StatCard
            title="Total Assignments"
            value={totalAssignments}
            icon={<ClipboardList />}
            color="text-indigo-600"
          />

          <StatCard
            title="Submitted"
            value={submittedCount}
            icon={<CheckCircle2 />}
            color="text-green-600"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={<Clock />}
            color="text-orange-500"
          />

        </div>

        {/* OVERALL PROGRESS */}
        <div className="bg-white border border-slate-200
          rounded-2xl p-6 mt-6">

          <div className="flex justify-between items-center
            gap-3 mb-3">

            <div>
              <h3 className="font-bold text-slate-900">
                Overall Progress
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your assignment completion rate
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {progress}%
            </span>

          </div>

          <div className="w-full h-3 bg-slate-100
            rounded-full overflow-hidden">

            <div
              className="h-full bg-indigo-600 rounded-full
                transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

          <p className="text-xs text-slate-500 mt-3">
            {submittedCount} of {totalAssignments} assignments submitted
          </p>

        </div>

        {/* ASSIGNMENTS */}
        <div className="mt-10">

          <div className="flex flex-wrap justify-between
            items-center gap-4 mb-6">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                My Assignments
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                View and manage your assigned work.
              </p>
            </div>

            <div className="relative">

              <Search className="absolute left-3 top-3
                text-slate-400" size={18} />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
                className="border border-slate-200 bg-white
                  rounded-xl py-2.5 pl-10 pr-4 outline-none
                  focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>

          {/* EMPTY STATE */}
          {filteredAssignments.length === 0 ? (

            <div className="bg-white border border-slate-200
              rounded-2xl p-12 text-center">

              <ClipboardList
                size={48}
                className="mx-auto text-indigo-500"
              />

              <h3 className="text-xl font-bold mt-4">
                {myAssignments.length === 0
                  ? "No assignments yet"
                  : "No matching assignments"}
              </h3>

              <p className="text-slate-500 mt-2">
                {myAssignments.length === 0
                  ? "Your assigned work will appear here."
                  : "Try searching with another assignment title."}
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1
              lg:grid-cols-2 gap-5">

              {filteredAssignments.map((assignment) => {

                const isSubmitted =
                  assignment.submissions?.[user.id] === "submitted";

                const overdue =
                  !isSubmitted && isOverdue(assignment.dueDate);

                return (

                  <div
                    key={assignment.id}
                    className="bg-white border border-slate-200
                      rounded-2xl p-6 hover:shadow-md
                      transition-shadow"
                  >

                    {/* CARD HEADER */}
                    <div className="flex justify-between
                      items-start gap-3">

                      <div>
                        <h4 className="text-lg font-bold
                          text-slate-900">
                          {assignment.title}
                        </h4>

                        <p className="text-sm text-slate-500 mt-2">
                          {assignment.description}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1
                          rounded-full text-xs font-semibold ${
                            isSubmitted
                              ? "bg-green-50 text-green-700"
                              : overdue
                                ? "bg-red-50 text-red-700"
                                : "bg-orange-50 text-orange-700"
                          }`}
                      >
                        {isSubmitted
                          ? "Submitted"
                          : overdue
                            ? "Overdue"
                            : "Pending"}
                      </span>

                    </div>

                    {/* DUE DATE */}
                    <div className="flex items-center gap-2
                      mt-5 text-sm">

                      <CalendarDays
                        size={17}
                        className="text-slate-400"
                      />

                      <span className="text-slate-500">
                        Due: {formatDate(assignment.dueDate)}
                      </span>

                    </div>

                    {overdue && (
                      <div className="flex items-center gap-2
                        text-red-600 text-xs mt-3">
                        <AlertCircle size={15} />
                        Submission deadline has passed.
                      </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-3 mt-6">

                      <a
                        href={assignment.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 min-w-0 flex
                          items-center justify-center gap-2
                          border border-indigo-200
                          text-indigo-600 rounded-xl
                          py-3 px-3 text-sm font-semibold
                          hover:bg-indigo-50 transition"
                      >
                        Open Drive Link
                        <ExternalLink size={16} />
                      </a>

                      {!isSubmitted && (
                        <button
                          onClick={() =>
                            openConfirmation(assignment)
                          }
                          className="flex-1 min-w-0
                            bg-indigo-600 text-white
                            rounded-xl py-3 px-3
                            text-sm font-semibold
                            hover:bg-indigo-700 transition
                            flex items-center justify-center gap-2"
                        >
                          <Send size={16} />
                          Yes, I have submitted
                        </button>
                      )}

                    </div>

                    {isSubmitted && (
                      <div className="flex items-center gap-2
                        text-green-700 bg-green-50
                        rounded-xl p-3 mt-4 text-sm">

                        <CheckCircle2 size={18} />

                        Assignment submitted successfully.

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </main>

      {/* FINAL CONFIRMATION DIALOG */}
      {showConfirmation && selectedAssignment && (

        <div className="fixed inset-0 z-50 bg-slate-950/50
          flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-2xl
            w-full max-w-md p-7">

            <div className="flex justify-between items-center">

              <div className="bg-indigo-50 p-3 rounded-xl">
                <CircleCheck
                  size={27}
                  className="text-indigo-600"
                />
              </div>

              <button
                onClick={() => setShowConfirmation(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-5">
              Confirm Submission
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Have you successfully submitted
              {" "}
              <strong className="text-slate-800">
                {selectedAssignment.title}
              </strong>
              {" "}
              using the provided Drive link?
            </p>

            <div className="bg-orange-50 border
              border-orange-100 rounded-xl p-3 mt-5">

              <p className="text-orange-700 text-sm">
                Please confirm only after completing
                the actual submission.
              </p>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-slate-200
                  text-slate-600 rounded-xl py-3
                  font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmission}
                className="flex-1 bg-indigo-600
                  text-white rounded-xl py-3
                  font-semibold hover:bg-indigo-700"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

// Reusable statistics card
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white border border-slate-200
      rounded-2xl p-6">

      <div className={`mb-4 ${color}`}>
        {icon}
      </div>

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2 text-slate-900">
        {value}
      </h3>

    </div>
  );
}

export default StudentDashboard;
