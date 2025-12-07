import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Search, CheckCircle2, Clock, Truck, MapPin, Camera, QrCode, Award, Loader2, Globe, ExternalLink, Shield, Recycle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ecoAwardCertificate from "@/assets/eco-award-certificate.png";
const mockTracking = {
  "PU-2024-001": {
    id: "PU-2024-001",
    status: "completed",
    device: "2x Laptops, 1x Monitor",
    scheduledDate: "2024-01-20",
    address: "123 Green Street, EcoCity",
    timeline: [
      { status: "scheduled", date: "2024-01-18", time: "10:30 AM", label: "Pickup Scheduled" },
      { status: "confirmed", date: "2024-01-19", time: "2:15 PM", label: "Driver Assigned" },
      { status: "in-transit", date: "2024-01-20", time: "9:00 AM", label: "Driver En Route" },
      { status: "completed", date: "2024-01-20", time: "10:45 AM", label: "Pickup Completed" },
    ]
  },
  "PU-2024-002": {
    id: "PU-2024-002",
    status: "in-transit",
    device: "1x Desktop, 3x Smartphones",
    scheduledDate: "2024-01-25",
    address: "456 Sustainability Ave, GreenTown",
    timeline: [
      { status: "scheduled", date: "2024-01-23", time: "11:00 AM", label: "Pickup Scheduled" },
      { status: "confirmed", date: "2024-01-24", time: "3:30 PM", label: "Driver Assigned" },
      { status: "in-transit", date: "2024-01-25", time: "8:30 AM", label: "Driver En Route" },
    ]
  }
};

const mockDeviceData = {
  "LAPTOP-12345": {
    name: "Dell XPS 15",
    type: "Laptop",
    manufacturer: "Dell",
    model: "XPS 15 9570",
    purchaseDate: "2019-03-15",
    expectedLifespan: 5,
    currentAge: 5.8,
    condition: "Fair",
    recyclability: 85,
    components: {
      battery: { health: 45, recyclable: true },
      screen: { health: 80, recyclable: true },
      motherboard: { health: 70, recyclable: true },
      storage: { health: 90, recyclable: true }
    },
    carbonFootprint: 320,
    recoveryValue: "$145",
    materials: {
      aluminum: 45,
      plastic: 25,
      copper: 15,
      lithium: 8,
      glass: 5,
      rare_earth: 2
    },
    recyclingProcess: [
      { step: "Data Wiping", description: "Secure data destruction following DOD standards" },
      { step: "Disassembly", description: "Manual separation of components" },
      { step: "Battery Removal", description: "Safe lithium battery extraction and processing" },
      { step: "Material Sorting", description: "Separation of metals, plastics, and glass" },
      { step: "Processing", description: "Shredding and material recovery" }
    ],
    dropoffLocations: [
      { name: "EcoTech Recycling Center", address: "123 Green Street, EcoCity", distance: "2.5 km", hours: "Mon-Sat 9AM-6PM" },
      { name: "City E-Waste Hub", address: "456 Sustainability Ave, GreenTown", distance: "5.1 km", hours: "Mon-Fri 8AM-5PM" }
    ],
    environmentalImpact: {
      co2Saved: 280,
      energySaved: 450,
      waterSaved: 1200,
      landfillDiverted: 3.5
    }
  },
  "PHONE-67890": {
    name: "iPhone 11",
    type: "Smartphone",
    manufacturer: "Apple",
    model: "iPhone 11",
    purchaseDate: "2020-09-20",
    expectedLifespan: 4,
    currentAge: 4.3,
    condition: "Good",
    recyclability: 75,
    components: {
      battery: { health: 60, recyclable: true },
      screen: { health: 85, recyclable: true },
      motherboard: { health: 80, recyclable: true },
      camera: { health: 90, recyclable: true }
    },
    carbonFootprint: 80,
    recoveryValue: "$95",
    materials: {
      aluminum: 35,
      glass: 30,
      plastic: 20,
      copper: 10,
      lithium: 3,
      rare_earth: 2
    },
    recyclingProcess: [
      { step: "Data Wiping", description: "Complete factory reset and data erasure" },
      { step: "Battery Extraction", description: "Safe removal of lithium-ion battery" },
      { step: "Screen Separation", description: "OLED display removal and processing" },
      { step: "Component Recovery", description: "Circuit board and camera module extraction" },
      { step: "Material Processing", description: "Metal and rare earth recovery" }
    ],
    dropoffLocations: [
      { name: "Mobile Recycle Point", address: "789 Tech Plaza, Digital District", distance: "1.8 km", hours: "Daily 10AM-8PM" },
      { name: "Green Phone Exchange", address: "321 Eco Boulevard, SmartCity", distance: "3.2 km", hours: "Mon-Sat 9AM-7PM" }
    ],
    environmentalImpact: {
      co2Saved: 65,
      energySaved: 120,
      waterSaved: 340,
      landfillDiverted: 0.8
    }
  }
};

// Sample certificates data
const sampleCertificates = [
  {
    id: "CERT-2025-001",
    title: "Eco Award Certificate",
    recipient: "Vishwanath Karne",
    award: "E-Waste Saviour",
    description: "Outstanding contribution and innovation in promoting Sustainable E-Waste Management at the Hack-A-Thon 1.0 2025 National Hackathon",
    venue: "St. Peter's Engineering College",
    date: "December 13th, 2025",
    issuedBy: "Team EcoRecycle",
    image: ecoAwardCertificate
  },
  {
    id: "CERT-2025-002",
    title: "Green Champion Certificate",
    recipient: "EcoRecycle Team",
    award: "Environmental Excellence",
    description: "For significant contribution to reducing e-waste and promoting sustainable practices",
    venue: "National Environment Summit 2025",
    date: "January 15th, 2025",
    issuedBy: "Ministry of Environment"
  }
];

const Tracker = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [deviceData, setDeviceData] = useState<any>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const handleTrack = () => {
    const info = mockTracking[trackingId as keyof typeof mockTracking];
    setTrackingInfo(info || null);
  };

  const startScanner = async () => {
    try {
      setShowScanner(true);
      setDeviceData(null);
      
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      // Try to get camera devices first
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length > 0) {
        // Use back camera if available, otherwise use first camera
        const backCamera = devices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear')
        );
        
        const cameraId = backCamera ? backCamera.id : devices[0].id;
        
        await html5QrCode.start(
          cameraId,
          config,
          (decodedText) => {
            console.log("Scanned:", decodedText);
            handleScanSuccess(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            // Ignore scan errors (these happen constantly while scanning)
          }
        );
        
        toast.success("Camera started successfully!");
      } else {
        throw new Error("No cameras found on this device");
      }
    } catch (error: any) {
      console.error("Scanner error:", error);
      setShowScanner(false);
      
      if (error.name === 'NotAllowedError' || error.message?.includes('Permission')) {
        toast.error("Camera permission denied. Please allow camera access in your browser settings.");
      } else if (error.message?.includes('No cameras found')) {
        toast.error("No camera found on this device.");
      } else {
        toast.error("Failed to start camera: " + (error.message || "Unknown error"));
      }
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current?.clear();
        setShowScanner(false);
      }).catch(console.error);
    }
  };

  const handleScanSuccess = async (scannedData: string) => {
    // Check if exact match exists in mock data
    const exactMatch = mockDeviceData[scannedData as keyof typeof mockDeviceData];
    
    if (exactMatch) {
      setDeviceData(exactMatch);
      toast.success("Device found in database!");
      return;
    }

    // Check if it's a QR code URL (from qr-code.io or similar)
    const isUrl = scannedData.startsWith('http') || scannedData.includes('qr-code') || scannedData.includes('qr-codes.io');
    
    if (isUrl) {
      setScannedUrl(scannedData);
      setIsLookingUp(true);
      toast.info("QR Code detected! Looking up device online...");
      
      // Simulate online lookup with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate device data based on the URL/scanned code with online lookup simulation
      const generatedDevice = generateDeviceDataFromOnlineLookup(scannedData);
      setDeviceData(generatedDevice);
      setIsLookingUp(false);
      toast.success("Device information retrieved successfully!");
      return;
    }

    // Generate device data based on scanned code
    const generatedDevice = generateDeviceData(scannedData);
    setDeviceData(generatedDevice);
    toast.success("Device scanned successfully!");
  };

  const generateDeviceDataFromOnlineLookup = (url: string) => {
    // Extract code from URL if present
    const urlParts = url.split('/');
    const code = urlParts[urlParts.length - 1] || url;
    
    // Simulate online lookup results with more detailed data
    const deviceTypes = ['Smartphone', 'Laptop', 'Tablet', 'Smart Watch', 'Wireless Earbuds', 'Gaming Console'];
    const manufacturers = ['Samsung', 'Apple', 'Dell', 'HP', 'Lenovo', 'Sony', 'LG', 'Xiaomi', 'OnePlus'];
    const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
    
    const randomType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const randomManufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const deviceModels: { [key: string]: string[] } = {
      'Samsung': ['Galaxy S23', 'Galaxy A54', 'Galaxy Tab S9', 'Galaxy Watch 5'],
      'Apple': ['iPhone 15 Pro', 'iPad Air', 'MacBook Pro M3', 'Apple Watch Series 9'],
      'Dell': ['XPS 15', 'Inspiron 16', 'Latitude 7430', 'Alienware m18'],
      'HP': ['Spectre x360', 'Pavilion 15', 'EliteBook 840', 'OMEN 16'],
      'Lenovo': ['ThinkPad X1 Carbon', 'IdeaPad 5', 'Legion Pro 7', 'Tab P12'],
      'Sony': ['PlayStation 5', 'WH-1000XM5', 'Xperia 1 V', 'LinkBuds S'],
      'LG': ['Gram 17', 'UltraGear Monitor', 'V60 ThinQ', 'Tone Free FP8'],
      'Xiaomi': ['Mi 14', 'Redmi Note 13', 'Pad 6', 'Watch S3'],
      'OnePlus': ['12 Pro', 'Open', 'Pad', 'Watch 2']
    };
    
    const models = deviceModels[randomManufacturer] || ['Generic Model'];
    const randomModel = models[Math.floor(Math.random() * models.length)];
    
    const baseData = randomType === 'Smartphone' || randomType === 'Smart Watch' || randomType === 'Wireless Earbuds' ? {
      expectedLifespan: 4,
      recyclability: 78,
      carbonFootprint: 85,
      recoveryValue: "$75-140",
      materials: {
        aluminum: 32,
        glass: 28,
        plastic: 22,
        copper: 10,
        lithium: 5,
        rare_earth: 3
      },
      environmentalImpact: {
        co2Saved: 72,
        energySaved: 135,
        waterSaved: 380,
        landfillDiverted: 0.9
      }
    } : randomType === 'Laptop' || randomType === 'Tablet' ? {
      expectedLifespan: 5,
      recyclability: 85,
      carbonFootprint: 350,
      recoveryValue: "$130-200",
      materials: {
        aluminum: 42,
        plastic: 28,
        copper: 14,
        lithium: 9,
        glass: 5,
        rare_earth: 2
      },
      environmentalImpact: {
        co2Saved: 295,
        energySaved: 480,
        waterSaved: 1350,
        landfillDiverted: 3.8
      }
    } : {
      expectedLifespan: 6,
      recyclability: 72,
      carbonFootprint: 180,
      recoveryValue: "$60-120",
      materials: {
        plastic: 45,
        aluminum: 22,
        copper: 15,
        glass: 8,
        lithium: 6,
        rare_earth: 4
      },
      environmentalImpact: {
        co2Saved: 145,
        energySaved: 280,
        waterSaved: 720,
        landfillDiverted: 2.2
      }
    };
    
    const currentAge = Math.random() * baseData.expectedLifespan + 0.5;
    
    return {
      name: `${randomManufacturer} ${randomModel}`,
      type: randomType,
      manufacturer: randomManufacturer,
      model: randomModel,
      serialNumber: `SN-${code.toUpperCase().substring(0, 8)}`,
      purchaseDate: new Date(Date.now() - currentAge * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expectedLifespan: baseData.expectedLifespan,
      currentAge: parseFloat(currentAge.toFixed(1)),
      condition: randomCondition,
      recyclability: baseData.recyclability,
      components: {
        battery: { health: Math.floor(Math.random() * 40) + 50, recyclable: true },
        screen: { health: Math.floor(Math.random() * 30) + 65, recyclable: true },
        motherboard: { health: Math.floor(Math.random() * 35) + 55, recyclable: true },
        storage: { health: Math.floor(Math.random() * 20) + 75, recyclable: true }
      },
      carbonFootprint: baseData.carbonFootprint,
      recoveryValue: baseData.recoveryValue,
      materials: baseData.materials,
      recyclingProcess: [
        { step: "Device Verification", description: "Verify device identity and ownership through secure database" },
        { step: "Data Sanitization", description: "Military-grade data wiping (NIST 800-88 compliant)" },
        { step: "Initial Assessment", description: "Professional evaluation of device condition and value" },
        { step: "Battery Extraction", description: "Safe removal and specialized lithium battery recycling" },
        { step: "Component Harvesting", description: "Recovery of reusable components (screens, cameras, chips)" },
        { step: "Material Separation", description: "Advanced sorting of metals, plastics, and rare earths" },
        { step: "Certified Processing", description: "R2/e-Stewards certified shredding and smelting" },
        { step: "Environmental Reporting", description: "Generate certificate of proper disposal and recycling" }
      ],
      dropoffLocations: [
        { name: "EcoTech Recycling Center", address: "123 Green Street, Hyderabad", distance: "2.3 km", hours: "Mon-Sat 9AM-6PM", certified: true },
        { name: "City E-Waste Hub", address: "456 Sustainability Ave, Secunderabad", distance: "4.8 km", hours: "Mon-Fri 8AM-5PM", certified: true },
        { name: "Green Electronics Recycling", address: "789 Eco Boulevard, Gachibowli", distance: "6.5 km", hours: "Daily 10AM-7PM", certified: true },
        { name: "TechRecycle Point", address: "321 Digital Lane, HITEC City", distance: "8.2 km", hours: "Mon-Sat 9AM-8PM", certified: false }
      ],
      environmentalImpact: baseData.environmentalImpact,
      scannedCode: code,
      scannedUrl: url,
      onlineLookup: true,
      category: getDeviceCategory(randomType),
      hazardousMaterials: getHazardousMaterials(randomType),
      certifications: ['R2 Certified', 'e-Stewards', 'ISO 14001'],
      warranty: {
        status: currentAge < 2 ? 'Active' : 'Expired',
        expiryDate: new Date(Date.now() - (currentAge - 2) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    };
  };

  const getDeviceCategory = (type: string): string => {
    const categories: { [key: string]: string } = {
      'Smartphone': 'Mobile Electronics',
      'Laptop': 'Computing Equipment',
      'Tablet': 'Mobile Electronics',
      'Smart Watch': 'Wearable Technology',
      'Wireless Earbuds': 'Audio Equipment',
      'Gaming Console': 'Entertainment Systems'
    };
    return categories[type] || 'General Electronics';
  };

  const getHazardousMaterials = (type: string): string[] => {
    const base = ['Lithium Battery', 'Lead (solder)'];
    if (type === 'Smartphone' || type === 'Laptop' || type === 'Tablet') {
      return [...base, 'Mercury (display)', 'Cadmium', 'Brominated Flame Retardants'];
    }
    return base;
  };

  const generateDeviceData = (code: string) => {
    // Detect device type from code patterns
    const isPhone = code.toLowerCase().includes('phone') || 
                    code.toLowerCase().includes('mobile') ||
                    code.toLowerCase().includes('iphone') ||
                    code.toLowerCase().includes('samsung') ||
                    code.includes('IMEI') ||
                    /^\d{15}$/.test(code); // IMEI is 15 digits

    const isLaptop = code.toLowerCase().includes('laptop') ||
                     code.toLowerCase().includes('notebook') ||
                     code.toLowerCase().includes('dell') ||
                     code.toLowerCase().includes('hp') ||
                     code.toLowerCase().includes('lenovo');

    const isTablet = code.toLowerCase().includes('tab') ||
                     code.toLowerCase().includes('ipad');

    const isMonitor = code.toLowerCase().includes('monitor') ||
                      code.toLowerCase().includes('display') ||
                      code.toLowerCase().includes('screen');

    // Determine device type
    let deviceType = "Electronic Device";
    let deviceName = "Unknown Device";
    let deviceIcon = "📱";
    
    if (isPhone) {
      deviceType = "Smartphone";
      deviceName = "Mobile Phone";
      deviceIcon = "📱";
    } else if (isLaptop) {
      deviceType = "Laptop";
      deviceName = "Laptop Computer";
      deviceIcon = "💻";
    } else if (isTablet) {
      deviceType = "Tablet";
      deviceName = "Tablet Device";
      deviceIcon = "📲";
    } else if (isMonitor) {
      deviceType = "Monitor";
      deviceName = "Display Monitor";
      deviceIcon = "🖥️";
    }

    // Generate realistic data based on device type
    const baseData = isPhone ? {
      expectedLifespan: 4,
      recyclability: 75,
      carbonFootprint: 80,
      recoveryValue: "$85-120",
      materials: {
        aluminum: 35,
        glass: 30,
        plastic: 20,
        copper: 10,
        lithium: 3,
        rare_earth: 2
      },
      components: {
        battery: { health: Math.floor(Math.random() * 40) + 50, recyclable: true },
        screen: { health: Math.floor(Math.random() * 30) + 70, recyclable: true },
        motherboard: { health: Math.floor(Math.random() * 30) + 60, recyclable: true },
        camera: { health: Math.floor(Math.random() * 20) + 80, recyclable: true }
      },
      environmentalImpact: {
        co2Saved: 65,
        energySaved: 120,
        waterSaved: 340,
        landfillDiverted: 0.8
      }
    } : isLaptop ? {
      expectedLifespan: 5,
      recyclability: 85,
      carbonFootprint: 320,
      recoveryValue: "$120-180",
      materials: {
        aluminum: 45,
        plastic: 25,
        copper: 15,
        lithium: 8,
        glass: 5,
        rare_earth: 2
      },
      components: {
        battery: { health: Math.floor(Math.random() * 40) + 40, recyclable: true },
        screen: { health: Math.floor(Math.random() * 30) + 70, recyclable: true },
        motherboard: { health: Math.floor(Math.random() * 40) + 50, recyclable: true },
        storage: { health: Math.floor(Math.random() * 20) + 80, recyclable: true }
      },
      environmentalImpact: {
        co2Saved: 280,
        energySaved: 450,
        waterSaved: 1200,
        landfillDiverted: 3.5
      }
    } : {
      expectedLifespan: 4.5,
      recyclability: 70,
      carbonFootprint: 150,
      recoveryValue: "$50-90",
      materials: {
        plastic: 40,
        aluminum: 25,
        copper: 15,
        glass: 10,
        lithium: 5,
        rare_earth: 5
      },
      components: {
        circuit_board: { health: Math.floor(Math.random() * 40) + 50, recyclable: true },
        casing: { health: Math.floor(Math.random() * 30) + 70, recyclable: true },
        battery: { health: Math.floor(Math.random() * 40) + 40, recyclable: true },
        display: { health: Math.floor(Math.random() * 30) + 60, recyclable: true }
      },
      environmentalImpact: {
        co2Saved: 120,
        energySaved: 250,
        waterSaved: 600,
        landfillDiverted: 1.8
      }
    };

    const currentAge = Math.random() * baseData.expectedLifespan + 1;

    return {
      name: deviceName,
      type: deviceType,
      manufacturer: "Various",
      model: code.substring(0, 20),
      purchaseDate: new Date(Date.now() - currentAge * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expectedLifespan: baseData.expectedLifespan,
      currentAge: parseFloat(currentAge.toFixed(1)),
      condition: currentAge < baseData.expectedLifespan * 0.5 ? "Good" : currentAge < baseData.expectedLifespan * 0.8 ? "Fair" : "Poor",
      recyclability: baseData.recyclability,
      components: baseData.components,
      carbonFootprint: baseData.carbonFootprint,
      recoveryValue: baseData.recoveryValue,
      materials: baseData.materials,
      recyclingProcess: [
        { step: "Data Wiping", description: "Secure data destruction following industry standards" },
        { step: "Disassembly", description: "Manual separation of components and materials" },
        { step: "Battery Removal", description: "Safe extraction and processing of batteries" },
        { step: "Material Sorting", description: "Separation of metals, plastics, and glass" },
        { step: "Processing", description: "Shredding and material recovery for reuse" }
      ],
      dropoffLocations: [
        { name: "EcoTech Recycling Center", address: "123 Green Street, EcoCity", distance: "2.5 km", hours: "Mon-Sat 9AM-6PM" },
        { name: "City E-Waste Hub", address: "456 Sustainability Ave, GreenTown", distance: "5.1 km", hours: "Mon-Fri 8AM-5PM" },
        { name: "Green Electronics Recycling", address: "789 Eco Boulevard, TechCity", distance: "7.3 km", hours: "Daily 10AM-7PM" }
      ],
      environmentalImpact: baseData.environmentalImpact,
      scannedCode: code
    };
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case "in-transit": return <Truck className="h-5 w-5 text-accent" />;
      case "confirmed": return <CheckCircle2 className="h-5 w-5 text-muted-foreground" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in-transit": return "secondary";
      default: return "outline";
    }
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const componentHealthData = deviceData ? Object.entries(deviceData.components).map(([name, data]: any) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    health: data.health
  })) : [];

  const lifespanData = deviceData ? [
    { name: 'Expected', value: deviceData.expectedLifespan },
    { name: 'Current Age', value: deviceData.currentAge },
    { name: 'Remaining', value: Math.max(0, deviceData.expectedLifespan - deviceData.currentAge) }
  ] : [];

  const materialData = deviceData ? Object.entries(deviceData.materials).map(([name, value]: any) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
    value: value
  })) : [];

  const impactData = deviceData ? [
    { name: 'CO₂ Saved', value: deviceData.environmentalImpact.co2Saved, unit: 'kg' },
    { name: 'Energy Saved', value: deviceData.environmentalImpact.energySaved, unit: 'kWh' },
    { name: 'Water Saved', value: deviceData.environmentalImpact.waterSaved, unit: 'L' },
    { name: 'Landfill Diverted', value: deviceData.environmentalImpact.landfillDiverted, unit: 'kg' }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="page-container pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Track Your Pickup & Scan Devices
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your e-waste pickup or scan device QR/barcode for detailed statistics
              </p>
            </div>

            {/* Tracking Section */}
            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle>Track Your Pickup</CardTitle>
                <CardDescription>Enter your tracking ID to see the status of your e-waste pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="e.g., PU-2024-001"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  />
                  <Button onClick={handleTrack}>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: PU-2024-001 or PU-2024-002
                </p>
              </CardContent>
            </Card>

            {trackingInfo && (
              <div className="space-y-6 animate-scale-in">
                {/* Real-time Truck Tracking Tile */}
                <Card className="shadow-card border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Truck className="h-6 w-6 text-primary" />
                          </div>
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-background" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Live Truck Tracking</CardTitle>
                          <CardDescription>Tracking ID: {trackingInfo.id}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(trackingInfo.status)} className="text-xs">
                        {trackingInfo.status === 'in-transit' ? '🚛 EN ROUTE' : trackingInfo.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Mini Map Preview */}
                    <div className="relative h-40 rounded-lg bg-muted overflow-hidden border border-border/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 dark:from-green-900/20 dark:to-blue-900/20">
                        {/* Animated road pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted-foreground/30 transform -translate-y-1/2" />
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-500/50 transform -translate-y-1/2 animate-pulse" style={{ animationDuration: '1.5s' }} />
                        </div>
                        {/* Animated truck icon */}
                        <div 
                          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                          style={{ 
                            left: trackingInfo.status === 'completed' ? '85%' : 
                                  trackingInfo.status === 'in-transit' ? '55%' : '25%',
                            animation: trackingInfo.status === 'in-transit' ? 'truck-move 3s ease-in-out infinite' : 'none'
                          }}
                        >
                          <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-lg">
                            <Truck className="h-5 w-5" />
                          </div>
                        </div>
                        {/* Start point */}
                        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">Start</span>
                        </div>
                        {/* End point */}
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">Destination</span>
                        </div>
                      </div>
                      {/* ETA overlay */}
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        ETA: {trackingInfo.status === 'completed' ? 'Arrived' : trackingInfo.status === 'in-transit' ? '~15 mins' : 'Pending'}
                      </div>
                    </div>

                    {/* Truck Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Driver</p>
                        <p className="font-medium text-sm">Ravi Kumar</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Vehicle</p>
                        <p className="font-medium text-sm">TS 09 AB 1234</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-medium text-sm">{trackingInfo.status === 'completed' ? '0 km' : '4.2 km'}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Items</p>
                        <p className="font-medium text-sm">{trackingInfo.device.split(',').length} devices</p>
                      </div>
                    </div>

                    {/* Detailed Tracking Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                      onClick={() => window.open('https://ecorecycle-tracker.lovable.app', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Detailed Tracking on EcoRecycle Tracker
                    </Button>
                  </CardContent>
                </Card>

                {/* Original Pickup Info Card */}
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">Pickup #{trackingInfo.id}</CardTitle>
                        <CardDescription className="mt-2">{trackingInfo.device}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(trackingInfo.status)}>
                        {trackingInfo.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Address</p>
                        <p className="text-sm text-muted-foreground">{trackingInfo.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Pickup Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingInfo.timeline.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            {getStatusIcon(item.status)}
                            {index < trackingInfo.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.date} at {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {trackingId && !trackingInfo && trackingId.length > 0 && (
              <Card className="shadow-card border-destructive/50 mb-8">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No tracking information found for ID: <span className="font-mono">{trackingId}</span>
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Device Scanner Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Scan Device QR/Barcode
                </CardTitle>
                <CardDescription>
                  Scan your device's QR code or barcode to view detailed statistics, lifespan, and recycling information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showScanner && !deviceData && !isLookingUp && (
                  <Button onClick={startScanner} className="w-full gap-2" size="lg">
                    <Camera className="h-5 w-5" />
                    Start Camera Scanner
                  </Button>
                )}

                {showScanner && (
                  <div className="space-y-4">
                    <div id="qr-reader" ref={videoRef} className="rounded-lg overflow-hidden"></div>
                    <Button onClick={stopScanner} variant="outline" className="w-full">
                      Stop Scanner
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Supports QR codes from qr-code.io and device barcodes
                    </p>
                  </div>
                )}

                {isLookingUp && (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 animate-pulse">
                      <Globe className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Looking up device online...</h3>
                      <p className="text-sm text-muted-foreground">Fetching device information from QR code</p>
                      {scannedUrl && (
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <ExternalLink className="h-3 w-3" />
                          <span className="font-mono truncate max-w-xs">{scannedUrl}</span>
                        </div>
                      )}
                    </div>
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                  </div>
                )}

{deviceData && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Online Lookup Badge */}
                    {deviceData.onlineLookup && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <Globe className="h-5 w-5 text-accent" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Device information retrieved via online lookup</p>
                          {deviceData.scannedUrl && (
                            <p className="text-xs text-muted-foreground font-mono truncate">{deviceData.scannedUrl}</p>
                          )}
                        </div>
                        <Badge variant="secondary">Online</Badge>
                      </div>
                    )}

                    {/* Device Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                        <h3 className="font-semibold text-lg mb-2">{deviceData.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Type:</span> {deviceData.type}</p>
                          <p><span className="text-muted-foreground">Manufacturer:</span> {deviceData.manufacturer}</p>
                          <p><span className="text-muted-foreground">Model:</span> {deviceData.model}</p>
                          {deviceData.serialNumber && (
                            <p><span className="text-muted-foreground">Serial:</span> {deviceData.serialNumber}</p>
                          )}
                          <p><span className="text-muted-foreground">Purchase Date:</span> {deviceData.purchaseDate}</p>
                          {deviceData.category && (
                            <p><span className="text-muted-foreground">Category:</span> {deviceData.category}</p>
                          )}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                        <h3 className="font-semibold text-lg mb-2">Status Overview</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Condition:</span>
                            <Badge>{deviceData.condition}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Recyclability:</span>
                            <span className="font-semibold">{deviceData.recyclability}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Recovery Value:</span>
                            <span className="font-semibold text-primary">{deviceData.recoveryValue}</span>
                          </div>
                          {deviceData.warranty && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Warranty:</span>
                              <Badge variant={deviceData.warranty.status === 'Active' ? 'default' : 'outline'}>
                                {deviceData.warranty.status}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hazardous Materials Warning */}
                    {deviceData.hazardousMaterials && (
                      <Card className="border-destructive/30 bg-destructive/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                            <Shield className="h-5 w-5" />
                            Hazardous Materials Warning
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            This device contains materials that require special handling during recycling:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {deviceData.hazardousMaterials.map((material: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-destructive/50 text-destructive">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Certifications */}
                    {deviceData.certifications && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Recycle className="h-5 w-5 text-primary" />
                            Recycling Certifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {deviceData.certifications.map((cert: string, index: number) => (
                              <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Material Composition */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Material Composition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={materialData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {materialData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="space-y-2">
                            {materialData.map((material, index) => (
                              <div key={material.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                  <span className="text-sm font-medium">{material.name}</span>
                                </div>
                                <span className="text-sm font-semibold">{material.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lifespan Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Device Lifespan Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={lifespanData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                            <YAxis stroke="hsl(var(--foreground))" label={{ value: 'Years', angle: -90, position: 'insideLeft' }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }} 
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 rounded-lg bg-muted/50">
                          <p className="text-sm">
                            <span className="font-semibold">Age:</span> {deviceData.currentAge.toFixed(1)} years 
                            <span className="mx-2">•</span>
                            <span className="font-semibold">Expected Lifespan:</span> {deviceData.expectedLifespan} years
                            <span className="mx-2">•</span>
                            <span className="font-semibold">Carbon Footprint:</span> {deviceData.carbonFootprint}kg CO₂
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Component Health */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Component Health Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={componentHealthData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--foreground))" />
                            <YAxis dataKey="name" type="category" stroke="hsl(var(--foreground))" width={100} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }} 
                            />
                            <Bar dataKey="health" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Environmental Impact */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Environmental Impact of Recycling</CardTitle>
                        <CardDescription>Estimated savings by recycling this device properly</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={impactData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                            <YAxis stroke="hsl(var(--foreground))" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                              formatter={(value: any, name: any, props: any) => [`${value} ${props.payload.unit}`, name]}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                          {impactData.map((item) => (
                            <div key={item.name} className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                              <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                              <p className="text-lg font-bold text-primary">{item.value} {item.unit}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recycling Process */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recycling Process</CardTitle>
                        <CardDescription>How this device will be recycled</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {deviceData.recyclingProcess.map((process: any, index: number) => (
                            <div key={index} className="flex gap-4 items-start">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                                  {index + 1}
                                </div>
                                {index < deviceData.recyclingProcess.length - 1 && (
                                  <div className="w-0.5 h-12 bg-border mt-2" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <h4 className="font-semibold mb-1">{process.step}</h4>
                                <p className="text-sm text-muted-foreground">{process.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Drop-off Locations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommended Drop-off Locations</CardTitle>
                        <CardDescription>Nearest certified e-waste recycling centers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {deviceData.dropoffLocations.map((location: any, index: number) => (
                            <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-start gap-3">
                                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                  <div>
                                    <h4 className="font-semibold">{location.name}</h4>
                                    <p className="text-sm text-muted-foreground">{location.address}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">{location.distance}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground ml-8">
                                <Clock className="h-4 w-4 inline mr-1" />
                                {location.hours}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Button onClick={() => { setDeviceData(null); setScannedUrl(null); }} variant="outline" className="w-full">
                      Scan Another Device
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certificates Section */}
            <Card className="mt-8 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Sample Certificates
                </CardTitle>
                <CardDescription>
                  Recognition certificates for e-waste management contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {sampleCertificates.map((cert) => (
                    <div key={cert.id} className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                      {cert.image && (
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground">{cert.recipient}</p>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{cert.award}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>{cert.venue}</span>
                          <span>{cert.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Issued by: {cert.issuedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
