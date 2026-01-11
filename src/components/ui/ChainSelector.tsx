'use client'

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

interface Chain {
    id: string
    name: string
    symbol: string
    color: string
}

const chains: Chain[] = [
    { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'bg-gradient-to-br from-[#9945FF] to-[#14F195]' },
    { id: 'bnb', name: 'BNB Chain', symbol: 'BNB', color: 'bg-[#F3BA2F]' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'bg-[#627EEA]' },
    { id: 'base', name: 'Base', symbol: 'BASE', color: 'bg-[#0052FF]' },
]

interface ChainSelectorProps {
    className?: string
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ className }) => {
    const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className={cn(
                    "flex items-center gap-2 bg-[#06070B] border border-axiom rounded-full px-3 h-[34px] cursor-pointer hover:bg-[#16171A] transition-colors",
                    className
                )}>
                    <div className={cn("w-4 h-4 rounded-full", selectedChain.color)} />
                    <span className="text-[11px] text-axiom-blue font-bold">{selectedChain.symbol}</span>
                    <ChevronDown className="w-3 h-3 text-[#777A8C]" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[180px] p-2 bg-[#0D0E12] border border-[#22242D] rounded-xl shadow-2xl shadow-black/50"
                align="center"
                sideOffset={8}
            >
                <div className="space-y-1">
                    {chains.map((chain) => (
                        <button
                            key={chain.id}
                            onClick={() => {
                                setSelectedChain(chain)
                                setOpen(false)
                            }}
                            className={cn(
                                "w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#16171A] transition-colors group",
                                selectedChain.id === chain.id && "bg-[#16171A]"
                            )}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={cn("w-5 h-5 rounded-full", chain.color)} />
                                <div className="text-left">
                                    <div className="text-[12px] text-white font-medium">{chain.symbol}</div>
                                    <div className="text-[10px] text-[#585B69]">{chain.name}</div>
                                </div>
                            </div>
                            {selectedChain.id === chain.id && (
                                <Check className="w-4 h-4 text-axiom-blue" />
                            )}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
