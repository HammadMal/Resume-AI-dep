import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const Marquee = ({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = "",
}) => {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={`flex min-w-full gap-4`}
        style={{
          transform: `translateX(${direction === "left" ? "-" : ""}${isPaused ? contentWidth / 4 : 0}px)`,
          animation: `scroll-${direction} ${contentWidth / speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <div ref={contentRef} className="flex gap-4 shrink-0">
          {children}
        </div>
        <div className="flex gap-4 shrink-0">{children}</div>
      </div>

      <style>
        {`
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

const ReviewCard = ({ avatar, name, rating, review }) => (
  <div className="w-80 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-white">{name}</h3>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-sm text-white/70">{review}</p>
  </div>
);

// Demo Component
const MarqueeDemo = () => {
  const reviews = [
    {
      id: 1,
      name: "Ahtisham Uddin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      review:
        "ResumeAI completely transformed my job search! The AI analysis helped me optimize my resume for ATS systems, and I got called for interviews at companies that previously ignored me.",
    },
    {
      id: 2,
      name: "Hammad Malik",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      review:
        "Great value for money. The keyword matching feature helped me tailor my resume for each application, and my callback rate has doubled since using ResumeAI.",
    },
    {
      id: 3,
      name: "Azka Nasir",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 5,
      review:
        "Absolutely love ResumeAI! The feedback was detailed and actionable. I implemented the suggestions and landed my dream job at a tech company within two weeks!",
    },
    {
      id: 4,
      name: "Fatima Faisal",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4,
      review:
        "Very impressed with the quality of analysis. ResumeAI spotted issues I never would have noticed and provided clear guidance on how to fix them. Highly recommend!",
    },
  ];

  return (
    <section id="Reviews" className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes and landed their dream jobs with ResumeAI.
          </p>
        </div>
        
        <Marquee direction="left" className="py-4" speed={30}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              avatar={review.avatar}
              name={review.name}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeDemo;