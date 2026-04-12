import React from 'react';
import { Calendar, User, ArrowRight, Tag, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/common/PageMeta';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential IT Security Tips for Small Businesses in 2026",
      excerpt: "Protect your business from cyber threats with these proven security strategies. Learn how to safeguard your data and maintain customer trust.",
      category: "Security",
      author: "VedTech Team",
      date: "January 25, 2026",
      readTime: "5 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      tags: ["Security", "Business", "Tips"]
    },
    {
      id: 2,
      title: "Why Your Business Needs a Professional Website in 2026",
      excerpt: "Discover how a well-designed website can transform your business. From SEO benefits to customer engagement, learn why online presence matters.",
      category: "Web Development",
      author: "VedTech Team",
      date: "January 20, 2026",
      readTime: "7 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg",
      tags: ["Website", "Business Growth", "SEO"]
    },
    {
      id: 3,
      title: "Complete Guide to IT AMC Plans: What You Need to Know",
      excerpt: "Understanding Annual Maintenance Contracts for IT services. Learn how AMC plans can save costs and ensure smooth business operations.",
      category: "IT Support",
      author: "VedTech Team",
      date: "January 15, 2026",
      readTime: "6 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      tags: ["AMC", "IT Support", "Business"]
    },
    {
      id: 4,
      title: "Mobile App vs Website: What's Right for Your Business?",
      excerpt: "Choosing between a mobile app and website? We break down the pros, cons, and costs to help you make the right decision for your business.",
      category: "Mobile Development",
      author: "VedTech Team",
      date: "January 10, 2026",
      readTime: "8 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg",
      tags: ["Mobile App", "Website", "Strategy"]
    },
    {
      id: 5,
      title: "How to Choose the Right IT Service Provider for Your Business",
      excerpt: "Key factors to consider when selecting an IT partner. From expertise to response time, learn what makes a great IT service provider.",
      category: "Business Tips",
      author: "VedTech Team",
      date: "January 5, 2026",
      readTime: "5 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      tags: ["IT Services", "Business", "Guide"]
    },
    {
      id: 6,
      title: "Top 5 Technology Trends for Indian SMEs in 2026",
      excerpt: "Stay ahead of the curve with these emerging tech trends. From AI to cloud computing, discover what's shaping the future of business.",
      category: "Technology Trends",
      author: "VedTech Team",
      date: "December 30, 2025",
      readTime: "6 min read",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg",
      tags: ["Trends", "Technology", "SME"]
    }
  ];

  const categories = ["All", "Security", "Web Development", "IT Support", "Mobile Development", "Business Tips", "Technology Trends"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <PageMeta 
        title="VedTech Services Blog - IT Tips, Guides & Technology Insights"
        description="Read expert articles on IT services, web development, cybersecurity, and business technology. Get practical tips and insights from VedTech Services professionals."
      />
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-400/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Latest Insights
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">VedTech Blog</h1>
              <p className="text-slate-300 text-lg">
                Expert insights, practical tips, and the latest trends in IT services and technology
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b sticky top-0 z-40">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-primary/30">
                  <div className="relative aspect-video overflow-hidden bg-slate-200">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-primary via-blue-600 to-primary text-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
              <p className="text-blue-100 text-lg">
                Subscribe to our newsletter for the latest IT tips, industry insights, and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button asChild size="lg" variant="secondary" className="flex-1">
                  <Link to="/contact">
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
