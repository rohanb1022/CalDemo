import { Card, CardContent } from '@/components/ui/card'
import { Shield, Calculator, TrendingUp, Zap, Lock, BarChart3, Users, Globe } from 'lucide-react'

export function Features() {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24 md:py-32 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Powerful Features for Smart Financial Planning
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Everything you need to manage your finances, calculate investments, and secure your financial future
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Financial Calculators */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Calculator className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Advanced Calculators
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Comprehensive financial calculators for loans, investments, retirement planning, and more. Get instant insights into your financial decisions.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Bank-Level Security
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Enterprise-grade encryption and security protocols. Your financial data is protected with the highest standards of cybersecurity.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Performance */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Lightning Fast
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Optimized for speed with instant calculations and real-time updates. Get results in milliseconds, not minutes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Investment Tracking */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Investment Analytics
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Track portfolio performance, analyze trends, and make data-driven investment decisions with comprehensive analytics tools.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Data Privacy */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Privacy First
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Your data never leaves your device. All calculations happen locally, ensuring complete privacy and data sovereignty.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Multi-Platform */}
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Cross-Platform
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Access your financial tools anywhere. Works seamlessly on desktop, tablet, and mobile devices with responsive design.
                            </p>
                        </CardContent>
                    </Card>

                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border-0 shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Transform Your Financial Planning?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Join thousands of users who trust our platform for their most important financial decisions. Start planning smarter today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Get Started Free
                            </button>
                            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-300">
                                View Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
