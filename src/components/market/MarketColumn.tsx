
'use client'

import React, { useState, useMemo } from 'react'
import { TokenData } from '@/lib/websocket-mock'
import { TokenCard } from '@/components/token/TokenCard'
import { TokenCardSkeleton } from '@/components/token/TokenCardSkeleton'
import { TokenDetailModal } from '@/components/token/TokenDetailModal'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { ChevronDown, ArrowUp, ArrowDown, Settings, Pause, Play, Zap } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface MarketColumnProps {
    title: string
    tokens: TokenData[]
    isLoading?: boolean
    variant?: 'new' | 'final' | 'migrated'
}

type SortKey = 'time' | 'marketCap' | 'volume' | 'transactions'
type SortOrder = 'asc' | 'desc'

const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'time', label: 'Time' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume', label: 'Volume' },
    { key: 'transactions', label: 'Transactions' },
]

export const MarketColumn: React.FC<MarketColumnProps> = ({ title, tokens, isLoading, variant = 'new' }) => {
    const [sortKey, setSortKey] = useState<SortKey>('time')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
    const [isPaused, setIsPaused] = useState(false)
    const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const headerBg = variant === 'final' ? 'bg-[#0a0b0f]' : 'bg-[#08090d]'

    // Parse value helper for sorting
    const parseVal = (str: string) => {
        const num = parseFloat(str.replace(/[^0-9.]/g, ''))
        if (str.includes('M')) return num * 1000000
        if (str.includes('B')) return num * 1000000000
        if (str.includes('K')) return num * 1000
        return num
    }

    const sortedTokens = useMemo(() => {
        if (isPaused) return tokens

        return [...tokens].sort((a, b) => {
            let aVal: number, bVal: number

            switch (sortKey) {
                case 'marketCap':
                    aVal = parseVal(a.marketCap)
                    bVal = parseVal(b.marketCap)
                    break
                case 'volume':
                    aVal = parseVal(a.volume)
                    bVal = parseVal(b.volume)
                    break
                case 'transactions':
                    aVal = a.transactions
                    bVal = b.transactions
                    break
                case 'time':
                default:
                    // Keep original order for time
                    return 0
            }

            return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
        })
    }, [tokens, sortKey, sortOrder, isPaused])

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('desc')
        }
        setSortOpen(false)
    }

    const handleTokenClick = (token: TokenData) => {
        setSelectedToken(token)
        setModalOpen(true)
    }

    return (
        <>
            <div className="flex flex-col h-full bg-[#101114] border-r border-[#22242D] overflow-hidden">
                {/* Header with Sorting */}
                <div className={`h-[40px] flex items-center justify-between px-4 border-b border-[#22242D] shrink-0 text-white ${headerBg}`}>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] tracking-tight">{title}</span>

                        {/* Sort Dropdown */}
                        <Popover open={sortOpen} onOpenChange={setSortOpen}>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#101114] border border-[#22242D] hover:border-[#3A3D4A] transition-colors">
                                    <span className="text-[10px] text-[#777A8C]">
                                        {sortOptions.find(o => o.key === sortKey)?.label}
                                    </span>
                                    {sortOrder === 'desc' ?
                                        <ArrowDown className="w-2.5 h-2.5 text-axiom-blue" /> :
                                        <ArrowUp className="w-2.5 h-2.5 text-axiom-blue" />
                                    }
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[140px] p-1.5 bg-[#0D0E12] border border-[#22242D] rounded-lg shadow-xl"
                                align="start"
                                sideOffset={4}
                            >
                                {sortOptions.map(option => (
                                    <button
                                        key={option.key}
                                        onClick={() => handleSort(option.key)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-2 py-1.5 rounded text-[11px] transition-colors",
                                            sortKey === option.key
                                                ? "bg-axiom-blue/10 text-axiom-blue"
                                                : "text-[#777A8C] hover:text-white hover:bg-[#16171A]"
                                        )}
                                    >
                                        {option.label}
                                        {sortKey === option.key && (
                                            sortOrder === 'desc' ?
                                                <ArrowDown className="w-3 h-3" /> :
                                                <ArrowUp className="w-3 h-3" />
                                        )}
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center gap-2 text-[#585B69] text-[11px]">
                        {/* Pause/Play Button */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setIsPaused(!isPaused)}
                                        className={cn(
                                            "p-1 rounded transition-colors",
                                            isPaused ? "text-axiom-blue bg-axiom-blue/10" : "hover:text-white"
                                        )}
                                    >
                                        {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isPaused ? 'Resume updates' : 'Pause updates'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {/* Quick Buy Amount */}
                        <span className="flex items-center gap-0.5">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span>0</span>
                        </span>

                        {/* Presets */}
                        <span className={variant === 'new' ? "text-axiom-blue font-bold cursor-pointer" : "cursor-pointer hover:text-white"}>
                            {variant !== 'new' && <span className="opacity-50 mr-1">≡</span>}
                            {variant === 'new' && <span className="mr-1">≡</span>}
                            P1
                        </span>
                        <span className="cursor-pointer hover:text-white">P2</span>
                        <span className="cursor-pointer hover:text-white">P3</span>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="cursor-pointer hover:text-white p-1">
                                        <Settings className="w-3.5 h-3.5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Column Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto scroller bg-[#06070B]">
                    {isLoading ? (
                        <>
                            <TokenCardSkeleton />
                            <TokenCardSkeleton />
                            <TokenCardSkeleton />
                            <TokenCardSkeleton />
                        </>
                    ) : (
                        sortedTokens.map(token => (
                            <TokenCard
                                key={token.id}
                                token={token}
                                onClick={() => handleTokenClick(token)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Token Detail Modal */}
            <TokenDetailModal
                token={selectedToken}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </>
    )
}
