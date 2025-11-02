import React from 'react';
import { MdNavigateNext, MdNavigateBefore, MdFirstPage, MdLastPage } from 'react-icons/md';

function Pagination({ currentPage, totalPages, onPageChange, isFirst, isLast }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(0, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {/* Primeira página */}
                <button
                    onClick={() => onPageChange(0)}
                    disabled={isFirst}
                    className={`p-2 rounded-lg transition-colors ${isFirst
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                        }`}
                    title="Primeira página"
                >
                    <MdFirstPage size={24} />
                </button>

                {/* Página anterior */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isFirst}
                    className={`p-2 rounded-lg transition-colors ${isFirst
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                        }`}
                    title="Página anterior"
                >
                    <MdNavigateBefore size={24} />
                </button>

                {/* Números das páginas */}
                {pageNumbers.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors min-w-[44px] ${currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {pageNum + 1}
                    </button>
                ))}

                {/* Próxima página */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLast}
                    className={`p-2 rounded-lg transition-colors ${isLast
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                        }`}
                    title="Próxima página"
                >
                    <MdNavigateNext size={24} />
                </button>

                {/* Última página */}
                <button
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={isLast}
                    className={`p-2 rounded-lg transition-colors ${isLast
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                        }`}
                    title="Última página"
                >
                    <MdLastPage size={24} />
                </button>
            </div>

            {/* Info da página */}
            <span className="text-sm text-gray-600">
                Página {currentPage + 1} de {totalPages}
            </span>
        </div>
    );
}

export default Pagination;
