
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Shield, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-app-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">DomestyX</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/worker/login">
                <Button variant="outline">Worker Login</Button>
              </Link>
              <Link to="/employer/login">
                <Button className="btn-primary">Employer Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-app-text mb-6">
            Connect with Trusted <span className="text-primary">Domestic Workers</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            DomestyX bridges the gap between skilled domestic workers and families who need reliable help. 
            Find verified professionals or showcase your services with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/worker/register">
              <Button size="lg" className="btn-primary px-8 py-3 text-lg">
                I'm a Worker
              </Button>
            </Link>
            <Link to="/employer/register">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-white">
                I'm an Employer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-app-text mb-4">Why Choose DomestyX?</h3>
            <p className="text-lg text-gray-600">Reliable connections, verified profiles, and secure transactions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Verified Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All workers go through our verification process to ensure quality and safety
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Wide Range of Services</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From cleaning to childcare, find the perfect match for your needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Secure Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your safety and privacy are our top priorities with secure transactions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rated Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Read genuine reviews and ratings to make informed decisions
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who have found their perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/worker/register">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Register as Worker
              </Button>
            </Link>
            <Link to="/employer/register">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary">
                Find Workers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 DomestyX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
