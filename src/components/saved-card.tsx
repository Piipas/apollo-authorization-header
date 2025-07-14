import { TabsContent } from "./ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Send, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { formatTimestamp } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { sendRequest } from "@/lib/helpers";

export function SavedCard() {
  const { savedRequests, removeRequest } = useStore();

  return (
    <TabsContent value="saved" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Saved Requests</h3>
              <Badge variant="secondary">{savedRequests.length} saved</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No saved requests yet</div>
          ) : (
            <div className="space-y-3">
              {savedRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2 max-w-full">
                      <div className="flex gap-2 w-full">
                        <div className="min-w-0 flex-1 truncate" title={request.endpoint}>
                          <code className="px-2 py-1 rounded text-sm bg-muted">{request.endpoint}</code>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(request.timestamp)}
                        </Badge>
                      </div>

                      {request.token_path && (
                        <div className="text-sm text-muted-foreground">
                          Token Path: <code>{request.token_path}</code>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {request.fields.map((field, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {field.name}: {field.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardFooter className="!px-0 !pb-0 pt-4">
                    <div className="gap-2 flex w-full">
                      <Button
                        className="w-full cursor-pointer"
                        onClick={() => sendRequest(request)}
                        title="Resend this request"
                      >
                        <Send className="h-4 w-4" />
                        Resend Request
                      </Button>
                      <Button
                        className="w-full cursor-pointer"
                        variant="outline-destructive"
                        onClick={() => removeRequest(request.id)}
                        title="Delete saved request"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
