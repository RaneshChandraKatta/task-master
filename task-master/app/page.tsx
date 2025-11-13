"use client";

import { useState } from "react";

export default function Home() {
  let [taskList, setTaskList] = useState([
    "this is task 1",
    "this is task 2",
    "this is task 3",
  ]);
  let [noteContent, setNoteContent] = useState();

  const handleNoteContentChanged = (e) => {
    setNoteContent(e.target.value);
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
          <button
            onClick={() => {
              alert(noteContent);
            }}
            className=""
          >
            Save
          </button>

          <hr/>
          
          {
            taskList
          }
        </div>
      </main>
    </div>
  );
}
