import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQHeader } from "./faq-header";
export const FAQSection = () => {
  const faqs = [
    {
      id: "1",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            What is HELIX?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          HELIX combines the best of TradFi and DeFi in a comprehensive and
          holistic solution. HELIX issues USHD, a dollar-pegged stablecoin,
          collateralized by Real World Assets (RWAs) such as US Treasury Bills
          and Money Market Funds, integrating the safety and security of
          off-chain RWAs with the composability, liquidity, and versatility of
          DeFi through USHD.
        </span>
      ),
    },
    {
      id: "2",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            Why choose HELIX?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          Unlike other stablecoin issuers, HELIX provides access to the full
          stablecoin value stack. From the yield provided by the underlying RWAs
          that collateralize the USHD stablecoin, to risk-adjusted private
          credit growth opportunities.
        </span>
      ),
    },
    {
      id: "3",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            How is Helix different?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          Begin with an institutional mindset. With over 80 years of combined
          experience at some of the world’s largest financial institutions,
          HELIX knows how to develop and deploy institutional-grade products, to
          combine the versatility and flexibility of DeFi, with the safety and
          security of TradFi. <br /> Why settle?
          <br /> Get the best of both worlds. You deserve the
          institutional-grade safety of TradFi and the composability of a fully
          integrated DeFi solution.
        </span>
      ),
    },
    {
      id: "4",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">What is</span>{" "}
          <span className="text-accent">USHD</span>?
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          USHD is a dollar-pegged stablecoin, backed 1:1 by Real World Assets
          (RWAs) such as US Treasury Bills and/or Money Market Funds. USHD will
          initially be made available on the Ethereum blockchain network, and
          will be fully accessible within the DeFi ecosystem. USHD will be
          rolled out in phases to support other blockchains as well, providing a
          safe and secure dollar-equivalent.
        </span>
      ),
    },
    {
      id: "5",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            How do I receive yield
          </span>
          ?
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          Because HELIX provides full access to the RWA stack, there are NO
          LOCK-UPS for USHD if all you’re looking for is the base level of yield
          our RWAs currently deliver. Base yield for USHD tracks US Treasury
          Bills and Money Market Funds, simply: <br />
          <br />
          1. Stake USHD. <br />
          2. Receive additional USHD as yield that tracks the underlying RWAs.
          <br />
          3. Unstake at any time, with no lock-ups, and no early withdrawal
          penalties. <br />
          <br />
          It’s that simple. <br />A spendable yield option in your wallet.
        </span>
      ),
    },
  ];

  return (
    <section
      id="faq"
      className="w-full bg-white dark:bg-helix-black overflow-hidden"
    >
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col />
          <col className="w-[90%] xl:w-[1000px]" />
          <col />
        </colgroup>
        <tbody>
          {/* Row 1: Empty */}
          <tr>
            <td className="border border-t-0 border-helix-border-light dark:border-helix-blue/60 p-4"></td>
            <td className="border border-t-0 border-helix-border-light dark:border-helix-blue/60 p-4"></td>
            <td className="border border-t-0 border-helix-border-light dark:border-helix-blue/60 p-4"></td>
          </tr>

          {/* Row 2: Header in middle column */}
          <tr>
            <td className="border border-helix-border-light dark:border-helix-blue/60 p-4"></td>
            <td className="border border-helix-border-light dark:border-helix-blue/60 p-4">
              <div className="absolute w-[1px] h-28 translate-x-[-16px] translate-y-[50px] bg-helix-blue"></div>
              <FAQHeader
                badgeText="You ask, we answer"
                titleText="Frequently Asked Questions"
                titleText2="Find the answers you need to confidently navigate and succeed with Helix"
              />
            </td>
            <td className="border border-helix-border-light dark:border-helix-blue/60 p-4"></td>
          </tr>

          {/* Row 3: Image | FAQ | Image */}
          <tr>
            <td className="border border-helix-border-light dark:border-helix-blue/60 relative">
              <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
                aria-hidden="true"
              />
            </td>
            <td className="items-start relative flex dark:bg-helix-blue/20 justify-start p-6">
              <div className="absolute w-[1px] h-28 right-0 translate-y-[5px] bg-helix-blue"></div>
              <div className="w-[97%] xl:max-w-[1000px] mx-auto">
                <Accordion type="multiple" className="w-full px-2 md:px-6">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={` border-b border-helix-border-light dark:border-helix-blue/60 pb-6 flex flex-col`}
                    >
                      <AccordionTrigger className="text-left  pb-4 flex-shrink-0  ">
                        <span className="text-base font-semibold  leading-tight">
                          {faq.id}. {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm pb-0  flex-1 overflow-hidden ">
                        <div className="w-[95%] flex items-start">
                          <p className="leading-relaxed ">{faq.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </td>
            <td className="border border-helix-border-light dark:border-helix-blue/60 relative">
              <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
                aria-hidden="true"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
