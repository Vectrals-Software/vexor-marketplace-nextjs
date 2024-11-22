
import { cn } from '@/lib/utils'
import React from 'react'
import { RxDotsHorizontal } from 'react-icons/rx'

const loader = () => {
    return (
           <div className={cn("min-h-screen -mt-16 pt-16 relative flex flex-1 max-w-full justify-center items-center")}>
           <RxDotsHorizontal/>
        </div>
    )
}

export default loader