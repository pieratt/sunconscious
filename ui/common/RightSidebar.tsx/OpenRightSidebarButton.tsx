import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function OpenRightSidebarButton(props: { onClick: () => void }) {
  return (
    <div className="z-40 flex justify-end md:hidden pt-[1px]">
      <button type="button" className={classNames()} onClick={props.onClick}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="text-stone-400 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
