import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Sidebar Navigation</h2>
          <p className="text-muted-foreground mt-2">
            Click on the menu items to navigate
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
}
