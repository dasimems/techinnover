import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddTaskModal from "@/components/modals/AddTaskModal";
import Nav from "@/components/Nav";
import TaskContainer from "@/components/TaskContainer";
import { allTaskStatus } from "@/utils/variables";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import useTasks from "@/hooks/useTasks";

export default function Home() {
  const { fetchTasks } = useTasks();
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <DashboardLayout contentContainerClassName="flex flex-col gap-10 pb-20">
        <Nav />

        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:grid-cols-2 small-tablet:grid-cols-3 gap-10 items-start">
            {allTaskStatus.map((data, index) => (
              <TaskContainer {...data} key={index} />
            ))}
          </div>
        </DndProvider>
      </DashboardLayout>
      <AddTaskModal />
    </>
  );
}
