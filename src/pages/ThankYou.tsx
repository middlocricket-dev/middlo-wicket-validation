import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { CheckCircle2, ArrowRight, Users, Target, Building2 } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "batsman";

  const messages = {
    batsman: {
      title: "You're on the waitlist!",
      subtitle: "We're building MIDDLO for cricketers like you.",
      icon: Users,
      nextSteps: [
        "We'll notify you when we launch in your city",
        "Early users get priority access",
        "Share with your cricket buddies for faster launch",
      ],
    },
    bowler: {
      title: "Welcome to the bowler network!",
      subtitle: "Get ready to earn by doing what you love.",
      icon: Target,
      nextSteps: [
        "We'll review your profile",
        "You'll be among our first supply partners",
        "Set your rates and start earning soon",
      ],
    },
    academy: {
      title: "Partnership request received!",
      subtitle: "Let's fill those empty net hours together.",
      icon: Building2,
      nextSteps: [
        "Our team will reach out within 48 hours",
        "We'll discuss partnership terms",
        "Get listed before your competitors",
      ],
    },
  };

  const content = messages[userType as keyof typeof messages] || messages.batsman;
  const Icon = content.icon;

  return (
    <section className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="max-w-lg w-full text-center animate-scale-in">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.subtitle}
            </p>
          </div>

          <div className="card-elevated p-6 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary" />
              What happens next?
            </h3>
            <ul className="space-y-3">
              {content.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Follow us for updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
