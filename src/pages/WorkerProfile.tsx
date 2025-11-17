
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Upload,
  Save,
  ArrowLeft,
  Star,
  Calendar,
  IndianRupee
} from "lucide-react";
import Footer from "@/components/Footer";

const WorkerProfile = () => {
  const { user, isAuthenticated, isWorker } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    bio: "",
    hourlyRate: "",
    experience: "",
    availability: [] as string[],
    services: [] as string[],
    languages: [] as string[],
    otherLanguages: "",
    hasTransportation: false,
    hasReferences: false,
    isBackgroundChecked: false
  });

  const serviceOptions = [
    "House Cleaning",
    "Babysitting",
    "Elder Care",
    "Pet Care",
    "Cooking",
    "Laundry",
    "Gardening",
    "Personal Assistant",
    "Tutoring",
    "Event Help"
  ];

  const availabilityOptions = [
    "Monday - Morning",
    "Monday - Afternoon",
    "Monday - Evening",
    "Tuesday - Morning",
    "Tuesday - Afternoon",
    "Tuesday - Evening",
    "Wednesday - Morning",
    "Wednesday - Afternoon",
    "Wednesday - Evening",
    "Thursday - Morning",
    "Thursday - Afternoon",
    "Thursday - Evening",
    "Friday - Morning",
    "Friday - Afternoon",
    "Friday - Evening",
    "Saturday - Morning",
    "Saturday - Afternoon",
    "Saturday - Evening",
    "Sunday - Morning",
    "Sunday - Afternoon",
    "Sunday - Evening"
  ];

  const languageOptions = [
    "English",
    "Arabic", 
    "Hindi",
    "Urdu"
  ];

  const countryOptions = [
    { value: "india", label: "India" },
    { value: "uae", label: "UAE (Dubai)" }
  ];

  const stateOptions = {
    india: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
      "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
      "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
      "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
      "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu",
      "Lakshadweep"
    ],
    uae: [
      "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
  };

  const cityOptions = {
    india: {
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur"],
      "Delhi": ["New Delhi", "Dwarka", "Rohini", "Lajpat Nagar", "Karol Bagh", "Connaught Place"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
      "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"],
      "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad"],
      "Haryana": ["Gurgaon", "Faridabad", "Hisar", "Panipat", "Karnal", "Ambala"],
      "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
      "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
      "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
      "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
      "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
      "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
      "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
      "Chhattisgarh": ["Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon"],
      "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur"],
      "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Hamirpur"],
      "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim"]
    },
    uae: {
      "Dubai": ["Dubai Marina", "Downtown Dubai", "Jumeirah", "Deira", "Bur Dubai", "Dubai Sports City", "Business Bay"],
      "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Khalifa City", "Yas Island", "Saadiyat Island", "Al Raha Beach"],
      "Sharjah": ["Sharjah City", "University City", "Al Qasba", "Al Majaz", "Al Nahda", "Muwaileh"],
      "Ajman": ["Ajman City", "Al Nuaimiya", "Al Rashidiya", "Al Hamidiyah", "Al Jurf", "Masfout"],
      "Fujairah": ["Fujairah City", "Kalba", "Dibba Al-Fujairah", "Masafi", "Al Bidyah", "Qidfa"],
      "Ras Al Khaimah": ["Ras Al Khaimah City", "Al Hamra", "Al Marjan Island", "Julfar", "Al Qawasim", "Khuzam"],
      "Umm Al Quwain": ["Umm Al Quwain City", "Al Salama", "Falaj Al Mualla", "Al Rashid", "Al Humra", "Old Harbour"]
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !isWorker) {
      navigate('/worker/login');
    }
  }, [isAuthenticated, isWorker, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category: 'services' | 'availability' | 'languages', value: string) => {
    setProfileData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      console.log('Profile update:', profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-app-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/worker/dashboard" className="flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Worker Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-app-text mb-2">Worker Profile</h1>
          <p className="text-gray-600">Complete your profile to attract more employers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary text-white text-2xl">
                    {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    A professional photo increases your chances of getting hired
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address
              </CardTitle>
              <CardDescription>
                Your location helps employers find workers in their area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={profileData.country}
                    onValueChange={(value) => {
                      setProfileData(prev => ({ ...prev, country: value, state: "" }))
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      {countryOptions.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="state">State/Emirate</Label>
                  <Select
                    value={profileData.state}
                    onValueChange={(value) => 
                      setProfileData(prev => ({ ...prev, state: value, city: "" }))
                    }
                    disabled={!profileData.country}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue 
                        placeholder={
                          profileData.country 
                            ? `Select ${profileData.country === 'uae' ? 'emirate' : 'state'}` 
                            : "Select country first"
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      {profileData.country && stateOptions[profileData.country as keyof typeof stateOptions]?.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={profileData.city}
                    onValueChange={(value) => 
                      setProfileData(prev => ({ ...prev, city: value }))
                    }
                    disabled={!profileData.state}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue 
                        placeholder={
                          profileData.state 
                            ? "Select city" 
                            : "Select state first"
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      {profileData.country && profileData.state && 
                        cityOptions[profileData.country as keyof typeof cityOptions]?.[profileData.state]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">
                    {profileData.country === 'india' ? 'PIN Code' : 'ZIP/Postal Code'}
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder={profileData.country === 'india' ? '110001' : '12345'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Professional Information
              </CardTitle>
              <CardDescription>
                Tell employers about your experience and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                  placeholder="Tell employers about yourself, your experience, and what makes you unique..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select
                    onValueChange={(value) => 
                      setProfileData(prev => ({ ...prev, experience: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">More than 10 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>
                Select all the services you can provide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={profileData.services.includes(service)}
                      onCheckedChange={() => handleCheckboxChange('services', service)}
                    />
                    <Label htmlFor={`service-${service}`} className="text-sm">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Availability
              </CardTitle>
              <CardDescription>
                When are you available to work?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availabilityOptions.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${slot}`}
                      checked={profileData.availability.includes(slot)}
                      onCheckedChange={() => handleCheckboxChange('availability', slot)}
                    />
                    <Label htmlFor={`availability-${slot}`} className="text-sm">
                      {slot}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages & Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Languages & Additional Information</CardTitle>
              <CardDescription>
                Additional qualifications that make you stand out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Languages Spoken</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={profileData.languages.includes(language)}
                        onCheckedChange={() => handleCheckboxChange('languages', language)}
                      />
                      <Label htmlFor={`language-${language}`} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="otherLanguages">Other Languages (comma separated)</Label>
                  <Input
                    id="otherLanguages"
                    name="otherLanguages"
                    placeholder="e.g., French, German, Spanish"
                    value={profileData.otherLanguages}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTransportation"
                    checked={profileData.hasTransportation}
                    onCheckedChange={(checked) => 
                      setProfileData(prev => ({ ...prev, hasTransportation: checked as boolean }))
                    }
                  />
                  <Label htmlFor="hasTransportation">I have reliable transportation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasReferences"
                    checked={profileData.hasReferences}
                    onCheckedChange={(checked) => 
                      setProfileData(prev => ({ ...prev, hasReferences: checked as boolean }))
                    }
                  />
                  <Label htmlFor="hasReferences">I can provide references</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isBackgroundChecked"
                    checked={profileData.isBackgroundChecked}
                    onCheckedChange={(checked) => 
                      setProfileData(prev => ({ ...prev, isBackgroundChecked: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isBackgroundChecked">I have completed a background check</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/worker/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="btn-primary" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default WorkerProfile;
