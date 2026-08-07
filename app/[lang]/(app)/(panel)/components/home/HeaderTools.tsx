import { ModeControllerButton } from "../../../components/ModeController";
import { LocaleControllerButton } from "../../../components/LocaleController";

export default function HeaderTools() {
  return (
    <div className="flex gap-1 me-2">
      <ModeControllerButton />
      <LocaleControllerButton />
    </div>
  );
}
