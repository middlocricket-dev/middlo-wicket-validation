import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { saveSubmission, BatsmanFormData } from "@/lib/storage";
import { z } from "zod";

const batsmanSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  city: z.string().min(1, "Please select a city"),
  playingLevel: z.string().min(1, "Please select your level"),
  currentBookingMethod: z.string().min(1, "Please select a method"),
  biggestProblem: z.string().min(10, "Please describe your problem (min 10 characters)").max(500),
  willingnessToPay: z.string().min(1, "Please select a range"),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
});

interface BatsmanFormProps {
  onBack: () => void;
}

export const BatsmanForm = ({ onBack }: BatsmanFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    playingLevel: "",
    currentBookingMethod: "",
    biggestProblem: "",
    willingnessToPay: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = batsmanSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const submission: BatsmanFormData = {
      type: 'batsman',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    saveSubmission(submission);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate('/thank-you?type=batsman');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const painPoints = [
    "🎯 Finding quality bowlers for practice",
    "📅 Booking nets at convenient times",
    "💰 Unclear or inconsistent pricing",
    "⏰ Last-minute cancellations",
  ];

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="animate-slide-up">
          {/* Pain points */}
          <div className="mb-8 p-6 rounded-xl bg-accent/10 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-4">Sound familiar?</h3>
            <ul className="space-y-2">
              {painPoints.map((point, i) => (
                <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Help us build this for you
            </h1>
            <p className="text-muted-foreground">
              Share your experience. We'll notify you when we launch in your city.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 card-elevated p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select value={formData.city} onValueChange={(v) => updateField("city", v)}>
                <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="noida">Noida</SelectItem>
                  <SelectItem value="gurgaon">Gurgaon</SelectItem>
                  <SelectItem value="faridabad">Faridabad</SelectItem>
                  <SelectItem value="ghaziabad">Ghaziabad</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="playingLevel">Playing Level *</Label>
              <Select value={formData.playingLevel} onValueChange={(v) => updateField("playingLevel", v)}>
                <SelectTrigger className={errors.playingLevel ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (Just started)</SelectItem>
                  <SelectItem value="club">Club Level</SelectItem>
                  <SelectItem value="district">District Level</SelectItem>
                  <SelectItem value="state">State Level</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              {errors.playingLevel && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.playingLevel}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentBookingMethod">How do you currently book practice sessions? *</Label>
              <Select value={formData.currentBookingMethod} onValueChange={(v) => updateField("currentBookingMethod", v)}>
                <SelectTrigger className={errors.currentBookingMethod ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp groups</SelectItem>
                  <SelectItem value="phone">Direct phone calls</SelectItem>
                  <SelectItem value="walkin">Walk-in at academy</SelectItem>
                  <SelectItem value="app">Other apps/websites</SelectItem>
                  <SelectItem value="friends">Through friends</SelectItem>
                </SelectContent>
              </Select>
              {errors.currentBookingMethod && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.currentBookingMethod}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="biggestProblem">What's your biggest problem when booking practice? *</Label>
              <Textarea
                id="biggestProblem"
                placeholder="Tell us about your frustrations..."
                value={formData.biggestProblem}
                onChange={(e) => updateField("biggestProblem", e.target.value)}
                className={errors.biggestProblem ? "border-destructive" : ""}
                rows={3}
              />
              {errors.biggestProblem && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.biggestProblem}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="willingnessToPay">How much would you pay per hour for quality practice? *</Label>
              <Select value={formData.willingnessToPay} onValueChange={(v) => updateField("willingnessToPay", v)}>
                <SelectTrigger className={errors.willingnessToPay ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200-400">₹200 - ₹400</SelectItem>
                  <SelectItem value="400-600">₹400 - ₹600</SelectItem>
                  <SelectItem value="600-800">₹600 - ₹800</SelectItem>
                  <SelectItem value="800-1000">₹800 - ₹1,000</SelectItem>
                  <SelectItem value="1000+">₹1,000+</SelectItem>
                </SelectContent>
              </Select>
              {errors.willingnessToPay && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.willingnessToPay}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number *</Label>
              <Input
                id="whatsapp"
                placeholder="10-digit mobile number"
                value={formData.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.whatsapp}
                </p>
              )}
              <p className="text-xs text-muted-foreground">We'll notify you when we launch</p>
            </div>

            <Button 
              type="submit" 
              size="xl" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Submit & Join Waitlist
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
