
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  MapPin, 
  LogOut,
  Settings,
  Star,
  Clock,
  CheckCircle
} from "lucide-react";

const WorkerDashboard = () => {
  const { user, logout, isAuthenticated, isWorker } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "House Cleaning",
      employer: "Smith Family",
      salary: "$20/hour",
      location: "Manhattan, NY",
      type: "Part-time",
      status: "available",
      description: "Weekly house cleaning for a 3-bedroom apartment",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Babysitting",
      employer: "Johnson Family",
      salary: "$18/hour",
      location: "Brooklyn, NY",
      type: "Weekends",
      status: "applied",
      description: "Weekend babysitting for 2 children (ages 5 and 8)",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Elder Care",
      employer: "Brown Family",
      salary: "$25/hour",
      location: "Queens, NY",
      type: "Full-time",
      status: "interview",
      description: "Companion care for elderly gentleman",
      posted: "3 days ago"
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated || !isWorker) {
      navigate('/worker/login');
    }
  }, [isAuthenticated, isWorker, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="text-success border-success">Available</Badge>;
      case 'applied':
        return <Badge variant="outline" className="text-primary border-primary">Applied</Badge>;
      case 'interview':
        return <Badge variant="outline" className="text-accent border-accent">Interview</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Briefcase className="h-4 w-4" />;
      case 'applied':
        return <Clock className="h-4 w-4" />;
      case 'interview':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
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
              <Link to="/" className="text-2xl font-bold text-primary">
                DomestyX
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Worker Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/worker/profile">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-white text-lg">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-app-text">
                Welcome back, {user.first_name}!
              </h1>
              <p className="text-gray-600">Ready to find your next opportunity?</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Pending responses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <User className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 15 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your profile and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link to="/worker/profile">
                <Button className="btn-primary">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </Link>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Applications
              </Button>
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Reviews & Ratings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Opportunities</CardTitle>
            <CardDescription>Jobs matching your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(job.status)}
                        <h3 className="text-lg font-semibold text-app-text">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-gray-600 mb-2">{job.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {job.employer}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Badge variant="secondary">{job.type}</Badge>
                      {job.status === 'available' && (
                        <Button size="sm" className="btn-primary">
                          Apply Now
                        </Button>
                      )}
                      {job.status === 'applied' && (
                        <Button size="sm" variant="outline" disabled>
                          Applied
                        </Button>
                      )}
                      {job.status === 'interview' && (
                        <Button size="sm" className="btn-success">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">
                View All Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;
