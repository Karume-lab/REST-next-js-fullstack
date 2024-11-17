import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import SignOutButton from "@/components/auth/SignOutButton";
import ContinueWithGoogleButton from "@/components/auth/ContinueWithGoogleButton";
import SignUpToday from "@/components/auth/SignUpToday";

import Header from "@/components/core/Header";
import InfiniteScrollContainer from "@/components/core/InfiniteScrollContainer";
import ActionConfirmationDialog from "@/components/core/ActionConfirmationDialog";
import BaseProviders from "@/components/core/BaseProviders";

import TasksContainer from "@/components/tasks/TasksContainer";
import CreateEditTask from "@/components/tasks/CreateEditTask";
import TasksContainerLoadingSkeleton from "@/components/tasks/TasksContainerLoadingSkeleton";
import TaskActionsDropdown from "@/components/tasks/TaskActionsDropdown";

import Loader from "./ui/Loader";

export {
  // auth
  SignInForm,
  SignUpForm,
  SignOutButton,
  ContinueWithGoogleButton,
  SignUpToday,
  //core
  Header,
  InfiniteScrollContainer,
  ActionConfirmationDialog,
  BaseProviders,
  // tasks
  TasksContainer,
  CreateEditTask,
  TasksContainerLoadingSkeleton,
  TaskActionsDropdown,
  // ui
  Loader,
};
