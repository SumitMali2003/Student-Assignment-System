
import { useState } from "react";
import {
  GraduationCap,
  Users,
  ClipboardList,
  CheckCircle2,
  Clock,
  Plus,
  LogOut,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  CalendarDays,
  Search,
  UserCheck,
} from "lucide-react";

import { useAssignments } from "../context/AppContext";

// Seeded students + registered students
const getStudents = () => {
  const defaultStudents = Array.from({ length: 5 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@joineazy.com`,
    role: "student",
  }));

  try {
    const savedUsers = JSON.parse(
      localStorage.getItem("users")
    );

    if (Array.isArray(savedUsers)) {
      return savedUsers.filter(
        (user) => user.role === "student"
      );
    }
  } catch {
    // Use default students
  }

  return defaultStudents;
};

function AdminDashboard({ user, onLogout }) {
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments();

  const students = getStudents();

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
    assignedStudentIds: [],
    assignToAll: true,
  });

  // Show only assignments created by this admin
  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === user.id
  );

  // Dashboard statistics
  const totalAssignments = myAssignments.length;

  const totalSubmissions = myAssignments.reduce(
    (total, assignment) =>
      total +
      assignment.assignedStudentIds.filter(
        (id) => assignment.submissions?.[id] === "submitted"
      ).length,
    0
  );

  const pendingSubmissions = myAssignments.reduce(
    (total, assignment) =>
      total +
      assignment.assignedStudentIds.filter(
        (id) => assignment.submissions?.[id] !== "submitted"
      ).length,
    0
  );

  // Open create form
  const openCreateForm = () => {
    setEditingAssignment(null);

    setForm({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
      assignedStudentIds: [],
      assignToAll: true,
    });

    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (assignment) => {
    setEditingAssignment(assignment);

    setForm({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
      assignedStudentIds: assignment.assignedStudentIds,
      assignToAll:
        assignment.assignedStudentIds.length === students.length,
    });

    setShowForm(true);
  };

  // Handle form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select all students
  const handleAssignAll = (checked) => {
    setForm((prev) => ({
      ...prev,
      assignToAll: checked,
      assignedStudentIds: checked
        ? students.map((student) => student.id)
        : [],
    }));
  };

  // Select individual students
  const handleStudentSelection = (studentId) => {
    setForm((prev) => {
      const selected = prev.assignedStudentIds.includes(studentId)
        ? prev.assignedStudentIds.filter((id) => id !== studentId)
        : [...prev.assignedStudentIds, studentId];

      return {
        ...prev,
        assignedStudentIds: selected,
        assignToAll: selected.length === students.length,
      };
    });
  };

  // Create or update assignment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.assignedStudentIds.length === 0) {
      alert("Please assign this assignment to at least one student.");
      return;
    }

    const previousSubmissions =
      editingAssignment?.submissions || {};

    const submissions = {};

    form.assignedStudentIds.forEach((studentId) => {
      submissions[studentId] =
        previousSubmissions[studentId] || "pending";
    });

    const assignmentData = {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      driveLink: form.driveLink.trim(),
      createdBy: user.id,
      assignedStudentIds: form.assignedStudentIds,
      submissions,
    };

    if (editingAssignment) {
      updateAssignment(
        editingAssignment.id,
        assignmentData
      );
    } else {
      addAssignment({
        id: `as${Date.now()}`,
        ...assignmentData,
        createdAt: new Date().toISOString(),
      });
    }

    setShowForm(false);
    setEditingAssignment(null);
  };

  // Delete assignment
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (confirmed) {
      deleteAssignment(id);
    }
  };

  // Search assignments
  const filteredAssignments = myAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(
        search.toLowerCase()
      )
  );

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
              Admin Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="font-semibold text-sm text-slate-800">
              {user.name}
            </p>
            <p className="text-xs text-slate-500">
              Administrator
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

        <div className="flex flex-wrap justify-between
          items-center gap-4">

          <div>
            <p className="text-indigo-600 font-semibold text-sm">
              ADMIN DASHBOARD
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Welcome, {user.name}!
            </h2>

            <p className="text-slate-500 mt-2">
              Manage assignments and monitor student progress.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="bg-indigo-600 hover:bg-indigo-700
              text-white px-5 py-3 rounded-xl flex
              items-center gap-2 font-semibold transition"
          >
            <Plus size={19} />
            Create Assignment
          </button>

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
            title="Submissions Received"
            value={totalSubmissions}
            icon={<CheckCircle2 />}
            color="text-green-600"
          />

          <StatCard
            title="Pending Submissions"
            value={pendingSubmissions}
            icon={<Clock />}
            color="text-orange-500"
          />

        </div>

        {/* ASSIGNMENT SECTION */}
        <div className="mt-10">

          <div className="flex flex-wrap justify-between
            items-center gap-4 mb-6">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Assignment Management
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                Manage assignments and track student submissions.
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

          {/* ASSIGNMENT LIST */}
          {filteredAssignments.length === 0 ? (

            <div className="bg-white border border-slate-200
              rounded-2xl p-12 text-center">

              <ClipboardList
                size={48}
                className="mx-auto text-indigo-500"
              />

              <h3 className="text-xl font-bold mt-4">
                {search
                  ? "No matching assignments"
                  : "No assignments yet"}
              </h3>

              <p className="text-slate-500 mt-2">
                {search
                  ? "Try searching with another title."
                  : "Create your first assignment to get started."}
              </p>

              {!search && (
                <button
                  onClick={openCreateForm}
                  className="mt-5 bg-indigo-600 text-white
                    px-5 py-3 rounded-xl inline-flex
                    items-center gap-2 hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Create Assignment
                </button>
              )}

            </div>

          ) : (

            <div className="space-y-6">

              {filteredAssignments.map((assignment) => {

                const assignedStudents =
                  students.filter((student) =>
                    assignment.assignedStudentIds.includes(
                      student.id
                    )
                  );

                const total = assignedStudents.length;

                const submitted = assignedStudents.filter(
                  (student) =>
                    assignment.submissions?.[student.id] ===
                    "submitted"
                ).length;

                const percentage = total
                  ? Math.round((submitted / total) * 100)
                  : 0;

                return (
                  <div
                    key={assignment.id}
                    className="bg-white border border-slate-200
                      rounded-2xl p-6"
                  >

                    <div className="flex flex-wrap
                      justify-between gap-4">

                      <div className="flex-1 min-w-0">

                        <h4 className="text-xl font-bold
                          text-slate-900">
                          {assignment.title}
                        </h4>

                        <p className="text-slate-500 mt-2 text-sm">
                          {assignment.description}
                        </p>

                        <div className="flex flex-wrap gap-4
                          mt-4 text-sm text-slate-500">

                          <span className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            Due: {formatDate(assignment.dueDate)}
                          </span>

                          <span className="flex items-center gap-2">
                            <Users size={16} />
                            {total} students assigned
                          </span>

                          <a
                            href={assignment.driveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 flex
                              items-center gap-1 hover:underline"
                          >
                            Drive Link
                            <ExternalLink size={14} />
                          </a>

                        </div>

                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() => openEditForm(assignment)}
                          className="p-2.5 rounded-lg bg-indigo-50
                            text-indigo-600 hover:bg-indigo-100"
                          title="Edit assignment"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-2.5 rounded-lg bg-red-50
                            text-red-600 hover:bg-red-100"
                          title="Delete assignment"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>

                    {/* PROGRESS */}
                    <div className="mt-6">

                      <div className="flex justify-between
                        items-center mb-2">

                        <span className="text-sm font-semibold
                          text-slate-700">
                          Class Completion
                        </span>

                        <span className="text-sm font-bold
                          text-indigo-600">
                          {percentage}%
                        </span>

                      </div>

                      <div className="w-full bg-slate-100
                        h-2.5 rounded-full overflow-hidden">

                        <div
                          className="bg-indigo-600 h-full
                            rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <p className="text-xs text-slate-500 mt-2">
                        {submitted} submitted · {total - submitted} pending
                      </p>

                    </div>

                    {/* STUDENT SUBMISSION TABLE */}
                    <div className="mt-6 border-t border-slate-100 pt-5">

                      <h5 className="font-semibold text-slate-800
                        mb-4 flex items-center gap-2">
                        <UserCheck size={18} />
                        Student Submissions
                      </h5>

                      {total === 0 ? (
                        <p className="text-sm text-slate-500">
                          No students assigned.
                        </p>
                      ) : (
                        <div className="overflow-x-auto">

                          <table className="w-full text-sm
                            text-left">

                            <thead className="text-slate-500
                              bg-slate-50">
                              <tr>
                                <th className="p-3">Student</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Status</th>
                              </tr>
                            </thead>

                            <tbody>
                              {assignedStudents.map((student) => {
                                const isSubmitted =
                                  assignment.submissions?.[student.id] ===
                                  "submitted";

                                return (
                                  <tr
                                    key={student.id}
                                    className="border-b border-slate-100"
                                  >

                                    <td className="p-3 font-medium
                                      text-slate-800">
                                      {student.name}
                                    </td>

                                    <td className="p-3 text-slate-500">
                                      {student.email}
                                    </td>

                                    <td className="p-3">
                                      <span
                                        className={`px-3 py-1
                                          rounded-full text-xs
                                          font-semibold ${
                                            isSubmitted
                                              ? "bg-green-50 text-green-700"
                                              : "bg-orange-50 text-orange-700"
                                          }`}
                                      >
                                        {isSubmitted
                                          ? "Submitted"
                                          : "Pending"}
                                      </span>
                                    </td>

                                  </tr>
                                );
                              })}
                            </tbody>

                          </table>

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </main>

      {/* CREATE / EDIT MODAL */}
      {showForm && (

        <div className="fixed inset-0 z-50 bg-slate-950/50
          flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-2xl
            w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center
              p-6 border-b border-slate-100">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingAssignment
                    ? "Edit Assignment"
                    : "Create Assignment"}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Enter assignment details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={21} />
              </button>

            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* TITLE */}
              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Assignment Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. React.js Development Project"
                  required
                  className="w-full border border-slate-200
                    rounded-xl px-4 py-3 outline-none
                    focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the assignment requirements..."
                  required
                  rows={3}
                  className="w-full border border-slate-200
                    rounded-xl px-4 py-3 outline-none
                    focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* DUE DATE */}
              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Due Date *
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200
                    rounded-xl px-4 py-3 outline-none
                    focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* DRIVE LINK */}
              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Google Drive Link *
                </label>

                <input
                  type="url"
                  name="driveLink"
                  value={form.driveLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  required
                  className="w-full border border-slate-200
                    rounded-xl px-4 py-3 outline-none
                    focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* STUDENT ASSIGNMENT */}
              <div className="border border-slate-200
                rounded-xl p-4">

                <h4 className="font-semibold text-slate-800 mb-4">
                  Assign To Students *
                </h4>

                <label className="flex items-center gap-3
                  p-3 bg-indigo-50 rounded-lg cursor-pointer">

                  <input
                    type="checkbox"
                    checked={form.assignToAll}
                    onChange={(e) =>
                      handleAssignAll(e.target.checked)
                    }
                    className="w-4 h-4 accent-indigo-600"
                  />

                  <span className="font-semibold text-indigo-700
                    text-sm">
                    Assign to all students ({students.length})
                  </span>

                </label>

                <p className="text-xs text-slate-500 mt-4 mb-3">
                  Or select individual students:
                </p>

                <div className="space-y-2">

                  {students.map((student) => (

                    <label
                      key={student.id}
                      className="flex items-center gap-3
                        p-3 border border-slate-100
                        rounded-lg cursor-pointer
                        hover:bg-slate-50"
                    >

                      <input
                        type="checkbox"
                        checked={form.assignedStudentIds.includes(
                          student.id
                        )}
                        onChange={() =>
                          handleStudentSelection(student.id)
                        }
                        className="w-4 h-4 accent-indigo-600"
                      />

                      <div>
                        <p className="text-sm font-medium
                          text-slate-800">
                          {student.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {student.email}
                        </p>
                      </div>

                    </label>

                  ))}

                </div>

                <p className="text-xs text-indigo-600 mt-3">
                  {form.assignedStudentIds.length} student(s) selected
                </p>

              </div>

              {/* FORM BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-xl border
                    border-slate-200 text-slate-600
                    hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl
                    bg-indigo-600 text-white
                    hover:bg-indigo-700 font-semibold"
                >
                  {editingAssignment
                    ? "Save Changes"
                    : "Create Assignment"}
                </button>

              </div>

            </form>

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

export default AdminDashboard;
