
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { TokenData } from '@/lib/websocket-mock'
import { cn } from '@/lib/utils'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface TokenCardProps {
  token: TokenData
  onClick?: () => void
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, onClick }) => {
  const [flash, setFlash] = useState<'green' | 'red' | null>(
    token.change1h >= 0 ? 'green' : 'red'
  )
  const [copied, setCopied] = useState(false)
  const [showCopyButton, setShowCopyButton] = useState(false)
  const prevPrice = useRef(token.price)

  useEffect(() => {
    if (token.price !== prevPrice.current) {
      if (token.price > prevPrice.current) {
        setFlash('green')
      } else if (token.price < prevPrice.current) {
        setFlash('red')
      }
      prevPrice.current = token.price
    }
  }, [token.price])

  const handleCopyCA = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(token.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
      className="w-full h-[116px] relative flex bg-axiom-card border-b border-axiom group overflow-hidden hover:bg-[#16171A] transition-all duration-200 cursor-pointer hover:border-l-2 hover:border-l-axiom-blue"
    >
      {/* Content Container */}
      <div className="flex w-full p-2.5 gap-3 relative z-10">

        {/* Left: Image */}
        <div className="relative w-[64px] h-[64px] shrink-0">
          <img
            src={token.icon || `https://api.dicebear.com/7.x/shapes/svg?seed=${token.symbol}`}
            alt={token.name}
            className="w-full h-full object-cover rounded-[1px] group-hover:ring-2 ring-axiom-blue/30 transition-all"
          />
          {/* Hover Frame */}
          <div className="absolute -top-1 -left-1 w-[70px] h-[70px] border border-blue-500/20 rounded-[4px] pointer-events-none hidden group-hover:block"></div>
        </div>

        {/* Middle: Info */}
        <div className="flex flex-col flex-1 min-w-0 justify-between py-0">
          {/* Top Row: Symbol & Name */}
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-white tracking-tight">{token.symbol}</span>
            <span className="text-[13px] text-axiom-tertiary truncate">{token.name}</span>
          </div>

          {/* Time & Socials with Copy */}
          <div className="flex items-center gap-2 text-[11px] mb-1">
            <span className="text-axiom-green font-mono">{token.timeAgo}</span>
            <div className="flex gap-1.5 text-axiom-tertiary opacity-70">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="hover:text-white transition-colors">X</button>
                  </TooltipTrigger>
                  <TooltipContent><p>View on X/Twitter</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="hover:text-white transition-colors">🕸</button>
                  </TooltipTrigger>
                  <TooltipContent><p>Website</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="hover:text-white transition-colors">✈</button>
                  </TooltipTrigger>
                  <TooltipContent><p>Telegram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Copy CA Button - appears on hover */}
            <div className={cn(
              "transition-all duration-200",
              showCopyButton ? "opacity-100" : "opacity-0"
            )}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopyCA}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#22242D] hover:bg-axiom-blue/20 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-axiom-green" />
                          <span className="text-[9px] text-axiom-green">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#777A8C]" />
                          <span className="text-[9px] text-[#777A8C]">CA</span>
                        </>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied!' : 'Copy Contract Address'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Bottom Row: Stats pills with Tooltips */}
          <div className="flex gap-1.5 mt-auto">
            {/* Pill 1: Change % with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center gap-1 rounded px-1.5 h-4 transition-colors duration-300 cursor-help",
                    flash === 'green' ? "bg-green-500/20 text-green-400" :
                      flash === 'red' ? "bg-red-500/20 text-red-400" :
                        "bg-[#101114] text-axiom-green"
                  )}>
                    <span className="text-[10px] font-bold font-mono tracking-wide">{Math.abs(token.change1h).toFixed(2)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
                  <p className="text-[11px]">1H Price Change: {token.change1h >= 0 ? '+' : ''}{token.change1h.toFixed(2)}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Pill 2: Top 10 Holders with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 bg-[#101114] rounded px-1.5 h-4 cursor-help">
                    <span className="text-[10px] text-axiom-green font-bold font-mono tracking-wide">5%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px]">
                  <p className="text-[11px] font-medium mb-1">Top 10 Holders: 5%</p>
                  <p className="text-[10px] text-[#777A8C]">Low concentration - healthy distribution</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Pill 3: Insider % with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center gap-1 rounded px-1.5 h-4 transition-colors duration-300 cursor-help",
                    flash === 'green' ? "bg-green-500/20 text-green-400" :
                      flash === 'red' ? "bg-red-500/20 text-red-400" :
                        "bg-[#101114] text-axiom-green"
                  )}>
                    <span className="text-[10px] font-bold font-mono tracking-wide">14%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px]">
                  <p className="text-[11px] font-medium mb-1">Insider Holdings: 14%</p>
                  <p className="text-[10px] text-[#777A8C]">Includes dev wallets and early investors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Right: Metrics */}
        <div className="flex flex-col items-end justify-between py-0 min-w-[35%]">
          {/* MC & Vol */}
          <div className="text-right flex flex-col items-end gap-0.5">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[9px] text-axiom-tertiary font-bold tracking-wide">MC</span>
              <span className="text-[13px] font-bold text-[#52C5FF] font-mono tracking-tight">{token.marketCap}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[9px] text-axiom-tertiary font-bold tracking-wide">V</span>
              <span className="text-[13px] font-bold text-white font-mono tracking-tight">{token.volume}</span>
            </div>

            {/* F and TX row */}
            <div className="flex items-center gap-2 mt-0.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <span className="text-[9px] text-blue-400 font-bold">F</span>
                      <span className="text-[9px] text-white font-mono">0.045</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fee: 0.045 SOL</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <span className="text-[9px] text-axiom-tertiary font-bold">TX</span>
                      <span className="text-[9px] text-white font-mono">{token.transactions}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total Transactions: {token.transactions}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Buy Button */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 font-bold text-[11px] px-3 h-6 rounded flex items-center gap-1 transition-all duration-300 w-fit bg-[#252836] text-blue-400 hover:bg-blue-600 hover:text-white hover:scale-105"
          >
            <span className="text-[10px]">⚡</span> 0 SOL
          </button>
        </div>
      </div>
    </div>
  )
}
