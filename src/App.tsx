import { Flashcard, NavBar } from "@/components";

export default function App(): JSX.Element {
  return (
    <div>
      <NavBar />
      <div className="space-y-4 flex justify-center overflow-hidden">
        <Flashcard />
      </div>
    </div>
  );
}

// Old tab style
// return (
//   <div className="">
//     <Tabs defaultValue="fleshcard" className="">
//       <NavBar>
//         <TabsList>
//           <TabsTrigger value="fleshcard">Fleshcard</TabsTrigger>
//           <TabsTrigger value="stats" disabled>
//             Stats
//           </TabsTrigger>
//         </TabsList>
//       </NavBar>

//       <TabsContent value="stats" className="">
//         <Stats />
//       </TabsContent>
//       <TabsContent
//         value="fleshcard"
//         className="space-y-4 flex justify-center overflow-hidden"
//       >
//         <Flashcard />
//       </TabsContent>
//     </Tabs>
//   </div>
// );
