"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
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
    const newTaskList = [noteContent, ...taskList];
    setTaskList(newTaskList);
  };

  const handleDeleteNote = (index: number) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            Content{" "}
            <textarea //
              value={noteContent}
              onChange={handleNoteContentChanged}
            ></textarea>
          </div>
          <button onClick={handleSaveNote}>Save</button>

          <hr />

          <h1>Task list</h1>
          <ul>
            {taskList.map((taskName, index) => {
              return (
                <li key={taskName}>
                  {taskName}
                  <button onClick={() => handleDeleteNote(index)}>X</button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
