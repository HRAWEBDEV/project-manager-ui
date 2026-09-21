"use client";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function UserInterfaceWrapper() {
  const {
    shareDictionary: {
      components: { modeController: modeDic, userInterface: dic },
    },
  } = useShareDictionary();
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <h3 className="font-medium">{modeDic.title}</h3>
        </div>
        <Tabs
          value={theme || "light"}
          onValueChange={(value) => setTheme(value)}
        >
          <TabsList>
            <TabsTrigger className="w-24" value="light">
              {modeDic.light}
            </TabsTrigger>
            <TabsTrigger className="w-24" value="dark">
              {modeDic.dark}
            </TabsTrigger>
            <TabsTrigger className="w-24" value="system">
              {modeDic.system}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
