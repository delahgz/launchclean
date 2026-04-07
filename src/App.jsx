import { useState, useEffect, useRef } from "react";

const FL = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Instrument+Sans:wght@400;500;600;700&display=swap";

function useVis(t=0.12){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){setV(true);o.disconnect()}},{threshold:t});o.observe(e);return()=>o.disconnect()},[]);return[r,v]}
function Fade({children,d=0,s}){const[r,v]=useVis();return <div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:`opacity .6s ease ${d}s, transform .6s ease ${d}s`,...s}}>{children}</div>}

export default function Page(){
  const[email,setEmail]=useState("");const[sent,setSent]=useState(false);const[faq,setFaq]=useState(null);const[plan,setPlan]=useState("once");
  useEffect(()=>{if(!document.querySelector('link[href*="DM+Sans"]')){const l=document.createElement("link");l.rel="stylesheet";l.href=FL;document.head.appendChild(l)}},[]);

  const dm="'DM Sans',sans-serif",ins="'Instrument Sans','DM Sans',sans-serif";
  const navy="#0B1120",orange="#F97316",cream="#FFFCF7",warmG="#F5F3EF",tx="#1A2332",txL="#5A6577",bdr="#E5E0D8";

  const Sec=({children,bg,id,s})=><section id={id} style={{padding:"80px 20px",background:bg||"#fff",...s}}><div style={{maxWidth:940,margin:"0 auto"}}>{children}</div></section>;
  const Tag=({children})=><div style={{display:"inline-block",fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:orange,fontFamily:ins,marginBottom:12}}>{children}</div>;
  const H=({children,c,center,sz})=><h2 style={{fontFamily:dm,fontSize:sz||"clamp(28px,4vw,42px)",fontWeight:800,color:c||tx,lineHeight:1.12,letterSpacing:-.5,margin:"0 0 16px",textAlign:center?"center":"left"}}>{children}</h2>;
  const P=({children,c,center,s})=><p style={{fontFamily:ins,fontSize:16,lineHeight:1.75,color:c||txL,margin:"0 0 16px",textAlign:center?"center":"left",maxWidth:center?640:"none",marginLeft:center?"auto":0,marginRight:center?"auto":0,...s}}>{children}</p>;
  const Btn=({children,big,outline,href,onClick,s})=>{const props={style:{fontFamily:dm,fontSize:big?16:14,fontWeight:700,padding:big?"16px 40px":"12px 28px",borderRadius:10,border:outline?`2px solid ${orange}`:"none",cursor:"pointer",background:outline?"transparent":`linear-gradient(135deg,${orange},#EA580C)`,color:outline?orange:"#fff",display:"inline-flex",alignItems:"center",gap:8,boxShadow:outline?"none":"0 4px 14px rgba(249,115,22,.3)",transition:"all .2s",textDecoration:"none",...s}};if(href)return <a href={href} {...props}>{children}</a>;return <button onClick={onClick} {...props}>{children}</button>};

  const faqs=[
    ["Is this just another cleaning business course?","No. This is an operational system with interactive checklists, live calculators, copy-paste scripts, and step-by-step instructions. Built by someone running a $4M+ cleaning business, not a course creator. Everything has been field-tested with real clients and real contractors."],
    ["I have not started yet. Is this too advanced?","The system starts from literally zero. Day 1 is registering your ABN. Every step is laid out in order with exact instructions, time estimates, and cost estimates. If you can follow a checklist, you can build this business."],
    ["I already have a cleaning business. Will this help?","If you are under $10K/month, absolutely. The 8 revenue streams section will show you monetisation angles you have not considered. The operations system will free up 20+ hours per week. The pricing calculator will likely reveal you are undercharging."],
    ["Do I need a lot of money to start?","You can launch for under $300. ABN is free, insurance is $40-80/month, Google Business Profile is free, Canva logo is free. The system shows you exactly what to spend and what to skip."],
    ["What about the Done-With-You tier?","We build your website, configure Booking Koala + Stripe, deploy a trained VA who already knows the systems, and coach you through 4 weekly calls. You launch with infrastructure that takes most people months to build on their own."],
    ["Tell me about the operations management service.","For growing businesses ($5K+/month): we manage your entire operations layer. Scheduling, customer service, review collection, contractor pay, and weekly reporting. All handled by our trained team. You focus on growth, not admin. Starts at $1,497/month."],
    ["Can I get a refund?","30-day money-back guarantee on the Self-Serve Kit and Full System. If you execute the plan and it does not deliver value, email us. Done-With-You is non-refundable due to custom work but includes a satisfaction guarantee on all deliverables."],
    ["What if I am not in Australia?","Legal and tax info is AU-specific. But 80% of the content (operations, pricing frameworks, hiring, scripts, revenue models) applies to any English-speaking market."],
  ];

  const tiers=[
    {name:"Self-Serve Kit",price:67,payPlan:null,tag:"DIY operators",
    feat:["Interactive 33-milestone launch plan","Pricing calculator with revenue projections","15 copy-paste scripts (outreach, sales, retention, growth)","8 recurring revenue stream playbooks","Contractor screening + trial scorecard","30-day printable launch checklist","Client lifecycle framework","Exit metrics tracker","All future updates included"],
    not:["Strategy call","Website build","VA/ops deployment","Coaching"],
    cta:"Get the Kit",pop:false,link:"https://buy.stripe.com/fZu28qceIfQC0qG7NCbQY02"},
    {name:"Full System",price:447,payPlan:{amt:159,n:3},tag:"Most popular",
    feat:["Everything in Self-Serve Kit","1-hour strategy call with an operator","Custom pricing model review for your suburbs","Google Business Profile optimisation audit","Personalised 30-day action plan","Priority email support (90 days)","Operations SOP manual template","Exit metrics tracking template","Community membership (3 months free)","Property manager outreach kit"],
    not:["Website build","VA/ops deployment"],
    cta:"Get the Full System",pop:true,link:"https://buy.stripe.com/14A9AS92wgUGc9od7WbQY00"},
    {name:"Done With You",price:1497,payPlan:{amt:399,n:4},tag:"Launch ready in 2 weeks",
    feat:["Everything in Full System","Website built and deployed for you","Booking Koala + Stripe fully configured","Trained VA deployed for 30 days","4 weekly coaching calls (1-on-1)","Google Business Profile fully optimised","First 5 outreach messages crafted with you","Cleaning checklists customised to your services","Contractor agreement drafted","Community membership (12 months)","Direct WhatsApp access to your coach","Priority access to managed operations service"],
    not:[],
    cta:"Apply for Done-With-You",pop:false,link:"mailto:info@maidforyou.com.au?subject=Done-With-You%20Application&body=Hi%2C%20I%20am%20interested%20in%20the%20Done-With-You%20tier.%20Please%20send%20me%20the%20application%20details."},
  ];

  return(
<div style={{fontFamily:ins,color:tx,background:"#fff",overflowX:"hidden"}}>

{/* NAV */}
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(11,17,32,.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(249,115,22,.15)",padding:"0 20px"}}>
<div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:56}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<svg width="32" height="20" viewBox="-155 -105 330 210" fill="none"><path d="M-150,-100 V100 H-30 v-40 H-110 v-160Z" fill="white"/><path d="M-10,-100 H110 V100 H-10 v-40 H70 v-120 H-10Z" fill="white"/><circle cx="150" cy="0" r="20" fill="#F97316"/></svg>
<span style={{fontFamily:dm,fontWeight:800,fontSize:16,color:"#fff",letterSpacing:-.3}}>Launch Clean</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:16}}>
<a href="#whats-inside" style={{fontFamily:ins,fontSize:13,fontWeight:600,color:"#94A3B8",textDecoration:"none"}}>What's Inside</a>
<a href="#pricing" style={{fontFamily:ins,fontSize:13,fontWeight:600,color:"#94A3B8",textDecoration:"none"}}>Pricing</a>
<a href="#faq" style={{fontFamily:ins,fontSize:13,fontWeight:600,color:"#94A3B8",textDecoration:"none"}}>FAQ</a>
<Btn href="#pricing" s={{padding:"8px 18px",fontSize:13}}>Get Started</Btn>
</div>
</div>
</nav>

{/* HERO */}
<section style={{background:`linear-gradient(170deg,${navy} 0%,#1A2332 60%,#1E293B 100%)`,padding:"120px 20px 80px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
<div style={{position:"absolute",top:"-15%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)"}}/>
<div style={{maxWidth:800,margin:"0 auto",position:"relative",zIndex:1,textAlign:"center"}}>
<Fade><div style={{display:"inline-block",fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:orange,border:"1px solid rgba(249,115,22,.2)",padding:"6px 18px",borderRadius:20,marginBottom:28,fontFamily:ins}}>Built by a $4M+ cleaning business operator</div></Fade>
<Fade d={.08}><h1 style={{fontFamily:dm,fontSize:"clamp(34px,5.5vw,54px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:-1,margin:"0 0 20px"}}>Launch a profitable cleaning{"\n"}business in <span style={{color:orange}}>30 days</span></h1></Fade>
<Fade d={.16}><p style={{fontFamily:ins,fontSize:"clamp(15px,2vw,18px)",color:"#94A3B8",lineHeight:1.75,maxWidth:560,margin:"0 auto 32px"}}>The complete system: 33 milestones, 15 scripts, 8 revenue streams, pricing calculator, operations bible, and trained VA deployment. No fluff. No theory. Just what works.</p></Fade>
<Fade d={.24}>
{!sent?<div style={{display:"flex",gap:8,maxWidth:440,margin:"0 auto",flexWrap:"wrap",justifyContent:"center"}}>
<Btn big onClick={()=>window.open('https://launchclean.kit.com/systems','_blank')}>Get the Free Guide →</Btn>
</div>
:<div style={{background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.25)",borderRadius:12,padding:"16px 24px",maxWidth:440,margin:"0 auto"}}>
<div style={{fontFamily:dm,fontSize:16,fontWeight:700,color:"#4ADE80",marginBottom:4}}>Check your inbox!</div>
<div style={{fontFamily:ins,fontSize:13,color:"#94A3B8"}}>Your free guide is on its way. Scroll down to see the full system.</div>
</div>}
<p style={{fontFamily:ins,fontSize:12,color:"#475569",marginTop:12}}>Free 25-page PDF. No spam. Unsubscribe anytime.</p>
</Fade>
<Fade d={.32}>
<div style={{display:"flex",justifyContent:"center",gap:28,marginTop:48,flexWrap:"wrap"}}>
{[["33","Milestones"],["15","Scripts"],["8","Revenue\nStreams"],["$300K+","Annual\nPotential"]].map(([n,l],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:dm,fontSize:28,fontWeight:800,color:orange}}>{n}</div><div style={{fontFamily:ins,fontSize:10,color:"#64748B",fontWeight:500,marginTop:2,whiteSpace:"pre-line"}}>{l}</div></div>)}
</div>
</Fade>
</div>
</section>

{/* SOCIAL PROOF BAR */}
<div style={{background:warmG,padding:"16px 20px",borderBottom:`1px solid ${bdr}`}}>
<div style={{maxWidth:940,margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center",gap:24,flexWrap:"wrap",fontSize:12,fontWeight:600,color:txL,fontFamily:ins}}>
<span>⭐ 4.9/5 from early users</span>
<span style={{color:bdr}}>|</span>
<span>🏢 Built from a real $4M+ cleaning business</span>
<span style={{color:bdr}}>|</span>
<span>🔒 30-day money-back guarantee</span>
</div>
</div>

{/* PROBLEM */}
<Sec bg={cream}>
<Fade>
<div style={{maxWidth:680,margin:"0 auto"}}>
<Tag>The Problem</Tag>
<H>Most cleaning businesses fail in the first year</H>
<P>Not because the owner cannot clean. Because of three things nobody talks about until it is too late:</P>
{[["Underprice to win clients","Attract price-sensitive customers who leave when someone is $5 cheaper. Margins collapse while you feel busy."],["Hire unreliable contractors","One no-show, one damaged item, one rude interaction destroys weeks of trust. Bad Google reviews are permanent."],["No system for getting clients","Post on Facebook a few times and wait. No follow-up process, no referral engine, no recurring revenue strategy. Feast or famine."]].map(([t,d],i)=>
<div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:16}}>
<div style={{width:28,height:28,borderRadius:7,background:"rgba(239,68,68,.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3,fontSize:14,color:"#EF4444",fontWeight:800}}>✕</div>
<div><div style={{fontFamily:dm,fontSize:15,fontWeight:700,color:tx,marginBottom:3}}>{t}</div><div style={{fontFamily:ins,fontSize:14,color:txL,lineHeight:1.65}}>{d}</div></div>
</div>)}
<div style={{background:"#fff",borderLeft:`3px solid ${orange}`,borderRadius:"0 10px 10px 0",padding:"16px 20px",marginTop:20}}>
<P s={{margin:0,fontSize:15,fontStyle:"italic",color:tx}}>"This system exists because I made every one of these mistakes building my own cleaning business. It took 3 years and $50K+ in lost revenue to figure out what is inside this kit."</P>
</div>
</div>
</Fade>
</Sec>

{/* VSL / VIDEO SECTION */}
<Sec bg={navy} s={{color:"#fff",textAlign:"center"}}>
<Fade><Tag>Watch: How It Works</Tag></Fade>
<Fade d={.05}><H c="#fff" center sz="clamp(24px,3.5vw,36px)">See the exact system that built a $4M cleaning business</H></Fade>
<Fade d={.1}><P c="#94A3B8" center>45 minutes. No fluff. Real numbers, real systems, real results.</P></Fade>
<Fade d={.15}>
<div style={{maxWidth:640,margin:"24px auto 0",aspectRatio:"16/9",background:"rgba(255,255,255,.04)",borderRadius:16,border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,background:"radial-gradient(circle at center,rgba(249,115,22,.08) 0%,transparent 60%)"}}/>
<div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${orange},#EA580C)`,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1,boxShadow:"0 8px 30px rgba(249,115,22,.3)"}}>
<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
</div>
</div>
<p style={{fontFamily:ins,fontSize:12,color:"#64748B",marginTop:12}}>Replace this placeholder with your recorded VSL or webinar embed</p>
</Fade>
</Sec>

{/* WHAT'S INSIDE */}
<Sec id="whats-inside">
<Fade><Tag>What You Get</Tag></Fade>
<Fade d={.05}><H>A complete business-in-a-box</H></Fade>
<Fade d={.1}><P>Not a course. A system. Interactive tools, calculators, scripts, and step-by-step checklists that you execute, not watch.</P></Fade>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginTop:28}}>
{[["🚀","33-Milestone Launch Plan","Day-by-day across 5 phases. Every milestone has 6-12 steps with time and cost estimates. Tick them off as you go. Progress saves automatically."],
["💰","Revenue Calculator","Enter costs, see per-job profit, weekly, monthly, and annual projections. Model growth scenarios before you quote a single client."],
["📝","15 Outreach + Sales Scripts","Network outreach, Facebook groups, quote responses, follow-ups, review requests, complaint handling, price increases, property manager intros, Airbnb host outreach, cancellation saves. Copy, personalise, send."],
["💎","8 Revenue Stream Playbooks","Recurring residential, property managers, Airbnb turnarounds, commercial contracts, VIP membership, referral partnerships, seasonal campaigns, NDIS services. Each with step-by-step implementation and revenue targets."],
["⚙️","Operations Bible","Booking Koala + Stripe setup, WhatsApp team structure (4 groups), Google Sheets templates, SOP documentation, trained VA deployment. The system that runs without you."],
["📊","Exit Strategy","Client lifecycle (5 stages), LTV maximisation framework, 8 exit metrics tracked from day one. Build a business worth 2-3x annual revenue."]].map(([ic,t,d],i)=>
<Fade key={i} d={.04*i}><div style={{background:warmG,borderRadius:14,padding:"22px",border:`1px solid ${bdr}`}}>
<div style={{fontSize:26,marginBottom:10}}>{ic}</div>
<div style={{fontFamily:dm,fontSize:15,fontWeight:700,color:tx,marginBottom:6}}>{t}</div>
<div style={{fontFamily:ins,fontSize:13,color:txL,lineHeight:1.65}}>{d}</div>
</div></Fade>)}
</div>
</Sec>

{/* REVENUE STREAMS */}
<Sec bg={navy}>
<Fade><Tag>Revenue Architecture</Tag></Fade>
<Fade d={.05}><H c="#fff">One cleaning business. Eight revenue streams.</H></Fade>
<Fade d={.1}><P c="#94A3B8" s={{maxWidth:600}}>Stack multiple income sources from the same client base and team. This is how you build a business worth 3x more than a single-service operation.</P></Fade>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,marginTop:28}}>
{[["🔄","Recurring Residential","$4,680/yr each"],["🏠","Property Managers","$2K-8K/mo"],["✈️","Airbnb Turnarounds","$11K+/mo"],["🏢","Commercial Contracts","$500-5K/mo"],["⭐","VIP Membership","+20-30% premium"],["🤝","Referral Partners","$13K+/yr passive"],["📅","Seasonal Campaigns","$20K+/yr"],["🎓","NDIS Services","$55-70/hr"]].map(([ic,t,r],i)=>
<Fade key={i} d={.03*i}><div style={{background:"rgba(255,255,255,.04)",borderRadius:11,padding:"16px",border:"1px solid rgba(255,255,255,.06)"}}>
<div style={{fontSize:22,marginBottom:6}}>{ic}</div>
<div style={{fontFamily:dm,fontSize:12.5,fontWeight:700,color:"#fff",marginBottom:3}}>{t}</div>
<div style={{fontFamily:ins,fontSize:11.5,fontWeight:600,color:orange}}>{r}</div>
</div></Fade>)}
</div>
<Fade d={.3}><div style={{background:"rgba(249,115,22,.07)",borderRadius:14,padding:"22px",textAlign:"center",marginTop:28,border:"1px solid rgba(249,115,22,.12)"}}>
<div style={{fontFamily:ins,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#FDBA74",marginBottom:4}}>Combined annual potential</div>
<div style={{fontFamily:dm,fontSize:42,fontWeight:800,color:orange}}>$300K - $500K+</div>
<div style={{fontFamily:ins,fontSize:13,color:"#64748B",marginTop:4}}>From a single local cleaning business with 2-3 contractors</div>
</div></Fade>
</Sec>

{/* CASE STUDY */}
<Sec bg={cream}>
<Fade><div style={{maxWidth:680,margin:"0 auto"}}>
<Tag>Real Numbers</Tag>
<H>$280 startup to $4,200/month in 14 weeks</H>
<P>Western Sydney. No van, no team, no experience. Just the system executed consistently.</P>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,margin:"20px 0"}}>
{[["$280","Startup"],["$1,050","Month 1"],["$4,200","Month 3"],["32%","Margin"]].map(([n,l],i)=>
<div key={i} style={{background:"#fff",borderRadius:10,padding:"14px 10px",textAlign:"center",border:`1px solid ${bdr}`}}>
<div style={{fontFamily:dm,fontSize:20,fontWeight:800,color:orange}}>{n}</div>
<div style={{fontFamily:ins,fontSize:9,fontWeight:600,color:txL,textTransform:"uppercase",letterSpacing:1,marginTop:2}}>{l}</div>
</div>)}
</div>
<P s={{fontSize:14}}>7 recurring clients, 11 Google reviews at 4.9 stars, first contractor hired. Built on three things: proper pricing, consistent follow-up, and relentless review collection.</P>
</div></Fade>
</Sec>

{/* OPERATIONS / MANAGED SERVICE PREVIEW */}
<Sec>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
<Fade><div>
<Tag>For Growing Businesses</Tag>
<H sz={28}>Managed Operations Service</H>
<P>Already past $5K/month? We manage your entire operations layer so you can focus on growth. Scheduling, customer service, review collection, contractor pay, and weekly reporting. All handled by our trained team.</P>
<div style={{display:"flex",flexDirection:"column",gap:6,marginTop:16}}>
{["All booking management via your system","Enquiry response within 2 hours","Google review collection after every job","Contractor pay processing weekly","Weekly performance dashboard","Monthly strategy call with your ops manager"].map((f,i)=>
<div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
<span style={{color:orange,fontWeight:700,fontSize:12,marginTop:2}}>✓</span>
<span style={{fontFamily:ins,fontSize:14,color:tx,lineHeight:1.5}}>{f}</span>
</div>)}
</div>
<div style={{marginTop:20}}>
<Btn outline href="#pricing">Learn More →</Btn>
</div>
</div></Fade>
<Fade d={.1}><div style={{background:navy,borderRadius:16,padding:"24px"}}>
<div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:orange,textTransform:"uppercase",fontFamily:ins,marginBottom:6}}>Operations Stack</div>
{[{ic:"📅",t:"Booking Koala + Stripe",d:"Online bookings, auto payments, cleaner notifications"},{ic:"💬",t:"WhatsApp Team System",d:"4 groups: Ops HQ, Team, Reviews, Accounts"},{ic:"📊",t:"Google Sheets Tracking",d:"Job tracker, contractor pay, weekly dashboard"},{ic:"🌏",t:"Trained VA Team",d:"Pre-trained on your systems. Operational in 48 hours."}].map((item,i)=>
<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
<div style={{fontSize:18}}>{item.ic}</div>
<div><div style={{fontFamily:dm,fontSize:13,fontWeight:700,color:"#fff"}}>{item.t}</div><div style={{fontFamily:ins,fontSize:11.5,color:"#94A3B8",marginTop:1}}>{item.d}</div></div>
</div>)}
</div></Fade>
</div>
</Sec>

{/* PRICING */}
<Sec id="pricing" bg={warmG}>
<Fade><div style={{textAlign:"center"}}><Tag>Pricing</Tag></div></Fade>
<Fade d={.05}><H center>Choose your launch speed</H></Fade>
<Fade d={.1}><P center>Every tier includes the core system. The question is how much support and speed you want.</P></Fade>

{/* Payment toggle */}
<Fade d={.15}><div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
<div style={{display:"flex",background:"#fff",borderRadius:10,padding:3,border:`1px solid ${bdr}`}}>
<button onClick={()=>setPlan("once")} style={{padding:"8px 20px",borderRadius:8,border:"none",fontSize:13,fontWeight:650,cursor:"pointer",fontFamily:ins,background:plan==="once"?navy:"transparent",color:plan==="once"?"#fff":txL}}>Pay Once</button>
<button onClick={()=>setPlan("split")} style={{padding:"8px 20px",borderRadius:8,border:"none",fontSize:13,fontWeight:650,cursor:"pointer",fontFamily:ins,background:plan==="split"?navy:"transparent",color:plan==="split"?"#fff":txL}}>Payment Plan</button>
</div>
</div></Fade>

<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14,alignItems:"start"}}>
{tiers.map((t,i)=>
<Fade key={i} d={.08*i}><div style={{background:t.pop?navy:"#fff",borderRadius:16,padding:"26px 22px",border:t.pop?`2px solid ${orange}`:`1px solid ${bdr}`,position:"relative",overflow:"hidden",boxShadow:t.pop?"0 8px 30px rgba(15,23,42,.15)":"0 1px 3px rgba(0,0,0,.05)"}}>
{t.pop&&<div style={{position:"absolute",top:12,right:-30,background:orange,color:"#fff",fontSize:9,fontWeight:700,padding:"4px 36px",transform:"rotate(45deg)",fontFamily:ins,letterSpacing:1}}>POPULAR</div>}
<div style={{fontFamily:ins,fontSize:11,fontWeight:700,color:t.pop?"#FDBA74":orange,textTransform:"uppercase",letterSpacing:2,marginBottom:4}}>{t.tag}</div>
<div style={{fontFamily:dm,fontSize:16,fontWeight:700,color:t.pop?"#fff":tx,marginBottom:4}}>{t.name}</div>
<div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
{plan==="split"&&t.payPlan?<>
<span style={{fontFamily:dm,fontSize:36,fontWeight:800,color:t.pop?"#fff":tx}}>${t.payPlan.amt}</span>
<span style={{fontFamily:ins,fontSize:13,color:t.pop?"#64748B":txL}}>× {t.payPlan.n} payments</span>
</>:<>
<span style={{fontFamily:dm,fontSize:36,fontWeight:800,color:t.pop?"#fff":tx}}>${t.price}</span>
<span style={{fontFamily:ins,fontSize:13,color:t.pop?"#64748B":txL}}>one-time</span>
</>}
</div>
{plan==="split"&&t.payPlan&&<div style={{fontFamily:ins,fontSize:11,color:t.pop?"#475569":txL,marginBottom:8}}>or ${t.price} one-time (save ${(t.payPlan.amt*t.payPlan.n)-t.price})</div>}

<div style={{marginTop:12,marginBottom:18}}>
{t.feat.map((f,fi)=><div key={fi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
<svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:2}}><path d="M3 8.5L6 11.5L13 4.5" stroke={t.pop?"#4ADE80":"#16A34A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
<span style={{fontFamily:ins,fontSize:12.5,color:t.pop?"#CBD5E1":tx,lineHeight:1.4}}>{f}</span>
</div>)}
{t.not.map((f,fi)=><div key={fi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7,opacity:.35}}>
<svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:2}}><path d="M4 4L12 12M12 4L4 12" stroke={t.pop?"#64748B":"#94A3B8"} strokeWidth="2" strokeLinecap="round"/></svg>
<span style={{fontFamily:ins,fontSize:12.5,color:t.pop?"#475569":"#94A3B8",lineHeight:1.4}}>{f}</span>
</div>)}
</div>

<Btn big={t.pop} outline={!t.pop&&i===0} s={{width:"100%",justifyContent:"center"}} onClick={()=>window.open(t.link,'_blank')}>{t.cta}</Btn>
{i===2&&<p style={{fontFamily:ins,fontSize:10,color:"#64748B",textAlign:"center",marginTop:8}}>Application required. Limited spots.</p>}
</div></Fade>)}
</div>

{/* Order bump */}
<Fade d={.4}><div onClick={()=>window.open('https://buy.stripe.com/5kQaEW4MgfQCc9o6JybQY01','_blank')} style={{maxWidth:600,margin:"24px auto 0",background:"#fff",borderRadius:14,padding:"18px 22px",border:`2px dashed ${orange}`,display:"flex",gap:14,alignItems:"flex-start",cursor:"pointer"}}>
<div style={{width:22,height:22,borderRadius:6,border:`2px solid ${orange}`,flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
<div style={{width:12,height:12,borderRadius:3,background:orange}}/>
</div>
<div>
<div style={{fontFamily:dm,fontSize:14,fontWeight:700,color:tx}}>Add the Property Manager Outreach Kit <span style={{color:orange}}>+$37</span></div>
<div style={{fontFamily:ins,fontSize:12,color:txL,marginTop:3,lineHeight:1.55}}>5 email templates, introduction scripts, bond-back guarantee framework, and a monthly reporting template for property managers. This kit alone can generate $2K-8K/month per agency relationship.</div>
</div>
</div></Fade>

<Fade d={.45}><div style={{textAlign:"center",marginTop:20}}>
<p style={{fontFamily:ins,fontSize:13,color:txL}}>All tiers include a <strong>30-day money-back guarantee</strong>.</p>
</div></Fade>
</Sec>

{/* WHO IT'S FOR */}
<Sec>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:28}}>
<Fade><div>
<Tag>This Is For You If</Tag>
{["You want to start a cleaning business but do not know where to begin","You have started but are not making consistent money","You want systems, not motivational fluff","You want to skip 12 months of trial and error","You want to build a business that runs without you","You are in Australia (or willing to adapt the legal bits)"].map((x,i)=>
<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
<div style={{width:18,height:18,borderRadius:5,background:"#F0FDF4",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3}}>
<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
</div>
<span style={{fontFamily:ins,fontSize:14.5,color:tx,lineHeight:1.5}}>{x}</span>
</div>)}
</div></Fade>
<Fade d={.1}><div>
<Tag>This Is NOT For You If</Tag>
{["You want to get rich quick without work","You are looking for a franchise with brand recognition","You want 40 hours of video lectures","You are not willing to follow a plan","You expect clients to find you without outreach"].map((x,i)=>
<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
<div style={{width:18,height:18,borderRadius:5,background:"rgba(239,68,68,.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3}}>
<svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>
</div>
<span style={{fontFamily:ins,fontSize:14.5,color:tx,lineHeight:1.5}}>{x}</span>
</div>)}
</div></Fade>
</div>
</Sec>

{/* FAQ */}
<Sec id="faq" bg={warmG}>
<Fade><div style={{textAlign:"center"}}><Tag>FAQ</Tag></div></Fade>
<Fade d={.05}><H center>Common questions</H></Fade>
<div style={{maxWidth:700,margin:"20px auto 0"}}>
{faqs.map(([q,a],i)=>
<Fade key={i} d={.02*i}><div style={{borderBottom:`1px solid ${bdr}`}}>
<button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",background:"none",border:"none",cursor:"pointer",fontFamily:dm,fontSize:15,fontWeight:600,color:tx,textAlign:"left"}}>
{q}
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{flexShrink:0,marginLeft:12,transform:faq===i?"rotate(180deg)":"none",transition:"transform .2s"}}><path d="M4 7L9 12L14 7" stroke={txL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
</button>
{faq===i&&<div style={{paddingBottom:16}}><P s={{margin:0,fontSize:14}}>{a}</P></div>}
</div></Fade>)}
</div>
</Sec>

{/* FINAL CTA */}
<section style={{background:`linear-gradient(170deg,${navy} 0%,#1A2332 100%)`,padding:"80px 20px",textAlign:"center",position:"relative"}}>
<div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
<div style={{maxWidth:600,margin:"0 auto",position:"relative",zIndex:1}}>
<Fade>
<h2 style={{fontFamily:dm,fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#fff",lineHeight:1.12,marginBottom:14}}>Stop researching.{"\n"}Start <span style={{color:orange}}>building</span>.</h2>
<P c="#94A3B8" center>Every week you spend planning is a week you could have been earning. The system is ready. The scripts are written. The checklists are built.</P>
<div style={{marginTop:24}}><Btn big href="#pricing">Get Started Today →</Btn></div>
<p style={{fontFamily:ins,fontSize:12,color:"#475569",marginTop:14}}>30-day money-back guarantee on all tiers</p>
</Fade>
</div>
</section>

{/* FOOTER */}
<footer style={{background:navy,padding:"28px 20px",borderTop:"1px solid rgba(255,255,255,.05)"}}>
<div style={{maxWidth:940,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<svg width="24" height="15" viewBox="-155 -105 330 210" fill="none"><path d="M-150,-100 V100 H-30 v-40 H-110 v-160Z" fill="#64748B"/><path d="M-10,-100 H110 V100 H-10 v-40 H70 v-120 H-10Z" fill="#64748B"/><circle cx="150" cy="0" r="20" fill="#F97316"/></svg>
<span style={{fontFamily:dm,fontWeight:700,fontSize:14,color:"#64748B"}}>Launch Clean</span>
</div>
<div style={{fontFamily:ins,fontSize:11,color:"#475569"}}>ABN [Your ABN] | Fully Insured | <a href="#" style={{color:"#64748B"}}>Terms</a> | <a href="#" style={{color:"#64748B"}}>Privacy</a> | <a href="#" style={{color:"#64748B"}}>Refund Policy</a></div>
</div>
</footer>

</div>);
}
