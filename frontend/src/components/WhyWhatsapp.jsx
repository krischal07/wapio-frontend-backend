import React from 'react'

const WhyWhatsapp = () => {
    const stats = [
        {
            percentage: "85%",
            metric: "Higher Response Rate",
            description: "WhatsApp messages get 85% higher response rates compared to email"
        },
        {
            percentage: "3X",
            metric: "Higher ROI",
            description: "Generate 3 times more return on investment with WhatsApp marketing"
        },
        {
            percentage: "4X",
            metric: "Lower Customer Acquisition",
            description: "Acquire customers at 4 times lower cost through WhatsApp campaigns"
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
                    {/* Left Side - Description */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 leading-tight">
                            WhatsApp outperforms Email, SMS and other digital channels with...
                        </h2>
                    </div>

                    {/* Right Side - Statistics */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-3 sm:mb-4">
                                    <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-semibold text-gray-900 block">
                                        {stat.percentage}
                                    </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                                    {stat.metric}
                                </h3>
                                {/* <p className="text-sm text-gray-700 leading-relaxed">
                                    {stat.description}
                                </p> */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Information */}
                {/* <div className="mt-16 text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Why Leading Businesses Choose WhatsApp
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">2B+</div>
                                <p className="text-gray-700">Daily Active Users</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                                <p className="text-gray-700">Open Rate</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">90%</div>
                                <p className="text-gray-700">Read Within 3 Minutes</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default WhyWhatsapp