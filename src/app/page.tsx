"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Mail,
  Cloud,
  ShieldCheck,
  Activity,
  Network,
  Code2,
  Boxes,
  Terminal,
  GraduationCap,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  Cpu,
  Wrench,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { NetworkBackground } from "@/components/site/network-background";
import { MatrixRain } from "@/components/site/matrix-rain";
import { AgeDisplay } from "@/components/site/age-display";
import { CountUp } from "@/components/site/count-up";

/* ----------------------------- Data ----------------------------- */

const CONTACT = {
  name: "Aaron Mathias",
  role: "Cloud & Network Engineering",
  email: "amat576@wgu.edu",
  github: "github.com/aaron-levels",
  githubHref: "https://github.com/aaron-levels",
  location: "Toronto, ON",
};

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  comma?: boolean;
  label: string;
};

const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 98, prefix: ">", suffix: "%", label: "Uptime maintained" },
  { value: 3500, comma: true, label: "Endpoints managed" },
  { value: 1, prefix: "$", suffix: "M+", label: "Annual savings" },
];

type ProjectLink = {
  label: string;
  href: string;
  variant: "code" | "demo";
};

type FeaturedProject = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status?: "progress" | "live";
};

type OtherProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const FEATURED: FeaturedProject[] = [
  {
    id: "subnet-calc",
    number: "01",
    title: "Python Subnet Calculator CLI",
    description:
      "A command-line tool that takes any IP address and subnet mask and instantly calculates network address, broadcast address, usable host range, and total host count. Includes a binary breakdown of the subnet mask, VLSM support, and structured JSON output for piping into other scripts.",
    tags: ["Python", "ipaddress", "argparse", "VLSM", "JSON", "Networking"],
    links: [
      { label: "View Code", href: "https://github.com/aaron-levels", variant: "code" },
    ],
    icon: Terminal,
    status: "live",
  },
  {
    id: "vpc-lab",
    number: "02",
    title: "AWS VPC Build Lab",
    description:
      "Hands-on AWS networking lab focused on VPC design, subnet planning, security groups, NACLs, routing, and CLI-driven configuration across EC2, S3, and IAM.",
    tags: ["AWS", "VPC", "Subnets", "Security Groups", "AWS CLI"],
    icon: Cloud,
    status: "progress",
  },
  {
    id: "portfolio",
    number: "03",
    title: "Cloud Engineering Portfolio",
    description:
      "A dark editorial portfolio site built with Next.js and deployed on Netlify to present cloud, networking, infrastructure, and support experience.",
    tags: ["Next.js", "React", "Tailwind CSS", "Netlify", "TypeScript"],
    links: [
      { label: "View Code", href: "https://github.com/aaron-levels", variant: "code" },
      { label: "Live Demo", href: "https://aaronmathias.me", variant: "demo" },
    ],
    icon: Code2,
    status: "live",
  },
];

const OTHER_WORK: OtherProject[] = [
  {
    id: "cloudwatch-lab",
    title: "CloudWatch Monitoring Lab",
    description:
      "Infrastructure monitoring practice using Amazon CloudWatch to capture metrics, alarms, and operational visibility for AWS resources.",
    tags: ["AWS", "CloudWatch", "Monitoring", "Alarms"],
    icon: Activity,
  },
  {
    id: "iam-lab",
    title: "IAM Security Lab",
    description:
      "AWS identity and access management practice covering IAM users, roles, policies, JSON policy structure, and least-privilege access design.",
    tags: ["AWS", "IAM", "Security", "JSON Policies"],
    icon: ShieldCheck,
  },
  {
    id: "net-automation",
    title: "Network Automation Scripts",
    description:
      "Reusable Python and Bash scripts for configuring switches, validating routes, and automating repetitive network operations tasks.",
    tags: ["Python", "Bash", "Automation", "Networking"],
    icon: Network,
  },
  {
    id: "terraform-infra",
    title: "Terraform Infrastructure",
    description:
      "Modular Terraform configurations provisioning repeatable AWS environments — VPCs, IAM, and compute — with remote state and plan/apply pipelines.",
    tags: ["Terraform", "IaC", "AWS", "Modules"],
    icon: Boxes,
  },
];

type Job = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

const EXPERIENCE: Job[] = [
  {
    id: "bmo-analyst",
    role: "ATM Technical Support Analyst",
    company: "Bank of Montreal (BMO)",
    location: "Toronto, ON",
    period: "Jun 2023 – Present",
    bullets: [
      "Negotiated and managed SLAs with NCR, Burroughs, Chubb, and Securitas; restructured dispatch workflows and vendor contracts to deliver $1M+ in annualized cost savings while maintaining infrastructure availability targets.",
      "Maintained >98% uptime across ~3,500 ATMs (Canada & U.S.) by triaging hardware, software, and Layer 1–3 network faults; escalated incidents through ITSM workflows using Vision, PaymentsOne, and Data Navigator.",
      "Configured TCP/IP parameters, IP addressing schemes, and network connectivity during ATM installations and decommissions across hundreds of sites; documented all changes in ServiceNow per ITSM change management protocols.",
      "Developed and automated daily statistical incident reports using structured data from monitoring tools, improving proactive alerting coverage and reducing repeat-incident rates fleet-wide.",
      "Led infrastructure migration coordination for the Canadian ATM Refresh Project — a nationwide hardware refresh spanning hundreds of locations — managing vendor logistics, site scheduling, and rollout validation end-to-end.",
    ],
  },
  {
    id: "bmo-rep",
    role: "Customer & Financial Services Representative",
    company: "Bank of Montreal (BMO)",
    location: "Toronto, ON",
    period: "Sep 2021 – Jun 2023",
    bullets: [
      "Processed high-volume financial transactions with zero end-of-day reconciliation errors over 22 months; maintained full AML/KYC and cybersecurity policy compliance.",
      "Advised customers on digital banking platforms, reducing branch call volume and driving measurable improvement in digital adoption rates.",
    ],
  },
];

type SkillGroup = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "aws",
    label: "AWS & Cloud",
    icon: Cloud,
    items: [
      "EC2",
      "S3",
      "IAM",
      "VPC",
      "Security Groups",
      "NACLs",
      "Route 53",
      "CloudWatch",
      "JSON Policies",
      "Static Website Hosting",
      "AWS CLI",
      "IAM Roles & Policies",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: Network,
    items: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "VLANs",
      "Subnetting",
      "VLSM",
      "CIDR notation",
      "OSI model (L1–L7)",
      "Incident response",
      "Access management",
      "Threat detection",
      "Firewall rule management",
    ],
  },
  {
    id: "os",
    label: "OS / Scripting",
    icon: Cpu,
    items: [
      "Linux (CLI, Bash scripting)",
      "Python",
      "Windows Server",
      "Active Directory basics",
      "Remote Desktop (RDP)",
      "SSH",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    items: [
      "ServiceNow (ITSM/change mgmt)",
      "FIS PaymentsOne",
      "FIS Data Navigator",
      "SIEM",
      "Git/GitHub",
      "VS Code",
    ],
  },
];

type Cert = {
  name: string;
  status: "earned" | "progress";
  detail: string;
};

const CERTS: Cert[] = [
  { name: "CompTIA A+", status: "earned", detail: "Earned Jun 2026" },
  { name: "CompTIA Network+", status: "earned", detail: "Earned Jul 2026" },
  { name: "AWS Cloud Practitioner", status: "progress", detail: "In Progress" },
];

/* --------------------------- Animations -------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* --------------------------- Sub-components -------------------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 font-medium text-xs bg-secondary/60 text-secondary-foreground">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-8">
      {children}
    </h2>
  );
}

function FeaturedCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const Icon = project.icon;
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="group bg-card border border-border rounded-2xl p-8 card-hover"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
          <Icon size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
            {project.status === "progress" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
                In progress
              </span>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) =>
                link.variant === "code" ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={15} />
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ExternalLink size={15} />
                    {link.label}
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function OtherCard({
  project,
  index,
}: {
  project: OtherProject;
  index: number;
}) {
  const Icon = project.icon;
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group bg-card border border-border rounded-2xl p-6 card-hover flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
          <Icon size={16} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/70 pt-1">
        <Terminal size={12} />
        Lab notes &amp; write-up
      </div>
    </motion.div>
  );
}

function ExperienceCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group bg-card border border-border rounded-2xl p-8 card-hover"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
        <div>
          <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
          <p className="text-sm text-primary font-medium mt-0.5">
            {job.company}
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-1 text-xs text-muted-foreground shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} />
            {job.period}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} />
            {job.location}
          </span>
        </div>
      </div>
      <ul className="space-y-3">
        {job.bullets.map((b, i) => (
          <li
            key={i}
            className="text-sm text-muted-foreground leading-relaxed flex gap-3"
          >
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
              aria-hidden="true"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SkillGroupCard({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  const Icon = group.icon;
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-card border border-border rounded-2xl p-6 card-hover"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
          <Icon size={16} className="text-primary" />
        </div>
        <h3 className="text-base font-bold text-foreground">{group.label}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="pt-16 flex-1 flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Animated network topology background */}
          <NetworkBackground className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.19 295) 0%, transparent 60%)",
            }}
          />
          {/* Subtle grid overlay for extra "engineering" texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-4">
                {CONTACT.role}
              </p>
              <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight mb-6 leading-[1.05]">
                Aaron Mathias<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg mb-8">
                Cloud/Network Engineering professional with 3+ years managing
                mission-critical infrastructure at scale — configuring TCP/IP
                networks, enforcing IAM security, and maintaining &gt;98% uptime
                across 3,500 endpoints in a production financial environment.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center gap-2 px-6 py-3 gradient-violet text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity group"
                >
                  View Projects
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </motion.a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium text-sm text-foreground hover:bg-muted/50 transition-colors"
                >
                  Get in touch
                </a>
              </div>

              {/* Live age widget */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8"
              >
                <AgeDisplay />
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-2xl p-5 backdrop-blur-sm"
                >
                  <p className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      comma={s.comma}
                    />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
                Cloud &amp; network engineering, with an operational mindset
                <span className="text-primary">.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Results-driven Cloud/Network Engineering professional with 3+
                years managing mission-critical infrastructure at scale. Proven
                ability to configure and troubleshoot TCP/IP networks, enforce
                IAM security policies, and maintain &gt;98% uptime across 3,500
                endpoints in a production financial environment.
              </p>
              <p>
                Hands-on AWS experience spanning EC2, S3, IAM, VPC, Security
                Groups, and the AWS CLI — with $1M+ delivered in annualized cost
                savings through infrastructure optimization. Currently completing
                a BS in Cloud and Network Engineering (AWS Track) at WGU;
                CompTIA A+ certified, with Network+ and AWS Cloud Practitioner
                in progress.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "AWS",
                  "Networking",
                  "TCP/IP",
                  "IAM Security",
                  "Monitoring",
                  "Incident Response",
                ].map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-border relative overflow-hidden"
        >
          {/* Matrix digital-rain backdrop */}
          <MatrixRain className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" />
          {/* Dark vignette so cards stay readable; fades rain toward center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 30%, rgba(10,12,14,0.85) 0%, rgba(10,12,14,0.55) 45%, rgba(10,12,14,0.35) 100%)",
            }}
          />
          <div className="max-w-6xl mx-auto px-6 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                  Work
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                  Projects<span className="text-primary">.</span>
                </h2>
                <p className="text-muted-foreground max-w-xl leading-relaxed">
                  A selection of cloud and infrastructure work, including a
                  production Python networking tool, AWS labs, IAM security
                  practice, and this portfolio build.
                </p>
              </div>
              <motion.a
                href={CONTACT.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full font-medium text-sm text-foreground hover:bg-muted/50 hover:border-primary/40 transition-colors group shrink-0"
                aria-label={`GitHub profile — ${CONTACT.github}`}
              >
                <Github size={15} className="text-primary" />
                GitHub Profile
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </motion.a>
            </motion.div>

            {/* Featured */}
            <section className="mb-20">
              <SectionLabel>Featured</SectionLabel>
              <div className="space-y-5">
                {FEATURED.map((project, i) => (
                  <FeaturedCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </section>

            {/* Other Work */}
            <section>
              <SectionLabel>Other Work</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {OTHER_WORK.map((project, i) => (
                  <OtherCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                Experience
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                Where I&apos;ve worked<span className="text-primary">.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Three years managing mission-critical ATM infrastructure at one
                of Canada&apos;s largest banks — owning uptime, vendor SLAs, and
                nationwide refresh coordination.
              </p>
            </motion.div>
            <div className="space-y-5">
              {EXPERIENCE.map((job, i) => (
                <ExperienceCard key={job.id} job={job} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Education */}
        <section id="skills" className="scroll-mt-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                Skills &amp; Education
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                The toolkit<span className="text-primary">.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                AWS, networking fundamentals, scripting, and the operational
                tools that keep production systems running.
              </p>
            </motion.div>

            {/* Skill groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {SKILL_GROUPS.map((group, i) => (
                <SkillGroupCard key={group.id} group={group} index={i} />
              ))}
            </div>

            {/* Certifications + Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-border rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                    <Award size={16} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    Certifications
                  </h3>
                </div>
                <ul className="space-y-3">
                  {CERTS.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm text-foreground font-medium">
                        {c.name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs ${
                          c.status === "earned"
                            ? "text-primary"
                            : "text-muted-foreground/80"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            c.status === "earned"
                              ? "bg-primary"
                              : "bg-primary/50 animate-pulse"
                          }`}
                        />
                        {c.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card border border-border rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                    <GraduationCap size={16} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    Education
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-foreground font-bold">
                    Western Governors University
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    BS Cloud and Network Engineering — AWS Track
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-2 inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    Expected: Dec 2026 · Remote
                  </p>
                </div>
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-2 text-xs text-muted-foreground/80">
                  <Briefcase size={12} />
                  Based in {CONTACT.location} · Open to cloud, infrastructure &amp;
                  production support roles
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
                Contact
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                Let&apos;s build something reliable
                <span className="text-primary">.</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Open to cloud, infrastructure, and production support roles —
                both local and abroad. Drop a line and I&apos;ll get back within
                a day or two.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className="group bg-card border border-border rounded-2xl p-6 card-hover flex items-center gap-4"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground font-medium truncate">
                    {CONTACT.email}
                  </p>
                </div>
              </a>
              <div className="group bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Based in</p>
                  <p className="text-sm text-foreground font-medium truncate">
                    {CONTACT.location} · Open abroad &amp; local
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 text-center"
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 gradient-violet text-white rounded-full font-medium text-sm hover:opacity-90 transition-all group"
              >
                {CONTACT.email}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
