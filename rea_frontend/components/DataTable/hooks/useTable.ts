import { useCallback, useMemo, useState } from 'react';
import { SortDirection } from '../models';

export const useTable = <Row>({
    data,
    defaultPageSize = 10,
}: {
    data: Row[];
    defaultPageSize?: number;
}) => {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>('asc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const sorted = useMemo(() => {
        if (!sortKey) return data;
        const copy = [...(data as any[])];
        copy.sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal > bVal) return 1;
            if (aVal < bVal) return -1;
            return 0;
        });
        return sortDir === 'asc' ? copy : copy.reverse();
    }, [data, sortKey, sortDir]);

    const pagedData = useMemo(
        () => sorted.slice((page - 1) * defaultPageSize, page * defaultPageSize),
        [sorted, page, defaultPageSize]
    );

    const toggleSort = useCallback(
        (key: string) => {
            if (sortKey !== key) {
                setSortKey(key);
                setSortDir('asc');
            } else {
                setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
            }
        },
        [sortKey]
    );

    const toggleSelect = useCallback(
        (idx: number) => {
            setSelected((prev) => {
                const copy = new Set(prev);
                const globalIndex = (page - 1) * defaultPageSize + idx;
                if (copy.has(globalIndex)) copy.delete(globalIndex);
                else copy.add(globalIndex);
                return copy;
            });
        },
        [page, defaultPageSize]
    );

    const toggleSelectAll = useCallback(() => {
        setSelected((prev) => {
            if (prev.size === data.length) return new Set();
            return new Set(data.map((_, i) => i));
        });
    }, [data]);

    const totalPages = Math.ceil(data.length / defaultPageSize);

    return {
        sortKey,
        sortDir,
        page,
        setPage,
        pagedData,
        selected,
        toggleSort,
        toggleSelect,
        toggleSelectAll,
        totalPages,
        fullData: data,
    };
}
