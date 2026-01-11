'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from './dialog'
import { cn } from '@/lib/utils'
import { Search, Clock, TrendingUp, BarChart3, Droplets, X } from 'lucide-react'

interface SearchModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const quickFilters = [
    { label: 'Pump', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { label: 'Bonk', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { label: 'Bags', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { label: 'OG Mode', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { label: 'Graduated', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
]

const sortOptions = [
    { icon: Clock, label: 'Time', active: true },
    { icon: TrendingUp, label: 'Market Cap', active: false },
    { icon: BarChart3, label: 'Volume', active: false },
    { icon: Droplets, label: 'Liquidity', active: false },
]

const recentSearches = [
    { symbol: 'BONK', name: 'Bonk', time: '2m ago' },
    { symbol: 'WIF', name: 'dogwifhat', time: '5m ago' },
    { symbol: 'POPCAT', name: 'Popcat', time: '12m ago' },
]

export const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
    const [query, setQuery] = useState('')
    const [activeSort, setActiveSort] = useState('Time')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
        if (!open) {
            setQuery('')
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0D0E12] border border-[#22242D] rounded-xl max-w-[520px] p-0 gap-0 shadow-2xl shadow-black/50">
                <DialogTitle className="sr-only">Search tokens</DialogTitle>

                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-[#22242D]">
                    <Search className="w-5 h-5 text-[#585B69]" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by token or CA..."
                        className="flex-1 bg-transparent text-white text-[15px] placeholder:text-[#585B69] focus:outline-none"
                    />
                    <button
                        onClick={() => onOpenChange(false)}
                        className="p-1.5 rounded-lg hover:bg-[#22242D] transition-colors"
                    >
                        <X className="w-4 h-4 text-[#585B69]" />
                    </button>
                    <span className="text-[11px] text-[#585B69] border border-[#22242D] rounded px-1.5 py-0.5 bg-[#101114]">
                        ESC
                    </span>
                </div>

                {/* Quick Filters */}
                <div className="p-4 border-b border-[#22242D]">
                    <div className="flex flex-wrap gap-2">
                        {quickFilters.map((filter) => (
                            <button
                                key={filter.label}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all hover:scale-105",
                                    filter.color
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-1 p-3 border-b border-[#22242D]">
                    <span className="text-[11px] text-[#585B69] mr-2">Sort by:</span>
                    {sortOptions.map((option) => {
                        const Icon = option.icon
                        return (
                            <button
                                key={option.label}
                                onClick={() => setActiveSort(option.label)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] transition-all",
                                    activeSort === option.label
                                        ? "bg-axiom-blue/20 text-axiom-blue"
                                        : "text-[#777A8C] hover:text-white hover:bg-[#16171A]"
                                )}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {option.label}
                            </button>
                        )
                    })}
                </div>

                {/* Recent Searches / Results */}
                <div className="p-3">
                    <div className="text-[11px] text-[#585B69] mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>History</span>
                    </div>
                    <div className="space-y-1">
                        {recentSearches.map((item) => (
                            <button
                                key={item.symbol}
                                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#16171A] transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-[11px] font-bold">
                                    {item.symbol.slice(0, 2)}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-[13px] font-medium text-white">{item.symbol}</div>
                                    <div className="text-[11px] text-[#585B69]">{item.name}</div>
                                </div>
                                <span className="text-[10px] text-[#585B69] group-hover:text-[#777A8C]">
                                    {item.time}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
