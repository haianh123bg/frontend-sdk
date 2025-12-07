// File: src/components/molecules/Pagination/Pagination.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { IconButton } from '../../atoms/IconButton/IconButton'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  className?: string
  variant?: 'default' | 'icon'
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  variant = 'default',
}) => {
  const dispatch = useDispatchAction()

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch(EventType.UI_CLICK, { page }, { meta: { component: 'Pagination' } })
      onPageChange(page)
    }
  }

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount)
      return [...leftRange, '...', totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages)
      return [1, '...', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [1, '...', ...middleRange, '...', totalPages]
    }

    return range(1, totalPages)
  }, [currentPage, totalPages, siblingCount])

  if (variant === 'icon') {
    return (
      <nav className={twMerge(clsx('flex items-center gap-1', className))}>
        <IconButton
          icon={ChevronLeft}
          size="xs"
          variant="muted"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(currentPage === 1 && 'cursor-not-allowed opacity-40')}
        />
        <IconButton
          icon={ChevronRight}
          size="xs"
          variant="muted"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={clsx(currentPage === totalPages && 'cursor-not-allowed opacity-40')}
        />
      </nav>
    )
  }

  return (
    <nav className={twMerge(clsx('flex items-center gap-1', className))}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={twMerge(
          clsx(
            'rounded-lg px-3 py-2 text-sm font-medium transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            currentPage === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-slate-100 text-text-secondary'
          )
        )}
      >
        Previous
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span key={`dots-${index}`} className="px-2 text-text-muted">
              ...
            </span>
          )
        }

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(Number(pageNumber))}
            className={twMerge(
              clsx(
                'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                currentPage === pageNumber
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-slate-100 text-text-secondary'
              )
            )}
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={twMerge(
          clsx(
            'rounded-lg px-3 py-2 text-sm font-medium transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-slate-100 text-text-secondary'
          )
        )}
      >
        Next
      </button>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
