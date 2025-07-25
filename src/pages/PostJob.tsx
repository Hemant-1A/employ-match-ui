
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { 
  Briefcase,
  MapPin, 
  IndianRupee,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Save,
  Send
} from "lucide-react";

const PostJob = () => {
  const { user, isAuthenticated, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    hourlyRate: "",
    salaryType: "hourly",
    jobType: "",
    location: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    startDate: "",
    duration: "",
    hoursPerWeek: "",
    skills: [] as string[],
    schedule: [] as string[],
    isUrgent: false,
    isLiveIn: false,
    providesTransportation: false,
    petFriendly: false
  });

  const jobTypes = [
    "Part-time",
    "Full-time", 
    "One-time",
    "Temporary",
    "Contract",
    "Live-in"
  ];

  const skillOptions = [
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

  const scheduleOptions = [
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
    if (!isAuthenticated || !isEmployer) {
      navigate('/employer/login');
    }
  }, [isAuthenticated, isEmployer, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category: 'skills' | 'schedule', value: string) => {
    setJobData(prev => ({
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
      console.log('Job posting:', jobData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Job Posted Successfully!",
        description: "Your job posting is now live and workers can apply.",
      });
      
      navigate('/employer/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
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
              <Link to="/employer/dashboard" className="flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Post New Job</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-app-text mb-2">Post a New Job</h1>
          <p className="text-gray-600">Find the perfect worker for your needs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Details
              </CardTitle>
              <CardDescription>
                Basic information about the job you're posting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., House Cleaner, Babysitter, Elder Care"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                  placeholder="Describe the job responsibilities, what you're looking for, and any specific requirements..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements & Qualifications</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={3}
                  placeholder="List any specific requirements, experience needed, or qualifications..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    onValueChange={(value) => 
                      setJobData(prev => ({ ...prev, jobType: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    onValueChange={(value) => 
                      setJobData(prev => ({ ...prev, duration: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-2" />
                Compensation
              </CardTitle>
              <CardDescription>
                Set the pay rate for this position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salaryType">Pay Type</Label>
                  <Select
                    onValueChange={(value) => 
                      setJobData(prev => ({ ...prev, salaryType: value }))
                    }
                    defaultValue="hourly"
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="fixed">Fixed Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hourlyRate">
                    {jobData.salaryType === 'hourly' ? 'Hourly Rate' :
                     jobData.salaryType === 'daily' ? 'Daily Rate' :
                     jobData.salaryType === 'weekly' ? 'Weekly Rate' :
                     jobData.salaryType === 'monthly' ? 'Monthly Rate' : 'Fixed Amount'} (₹)
                  </Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      value={jobData.hourlyRate}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="hoursPerWeek">Expected Hours per Week</Label>
                <Input
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  type="number"
                  value={jobData.hoursPerWeek}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location
              </CardTitle>
              <CardDescription>
                Where will the work be performed?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Street Address</Label>
                <Input
                  id="location"
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={jobData.country}
                    onValueChange={(value) => {
                      setJobData(prev => ({ ...prev, country: value, state: "", city: "" }))
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
                    value={jobData.state}
                    onValueChange={(value) => 
                      setJobData(prev => ({ ...prev, state: value, city: "" }))
                    }
                    disabled={!jobData.country}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue 
                        placeholder={
                          jobData.country 
                            ? `Select ${jobData.country === 'uae' ? 'emirate' : 'state'}` 
                            : "Select country first"
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      {jobData.country && stateOptions[jobData.country as keyof typeof stateOptions]?.map((state) => (
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
                    value={jobData.city}
                    onValueChange={(value) => 
                      setJobData(prev => ({ ...prev, city: value }))
                    }
                    disabled={!jobData.state}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue 
                        placeholder={
                          jobData.state 
                            ? "Select city" 
                            : "Select state first"
                        } 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      {jobData.country && jobData.state && 
                        cityOptions[jobData.country as keyof typeof cityOptions]?.[jobData.state]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">
                    {jobData.country === 'india' ? 'PIN Code' : 'ZIP/Postal Code'}
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={jobData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder={jobData.country === 'india' ? '110001' : '12345'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule & Skills Required
              </CardTitle>
              <CardDescription>
                When do you need work done and what skills are required?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={jobData.startDate}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Required Skills/Services</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={jobData.skills.includes(skill)}
                        onCheckedChange={() => handleCheckboxChange('skills', skill)}
                      />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Preferred Schedule</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {scheduleOptions.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <Checkbox
                        id={`schedule-${slot}`}
                        checked={jobData.schedule.includes(slot)}
                        onCheckedChange={() => handleCheckboxChange('schedule', slot)}
                      />
                      <Label htmlFor={`schedule-${slot}`} className="text-sm">
                        {slot}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
              <CardDescription>
                Extra details about the job
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUrgent"
                  checked={jobData.isUrgent}
                  onCheckedChange={(checked) => 
                    setJobData(prev => ({ ...prev, isUrgent: checked as boolean }))
                  }
                />
                <Label htmlFor="isUrgent">This is an urgent job posting</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isLiveIn"
                  checked={jobData.isLiveIn}
                  onCheckedChange={(checked) => 
                    setJobData(prev => ({ ...prev, isLiveIn: checked as boolean }))
                  }
                />
                <Label htmlFor="isLiveIn">This is a live-in position</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="providesTransportation"
                  checked={jobData.providesTransportation}
                  onCheckedChange={(checked) => 
                    setJobData(prev => ({ ...prev, providesTransportation: checked as boolean }))
                  }
                />
                <Label htmlFor="providesTransportation">Transportation will be provided</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petFriendly"
                  checked={jobData.petFriendly}
                  onCheckedChange={(checked) => 
                    setJobData(prev => ({ ...prev, petFriendly: checked as boolean }))
                  }
                />
                <Label htmlFor="petFriendly">Pet-friendly workplace</Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/employer/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="button" variant="outline" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button type="submit" className="btn-primary" disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
