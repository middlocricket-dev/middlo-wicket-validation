import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle, CheckCircle2, Banknote } from "lucide-react";
import { saveSubmission, BowlerFormData } from "@/lib/storage";
import { z } from "zod";

const bowlerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(1, "Please select your role"),
  experience: z.string().min(1, "Please select your experience"),
  city: z.string().min(1, "Please select a city"),
  hourlyRate: z.string().min(1, "Please enter your rate"),
  availability: z.string().min(1, "Please select availability"),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
});

interface BowlerFormProps {
  onBack: () => void;
}

export const BowlerForm = ({ onBack }: BowlerFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "",
    city: "",
    hourlyRate: "",
    availability: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = bowlerSchema.safeParse(formData);
    
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

    const submission: BowlerFormData = {
      type: 'bowler',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    saveSubmission(submission);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate('/thank-you?type=bowler');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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
          {/* Value proposition */}
          <div className="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Get paid to bowl</h3>
                <p className="text-sm text-muted-foreground">Set your own rates, choose your schedule</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Join our bowler network
            </h1>
            <p className="text-muted-foreground">
              Connect with batsmen looking for quality practice partners.
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
              <Label htmlFor="role">Bowling Type *</Label>
              <Select value={formData.role} onValueChange={(v) => updateField("role", v)}>
                <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">Fast Bowler</SelectItem>
                  <SelectItem value="medium">Medium Pacer</SelectItem>
                  <SelectItem value="spin-off">Off Spinner</SelectItem>
                  <SelectItem value="spin-leg">Leg Spinner</SelectItem>
                  <SelectItem value="sidearm">Side-arm Specialist</SelectItem>
                  <SelectItem value="throwdown">Throwdown Specialist</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.role}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Select value={formData.experience} onValueChange={(v) => updateField("experience", v)}>
                <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                  <SelectItem value="professional">Professional / Ex-player</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.experience}
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
              <Label htmlFor="hourlyRate">Expected Hourly Rate (₹) *</Label>
              <Input
                id="hourlyRate"
                placeholder="e.g., 500"
                value={formData.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value.replace(/\D/g, ''))}
                className={errors.hourlyRate ? "border-destructive" : ""}
              />
              {errors.hourlyRate && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.hourlyRate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability *</Label>
              <Select value={formData.availability} onValueChange={(v) => updateField("availability", v)}>
                <SelectTrigger className={errors.availability ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekends">Weekends only</SelectItem>
                  <SelectItem value="evenings">Evenings (after 5 PM)</SelectItem>
                  <SelectItem value="mornings">Mornings (before 10 AM)</SelectItem>
                  <SelectItem value="flexible">Flexible / Full-time</SelectItem>
                </SelectContent>
              </Select>
              {errors.availability && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.availability}
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
              <p className="text-xs text-muted-foreground">We'll contact you when we launch</p>
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
                  Register as Bowler
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
