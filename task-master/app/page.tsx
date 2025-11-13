"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingIndex, setIsEditingIndex] = useState(-1);
  const [noteContent, setNoteContent] = useState("");
  const [taskList, setTaskList] = useState([
    "This is task 1",
    "This is task 2",
    "This is task 3",
  ]);

  const handleNoteContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };
  const handleSaveNote = () => {
    if (isEditing) {
      const newTaskList = [...taskList];
      newTaskList[isEditingIndex] = noteContent;
      setTaskList(newTaskList);
      setIsEditing(false);
      setIsEditingIndex(-1);
      setNoteContent("");
    } else {
      const newTaskList = [noteContent, ...taskList];
      setTaskList(newTaskList);
    }
  };

  const handleDeleteNote = (index: number) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };
  const handleEditNote = (index: number) => {
    setNoteContent(taskList[index]);
    setIsEditing(true);
    setIsEditingIndex(index);
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            Content
            <textarea //
              value={noteContent}
              onChange={handleNoteContentChanged}
            ></textarea>
            <br />
            {isEditing && ( //
              <div>Editing Mode: On</div>
            )}
          </div>
          <button //
            className="hover:bg-green-300! p-20"
            onClick={handleSaveNote}
          >
            Save
          </button>

          <hr />

          <h1>Task list</h1>
          <ul>
            {taskList.map((taskName, index) => {
              return (
                <li key={taskName}>
                  <span
                    className={
                      isEditing && index === isEditingIndex ? "bg-blue-200" : ""
                    }
                  >
                    {taskName}
                  </span>
                  <button
                    className="hover:bg-blue-300! p-20"
                    onClick={() => handleEditNote(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="hover:bg-red-600! p-20"
                    onClick={() => handleDeleteNote(index)}
                  >
                    X
                  </button>{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
