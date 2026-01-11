'use client'

import { useState } from "react"
import { TradingTable } from "@/components/market/TradingTable"
import { SearchModal } from "@/components/ui/SearchModal"
import { FilterModal } from "@/components/ui/FilterModal"
import { DisplayPopover } from "@/components/ui/DisplayPopover"
import { ChainSelector } from "@/components/ui/ChainSelector"
import { useKeyboardShortcuts } from "@/lib/hooks/useKeyboardShortcuts"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Filter, Monitor, Layout, Volume2, Settings, FolderOpen, List, Search } from "lucide-react"

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => setSearchOpen(true),
    onEscape: () => {
      setSearchOpen(false)
      setFilterOpen(false)
    }
  })

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans relative">
      {/* Header */}
      <header className="h-[56px] border-b border-axiom flex items-center px-4 justify-between bg-axiom-card text-white z-50 relative shrink-0">
        <div className="flex items-center gap-6 h-full">
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span className="text-white text-lg">▲</span>
              <span className="font-bold text-[17px] tracking-tight">AXIOM</span>
            </div>
            <span className="bg-[#1A1D26] text-[#777A8C] text-[10px] px-1 rounded border border-[#22242D] font-medium h-4 flex items-center">Pro</span>
          </div>

          <nav className="hidden xl:flex gap-6 text-[13px] font-medium text-[#777A8C] h-full items-center">
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Discover</a>
            <div className="h-full flex items-center border-b-2 border-axiom-blue px-1 pt-[2px]">
              <a href="#" className="text-axiom-blue">Pulse</a>
            </div>
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Trackers</a>
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Perpetuals</a>
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Yield</a>
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Vision</a>
            <a href="#" className="hover:text-white transition-colors h-full flex items-center">Portfolio</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar - Clickable to open modal */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden lg:flex items-center bg-[#06070B] border border-axiom rounded-full px-4 h-[34px] gap-2 text-[#777A8C] w-[280px] hover:border-axiom-tertiary/50 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="text-[13px]">Search by token or CA...</span>
            <span className="ml-auto text-[10px] border border-[#22242D] rounded px-1.5 py-0.5 bg-[#101114]">/</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Chain Selector Popover */}
            <ChainSelector />
            <button className="bg-axiom-blue hover:bg-axiom-blue-hover text-white px-5 h-[34px] rounded-full text-[13px] font-bold shadow-lg shadow-blue-500/20 transition-all">Deposit</button>
          </div>

          {/* Mobile Menu Icon Mock */}
          <div className="lg:hidden text-white">☰</div>
        </div>
      </header>

      {/* Secondary Filter Bar */}
      <div className="h-[48px] bg-[#06070B] border-b border-axiom flex items-center px-4 justify-between shrink-0 relative z-40">
        <div className="flex items-center gap-2 text-white font-bold text-[18px]">
          <span>Pulse</span>
          <span className="text-axiom-blue text-[14px] bg-[#101114] px-1.5 rounded border border-[#22242D]">SOL</span>
          <span className="text-[#585B69] text-[14px]">📦</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setFilterOpen(true)}
                  className="bg-[#101114] text-[#777A8C] border border-[#22242D] px-3 py-1.5 rounded text-[12px] flex items-center gap-2 hover:text-white hover:border-[#3A3D4A] transition-colors"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open filter options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Display Popover */}
          <DisplayPopover>
            <button className="bg-[#101114] text-[#777A8C] border border-[#22242D] px-3 py-1.5 rounded text-[12px] flex items-center gap-2 hover:text-white hover:border-[#3A3D4A] transition-colors">
              <Monitor className="w-3.5 h-3.5" />
              <span>Display</span>
              <span className="text-[10px]">▼</span>
            </button>
          </DisplayPopover>

          <div className="flex gap-2 text-[#585B69]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="cursor-pointer hover:text-white p-1.5 rounded hover:bg-[#16171A] transition-colors">
                    <Layout className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Layout Options</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="cursor-pointer hover:text-white p-1.5 rounded hover:bg-[#16171A] transition-colors">
                    <span>▦</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Grid View</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="cursor-pointer hover:text-white p-1.5 rounded hover:bg-[#16171A] transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Sound Alerts</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="cursor-pointer hover:text-white p-1.5 rounded hover:bg-[#16171A] transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Settings</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <button className="flex items-center gap-1 bg-[#101114] px-2 py-0.5 rounded border border-[#22242D] text-[12px] text-[#777A8C] hover:text-white hover:border-axiom-tertiary transition-colors">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>1</span>
              <List className="w-3 h-3" />
              <span>0</span>
              <span>▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative z-0 pb-[36px]">
        <TradingTable />
      </div>

      {/* Footer / Status Bar (Fixed Bottom) */}
      <footer className="h-[34px] border-t border-axiom bg-[#06070B] flex items-center px-2 justify-between text-[11px] text-[#777A8C] select-none fixed bottom-0 left-0 w-full z-[100] font-medium tracking-tight shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 overflow-hidden">
          <button className="bg-[#1A1D26] text-axiom-blue px-2 py-0.5 rounded border border-axiom-blue/20 flex items-center gap-1 hover:bg-axiom-blue/20 transition-colors">
            <span>⚙ PRESET 1</span>
          </button>

          <button className="flex items-center gap-1 bg-[#101114] px-2 py-0.5 rounded border border-[#22242D] hover:border-axiom-tertiary">
            <span>📁 1</span>
            <span>≡ 0</span>
            <span>▼</span>
          </button>

          <div className="w-[1px] h-3 bg-[#22242D] mx-1"></div>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">⚙</span>
                </TooltipTrigger>
                <TooltipContent><p>Quick Settings</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <span>Address Wallet</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-axiom-red"></span>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Connect your wallet</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <span>X Twitter</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-axiom-red"></span>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Connect Twitter for alerts</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <span>🧭 Discover</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-axiom-red"></span>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Discover new tokens</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <span>📉 Pulse</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-axiom-red"></span>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Real-time token pulse</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="w-[1px] h-3 bg-[#22242D]"></div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <span>📊 PnL</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Profit & Loss tracker</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center gap-4 pl-4 border-l border-[#22242D] h-full shadow-[-10px_0_10px_0_rgba(0,0,0,0.5)] bg-[#06070B]">
          <div className="flex items-center gap-1 bg-[#101114] border border-[#22242D] rounded-full px-2 py-0.5">
            <span className="text-white">💊</span>
            <span className="text-axiom-green">🔥</span>
            <span className="text-axiom-green">💰</span>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-amber-500 cursor-pointer hover:text-amber-400 transition-colors">
                  <span>₿</span>
                  <span>$91.5K</span>
                </div>
              </TooltipTrigger>
              <TooltipContent><p>Bitcoin Price</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-[#52C5FF] cursor-pointer hover:text-[#6DD0FF] transition-colors">
                  <span>🔹</span>
                  <span>$3131</span>
                </div>
              </TooltipTrigger>
              <TooltipContent><p>Ethereum Price</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-axiom-green cursor-pointer hover:text-green-400 transition-colors">
                  <span>≡</span>
                  <span>$139.78</span>
                </div>
              </TooltipTrigger>
              <TooltipContent><p>Solana Price</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-3 text-[#777A8C]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">🔗 $57.4K</span>
                </TooltipTrigger>
                <TooltipContent><p>Chainlink Price</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">⛽ 0.0293</span>
                </TooltipTrigger>
                <TooltipContent><p>Gas Price</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">⏣ 0.003</span>
                </TooltipTrigger>
                <TooltipContent><p>Priority Fee</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="w-[1px] h-3 bg-[#22242D]"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 bg-[#052e1f] text-axiom-green px-2 py-0.5 rounded border border-axiom-green/30 cursor-pointer hover:bg-[#073d29] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-axiom-green animate-pulse"></span>
                  <span>Connection is stable</span>
                </div>
              </TooltipTrigger>
              <TooltipContent><p>WebSocket connection status</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
            <span>GLOBAL</span>
            <span>▼</span>
          </div>

          <div className="flex gap-3 text-[14px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer hover:text-white transition-colors">❐</span>
                </TooltipTrigger>
                <TooltipContent><p>Fullscreen</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer hover:text-white transition-colors">🔔</span>
                </TooltipTrigger>
                <TooltipContent><p>Notifications</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer hover:text-white transition-colors">🎨</span>
                </TooltipTrigger>
                <TooltipContent><p>Theme</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer hover:text-white transition-colors">👾</span>
                </TooltipTrigger>
                <TooltipContent><p>Discord</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <FilterModal open={filterOpen} onOpenChange={setFilterOpen} />
    </main>
  )
}
