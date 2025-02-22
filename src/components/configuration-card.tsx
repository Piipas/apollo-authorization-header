import { ConfigurationForm } from "./configuration-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";

export function ConfigurationCard() {
  return (
    <TabsContent value="request" className="flex-col flex-1">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Request</CardTitle>
          <CardDescription hidden />
        </CardHeader>
        <CardContent>
          <ConfigurationForm />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
