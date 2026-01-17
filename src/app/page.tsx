import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  Bot,
  FileSearch,
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Globe,
  Users2,
  Layout,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#3D4A67]/95 backdrop-blur supports-[backdrop-filter]:bg-[#3D4A67]/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-white text-xl">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#E9B949] to-[#D1855C] flex items-center justify-center text-white">
              <Bot className="h-5 w-5" />
            </div>
            OrbitCRM
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-slate-200 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-200 hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-200 hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-[#E9B949] transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#E9B949] hover:bg-[#C99929] text-[#1a1a1a] font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#3D4A67] pt-20 pb-32 lg:pt-32 lg:pb-48">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#9EAE8E]/10 blur-3xl"></div>
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#D1855C]/10 blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[#E9B949] backdrop-blur-sm border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-[#E9B949] animate-pulse"></span>
            v2.0 is now live
          </div>

          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            The CRM that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9B949] to-[#D1855C]">actually</span> works for you.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Stop wrestling with clunky data. OrbitCRM uses AI to organize, predict, and execute your sales process automatically.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 bg-[#E9B949] hover:bg-[#F5D479] text-[#1a1a1a] font-bold text-lg shadow-[0_0_20px_rgba(233,185,73,0.3)] hover:shadow-[0_0_30px_rgba(233,185,73,0.5)] transition-all">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm">
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Glassmorphism Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E9B949]/10 to-transparent opacity-20 rounded-xl pointer-events-none"></div>
            <div className="rounded-lg overflow-hidden aspect-[16/9] flex items-center justify-center relative bg-[#0F172A]">
              <Image
                src="/images/landing/hero-dashboard.png"
                alt="OrbitCRM Dashboard Interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D4A67] via-transparent to-transparent opacity-20"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Social Proof Section */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Trusted by modern sales teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0">
            {/* Text-based logos for demo purposes */}
            {['Acme Corp', 'GlobalTech', 'Nebula', 'Velocity', 'Starlight'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-slate-400 select-none">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid ("The Advantage") */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#3D4A67]">
            Built for velocity.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Traditional CRMs are just databases. OrbitCRM is an intelligence engine designed to accelerate your workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="group relative overflow-hidden border-slate-100 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute top-0 h-1 w-full bg-[#3D4A67] opacity-0 transition-opacity group-hover:opacity-100"></div>
            <CardHeader>
              <div className="mb-6 relative h-48 w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src="/images/landing/feature-ai.png"
                  alt="AI First Interface"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardTitle className="text-xl font-bold text-[#3D4A67]">AI-First Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Forget complex menus. Chat naturally with your CRM to add contacts, update deals, and generate reports instantly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-slate-100 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute top-0 h-1 w-full bg-[#9EAE8E] opacity-0 transition-opacity group-hover:opacity-100"></div>
            <CardHeader>
              <div className="mb-6 relative h-48 w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src="/images/landing/feature-context.png"
                  alt="Deep Context Engine"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardTitle className="text-xl font-bold text-[#3D4A67]">Deep Context Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Upload documents, contracts, and emails. Our AI connects the dots, giving you instant answers from your own data.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-slate-100 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute top-0 h-1 w-full bg-[#E9B949] opacity-0 transition-opacity group-hover:opacity-100"></div>
            <CardHeader>
              <div className="mb-6 relative h-48 w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src="/images/landing/feature-execution.png"
                  alt="Automated Execution"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardTitle className="text-xl font-bold text-[#3D4A67]">Automated Execution</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Don't just plan—execute. Allow the AI to draft emails, schedule meetings, and move deals through the pipeline for you.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Value Proposition / Bento Grid Style */}
      <section className="bg-[#3D4A67] py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <BarChart3 className="h-10 w-10 text-[#E9B949] mb-4" />
              <h3 className="text-2xl font-bold mb-2">Predictive Analytics</h3>
              <p className="text-slate-300">Know exactly which deals will close. Our algorithms analyze historical data to score every lead.</p>
            </div>
            <div className="bg-[#9EAE8E]/10 border border-[#9EAE8E]/20 rounded-2xl p-8 hover:bg-[#9EAE8E]/20 transition-colors">
              <ShieldCheck className="h-10 w-10 text-[#9EAE8E] mb-4" />
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-slate-300 text-sm">Bank-grade encryption for all your client data.</p>
            </div>
            <div className="bg-[#D1855C]/10 border border-[#D1855C]/20 rounded-2xl p-8 hover:bg-[#D1855C]/20 transition-colors">
              <Globe className="h-10 w-10 text-[#D1855C] mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-slate-300 text-sm">Multi-currency and multi-language support out of the box.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3D4A67] mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-600">Start for free, scale as you grow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#3D4A67]">Starter</CardTitle>
              <div className="text-3xl font-bold mt-2 text-[#3D4A67]">$0<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <CardDescription>Perfect for freelancers.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  Up to 100 Contacts
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  Basic AI Chat
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  Mobile App Access
                </li>
              </ul>
              <Button className="w-full mt-6 bg-slate-100 text-slate-900 hover:bg-slate-200">Start Free</Button>
            </CardContent>
          </Card>

          {/* Pro - Highlighted */}
          <Card className="border-[#E9B949] bg-white shadow-xl relative scale-105 z-10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#E9B949]"></div>
            <div className="absolute top-0 right-0 bg-[#E9B949] text-xs font-bold px-2 py-1 rounded-bl-lg text-[#1a1a1a]">POPULAR</div>
            <CardHeader>
              <CardTitle className="text-xl text-[#3D4A67]">Pro</CardTitle>
              <div className="text-3xl font-bold mt-2 text-[#3D4A67]">$29<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <CardDescription>For growing teams.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  Unlimited Contacts
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  Advanced Context Engine
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  Email Automation
                </li>
              </ul>
              <Button className="w-full mt-6 bg-[#3D4A67] text-white hover:bg-[#2D3A57]">Get Started</Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#3D4A67]">Enterprise</CardTitle>
              <div className="text-3xl font-bold mt-2 text-[#3D4A67]">$99<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <CardDescription>For large organizations.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  Dedicated Support
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  Custom Integrations
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#9EAE8E]" />
                  SSO & Advanced Security
                </li>
              </ul>
              <Button className="w-full mt-6 bg-slate-100 text-slate-900 hover:bg-slate-200">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center mb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#3D4A67] to-[#4D5A77] p-12 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#E9B949]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#D1855C]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl max-w-2xl mx-auto">
              Ready to stop managing data and start closing deals?
            </h2>
            <p className="mb-8 text-slate-200 max-w-xl mx-auto text-lg">
              Join thousands of sales professionals who have switched to the future of CRM.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-[#E9B949] text-[#1a1a1a] hover:bg-[#C99929] font-bold px-8">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex justify-center gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">Product</Link>
            <Link href="#" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E9B949] transition-all flex items-center justify-center group">
              <Twitter className="h-4 w-4 text-slate-400 group-hover:text-[#1a1a1a] transition-colors" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E9B949] transition-all flex items-center justify-center group">
              <Linkedin className="h-4 w-4 text-slate-400 group-hover:text-[#1a1a1a] transition-colors" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#E9B949] transition-all flex items-center justify-center group">
              <Instagram className="h-4 w-4 text-slate-400 group-hover:text-[#1a1a1a] transition-colors" />
            </Link>
          </div>
          <p>© 2026 OrbitCRM Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
