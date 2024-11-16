import CreateTask from "@/components/tasks/CreateTask";
import Tasks from "@/components/tasks/Tasks";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <div>Landing Page</div>
      <CreateTask />
      <Tasks />
    </>
  );
};

export default LandingPage;
