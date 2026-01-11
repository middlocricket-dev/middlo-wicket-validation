import { useState } from "react";
import { Hero } from "@/components/Hero";
import { BatsmanForm } from "@/components/forms/BatsmanForm";
import { BowlerForm } from "@/components/forms/BowlerForm";
import { AcademyForm } from "@/components/forms/AcademyForm";

type UserType = 'batsman' | 'bowler' | 'academy' | null;

const Index = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  const handleSelectUserType = (type: UserType) => {
    setSelectedUserType(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedUserType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedUserType === 'batsman') {
    return <BatsmanForm onBack={handleBack} />;
  }

  if (selectedUserType === 'bowler') {
    return <BowlerForm onBack={handleBack} />;
  }

  if (selectedUserType === 'academy') {
    return <AcademyForm onBack={handleBack} />;
  }

  return <Hero onSelectUserType={handleSelectUserType} />;
};

export default Index;
