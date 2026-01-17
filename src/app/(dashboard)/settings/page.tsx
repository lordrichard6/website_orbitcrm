import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-600">Manage your account and organization</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Profile</CardTitle>
                        <CardDescription className="text-slate-600">Your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Name</label>
                            <Input
                                placeholder="Your name"
                                className="border-slate-300 bg-white text-slate-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <Input
                                placeholder="you@example.com"
                                disabled
                                className="border-slate-300 bg-slate-100 text-slate-500"
                            />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Organization</CardTitle>
                        <CardDescription className="text-slate-600">Manage your workspace</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Organization Name</label>
                            <Input
                                placeholder="My Organization"
                                className="border-slate-300 bg-white text-slate-900"
                            />
                        </div>
                        <Button variant="outline" className="border-slate-300 text-slate-700">
                            Invite Team Members
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Billing</CardTitle>
                        <CardDescription className="text-slate-600">Manage your subscription</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg bg-slate-100 p-4">
                            <p className="text-slate-900 font-medium">Free Plan</p>
                            <p className="text-sm text-slate-600">10,000 tokens/month</p>
                        </div>
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                            Upgrade Plan
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900">AI Preferences</CardTitle>
                        <CardDescription className="text-slate-600">Configure AI behavior</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">Default Model</span>
                                <span className="text-slate-900 font-medium">GPT-4o Mini</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">Tokens Used</span>
                                <span className="text-slate-900 font-medium">0 / 10,000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
