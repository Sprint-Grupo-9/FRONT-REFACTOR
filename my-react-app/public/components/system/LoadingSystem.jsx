import React from 'react';
import { MdPets } from 'react-icons/md';

function LoadingSystem() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="relative w-32 h-32">
                {/* Pegadas animadas */}
                <MdPets className="absolute top-0 left-0 text-primary animate-paw-1 text-2xl" />
                <MdPets className="absolute top-8 right-0 text-primary animate-paw-2 text-2xl" />
                <MdPets className="absolute bottom-8 left-8 text-primary animate-paw-3 text-2xl" />
                <MdPets className="absolute bottom-0 right-8 text-primary animate-paw-4 text-2xl" />
            </div>
        </div>
    );
}

export default LoadingSystem; 