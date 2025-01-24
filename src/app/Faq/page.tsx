import React from 'react'


function page() {
  return (
    <div>
        {/* FAQ Section */}
        <div className="flex-1">
                    
                    <h1 className="text-[50px] text-center font-bold font-xl mt-4">FAQs</h1>
                    {/* FAQs */}
                    <p className="text-[12px] font-bold mt-2 xl:text-[16px] lg:text-[14px]">
                        Does my card need international purchases enabled?
                    </p>
                    <p className="text-[12px] mt-2 xl:text-[16px] lg:text-[14px]">
                        Yes, we recommend asking your bank to enable international purchases on your card.You will be notified at checkout if international purchases need to be enabled.
                    </p>
                    <p className="text-[12px] mt-2 xl:text-[16px] lg:text-[14px]">Please note, some banks may charge a small transaction fee for international orders.</p>

                    <p className="text-[12px] font-bold mt-4 xl:text-[16px] lg:text-[14px]">Can I pay for my order with multiple methods?</p>
                    <p className="text-[12px] mt-2 xl:text-[16px] lg:text-[14px]">No, payment for Nike orders cant be split between multiple payment methods.</p>

                    <p className="text-[12px] font-bold mt-4 xl:text-[16px] lg:text-[14px]">What payment method is accepted for SNKRS orders?</p>
                    <p className="text-[12px] mt-2 xl:text-[16px] lg:text-[14px]">You can use any accepted credit card to pay for your SNKRS order.</p>

                    <p className="text-[12px] font-bold mt-4 xl:text-[16px] lg:text-[14px]">Why dont I see Apple Pay as an option?</p>
                    <p className="text-[12px] mt-2 xl:text-[16px] lg:text-[14px]">To see Apple Pay as an option in the Nike App or on Nike.com, youll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, youll need to use Safari to use Apple Pay on Nike.com.</p>

                    <p className="text-[12px] mt-4 xl:text-[16px] lg:text-[14px]">Was this answer helpful?</p>
                    <div className="flex gap-2 items-center mt-1">
                        
                    </div>
                    <p className="text-[12px] text-[#757575] mt-4 xl:text-[14px]">RELATED</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="text-[12px] ml-4 font-medium underline xl:text-[14px] lg:text-[14px lg:text-[14px]]">WHAT ARE NIKE&apos;s DELIVERY OPTIONS?</p>
                        <p className="text-[12px] ml-4 font-medium underline xl:text-[14px] lg:text-[14px lg:text-[14px]]">HOW DO I GET FREE DELIVERY ON NIKE ORDERS?</p>
                    </div>


                </div>
    </div>
  )
}

export default page
