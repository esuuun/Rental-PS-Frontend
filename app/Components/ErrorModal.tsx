import React from "react";
import Image from "next/image";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs">
      <div className="relative flex max-w-[90%] flex-col items-center rounded-xl bg-white px-8 py-4 text-center shadow-xl md:rounded-2xl md:px-11 md:py-8">
        <div className="mb-3 flex flex-row items-center justify-center gap-4 md:mb-6 md:gap-6">
          <div className="w-9 md:w-auto">
            <Image
              src="/errorPilih.svg"
              alt="Error Icon"
              width={65}
              height={65}
            />
          </div>
          <div
            className={`text-md flex flex-col items-start leading-tight font-bold tracking-wide text-[#4B32CE] md:text-3xl md:leading-8 ${firaCode.className}`}
          >
            <span>Unable to Select</span>
            <span>Choose another PS</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-md bg-[#7C69E6] px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-[#6854d9] md:px-6 md:py-0.5 md:text-lg"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
