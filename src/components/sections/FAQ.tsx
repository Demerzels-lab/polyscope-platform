import { ChevronDown } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

const faqs = [
  { q: "What is PolyScope?", a: "PolyScope is an AI-powered analytics platform that evaluates Polymarket traders based on their wallet addresses. It provides comprehensive performance metrics, risk assessments, and data-driven recommendations." },
  { q: "How is the Follow Score calculated?", a: "The Follow Score (0-100) combines five key metrics: Consistency (30%), Risk Management (25%), Accuracy (25%), Volatility (10%), and Discipline (10%)." },
  { q: "Is it free to use?", a: "Yes, the basic wallet analysis feature is completely free. Simply enter a Polymarket wallet address to generate a report." },
  { q: "Does it work with any wallet?", a: "PolyScope analyzes any Ethereum wallet address (0x...) that has active trading history on Polymarket." },
  { q: "How often is data updated?", a: "Data is fetched in real-time from the Polymarket API whenever you run an analysis." },
];

export function FAQ() {
  return (
    <section className="py-24 px-4 bg-black/20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
        
        <AccordionPrimitive.Root type="single" collapsible className="space-y-4">
          {faqs.map((item, i) => (
            <AccordionPrimitive.Item key={i} value={`item-${i}`} className="group border border-white/10 rounded-xl bg-white/5 overflow-hidden data-[state=open]:border-primary/30">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 px-6 font-medium transition-all text-left text-white hover:text-primary [&[data-state=open]>svg]:rotate-180">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-4 pt-0 px-6 text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}