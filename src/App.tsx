import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Stats, Flashcard, ModeToggle } from "@/components";

export default function App(): JSX.Element {
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div>🥟</div>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="fleshcard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="fleshcard">Fleshcard</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="space-y-4">
              <Stats />
            </TabsContent>
            <TabsContent
              value="fleshcard"
              className="space-y-4 flex justify-center"
            >
              <Flashcard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
