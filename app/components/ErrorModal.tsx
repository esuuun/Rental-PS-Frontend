import React from 'react';
import Image from 'next/image';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({ subsets: ['latin'] });

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs">
      <div className="bg-white rounded-xl md:rounded-2xl px-8 md:px-11 py-4 md:py-8 max-w-[90%] shadow-xl flex flex-col items-center text-center relative">
        
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mb-3 md:mb-6">
            <div className="w-9 md:w-auto">
                <Image 
                    src="/errorPilih.svg" 
                    alt="Error Icon" 
                    width={65} 
                    height={65}
                />
            </div>
            <div className={`flex flex-col items-start text-[#4B32CE] font-bold text-md md:text-3xl leading-tight md:leading-8 tracking-wide ${firaCode.className}`}>
                <span>Unable to Select</span>
                <span>Choose another PS</span>
            </div>
        </div>

        <button
          onClick={onClose}
          className="bg-[#7C69E6] hover:bg-[#6854d9] text-white font-bold py-1 md:py-0.5 px-3 md:px-6 rounded-md text-xs md:text-lg transition-colors"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
