'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { TokenData } from '@/lib/websocket-mock'
import { cn } from '@/lib/utils'
import { Copy, ExternalLink, TrendingUp, BarChart3, Users, Clock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface TokenDetailModalProps {
    token: TokenData | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({ token, open, onOpenChange }) => {
    if (!token) return null

    const handleCopyCA = () => {
        navigator.clipboard.writeText(token.id)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-[#0D0E12] border border-[#22242D] rounded-xl max-w-[600px] p-0 gap-0 shadow-2xl shadow-black/50"
                showCloseButton={true}
            >
                <DialogTitle className="sr-only">{token.name} Details</DialogTitle>

                {/* Header */}
                <div className="flex items-start gap-4 p-5 border-b border-[#22242D]">
                    <img
                        src={token.icon || `https://api.dicebear.com/7.x/shapes/svg?seed=${token.symbol}`}
                        alt={token.name}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">{token.symbol}</span>
                            <span className="text-sm text-[#777A8C]">{token.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-axiom-green">{token.timeAgo}</span>
                            <div className="flex gap-2 text-[#585B69]">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="hover:text-white transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>View on Explorer</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <span className="text-[11px]">X</span>
                                <span className="text-[11px]">🕸</span>
                                <span className="text-[11px]">✈</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[10px] text-[#585B69] font-mono truncate max-w-[180px]">
                                {token.id}...
                            </span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleCopyCA}
                                            className="p-1 hover:bg-[#22242D] rounded transition-colors"
                                        >
                                            <Copy className="w-3 h-3 text-[#585B69] hover:text-white" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy Contract Address</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3 p-5 border-b border-[#22242D]">
                    <div className="bg-[#101114] rounded-lg p-3 border border-[#22242D]">
                        <div className="flex items-center gap-1.5 text-[#585B69] mb-1">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider">Market Cap</span>
                        </div>
                        <span className="text-base font-bold text-white">{token.marketCap}</span>
                    </div>
                    <div className="bg-[#101114] rounded-lg p-3 border border-[#22242D]">
                        <div className="flex items-center gap-1.5 text-[#585B69] mb-1">
                            <BarChart3 className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider">Volume</span>
                        </div>
                        <span className="text-base font-bold text-white">{token.volume}</span>
                    </div>
                    <div className="bg-[#101114] rounded-lg p-3 border border-[#22242D]">
                        <div className="flex items-center gap-1.5 text-[#585B69] mb-1">
                            <Users className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider">TXs</span>
                        </div>
                        <span className="text-base font-bold text-white">{token.transactions}</span>
                    </div>
                    <div className="bg-[#101114] rounded-lg p-3 border border-[#22242D]">
                        <div className="flex items-center gap-1.5 text-[#585B69] mb-1">
                            <Clock className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-wider">1H</span>
                        </div>
                        <span className="text-base font-bold text-white">
                            {token.change1h >= 0 ? '+' : ''}{token.change1h.toFixed(2)}%
                        </span>
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="p-5 border-b border-[#22242D]">
                    <div className="h-[140px] bg-[#101114] rounded-lg border border-[#22242D] flex items-center justify-center">
                        <span className="text-[#585B69] text-sm">Price Chart Coming Soon</span>
                    </div>
                </div>

                {/* Security Info */}
                <div className="p-5 border-b border-[#22242D]">
                    <div className="text-[10px] text-[#585B69] mb-2 uppercase tracking-wider">Security</div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-md px-2.5 py-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[10px] text-green-400 font-medium">Mint Revoked</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 rounded-md px-2.5 py-1.5">
                            <span className="text-[10px] text-blue-400 font-medium">Top 10: 14%</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-md px-2.5 py-1.5">
                            <span className="text-[10px] text-amber-400 font-medium">Insider: 5%</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-5">
                    <button className="flex-1 py-2.5 bg-axiom-blue hover:bg-axiom-blue-hover text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                        <span>⚡</span> Buy
                    </button>
                    <button className="flex-1 py-2.5 bg-[#101114] border border-[#22242D] hover:border-axiom-red/50 text-[#777A8C] hover:text-axiom-red text-sm font-bold rounded-lg transition-all">
                        Sell
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
