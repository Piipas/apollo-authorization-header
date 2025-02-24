import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { ConfigurationCard } from "./components/configuration-card";

function App() {
  return (
    <div className="w-[500px] h-[600px]">
      <div className="border-b border-input p-4 font-semibold text-xl">GraphQL Authorization Header</div>
      <div className="p-2">
        <Tabs className="w-full" defaultValue="request">
          <TabsList className="grid w-full grid-cols-2 p-1 rounded-lg bg-neutral-200 gap-2">
            <TabsTrigger value="request" className="cursor-pointer">
              Request
            </TabsTrigger>
            <TabsTrigger value="users" className="cursor-pointer">
              Saved
            </TabsTrigger>
          </TabsList>
          <ConfigurationCard />
          <TabsContent value="users">Hi from users tab</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
