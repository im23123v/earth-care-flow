import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Smartphone, Laptop, HardDrive, AlertTriangle, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Security = () => {
  const devices = [
    {
      icon: Smartphone,
      name: "Smartphones & Tablets",
      steps: [
        "Backup your data to cloud or computer",
        "Sign out of all accounts (iCloud, Google, etc.)",
        "Perform factory reset from settings",
        "Remove SIM card and memory cards",
        "Verify all data is erased"
      ]
    },
    {
      icon: Laptop,
      name: "Laptops & Computers",
      steps: [
        "Backup important files and documents",
        "Sign out of all applications and accounts",
        "Deauthorize software licenses (iTunes, Adobe, etc.)",
        "Use disk wiping software (DBAN, Eraser)",
        "Reinstall operating system if possible",
        "Remove hard drive for separate destruction if needed"
      ]
    },
    {
      icon: HardDrive,
      name: "Hard Drives & Storage",
      steps: [
        "Use data wiping software (minimum 3 passes)",
        "Consider professional data destruction service",
        "Physical destruction for sensitive data",
        "Degaussing for magnetic media",
        "Obtain certificate of destruction if required"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Data Security Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Protect your personal information before recycling your devices
              </p>
            </div>

            <Card className="mb-8 shadow-card border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Important Security Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Your electronic devices contain sensitive personal information including photos, documents, 
                  passwords, financial data, and browsing history. Always ensure data is properly erased 
                  before recycling.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    We offer free data wiping services for all devices
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {devices.map((device, index) => (
                <Card key={index} className="shadow-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <device.icon className="h-6 w-6 text-primary" />
                      </div>
                      {device.name}
                    </CardTitle>
                    <CardDescription>Step-by-step data erasure guide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {device.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {stepIndex + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 shadow-card">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is factory reset enough to protect my data?</AccordionTrigger>
                    <AccordionContent>
                      For most users, a factory reset is sufficient for phones and tablets. However, for computers 
                      with sensitive data, we recommend using dedicated data wiping software that overwrites the 
                      entire drive multiple times.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What if I can't access my device to wipe it?</AccordionTrigger>
                    <AccordionContent>
                      If your device is broken or inaccessible, we offer professional data destruction services. 
                      Our certified technicians can securely destroy the storage components and provide you with 
                      a certificate of destruction.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you provide data wiping services?</AccordionTrigger>
                    <AccordionContent>
                      Yes! We offer complimentary data wiping services using DOD-compliant software that meets 
                      military-grade security standards. Just indicate this preference when scheduling your pickup.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What about cloud-linked accounts?</AccordionTrigger>
                    <AccordionContent>
                      Always sign out of cloud services (iCloud, Google, Microsoft) before recycling. For Apple 
                      devices, disable "Find My iPhone/iPad/Mac". For Android, remove your Google account and 
                      disable Factory Reset Protection.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
