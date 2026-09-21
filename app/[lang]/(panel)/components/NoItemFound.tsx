import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { IoSearch } from "react-icons/io5";

export default function NoItemFound({
  searchedText,
}: {
  searchedText?: string;
}) {
  const {
    shareDictionary: {
      components: { noItemFound: dic },
    },
  } = useShareDictionary();
  return (
    <div>
      <div className="flex flex-col items-center p-4 text-neutral-500">
        <IoSearch className="size-14 mb-4" />
        <div className="text-center">
          <p className="text-md font-medium mb-1">{dic.title}</p>
          {searchedText && (
            <div className="text-md">
              <span>{dic.searchedText}: </span>
              <span>{searchedText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
