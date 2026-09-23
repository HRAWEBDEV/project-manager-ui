"use client";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { appColorTemplates } from "@/app/utils/appTemplates";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export default function UserInterfaceWrapper() {
  const {
    shareDictionary: {
      components: { modeController: modeDic, userInterface: dic },
    },
  } = useShareDictionary();
  const { onChangeColorTemplate } = useBaseConfig();
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-4">
      <div className="mb-6 flex flex-wrap gap-4 items-center">
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
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <h3 className="font-medium">{dic.colorTemplates}</h3>
        </div>
        <ul className="flex gap-4 flex-wrap">
          {appColorTemplates.map((color) => (
            <li key={color}>
              <button
                className={`${color} size-9 bg-primary rounded cursor-pointer`}
                onClick={() => onChangeColorTemplate(color)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
