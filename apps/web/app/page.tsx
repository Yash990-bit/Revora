'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  Mail,
  MousePointer2,
  Plug,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import LaunchModal from '../components/landing/LaunchModal';
import styles from './page.module.css';

const features = [
  {
    icon: Search,
    title: 'Lead discovery',
    text: 'Find qualified buyers from ICP filters, selected sources, and verified lead signals.',
  },
  {
    icon: Sparkles,
    title: 'Personalized outreach',
    text: 'Generate sharp emails with campaign, company, role, and lead context in every draft.',
  },
  {
    icon: Send,
    title: 'Sender execution',
    text: 'Connect Gmail and send one tailored message per lead from your own inbox.',
  },
];

const steps = [
  'Create a campaign',
  'Set ICP filters',
  'Generate verified leads',
  'Send personalized emails',
];

const plans = [
  {
    name: 'Starter',
    price: '$29',
    desc: 'For founders testing outbound.',
    items: ['3 campaigns', '500 lead credits', 'AI email drafts'],
  },
  {
    name: 'Growth',
    price: '$79',
    desc: 'For teams running weekly campaigns.',
    items: ['Unlimited campaigns', '2,500 lead credits', 'Gmail campaign sending'],
    featured: true,
  },
  {
    name: 'Scale',
    price: '$149',
    desc: 'For multi-seat outbound systems.',
    items: ['Team workspace', '10,000 lead credits', 'Priority integrations'],
  },
];

const faqs = [
  {
    q: 'Can Revora send emails from my account?',
    a: 'Yes. Connect Gmail once, then Revora sends campaign emails from the logged-in sender inbox.',
  },
  {
    q: 'Does every lead get the same email?',
    a: "No. Each message is generated with that lead's name, role, company, ICP, and campaign context.",
  },
  {
    q: 'Can I test it before a real campaign?',
    a: 'Yes. Use the demo campaign in Outreach to preview lead generation and personalized sending.',
  },
];

const integrations: { name: string; icon: LucideIcon }[] = [
  { name: 'Gmail', icon: Mail },
  { name: 'Hunter', icon: Search },
  { name: 'CRM', icon: Plug },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Intent', icon: MousePointer2 },
];

function openLaunchModal() {
  window.dispatchEvent(new Event('open-launch-modal'));
}

function openAuthModal() {
  window.dispatchEvent(new Event('open-auth-modal'));
}

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <header className={styles.navShell}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>
              <Zap size={16} />
            </span>
            <span>Revora</span>
          </Link>

          <nav className={styles.navLinks} aria-label="Primary navigation">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className={styles.navActions}>
            <Link href="/auth/login" className={styles.ghostBtn}>
              Login
            </Link>
            <button className={styles.navCta} onClick={openAuthModal}>
              Get Started
              <ArrowRight size={15} />
            </button>
          </div>
        </header>

        <main>
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={styles.badge}>
                <BadgeCheck size={14} />
                AI outbound workspace for lean sales teams
              </div>
              <h1>Find better leads. Send sharper emails. Close more pipeline.</h1>
              <p>
                Revora turns ICP filters into verified leads, personalized outreach, and
                sender-ready campaigns from one focused dashboard.
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primaryBtn} onClick={openAuthModal}>
                  Start building
                  <ArrowRight size={16} />
                </button>
                <button className={styles.secondaryBtn} onClick={openLaunchModal}>
                  Book a demo
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className={styles.trustRow}>
                <span>Trusted workflow for</span>
                <strong>Founders</strong>
                <strong>SDRs</strong>
                <strong>Growth teams</strong>
              </div>
            </div>

            <div className={styles.productVisual} aria-label="Revora dashboard preview">
              <div className={styles.visualTopbar}>
                <span />
                <span />
                <span />
                <p>Campaign OS</p>
              </div>
              <div className={styles.visualGrid}>
                <div className={styles.visualPanel}>
                  <div className={styles.panelHeader}>
                    <Target size={15} />
                    ICP Match
                  </div>
                  <div className={styles.scoreRing}>92%</div>
                  <p>Operations leaders at fast-growing SaaS teams</p>
                </div>
                <div className={styles.visualPanel}>
                  <div className={styles.panelHeader}>
                    <Users size={15} />
                    Lead Queue
                  </div>
                  {['Satyam Kumar', 'Aarav Mehta', 'Nisha Rao'].map((lead, index) => (
                    <div className={styles.leadRow} key={lead}>
                      <span>{lead.charAt(0)}</span>
                      <div>
                        <strong>{lead}</strong>
                        <small>{index === 0 ? 'Founder' : 'Head of Ops'}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.visualPanelWide}>
                  <div className={styles.panelHeader}>
                    <Mail size={15} />
                    Generated email
                  </div>
                  <p className={styles.emailPreview}>
                    Hi Satyam, LevelUp helps operations teams manage people, ownership, and
                    execution in one operating system...
                  </p>
                  <div className={styles.emailActions}>
                    <span>Reply intent: High</span>
                    <button>
                      Send
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.metrics}>
            <div>
              <strong>10-15h</strong>
              <span>saved per SDR weekly</span>
            </div>
            <div>
              <strong>45%</strong>
              <span>higher reply potential</span>
            </div>
            <div>
              <strong>4 steps</strong>
              <span>from ICP to sending</span>
            </div>
            <div>
              <strong>1 inbox</strong>
              <span>connected sender workflow</span>
            </div>
          </section>

          <section className={styles.section} id="features">
            <div className={styles.sectionHeader}>
              <span>Product features</span>
              <h2>A complete outbound motion, built into one workspace.</h2>
              <p>
                Keep research, lead generation, personalized copy, and email execution connected
                from the first campaign.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {features.map((feature) => (
                <article className={styles.featureCard} key={feature.title}>
                  <feature.icon className={styles.featureIcon} />
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.workflow} id="workflow">
            <div className={styles.workflowCopy}>
              <span>How it works</span>
              <h2>Launch a focused lead campaign without duct-taping tools.</h2>
              <p>
                Revora follows the same clean execution path every time, so your team can move from
                targeting to outreach with less manual work.
              </p>
            </div>
            <div className={styles.stepList}>
              {steps.map((step, index) => (
                <div className={styles.stepItem} key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.integrations}>
            <div className={styles.integrationCopy}>
              <span>Integrations</span>
              <h2>Connect the tools that move your pipeline.</h2>
            </div>
            <div className={styles.logoRail}>
              {integrations.map(({ name, icon: Icon }) => (
                <div className={styles.logoPill} key={name}>
                  <Icon size={16} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} id="pricing">
            <div className={styles.sectionHeader}>
              <span>Pricing</span>
              <h2>Start small. Scale when your outbound system is ready.</h2>
            </div>
            <div className={styles.pricingGrid}>
              {plans.map((plan) => (
                <article
                  className={`${styles.planCard} ${plan.featured ? styles.planFeatured : ''}`}
                  key={plan.name}
                >
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.desc}</p>
                    <strong>
                      {plan.price}
                      <small>/mo</small>
                    </strong>
                  </div>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>
                        <Check size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={openAuthModal}>
                    Choose plan
                    <ArrowRight size={15} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.faq} id="faq">
            <div className={styles.sectionHeader}>
              <span>FAQ</span>
              <h2>Questions founders ask before launching.</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((item) => (
                <article key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.finalCta}>
            <h2>Build your next outbound campaign with less busywork.</h2>
            <p>Turn your ICP into leads, emails, and sender-ready campaigns.</p>
            <button onClick={openAuthModal}>
              Get started
              <ArrowRight size={16} />
            </button>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <Zap size={16} />
            </span>
            <span>Revora</span>
          </div>
          <p>AI lead generation and outreach for modern growth teams.</p>
          <div>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <Link href="/auth/login">Login</Link>
          </div>
        </footer>
      </div>

      <LaunchModal />
      <AuthModal />
    </>
  );
}
