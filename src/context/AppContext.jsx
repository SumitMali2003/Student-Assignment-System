
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [assignments, setAssignments] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("assignments")
      ) || [];
    } catch {
      return [];
    }
  });

  const saveAssignments = (updatedAssignments) => {
    setAssignments(updatedAssignments);

    localStorage.setItem(
      "assignments",
      JSON.stringify(updatedAssignments)
    );
  };

  const addAssignment = (assignment) => {
    saveAssignments([...assignments, assignment]);
  };

  const updateAssignment = (id, updatedData) => {
    const updated = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, ...updatedData }
        : assignment
    );

    saveAssignments(updated);
  };

  const deleteAssignment = (id) => {
    const updated = assignments.filter(
      (assignment) => assignment.id !== id
    );

    saveAssignments(updated);
  };

  const submitAssignment = (assignmentId, studentId) => {
    const updated = assignments.map((assignment) => {
      if (assignment.id !== assignmentId) {
        return assignment;
      }

      return {
        ...assignment,
        submissions: {
          ...assignment.submissions,
          [studentId]: "submitted",
        },
      };
    });

    saveAssignments(updated);
  };

  return (
    <AppContext.Provider
      value={{
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AppContext);
}
