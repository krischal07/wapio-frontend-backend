import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg whitespace-pre-line max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Monthly</span>
        <Label>
          <Switch
            ref={switchRef}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
            className="relative"
          />
        </Label>
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Annual <span className="text-green-600 font-semibold hidden sm:inline">(Save 20%)</span><span className="text-green-600 font-semibold sm:hidden">(-20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className={cn(
              "rounded-2xl border p-4 sm:p-6 bg-white text-center flex flex-col justify-between relative",
              plan.isPopular ? "border-green-500 border-2 shadow-xl" : "border-gray-200",
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-green-600 py-0.5 px-2 sm:px-3 rounded-bl-xl rounded-tr-xl flex items-center gap-1">
                <Star className="text-white h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                <span className="text-white text-[10px] sm:text-xs font-semibold">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-600 uppercase tracking-wide">
                {plan.name}
              </p>
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-x-1 sm:gap-x-2">
                {plan.price === "Custom" ? (
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                      <NumberFlow
                        value={
                          isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                        }
                        format={{
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        formatter={(value) => `₹${value}`}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                        className="tabular-nums"
                      />
                    </span>
                    {plan.period && (
                      <span className="text-xs sm:text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        / {plan.period}
                      </span>
                    )}
                  </>
                )}
              </div>

              {plan.price !== "Custom" && (
                <p className="text-[10px] sm:text-xs leading-5 text-gray-500 mt-1">
                  {isMonthly ? "billed monthly" : "billed annually"}
                </p>
              )}

              <ul className="mt-6 sm:mt-8 gap-2 sm:gap-3 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-left">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4 sm:my-6 border-gray-200" />

              <a
                href={plan.href}
                className={cn(
                  "relative px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-lg border-2 border-black transition-all hover:translate-x-[4px] hover:translate-y-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer text-center",
                  plan.isPopular
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-900"
                )}
              >
                {plan.buttonText}
              </a>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs leading-5 text-gray-500">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
