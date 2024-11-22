import SettingsOptions from '@/components/settings/settings-options'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const DocsPage = () => {
    return (
        <div className="flex flex-1 justify-center items-center bg-slate-200 max-w-full">
            <Card className="w-[600px] max-w-full">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">Docs</p>
                    <CardContent className="text-center">
                        I&apos;m building the docs for this template. Stay tuned! 🚀
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}

export default DocsPage