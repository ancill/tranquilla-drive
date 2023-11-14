import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Stats, Flashcard, ModeToggle } from "@/components";

export function NavBar({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between">
        <div>🥟</div>
        <div className="flex-1 flex justify-center">{children}</div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
export default function App(): JSX.Element {
  return (
    <div className="px-4">
      <Tabs defaultValue="fleshcard" className="space-y-4">
        <NavBar>
          <TabsList>
            <TabsTrigger value="fleshcard">Fleshcard</TabsTrigger>
            <TabsTrigger value="stats" disabled>
              Stats
            </TabsTrigger>
          </TabsList>
        </NavBar>

        <TabsContent value="stats" className="space-y-4">
          <Stats />
        </TabsContent>
        <TabsContent
          value="fleshcard"
          className="space-y-4 flex justify-center overflow-hidden"
        >
          <Flashcard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
