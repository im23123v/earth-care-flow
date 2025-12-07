import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Vishwanath",
      role: "Environmental Activist",
      quote: "EcoRecycle has transformed how our community handles e-waste. Their pickup service is incredibly convenient and reliable!",
      avatar: "V",
    },
    {
      name: "Amrutha",
      role: "Tech Professional",
      quote: "I was amazed at how easy it was to recycle my old devices. The rewards system is a great incentive to do the right thing.",
      avatar: "A",
    },
    {
      name: "Vinay",
      role: "Business Owner",
      quote: "As a business, managing e-waste was challenging. EcoRecycle made it seamless with their corporate solutions.",
      avatar: "V",
    },
    {
      name: "Sindhuja",
      role: "College Student",
      quote: "The educational resources helped me understand the impact of e-waste. Now I encourage all my friends to recycle responsibly!",
      avatar: "S",
    },
    {
      name: "SaiTeja",
      role: "Software Engineer",
      quote: "Tracking my recycling impact through their platform is motivating. It feels good knowing my old gadgets are being handled responsibly.",
      avatar: "S",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from people making a difference with EcoRecycle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 hover:shadow-eco transition-all duration-300 animate-fade-in relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
