import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

const Modal: React.FC<{
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  contentClassName?: string;
  dialogEnterFromAnimation?: string;
  dialogEnterTransition?: string;
  dialogEnterToAnimation?: string;
  dialogLeaveTransition?: string;
  dialogLeaveFromAnimation?: string;
  dialogLeaveToAnimation?: string;
  className?: string;
  contentContainerClassName?: string;
  position?:
    | "top"
    | "top-center"
    | "top-right"
    | "bottom"
    | "bottom-center"
    | "bottom-right"
    | "center"
    | "center-right"
    | "center-left";
}> = ({
  opened,
  onClose,
  children,
  title,
  contentClassName,
  dialogEnterFromAnimation,
  dialogEnterTransition,
  dialogEnterToAnimation,
  dialogLeaveTransition,
  dialogLeaveFromAnimation,
  dialogLeaveToAnimation,
  contentContainerClassName,
  className,
  position = "top"
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  let modalContainerClassName = "top-0 left-0";

  switch (position) {
    case "top-center":
      modalContainerClassName = "top-0 left-1/2 -translate-x-1/2";
      break;
    case "top-right":
      modalContainerClassName = "top-0 right-0";
      break;
    case "bottom":
      modalContainerClassName = "bottom-0 left-0";
      break;
    case "bottom-center":
      modalContainerClassName = "bottom-0 left-1/2 -translate-x-1/2";
      break;
    case "bottom-right":
      modalContainerClassName = "bottom-0 right-0";
      break;
    case "center":
      modalContainerClassName =
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      break;
    case "center-left":
      modalContainerClassName = "top-1/2 left-0 -translate-y-1/2";
      break;
    case "center-right":
      modalContainerClassName = "top-1/2 right-0 -translate-y-1/2";
      break;
  }

  useEffect(() => {
    setModalOpened(opened || false);
  }, [opened]);

  useEffect(() => {
    if (modalOpened) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [modalOpened]);

  return (
    <>
      <Transition appear show={modalOpened} as={Fragment}>
        <Dialog
          as="div"
          className="relative w-full h-full z-[999]"
          onClose={() => {
            if (onClose && typeof onClose === "function") {
              onClose();
            } else {
              setModalOpened(false);
            }
          }}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              // onClick={() => {
              //   if (onClose && typeof onClose === "function") {
              //     onClose();
              //   } else {
              //     setModalOpened(false);
              //   }
              // }}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[3px]"
            />
          </TransitionChild>

          <div
            className={`fixed max-w-full max-h-full ${modalContainerClassName} overflow-y-auto ${className}`}
          >
            <div className={`relative ${contentContainerClassName}`}>
              <TransitionChild
                as={Fragment}
                enter={dialogEnterTransition || "ease-out duration-300"}
                enterFrom={dialogEnterFromAnimation || "opacity-0 scale-95"}
                enterTo={dialogEnterToAnimation || "opacity-100 scale-100"}
                leave={dialogLeaveTransition || "ease-in duration-200"}
                leaveFrom={
                  dialogLeaveFromAnimation ||
                  dialogEnterToAnimation ||
                  "opacity-100 scale-100"
                }
                leaveTo={
                  dialogLeaveToAnimation ||
                  dialogEnterFromAnimation ||
                  "opacity-0 scale-95"
                }
              >
                <DialogPanel
                  as={"div"}
                  className={`${contentClassName} w-full relative overflow-auto overflow-x-hidden text-left transition-all`}
                >
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
