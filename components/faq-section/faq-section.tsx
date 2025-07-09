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
            What is StreamVibe?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
        </span>
      ),
    },
    {
      id: "2",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            How much does StreamVibe cost?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          StreamVibe is free to use. You can sign up for a free account and start watching your favorite movies and shows right away.
        </span>
      ),
    },
    {
      id: "3",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            What content is available on StreamVibe?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          StreamVibe offers a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
        </span>
      ),
    },
    {
      id: "4",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            How can I watch StreamVibe?
          </span>{" "}
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          StreamVibe is available on all major streaming platforms, including Netflix, Amazon Prime, Hulu, and more. You can also watch StreamVibe on your smart TV, phone, tablet, or computer.
        </span>
      ),
    },
    {
      id: "5",
      question: (
        <>
          <span className="text-helix-blue dark:text-white">
            How do I sign up for StreamVibe
          </span>
          ?
        </>
      ),
      answer: (
        <span className="text-helix-blue dark:text-white text-sm font-normal leading-tight">
          To sign up for StreamVibe, simply create an account on our website. Once you have an account, you can start watching your favorite movies and shows right away.
        </span>
      ),
    },
  ];

  return (
    <section
      id="faq"
      className="w-full bg-white dark:bg-[#0F0F0F] overflow-hidden"
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
            <td className="border border-t-0 border-helix-border p-4"></td>
            <td className="border border-t-0 border-helix-border p-4"></td>
            <td className="border border-t-0 border-helix-border p-4"></td>
          </tr>

          {/* Row 2: Header in middle column */}
          <tr>
            <td className="border border-helix-border p-4"></td>
            <td className="border border-helix-border p-4">
              <div className="absolute w-[1px] h-28 translate-x-[-16px] translate-y-[50px] bg-[#E50000]"></div>
              <FAQHeader
                badgeText="You ask, we answer"
                titleText="Frequently Asked Questions"
                titleText2="Find the answers you need to confidently navigate and succeed with StreamVibe"
              />
            </td>
            <td className="border border-helix-border p-4"></td>
          </tr>

          {/* Row 3: Image | FAQ | Image */}
          <tr>
            <td className="border border-helix-border relative">
              <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
                aria-hidden="true"
              />
            </td>
            <td className="items-start relative flex dark:bg-[#1A1A1A] justify-start p-6">
              <div className="absolute w-[1px] h-28 right-0 translate-y-[5px] bg-[#E50000]"></div>
              <div className="w-[97%] xl:max-w-[1000px] mx-auto">
                <Accordion type="multiple" className="w-full px-2 md:px-6">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={` border-b border-helix-border pb-6 flex flex-col`}
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
            <td className="border border-helix-border relative">
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
