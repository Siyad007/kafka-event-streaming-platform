import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Activity, CheckCircle, XCircle, Eye, ShoppingBag, 
  CreditCard, GraduationCap, Database, TrendingUp, BarChart3, 
  Zap, Server, Clock, Users
} from 'lucide-react';

const LandingPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [analytics, setAnalytics] = useState(null);

  // Fetch analytics every 3 seconds
  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:8080/producer/analytics');
      const data = await response.json();
      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const emitEvent = async (eventName) => {
    setLoading(true);
    setStatus(null);
    
    try {
      const response = await fetch('http://localhost:8080/producer/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: eventName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStatus({ 
        type: 'success', 
        message: '✅ Event processed successfully!',
        event: eventName
      });
      setEventCount(prev => prev + 1);
      console.log('✅ Event sent:', data);
      
      // Refresh analytics immediately
      setTimeout(fetchAnalytics, 500);
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: '❌ Something went wrong. Please try again!' 
      });
      console.error('❌ Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const events = [
    { 
      name: 'courseView', 
      label: 'Browse Course', 
      icon: Eye, 
      color: '#10B981',
      emoji: '👀',
      description: 'View course details'
    },
    { 
      name: 'addToCart', 
      label: 'Add to Cart', 
      icon: ShoppingBag, 
      color: '#8B5CF6',
      emoji: '🛍️',
      description: 'Save for later'
    },
    { 
      name: 'userClick', 
      label: 'Buy Now', 
      icon: ShoppingCart, 
      color: '#4F46E5',
      emoji: '🛒',
      description: 'Purchase instantly'
    },
    { 
      name: 'checkout', 
      label: 'Checkout', 
      icon: CreditCard, 
      color: '#F59E0B',
      emoji: '💳',
      description: 'Proceed to payment'
    },
    { 
      name: 'enrollment', 
      label: 'Start Learning', 
      icon: GraduationCap, 
      color: '#3B82F6',
      emoji: '🎓',
      description: 'Access course'
    },
  ];

  // Calculate max value for progress bars
  const maxCount = analytics?.eventsByType 
    ? Math.max(...Object.values(analytics.eventsByType)) 
    : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 md:p-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Activity className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Real-Time Event Streaming Platform
            </h1>
            <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
              Experience how modern platforms like Netflix, Uber, and Amazon process events in real-time!
            </p>
          </div>

          {/* Live Stats Dashboard */}
          <div className="p-8 md:p-12">
            
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-blue-900 text-sm">Cloud Database</h3>
                </div>
                <p className="text-4xl font-bold text-blue-600">
                  {analytics?.totalEvents || 0}
                </p>
                <p className="text-sm text-blue-700 mt-2">Total events stored</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">Live sync</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold text-green-900 text-sm">Event Types</h3>
                </div>
                <p className="text-4xl font-bold text-green-600">
                  {analytics?.eventsByType ? Object.keys(analytics.eventsByType).length : 0}
                </p>
                <p className="text-sm text-green-700 mt-2">Different actions</p>
                <div className="flex items-center gap-1 mt-2">
                  <BarChart3 className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Analytics ready</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h3 className="font-bold text-purple-900 text-sm">This Session</h3>
                </div>
                <p className="text-4xl font-bold text-purple-600">{eventCount}</p>
                <p className="text-sm text-purple-700 mt-2">Events sent</p>
                <div className="flex items-center gap-1 mt-2">
                  <Zap className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600">Active now</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <h3 className="font-bold text-orange-900 text-sm">Response Time</h3>
                </div>
                <p className="text-4xl font-bold text-orange-600">&lt;200</p>
                <p className="text-sm text-orange-700 mt-2">Milliseconds</p>
                <div className="flex items-center gap-1 mt-2">
                  <Server className="w-3 h-3 text-orange-600" />
                  <span className="text-xs text-orange-600">Lightning fast</span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-5 rounded-2xl flex items-start gap-4 mb-8 animate-fade-in shadow-lg ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-800 border-2 border-green-200'
                    : 'bg-red-50 text-red-800 border-2 border-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-bold text-lg">{status.message}</p>
                  {status.event && (
                    <p className="text-sm mt-2">
                      Event: <code className="bg-white px-3 py-1 rounded font-mono">{status.event}</code>
                    </p>
                  )}
                  <p className="text-xs mt-2 opacity-75">
                    ✨ Event sent to Kafka → Processed → Saved to NeonDB cloud database
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-600" />
                Try These Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {events.map((event) => {
                  const Icon = event.icon;
                  
                  return (
                    <button
                      key={event.name}
                      onClick={() => emitEvent(event.name)}
                      disabled={loading}
                      className="group relative text-white font-semibold py-6 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:opacity-50"
                      style={{
                        backgroundColor: loading ? '#9CA3AF' : event.color,
                      }}
                    >
                      <div className="text-3xl">{event.emoji}</div>
                      <Icon className="w-6 h-6" />
                      <div className="text-center">
                        <div className="font-bold">{event.label}</div>
                        <div className="text-xs opacity-90 mt-1">{event.description}</div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                💡 <strong>Click any action</strong> to send an event through Kafka to the cloud database!
              </p>
            </div>

            {/* Event Analytics Breakdown */}
            {analytics && analytics.eventsByType && Object.keys(analytics.eventsByType).length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-indigo-600" />
                  Event Analytics Dashboard
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Progress Bars */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-4">Event Distribution</h3>
                    <div className="space-y-4">
                      {Object.entries(analytics.eventsByType)
                        .sort((a, b) => b[1] - a[1])
                        .map(([type, count]) => {
                          const event = events.find(e => e.name === type);
                          const percentage = (count / analytics.totalEvents) * 100;
                          const barWidth = (count / maxCount) * 100;
                          
                          return (
                            <div key={type} className="bg-white p-4 rounded-xl shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{event?.emoji || '📊'}</span>
                                  <span className="font-medium text-gray-700">
                                    {event?.label || type}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-lg font-bold text-gray-900">{count}</span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500 relative"
                                  style={{
                                    width: `${barWidth}%`,
                                    backgroundColor: event?.color || '#4F46E5'
                                  }}
                                >
                                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4">System Information</h3>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        Database Technology
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>NeonDB PostgreSQL</strong> - Serverless cloud database with auto-scaling
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Same technology used by Notion, Vercel, and thousands of startups
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Server className="w-5 h-5 text-green-600" />
                        Message Queue
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Apache Kafka</strong> - Distributed event streaming platform
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Powers Netflix (500B events/day), Uber (100M rides), LinkedIn
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-500">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        Real-time Processing
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Event-Driven Architecture</strong> - Microservices pattern
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Asynchronous processing enables horizontal scaling to millions of events
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200">
                      <p className="text-sm font-semibold text-gray-800 mb-2">
                        🎯 Real-World Use Case
                      </p>
                      <p className="text-xs text-gray-600">
                        When you click "Browse Course", the system triggers the same workflow that happens when you:
                      </p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1 ml-4">
                        <li>• Click "Play" on Netflix</li>
                        <li>• Request a ride on Uber</li>
                        <li>• Add item to cart on Amazon</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Links */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                Developer Dashboard
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a 
                  href="http://localhost:8090" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-2xl mb-2">🎛️</div>
                  <div className="font-semibold text-sm text-gray-800">Kafka UI</div>
                  <div className="text-xs text-gray-600 mt-1">:8090</div>
                </a>
                
                <a 
                  href="http://localhost:9090" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold text-sm text-gray-800">Prometheus</div>
                  <div className="text-xs text-gray-600 mt-1">:9090</div>
                </a>
                
                <a 
                  href="http://localhost:3001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-semibold text-sm text-gray-800">Grafana</div>
                  <div className="text-xs text-gray-600 mt-1">:3001</div>
                </a>
                
                <a 
                  href="http://localhost:8080/actuator/health" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-2xl mb-2">❤️</div>
                  <div className="font-semibold text-sm text-gray-800">Health</div>
                  <div className="text-xs text-gray-600 mt-1">Check</div>
                </a>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t-2 border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                💻 <strong>Tech Stack:</strong> Spring Boot (Java 21) • Apache Kafka • React • PostgreSQL (NeonDB) • Prometheus • Grafana • Docker
              </p>
              <p className="text-xs text-gray-500">
                Enterprise-grade architecture • Production-ready patterns • Fortune 500 technology
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LandingPage;