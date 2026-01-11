import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { saveSubmission, AcademyFormData } from "@/lib/storage";
import { z } from "zod";

const academySchema = z.object({
  academyName: z.string().min(2, "Academy name must be at least 2 characters").max(100),
  location: z.string().min(1, "Please select a location"),
  numberOfNets: z.string().min(1, "Please select number of nets"),
  freeHours: z.string().min(1, "Please select free hours"),
  pricePerHour: z.string().min(1, "Please enter price"),
  contactName: z.string().min(2, "Contact name is required").max(100),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
});

interface AcademyFormProps {
  onBack: () => void;
}

export const AcademyForm = ({ onBack }: AcademyFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    academyName: "",
    location: "",
    numberOfNets: "",
    freeHours: "",
    pricePerHour: "",
    contactName: "",
    contactPhone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = academySchema.safeParse(formData);
    
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

    const submission: AcademyFormData = {
      type: 'academy',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    saveSubmission(submission);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate('/thank-you?type=academy');
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
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Monetize unused net hours</h3>
                <p className="text-sm text-muted-foreground">Fill empty slots, maximize revenue</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Partner with MIDDLO
            </h1>
            <p className="text-muted-foreground">
              List your facility and reach more cricketers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 card-elevated p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="academyName">Academy / Ground Name *</Label>
              <Input
                id="academyName"
                placeholder="Enter facility name"
                value={formData.academyName}
                onChange={(e) => updateField("academyName", e.target.value)}
                className={errors.academyName ? "border-destructive" : ""}
              />
              {errors.academyName && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.academyName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select value={formData.location} onValueChange={(v) => updateField("location", v)}>
                <SelectTrigger className={errors.location ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi-north">Delhi - North</SelectItem>
                  <SelectItem value="delhi-south">Delhi - South</SelectItem>
                  <SelectItem value="delhi-east">Delhi - East</SelectItem>
                  <SelectItem value="delhi-west">Delhi - West</SelectItem>
                  <SelectItem value="noida">Noida</SelectItem>
                  <SelectItem value="gurgaon">Gurgaon</SelectItem>
                  <SelectItem value="faridabad">Faridabad</SelectItem>
                  <SelectItem value="ghaziabad">Ghaziabad</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.location}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfNets">Number of Nets *</Label>
                <Select value={formData.numberOfNets} onValueChange={(v) => updateField("numberOfNets", v)}>
                  <SelectTrigger className={errors.numberOfNets ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2</SelectItem>
                    <SelectItem value="3-5">3-5</SelectItem>
                    <SelectItem value="6-10">6-10</SelectItem>
                    <SelectItem value="10+">10+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.numberOfNets && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.numberOfNets}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeHours">Typical Free Hours/Day *</Label>
                <Select value={formData.freeHours} onValueChange={(v) => updateField("freeHours", v)}>
                  <SelectTrigger className={errors.freeHours ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="3-4">3-4 hours</SelectItem>
                    <SelectItem value="5-6">5-6 hours</SelectItem>
                    <SelectItem value="6+">6+ hours</SelectItem>
                  </SelectContent>
                </Select>
                {errors.freeHours && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.freeHours}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerHour">Current Price per Hour (₹) *</Label>
              <Input
                id="pricePerHour"
                placeholder="e.g., 500"
                value={formData.pricePerHour}
                onChange={(e) => updateField("pricePerHour", e.target.value.replace(/\D/g, ''))}
                className={errors.pricePerHour ? "border-destructive" : ""}
              />
              {errors.pricePerHour && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.pricePerHour}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name *</Label>
              <Input
                id="contactName"
                placeholder="Enter contact name"
                value={formData.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                className={errors.contactName ? "border-destructive" : ""}
              />
              {errors.contactName && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.contactName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                placeholder="10-digit mobile number"
                value={formData.contactPhone}
                onChange={(e) => updateField("contactPhone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={errors.contactPhone ? "border-destructive" : ""}
              />
              {errors.contactPhone && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.contactPhone}
                </p>
              )}
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
                  Register Academy
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
