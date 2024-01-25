import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Stats, Flashcard, NavBar } from "@/components";

export default function App(): JSX.Element {
  return (
    <div>
      <Tabs defaultValue="fleshcard" className="">
        <NavBar>
          <TabsList>
            <TabsTrigger value="fleshcard">Fleshcard</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
        </NavBar>

        <TabsContent value="stats" className="">
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
