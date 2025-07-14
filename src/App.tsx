import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigurationCard } from "./components/configuration-card";
import { SavedCard } from "./components/saved-card";

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
            <TabsTrigger value="saved" className="cursor-pointer">
              Saved
            </TabsTrigger>
          </TabsList>
          <ConfigurationCard />
          <SavedCard />
        </Tabs>
      </div>
    </div>
  );
}

export default App;
