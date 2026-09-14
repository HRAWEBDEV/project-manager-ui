import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { IoSearch } from "react-icons/io5";

export default function NoItemFound() {
  const {
    shareDictionary: {
      components: { noItemFound: dic },
    },
  } = useShareDictionary();
  return (
    <div>
      <div className="flex flex-col items-center p-4 text-neutral-700 dark:text-neutral-400">
        <IoSearch className="size-14 mb-4" />
        <div className="text-center">
          <p className="text-md font-medium">{dic.title}.</p>
        </div>
      </div>
    </div>
  );
}
