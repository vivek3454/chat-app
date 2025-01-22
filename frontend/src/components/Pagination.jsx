import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

const PaginationComp = ({ setPage, pageCount, page }) => {
    const handlePrevious = () => {
        if (page <= 1) {
            return
        }
        setPage((prev) => prev - 1)
    }
    const handleNext = () => {
        if (page >= pageCount) {
            return
        }
        setPage((prev) => prev + 1)
    }

    console.log("page", page);


    const renderPageNumbers = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (pageCount <= maxVisiblePages) {
            for (let i = 1; i <= pageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink isActive={page === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(pageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (page < pageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            items.push(
                <PaginationItem key={pageCount}>
                    <PaginationLink isActive={page === pageCount}>
                        {pageCount}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };


    return (
        <div className='flex justify-end'>
            {pageCount > 0 &&
                <Pagination>
                    <PaginationContent className="ml-auto">
                        <PaginationItem>
                            <PaginationPrevious onClick={handlePrevious} to="" />
                        </PaginationItem>
                        {Array.from({ length: pageCount }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        {/* <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> */}
                        <PaginationItem>
                            <PaginationNext onClick={handleNext} to="" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>}
        </div>
    )
}

export default PaginationComp