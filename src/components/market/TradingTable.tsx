
'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { MarketColumn } from './MarketColumn'
import { dexScreenerService, TokenData } from '@/lib/websocket-mock'

export const TradingTable = () => {
    const [tokens, setTokens] = useState<TokenData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const handleDataUpdate = useCallback((data: TokenData[]) => {
        setTokens(data)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        dexScreenerService.connect(handleDataUpdate)
        return () => {
            dexScreenerService.disconnect(handleDataUpdate)
        }
    }, [handleDataUpdate])

    // Simple even distribution across 3 columns
    const third = Math.ceil(tokens.length / 3)
    const newPairs = tokens.slice(0, third)
    const finalStretch = tokens.slice(third, third * 2)
    const migrated = tokens.slice(third * 2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-64px)] w-full border-t border-axiom">
            <MarketColumn title="New Pairs" tokens={newPairs} isLoading={isLoading} variant="new" />
            <MarketColumn title="Final Stretch" tokens={finalStretch} isLoading={isLoading} variant="final" />
            <MarketColumn title="Migrated" tokens={migrated} isLoading={isLoading} variant="migrated" />
        </div>
    )
}
