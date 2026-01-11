'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from './dialog'
import { cn } from '@/lib/utils'
import { X, RefreshCw, Download, Upload } from 'lucide-react'

interface FilterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const protocols = [
    { name: 'Pump', color: 'bg-green-500' },
    { name: 'Mayhem', color: 'bg-pink-500' },
    { name: 'Bonk', color: 'bg-amber-500' },
    { name: 'Boop', color: 'bg-orange-500' },
    { name: 'Moonshot', color: 'bg-purple-500' },
    { name: 'Heaven', color: 'bg-slate-400' },
    { name: 'DaosFun', color: 'bg-yellow-500' },
    { name: 'Candle', color: 'bg-red-500' },
    { name: 'Sugar', color: 'bg-pink-400' },
    { name: 'Believe', color: 'bg-blue-500' },
    { name: 'Jupiter Studio', color: 'bg-orange-400' },
    { name: 'Moonit', color: 'bg-cyan-500' },
    { name: 'LaunchLab', color: 'bg-violet-500' },
    { name: 'Dynamic BC', color: 'bg-emerald-500' },
    { name: 'Raydium', color: 'bg-indigo-500' },
    { name: 'Meteora AMM', color: 'bg-teal-500' },
    { name: 'Meteora AMM V2', color: 'bg-teal-400' },
    { name: 'Pump AMM', color: 'bg-green-400' },
    { name: 'Orca', color: 'bg-sky-500' },
    { name: 'Wavebreak', color: 'bg-rose-500' },
]

interface RangeFilterProps {
    label: string
    minValue: string
    maxValue: string
    onMinChange: (val: string) => void
    onMaxChange: (val: string) => void
}

const RangeFilter: React.FC<RangeFilterProps> = ({ label, minValue, maxValue, onMinChange, onMaxChange }) => (
    <div className="flex items-center gap-2">
        <span className="text-[11px] text-[#777A8C] w-20">{label}</span>
        <input
            type="text"
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
            placeholder="Min"
            className="w-20 px-2 py-1.5 bg-[#101114] border border-[#22242D] rounded text-[11px] text-white placeholder:text-[#585B69] focus:outline-none focus:border-axiom-blue"
        />
        <span className="text-[#585B69] text-[11px]">—</span>
        <input
            type="text"
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
            placeholder="Max"
            className="w-20 px-2 py-1.5 bg-[#101114] border border-[#22242D] rounded text-[11px] text-white placeholder:text-[#585B69] focus:outline-none focus:border-axiom-blue"
        />
    </div>
)

export const FilterModal: React.FC<FilterModalProps> = ({ open, onOpenChange }) => {
    const [selectedProtocols, setSelectedProtocols] = useState<string[]>(['Pump'])
    const [searchKeywords, setSearchKeywords] = useState('')
    const [excludeKeywords, setExcludeKeywords] = useState('')
    const [dexPaid, setDexPaid] = useState(false)
    const [mintRevoked, setMintRevoked] = useState(false)

    // Range filters
    const [ageMin, setAgeMin] = useState('')
    const [ageMax, setAgeMax] = useState('')
    const [mcMin, setMcMin] = useState('')
    const [mcMax, setMcMax] = useState('')
    const [liqMin, setLiqMin] = useState('')
    const [liqMax, setLiqMax] = useState('')
    const [volMin, setVolMin] = useState('')
    const [volMax, setVolMax] = useState('')

    const toggleProtocol = (name: string) => {
        setSelectedProtocols(prev =>
            prev.includes(name)
                ? prev.filter(p => p !== name)
                : [...prev, name]
        )
    }

    const handleUnselect = () => setSelectedProtocols([])

    const handleApply = () => {
        // Apply filter logic here
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0D0E12] border border-[#22242D] rounded-xl max-w-[480px] p-0 gap-0 shadow-2xl shadow-black/50 max-h-[85vh] overflow-y-auto">
                <DialogTitle className="sr-only">Filter tokens</DialogTitle>

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#22242D] sticky top-0 bg-[#0D0E12] z-10">
                    <span className="text-[15px] font-bold text-white">Filters</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleUnselect}
                            className="text-[11px] text-[#777A8C] hover:text-white transition-colors"
                        >
                            Unselect All
                        </button>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="p-1.5 rounded-lg hover:bg-[#22242D] transition-colors"
                        >
                            <X className="w-4 h-4 text-[#585B69]" />
                        </button>
                    </div>
                </div>

                {/* Protocols */}
                <div className="p-4 border-b border-[#22242D]">
                    <div className="text-[11px] text-[#777A8C] mb-3">Protocols</div>
                    <div className="flex flex-wrap gap-2">
                        {protocols.map((protocol) => (
                            <button
                                key={protocol.name}
                                onClick={() => toggleProtocol(protocol.name)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium border transition-all",
                                    selectedProtocols.includes(protocol.name)
                                        ? "bg-[#22242D] border-[#3A3D4A] text-white"
                                        : "bg-transparent border-[#22242D] text-[#777A8C] hover:border-[#3A3D4A]"
                                )}
                            >
                                <span className={cn("w-2 h-2 rounded-full", protocol.color)} />
                                {protocol.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keyword Filters */}
                <div className="p-4 border-b border-[#22242D]">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[11px] text-[#777A8C] block mb-2">Search Keywords</label>
                            <input
                                type="text"
                                value={searchKeywords}
                                onChange={(e) => setSearchKeywords(e.target.value)}
                                placeholder="keyword1, keyword2..."
                                className="w-full px-3 py-2 bg-[#101114] border border-[#22242D] rounded-lg text-[12px] text-white placeholder:text-[#585B69] focus:outline-none focus:border-axiom-blue"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] text-[#777A8C] block mb-2">Exclude Keywords</label>
                            <input
                                type="text"
                                value={excludeKeywords}
                                onChange={(e) => setExcludeKeywords(e.target.value)}
                                placeholder="keyword1, keyword2..."
                                className="w-full px-3 py-2 bg-[#101114] border border-[#22242D] rounded-lg text-[12px] text-white placeholder:text-[#585B69] focus:outline-none focus:border-axiom-blue"
                            />
                        </div>
                    </div>
                </div>

                {/* Audit Toggles */}
                <div className="p-4 border-b border-[#22242D]">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#777A8C]">Audit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#777A8C]">Metrics</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-3">
                        <button
                            onClick={() => setDexPaid(!dexPaid)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
                                dexPaid
                                    ? "bg-axiom-blue/20 border-axiom-blue/50 text-axiom-blue"
                                    : "bg-[#101114] border-[#22242D] text-[#777A8C] hover:border-[#3A3D4A]"
                            )}
                        >
                            <div className={cn(
                                "w-3 h-3 rounded border",
                                dexPaid ? "bg-axiom-blue border-axiom-blue" : "border-[#585B69]"
                            )} />
                            Dex Paid
                        </button>
                        <button
                            onClick={() => setMintRevoked(!mintRevoked)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
                                mintRevoked
                                    ? "bg-axiom-blue/20 border-axiom-blue/50 text-axiom-blue"
                                    : "bg-[#101114] border-[#22242D] text-[#777A8C] hover:border-[#3A3D4A]"
                            )}
                        >
                            <div className={cn(
                                "w-3 h-3 rounded border",
                                mintRevoked ? "bg-axiom-blue border-axiom-blue" : "border-[#585B69]"
                            )} />
                            Mint Revoked
                        </button>
                    </div>
                </div>

                {/* Range Filters */}
                <div className="p-4 border-b border-[#22242D] space-y-3">
                    <RangeFilter label="Age" minValue={ageMin} maxValue={ageMax} onMinChange={setAgeMin} onMaxChange={setAgeMax} />
                    <RangeFilter label="Market Cap" minValue={mcMin} maxValue={mcMax} onMinChange={setMcMin} onMaxChange={setMcMax} />
                    <RangeFilter label="Liquidity" minValue={liqMin} maxValue={liqMax} onMinChange={setLiqMin} onMaxChange={setLiqMax} />
                    <RangeFilter label="Volume" minValue={volMin} maxValue={volMax} onMinChange={setVolMin} onMaxChange={setVolMax} />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between p-4 sticky bottom-0 bg-[#0D0E12]">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-[#101114] border border-[#22242D] rounded-lg text-[11px] text-[#777A8C] hover:text-white hover:border-[#3A3D4A] transition-all">
                            <Download className="w-3.5 h-3.5" />
                            Import
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-[#101114] border border-[#22242D] rounded-lg text-[11px] text-[#777A8C] hover:text-white hover:border-[#3A3D4A] transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            Export
                        </button>
                    </div>
                    <button
                        onClick={handleApply}
                        className="px-5 py-2 bg-axiom-blue hover:bg-axiom-blue-hover text-white text-[12px] font-bold rounded-lg transition-all"
                    >
                        Apply All
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
