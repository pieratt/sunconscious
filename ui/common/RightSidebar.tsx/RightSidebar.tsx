import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Size = "base" | "lg";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function RightSidebar({
  isOpen,
  onClose,

  ...props
}: Props) {
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[60] md:hidden"
          onClose={onClose}
        >
          <div className="fixed inset-0 z-[60] flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="-translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                className={classNames(
                  "fixed right-0 top-0 bottom-0 flex flex-1 flex-col bg-stone-800 pb-4 shadow-xl",
                  "w-40"
                )}
              >
                <button
                  type="button"
                  className="absolute top-[26px] right-2 flex h-5 w-5 items-center justify-center rounded-full focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-slate-400"
                    aria-hidden="true"
                  />
                </button>

                <div className="flex flex-shrink-0 flex-col overflow-y-auto">
                  {props.children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div
        className={classNames(
          "right-0 hidden md:fixed md:inset-y-0 md:flex md:flex-col",
          "md:w-96"
        )}
      >
        <div className="flex flex-grow flex-col overflow-y-auto">
          <div className="flex flex-shrink-0 flex-col">{props.children}</div>
        </div>
      </div>
    </>
  );
}
