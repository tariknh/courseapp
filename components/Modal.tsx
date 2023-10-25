import React, { useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  actionLabel?: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  disabled?: boolean;
  onSubmit: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
  onSubmit,
  onClose,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, []);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-neutral-900/90
            backdrop-blur-sm
            fixed
            inset-0
            z-50
            "
        />
        <Dialog.Content
          className="
          z-50
        fixed
        drop-shadow-md
        border
        border-neutral-700
        top-[50%]
        left-[50%]
        max-h-full
        h-full
        md:h-auto
        md:max-h-[85vh]
        w-full
        md:w-[90vw]
        md:max-w-[450px]
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-md
        bg-white
        
        p-[25px]
        focus:outline-none
        text-black
        "
        >
          <Dialog.Title
            className="
          text-xl
          text-center
          font-bold
          mb-4

          "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
          mb-5
          text-sm
          leading-normal
          text-center
          "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4 w-full">
              {secondaryActionLabel && (
                <Button
                  disabled={disabled}
                  outline
                  label={secondaryActionLabel!}
                  onClick={handleSecondaryAction}
                />
              )}
              {actionLabel && (
                <Button
                  onClick={onSubmit}
                  disabled={disabled}
                  label={actionLabel!}
                />
              )}
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="
            text-neutral-400
            hover:text-white
            absolute
            top-[10px]
            right-[10px]
            inline-flex
            h-[25px]
            w-[25px]
            appearance-none
            items-center
            justify-center
            rounded-full
            focus:outline-none
            "
              onClick={onClose}
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
