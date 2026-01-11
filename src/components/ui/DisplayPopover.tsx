'use client'

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/lib/utils'
import { ChevronDown, Search, Hash, EyeOff, Circle } from 'lucide-react'

interface DisplayPopoverProps {
    children: React.ReactNode
}

interface ToggleOption {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    enabled: boolean
}

export const DisplayPopover: React.FC<DisplayPopoverProps> = ({ children }) => {
    const [options, setOptions] = useState<ToggleOption[]>([
        { id: 'search', label: 'Search Bar', icon: Search, enabled: true },
        { id: 'decimals', label: 'Decimals', icon: Hash, enabled: true },
        { id: 'hidden', label: 'Hidden Tokens', icon: EyeOff, enabled: false },
        { id: 'circle', label: 'Circle Images', icon: Circle, enabled: false },
    ])

    const toggleOption = (id: string) => {
        setOptions(prev =>
            prev.map(opt =>
                opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
            )
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                className="w-[200px] p-2 bg-[#0D0E12] border border-[#22242D] rounded-xl shadow-2xl shadow-black/50"
                align="end"
                sideOffset={8}
            >
                <div className="space-y-1">
                    {options.map((option) => {
                        const Icon = option.icon
                        return (
                            <button
                                key={option.id}
                                onClick={() => toggleOption(option.id)}
                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#16171A] transition-colors group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Icon className="w-4 h-4 text-[#585B69] group-hover:text-[#777A8C]" />
                                    <span className="text-[12px] text-[#777A8C] group-hover:text-white">
                                        {option.label}
                                    </span>
                                </div>
                                <div className={cn(
                                    "w-8 h-4 rounded-full transition-all relative",
                                    option.enabled ? "bg-axiom-blue" : "bg-[#22242D]"
                                )}>
                                    <div className={cn(
                                        "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                                        option.enabled ? "left-4" : "left-0.5"
                                    )} />
                                </div>
                            </button>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}
