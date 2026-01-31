import React, { useEffect, useState } from 'react';
import { Check, Star, Clock, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/db/supabase';
import { useNavigate } from 'react-router-dom';

interface AMCPlan {
  id: string;
  name: string;
  price: number;
  duration_months: number;
  features: string[];
  response_time: string;
  is_popular: boolean;
}

const AMCPlans: React.FC = () => {
  const [plans, setPlans] = useState<AMCPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('amc_plans')
        .select('*')
        .order('price', { ascending: true });

      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        setPlans(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = (planId: string) => {
    navigate(`/contact?plan=${planId}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-primary text-white py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-semibold">Annual Maintenance Contracts</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AMC Plans for Your Business
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get priority support with guaranteed response time. Choose the plan that fits your needs.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Priority Support</h3>
                <p className="text-slate-600 text-sm">AMC customers get priority support with guaranteed response time</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fast Response</h3>
                <p className="text-slate-600 text-sm">Get support within 4-48 hours based on your plan</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Complete Coverage</h3>
                <p className="text-slate-600 text-sm">Hardware, software, networking - all covered under one plan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-slate-600 text-lg">India-friendly pricing for businesses of all sizes</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading plans...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.is_popular ? 'border-primary border-2 shadow-xl scale-105' : 'border-slate-200'}`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-white" />
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600"> / year</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{plan.response_time} response</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.is_popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.is_popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      Select {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose AMC */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose AMC?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">💰 Cost Effective</h3>
                <p className="text-slate-600">Save money with annual plans instead of per-incident charges</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">⚡ Priority Service</h3>
                <p className="text-slate-600">Jump the queue with guaranteed response times</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">🛡️ Peace of Mind</h3>
                <p className="text-slate-600">No surprise bills - everything covered in one annual fee</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">📞 Dedicated Support</h3>
                <p className="text-slate-600">Direct access to our expert support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose your plan and get priority IT support for your business today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white hover:bg-white hover:text-primary"
              onClick={() => window.location.href = 'tel:+917858971869'}
            >
              Call +91 7858971869
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AMCPlans;
