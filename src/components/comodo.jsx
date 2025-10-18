import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Globe, Smartphone, Database, Shield, Users, Award, Mail, Phone, MapPin, Menu, X, Star, CheckCircle, ArrowRight, Zap, Target, TrendingUp, Eye, Clock, Palette, Cpu, Layers, Settings, Play, Quote, Briefcase, Rocket, LineChart, MessageCircle, Send, Bot, Minimize2, Maximize2, ChevronDown, Leaf } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ElectricMeter from './ElectricMeterReading';
import HotelReviews from './OtelComments';
import CarbonCalculate from './CarbonCalculate';
import WebSites from './WebSites';

const ComodoWebsite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Web Geliştirme',
        message: ''
    });

    // AI Assistant States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            text: 'Merhaba! Ben Comodo AI asistanıyım. Size nasıl yardımcı olabilirim?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setIsProjectsDropdownOpen(false);
                setIsProductsDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const services = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Web Geliştirme",
            description: "Satış odaklı web siteleri ve e-ticaret platformları ile işletmenizin dijital varlığını güçlendirin.",
            features: ["Dönüşüm Optimizasyonu", "SEO & SEM", "Analytics Entegrasyonu", "Mobil Uyumlu Tasarım"],
            color: "from-orange-400 to-pink-500",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy",
            roi: "+300% Satış Artışı"
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Mobil Uygulama",
            description: "Müşteri deneyimini artıran, satış destekleyici mobil uygulamalar geliştiriyoruz.",
            features: ["Kullanıcı Deneyimi", "Push Notifications", "In-App Satışlar", "Analitik Dashboard"],
            color: "from-blue-400 to-purple-500",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=entropy",
            roi: "+250% Kullanıcı Etkileşimi"
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: "Veri Yönetimi",
            description: "Müşteri verilerinizi analiz ederek satış potansiyelinizi maksimize ediyoruz.",
            features: ["CRM Entegrasyonu", "Veri Analizi", "Tahminleme Modelleri", "Otomatik Raporlama"],
            color: "from-green-400 to-teal-500",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=entropy",
            roi: "+400% Veri Verimliliği"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Siber Güvenlik",
            description: "İş süreklilik planları ile dijital varlıklarınızı koruyarak müşteri güvenini artırın.",
            features: ["24/7 İzleme", "Risk Değerlendirme", "Compliance", "Güvenlik Eğitimleri"],
            color: "from-red-400 to-orange-500",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&crop=entropy",
            roi: "100% Güvenlik Garantisi"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "E-Ticaret Çözümleri",
            description: "Satış odaklı e-ticaret platformları ile online gelirlerinizi katlamaya odaklanıyoruz.",
            features: ["Conversion Optimization", "Ödeme Güvenliği", "Stok Otomasyonu", "Marketing Tools"],
            color: "from-purple-400 to-pink-500",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=entropy",
            roi: "+500% Online Satış"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Dijital Dönüşüm",
            description: "İş süreçlerinizi optimize ederek operasyonel maliyetleri düşürüp verimliliği artırıyoruz.",
            features: ["Süreç Otomasyonu", "Maliyet Optimizasyonu", "Performans Metrikleri", "Ekip Eğitimleri"],
            color: "from-indigo-400 to-blue-500",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&crop=entropy",
            roi: "+200% Operasyonel Verimlilik"
        }
    ];

    const features = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "ROI Garantisi",
            description: "Projelerimizde ölçülebilir sonuçlar garanti ediyoruz",
            metric: "Ortalama %300 ROI"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Hızlı Lansmаn",
            description: "Rekabet avantajı için hızlı piyasaya çıkış",
            metric: "30 Gün İçinde"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Sektör Liderliği",
            description: "6+ yıllık deneyimle sektörde öncü konumdayız",
            metric: "200+ Başarılı Proje"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Uzman Ekip",
            description: "Alanında uzman, sertifikalı profesyoneller",
            metric: "15+ Uzman"
        }
    ];

    const testimonials = [
        {
            name: "Ahmet Yılmaz",
            company: "CEO, TechStart A.Ş.",
            content: "Comodo ile çalıştıktan sonra online satışlarımız 6 ayda %400 arttı. ROI beklentilerimizi çok aştılar.",
            rating: 5,
            avatar: "AY",
            result: "%400 Satış Artışı",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Elif Demir",
            company: "Kurucu, Digital Solutions",
            content: "Mobil uygulamamız sayesinde müşteri memnuniyeti %95'e çıktı. Yatırım geri dönüşümü sadece 3 ayda gerçekleşti.",
            rating: 5,
            avatar: "ED",
            result: "%95 Müşteri Memnuniyeti",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Murat Kaya",
            company: "Genel Müdür, E-Commerce Pro",
            content: "E-ticaret platformumuz sayesinde operasyonel maliyetlerimiz %60 azaldı, karlılığımız ikiye katlandı.",
            rating: 5,
            avatar: "MK",
            result: "%200 Kar Artışı",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const stats = [
        { number: "200+", label: "Başarılı Proje", icon: <Award className="w-6 h-6" />, growth: "+50% YoY" },
        { number: "75+", label: "Mutlu Müşteri", icon: <Users className="w-6 h-6" />, growth: "%98 Memnuniyet" },
        { number: "6+", label: "Yıllık Deneyim", icon: <Target className="w-6 h-6" />, growth: "Sektör Lideri" },
        { number: "24/7", label: "Teknik Destek", icon: <Settings className="w-6 h-6" />, growth: "Kesintisiz Hizmet" }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'Web Geliştirme',
            message: ''
        });
    };

    // AI Assistant Functions
    const sendMessageToGemini = async (message) => {
        setIsTyping(true);

        try {
            // Bu kısımda Gemini API'ye gerçek istek gönderilecek
            // Şimdilik mock response kullanıyoruz
            await new Promise(resolve => setTimeout(resolve, 1500));

            const responses = [
                "Comodo olarak size web geliştirme, mobil uygulama, e-ticaret ve dijital dönüşüm hizmetleri sunuyoruz. Hangi konuda bilgi almak istiyorsunuz?",
                "Projelerimizde ortalama %300 ROI garanti ediyoruz. Size özel bir teklif hazırlamak için iletişim bilgilerinizi alabilir miyim?",
                "6+ yıllık deneyimimizle 200+ başarılı proje tamamladık. Sizin için de benzersiz bir çözüm üretebiliriz.",
                "Ücretsiz danışmanlık toplantısı planlamak ister misiniz? Size en uygun çözümü birlikte belirleyebiliriz."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const botMessage = {
                id: Date.now(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setChatMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            const errorMessage = {
                id: Date.now(),
                text: 'Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.',
                sender: 'bot',
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, errorMessage]);
        }

        setIsTyping(false);
    };

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: currentMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');

        await sendMessageToGemini(currentMessage);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const openWhatsApp = () => {
        window.open('https://wa.me/905059982093?text=Merhaba, Comodo hizmetleri hakkında bilgi almak istiyorum.', '_blank');
    };

    const navigate = useNavigate();

    // Projects data
    const projects = [
        {
            name: 'Web Siteleri',
            path: '/projects/web-sites',
            description: 'Özel tasarım web sitesi örnekleri'
        }
        // Projeler artık ürünler bölümüne taşındı
    ];

    // Products data
    const products = [
        {
            name: 'Uzaktan Elektrik Sayaçları Okuma',
            description: 'IoT tabanlı elektrik sayaçları okuma sistemi',
            icon: <Zap className="w-5 h-5" />,
            category: 'IoT Çözümleri',
            price: 'Özel Fiyat',
            path: '/projects/meter'
        },
        {
            name: 'Otel Yorumları Analizi',
            description: 'AI destekli otel yorumları analiz platformu',
            icon: <Eye className="w-5 h-5" />,
            category: 'AI Çözümleri',
            price: 'Özel Fiyat',
            path: 'https://hotalyze.com/'
        },
        {
            name: 'Müşteri Anket Sistemi ve Analizi',
            description: 'Detaylı BI Raporlamalı Müşteri Anket Sistemi',
            icon: <Eye className="w-5 h-5" />,
            category: 'Müşteri İyileştirme Çözümleri',
            price: 'Özel Fiyat',
            path: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/Anket/'
        },
        {
            name: 'Karbon/Enerji Hesaplama',
            description: 'Otel ve işletmeler için enerji tüketimi ve karbon ayak izi hesaplama aracı',
            icon: <Leaf className="w-5 h-5" />,
            category: 'Sürdürülebilirlik',
            price: 'Özel Fiyat',
            path: '/projects/carbon'
        },
        // {
        //     name: 'Comodo Mobile SDK',
        //     description: 'Mobil uygulama geliştirme kiti',
        //     icon: <Smartphone className="w-5 h-5" />,
        //     category: 'Mobil Çözümler',
        //     price: 'Aylık 299₺'
        // },
        // {
        //     name: 'Comodo Analytics',
        //     description: 'İş zekası ve veri analizi platformu',
        //     icon: <LineChart className="w-5 h-5" />,
        //     category: 'Veri Analitiği',
        //     price: 'Aylık 199₺'
        // },
        // {
        //     name: 'Comodo Security Suite',
        //     description: 'Kapsamlı siber güvenlik çözümleri',
        //     icon: <Shield className="w-5 h-5" />,
        //     category: 'Güvenlik',
        //     price: 'Aylık 499₺'
        // },
        // {
        //     name: 'Comodo CRM',
        //     description: 'Müşteri ilişkileri yönetim sistemi',
        //     icon: <Users className="w-5 h-5" />,
        //     category: 'İş Uygulamaları',
        //     price: 'Aylık 149₺'
        // }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
                    }}
                />
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-2 rounded-xl">
                                    <img src="./ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-12 h-12 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Comodo
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">Teknoloji</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-1">
                            {[{
                                name: 'Ana Sayfa',
                                id: 'home'
                            }, {
                                name: 'İletişim',
                                id: 'contact'
                            }].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeSection === item.id
                                        ? 'bg-blue-100 text-blue-600 backdrop-blur-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                            {/* Products Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                                    className="flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    Ürünlerimiz
                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProductsDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50">
                                        <div className="p-2">
                                            {products.map((product, index) => {
                                                const ProductComponent = product.path ? Link : 'div';
                                                const productProps = product.path ? { to: product.path } : {};

                                                return (
                                                    <ProductComponent
                                                        key={index}
                                                        {...productProps}
                                                        className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group cursor-pointer"
                                                        onClick={() => setIsProductsDropdownOpen(false)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                                                                    {product.icon}
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">{product.name}</div>
                                                                    <div className="text-sm text-gray-500">{product.description}</div>
                                                                    <div className="text-xs text-blue-600 font-medium mt-1">
                                                                        {product.category} • {product.price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        </div>
                                                    </ProductComponent>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Projects Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                                    className="flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    Projelerimiz
                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProjectsDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50">
                                        <div className="p-2">
                                            {projects.length > 0 ? (
                                                projects.map((project, index) => (
                                                    <Link
                                                        key={index}
                                                        to={project.path}
                                                        className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
                                                        onClick={() => setIsProjectsDropdownOpen(false)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium">{project.name}</div>
                                                                <div className="text-sm text-gray-500">{project.description}</div>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-center text-gray-500">
                                                    <div className="text-sm">Projelerimiz artık</div>
                                                    <div className="text-sm font-medium text-blue-600">Ürünlerimiz</div>
                                                    <div className="text-sm">bölümünde yer alıyor</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>


                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-xl bg-gray-100 backdrop-blur-sm border border-gray-200"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {
                    isMenuOpen && (
                        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
                            <div className="px-4 py-6 space-y-2">
                                {[{
                                    name: 'Ana Sayfa',
                                    id: 'home'
                                }, {
                                    name: 'İletişim',
                                    id: 'contact'
                                }].map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.id)}
                                        className="block w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                                    >
                                        {item.name}
                                    </button>
                                ))}

                                {/* Mobile Projects Section */}
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Projelerimiz
                                    </div>
                                    {projects.length > 0 ? (
                                        projects.map((project, index) => (
                                            <Link
                                                key={index}
                                                to={project.path}
                                                className="block px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="font-medium">{project.name}</div>
                                                <div className="text-sm text-gray-500">{project.description}</div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-center text-gray-500">
                                            <div className="text-sm">Projelerimiz artık</div>
                                            <div className="text-sm font-medium text-blue-600">Ürünlerimiz</div>
                                            <div className="text-sm">bölümünde yer alıyor</div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Products Section */}
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Ürünlerimiz
                                    </div>
                                    {products.map((product, index) => {
                                        const ProductComponent = product.path ? Link : 'div';
                                        const productProps = product.path ? { to: product.path } : {};

                                        return (
                                            <ProductComponent
                                                key={index}
                                                {...productProps}
                                                className="block px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                                                        {product.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        <div className="text-sm text-gray-500">{product.description}</div>
                                                        <div className="text-xs text-blue-600 font-medium mt-1">
                                                            {product.category} • {product.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ProductComponent>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
            </header>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-sm">
                                    <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                                    <span className="text-blue-700">İşletmenizin Dijital Satış Partneri</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                    <span className="text-gray-900">Satışlarınızı</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        3 Katına
                                    </span>
                                    <br />
                                    <span className="text-gray-900">Çıkarın</span>
                                </h1>

                                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                                    Dijital dönüşümle işletmenizin satış performansını artırıyor,
                                    <span className="text-blue-600 font-semibold"> ölçülebilir sonuçlar</span> garantiliyoruz.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Ücretsiz Analiz Al
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <button
                                    onClick={() => scrollToSection('success')}
                                    className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 backdrop-blur-sm flex items-center"
                                >
                                    <Play className="mr-2 w-5 h-5" />
                                    Başarı Hikayeleri
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">200+</div>
                                    <div className="text-sm text-gray-500">Başarılı Proje</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">%400</div>
                                    <div className="text-sm text-gray-500">Ortalama ROI</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">30 Gün</div>
                                    <div className="text-sm text-gray-500">İlk Sonuçlar</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-60"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=entropy"
                                    alt="Dijital Dönüşüm"
                                    className="relative rounded-3xl shadow-2xl border border-gray-200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent rounded-3xl"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm text-gray-600">Bu Ay Gerçekleşen</div>
                                                <div className="text-2xl font-bold text-blue-600">+%347</div>
                                                <div className="text-sm text-gray-500">Satış Artışı</div>
                                            </div>
                                            <div className="text-green-500">
                                                <TrendingUp className="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-gray-900">Neden </span>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Comodo?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600">İşletmenizin dijital başarısını garanti eden faktörler</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 group-hover:border-blue-300 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                                    <div className="text-blue-600 font-bold text-lg">{feature.metric}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-sm mb-6">
                            <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-blue-700">Çözümlerimiz</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Satış Odaklı
                            </span>
                            <br />
                            <span className="text-gray-900">Dijital Çözümler</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Her çözümümüz ROI'nizi artırmak ve işletmenizin büyümesini hızlandırmak için tasarlandı
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl overflow-hidden group-hover:border-gray-300 transition-all duration-500 transform group-hover:-translate-y-2 shadow-xl">

                                    {/* Service Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                {service.roi}
                                            </div>
                                        </div><div className="absolute bottom-4 left-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                                                {service.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                                        <div className="space-y-2 mb-6">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl font-medium text-gray-700 hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 group/btn">
                                            <span className="flex items-center justify-center">
                                                Detayları İncele
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Banner */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Ücretsiz Dijital Analiz Raporu
                            </h3>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                İşletmenizin dijital potansiyelini analiz ediyor, size özel büyüme stratejileri sunuyoruz
                            </p>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Hemen Başvur
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Rakamlarla
                            </span> Başarımız
                        </h2>
                        <p className="text-xl text-gray-300">6+ yıllık deneyimimizle elde ettiğimiz sonuçlar</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                                    <div className="text-blue-400 mb-4 flex justify-center">{stat.icon}</div>
                                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        {stat.number}
                                    </div>
                                    <div className="text-lg text-gray-300 mb-2">{stat.label}</div>
                                    <div className="text-sm text-blue-400 font-medium">{stat.growth}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section id="success" className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 border border-green-200 text-sm mb-6">
                            <LineChart className="w-4 h-4 mr-2 text-green-600" />
                            <span className="text-green-700">Başarı Hikayeleri</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="text-gray-900">Müşterilerimizin</span>
                            <br />
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Büyüme Hikayesi
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dijital dönüşümle işletmelerinin satışını katlamış müşterilerimizin deneyimleri
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 group-hover:border-gray-300 transition-all duration-500 transform group-hover:-translate-y-2 shadow-xl">

                                    {/* Rating */}
                                    <div className="flex space-x-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <div className="mb-6">
                                        <Quote className="w-8 h-8 text-blue-200 mb-4" />
                                        <p className="text-gray-700 text-lg leading-relaxed italic">
                                            "{testimonial.content}"
                                        </p>
                                    </div>

                                    {/* Result Badge */}
                                    <div className="mb-6">
                                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
                                            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                                            <span className="text-green-700 font-semibold text-sm">{testimonial.result}</span>
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full border-2 border-gray-200 mr-4"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500">{testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-sm mb-6">
                                    <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    <span className="text-blue-700">İletişim</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="text-gray-900">Hemen </span>
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Başlayalım
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Ücretsiz danışmanlık için bizimle iletişime geçin. Size özel dijital büyüme stratejinizi birlikte oluşturalım.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Telefon</div>
                                        <div className="text-gray-600">+90 505 998 20 93</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">E-posta</div>
                                        <div className="text-gray-600">comodo.ltd.sti@gmail.com</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Adres</div>
                                        <div className="text-gray-600">Antalya, Türkiye</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={openWhatsApp}
                                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-300"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                WhatsApp ile İletişim
                            </button>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ücretsiz Danışmanlık</h3>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ad Soyad *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Adınızı girin"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            E-posta *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="E-posta adresinizi girin"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Telefon numaranızı girin"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        İlgilendiğiniz Hizmet
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="Web Geliştirme">Web Geliştirme</option>
                                        <option value="Mobil Uygulama">Mobil Uygulama</option>
                                        <option value="E-ticaret">E-ticaret Çözümleri</option>
                                        <option value="Dijital Dönüşüm">Dijital Dönüşüm</option>
                                        <option value="Siber Güvenlik">Siber Güvenlik</option>
                                        <option value="Veri Yönetimi">Veri Yönetimi</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Projeniz hakkında detay verebilir misiniz?"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <span className="flex items-center justify-center">
                                        Gönder
                                        <Send className="ml-2 w-5 h-5" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Assistant Chat */}
            {
                isChatOpen && (
                    <div className={`fixed bottom-4 right-20 z-[200] transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'
                        }`}>
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Comodo AI</div>
                                        <div className="text-xs opacity-75">Hemen yardım alın</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="p-1 hover:bg-white/20 rounded"
                                    >
                                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setIsChatOpen(false)}
                                        className="p-1 hover:bg-white/20 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Chat Messages */}
                                    <div className="h-64 overflow-y-auto p-4 space-y-4">
                                        {chatMessages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs px-4 py-2 rounded-2xl ${message.sender === 'user'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.text}</p>
                                                    <div className="text-xs opacity-75 mt-1">
                                                        {message.timestamp.toLocaleTimeString('tr-TR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Chat Input */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={currentMessage}
                                                onChange={(e) => setCurrentMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Mesajınızı yazın..."
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!currentMessage.trim() || isTyping}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            }

            {/* AI Assistant Toggle Button */}
            {
                !isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-4 right-20 z-[200] w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    >
                        <Bot className="w-6 h-6" />
                    </button>
                )
            }

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl">
                                    <Code className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Comodo Teknoloji</h3>
                                    <p className="text-gray-400 text-sm">Dijital Dönüşüm Partneri</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                İşletmenizin dijital dönüşümünde güvenilir ortağınız.
                                Satış odaklı çözümlerle büyümenizi hızlandırıyoruz.
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-gray-800 p-3 rounded-xl">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="bg-gray-800 p-3 rounded-xl">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="bg-gray-800 p-3 rounded-xl">
                                    <MessageCircle className="w-5 h-5 text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Hizmetler</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Web Geliştirme</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Mobil Uygulama</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">E-ticaret</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Dijital Dönüşüm</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Siber Güvenlik</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>+90 505 998 20 93</li>
                                <li>comodoteknoloji@gmail.com</li>
                                <li>Antalya, Türkiye</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Comodo Teknoloji. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div >
    );
};

// Remove the inline component definitions and update the App component
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ComodoWebsite />} />
                <Route path="/projects/meter" element={< ElectricMeter />} />
                <Route path="/projects/hotel-reviews" element={< HotelReviews />} />
                <Route path="/projects/web-sites" element={<WebSites />} />
                <Route path="/projects/carbon" element={<CarbonCalculate />} />
                {/* <Route path="/projects/mobile-banking" element={<div className="min-h-screen pt-20 flex items-center justify-center"><h1 className="text-4xl">Mobil Bankacılık - Yakında</h1></div>} /> */}
            </Routes>
        </Router>
    );
};

export default App;