"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingIndex, setIsEditingIndex] = useState(-1);
  const [noteContent, setNoteContent] = useState("");
  const [taskList, setTaskList] = useState([
    "Welcome to your beautiful Task Master! 🎉",
    "Click any task to edit it",
    "Add new tasks with the form below",
  ]);

  const handleNoteContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;

    if (isEditing) {
      const newTaskList = [...taskList];
      newTaskList[isEditingIndex] = noteContent;
      setTaskList(newTaskList);
      setIsEditing(false);
      setIsEditingIndex(-1);
    } else {
      const newTaskList = [noteContent, ...taskList];
      setTaskList(newTaskList);
    }
    setNoteContent("");
  };

  const handleDeleteNote = (index: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newTaskList = [...taskList];
      newTaskList.splice(index, 1);
      setTaskList(newTaskList);
    }
  };

  const handleEditNote = (index: number) => {
    setNoteContent(taskList[index]);
    setIsEditing(true);
    setIsEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsEditingIndex(-1);
    setNoteContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveNote();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ✨ Task Master
          </h1>
          <p className="text-xl text-white/90 font-light">
            Organize your life with style and elegance
          </p>
        </div>

        {/* Main Content Card */}
        <div className="content-card mb-8 fade-in-up">
          {/* Task Input Section */}
          <div className="mb-8">
            <h2 className="section-header">
              {isEditing ? "✏️ Edit Your Task" : "➕ Add New Task"}
            </h2>

            {isEditing && (
              <div className="editing-indicator mb-4">
                🎯 Editing Mode Active - Make your changes and save!
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                {isEditing
                  ? "Update task description"
                  : "What needs to be done?"}
              </label>
              <textarea
                value={noteContent}
                onChange={handleNoteContentChanged}
                onKeyPress={handleKeyPress}
                placeholder={
                  isEditing
                    ? "Edit your task here..."
                    : "Describe your new task..."
                }
                className="w-full text-gray-800"
                autoFocus={isEditing}
              />
            </div>

            <div className="flex gap-3 justify-end">
              {isEditing && (
                <button className="btn-edit" onClick={handleCancelEdit}>
                  ❌ Cancel
                </button>
              )}
              <button
                className={`btn-primary ${
                  !noteContent.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSaveNote}
                disabled={!noteContent.trim()}
              >
                {isEditing ? "💾 Save Changes" : "➕ Add Task"}
              </button>
            </div>
          </div>

          {/* Task List Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-header flex items-center gap-2">
                📋 Your Tasks
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {taskList.length}
                </span>
              </h2>
            </div>

            {taskList.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-white/80 text-lg">
                  No tasks yet! Add your first task above to get started.
                </p>
              </div>
            ) : (
              <ul className="task-list">
                {taskList.map((taskName, index) => (
                  <li
                    key={`${taskName}-${index}`}
                    className={`task-item fade-in-up ${
                      isEditing && index === isEditingIndex ? "editing" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="task-content">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {isEditing && index === isEditingIndex ? "✏️" : "✅"}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed">
                            {taskName}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Task #{index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button
                        className="btn-edit text-sm px-4 py-2"
                        onClick={() => handleEditNote(index)}
                        disabled={isEditing && index !== isEditingIndex}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-danger text-sm px-4 py-2"
                        onClick={() => handleDeleteNote(index)}
                        disabled={isEditing && index === isEditingIndex}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/70 fade-in-up">
          <p className="text-sm">
            🌟 Beautiful task management made with ❤️, from Task master team ({" "}
            <a
              href="https://www.linkedin.com/in/raneshchandrakatta/"
              target="_blank"
            >
              <b className="text-blue-900">Dev: Ranesh C K</b>
            </a>{" "}
            )
          </p>
          <p className="text-xs mt-1">Press Ctrl+Enter to quickly add tasks</p>
        </div>
      </div>
    </div>
  );
}
