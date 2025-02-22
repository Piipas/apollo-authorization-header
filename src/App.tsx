import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./components/ui/button";
import { ConfigurationCard } from "./components/configuration-card";

function App() {
  return (
    <div className="w-[500px] h-[600px]">
      <div className="border-b border-input p-4 font-semibold text-xl">
        GraphQL Authorization Header
      </div>
      <div className="p-2">
        <Tabs className="w-full" defaultValue="request">
          <TabsList className="grid w-full grid-cols-2 px-2 py-2 rounded-lg bg-neutral-200 gap-2">
            <TabsTrigger value="request" className="cursor-pointer" asChild>
              <Button size={"lg"}>Request</Button>
            </TabsTrigger>
            <TabsTrigger value="users" className="cursor-pointer" asChild>
              <Button size={"lg"}>History</Button>
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
