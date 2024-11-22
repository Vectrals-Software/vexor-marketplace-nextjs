import SettingsOptions from "@/components/settings/settings-options"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const Settings = async () => {
  return (
    <div className="flex justify-center items-center h-full flex-1">
      <Card className="w-[600px] max-w-full">
        <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
        <CardContent>
          <SettingsOptions/>
        </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Settings