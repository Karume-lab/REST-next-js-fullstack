import { TasksContainer } from "@/components";
import CreateTask from "@/components/tasks/CreateTask";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <div>Landing Page</div>
      <CreateTask />
      <TasksContainer />
    </>
  );
};

export default LandingPage;
