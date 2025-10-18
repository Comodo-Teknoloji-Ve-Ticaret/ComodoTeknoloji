import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Eye, Star, Code, Palette, Globe, Zap, Users, ShoppingCart, Phone, Mail, MessageCircle, Menu, X, ChevronDown, ArrowRight, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WebSites = () => {
    // Navbar states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

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

    // Projects & Products data (tek bir örnek proje ve ürünler, gerekirse çoğaltılabilir)
    const projects = [
        {
            name: 'Web Siteleri',
            path: '/projects/web-sites',
            description: 'Özel tasarım web sitesi örnekleri'
        }
    ];
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
            path: '/projects/hotel-reviews'
        },
        {
            name: 'Karbon/Enerji Hesaplama',
            description: 'Otel ve işletmeler için enerji tüketimi ve karbon ayak izi hesaplama aracı',
            icon: <Leaf className="w-5 h-5" />,
            category: 'Sürdürülebilirlik',
            price: 'Özel Fiyat',
            path: '/projects/carbon'
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        { id: 'all', name: 'Tümü', count: 7 },
        { id: 'kurumsal', name: 'Kurumsal', count: 2 },
        { id: 'saglik', name: 'Sağlık', count: 2 },
        { id: 'eglence', name: 'Eğlence', count: 1 },
        { id: 'comodo', name: 'Comodo', count: 1 },
        { id: 'eticaret', name: 'E-ticaret', count: 1 }
    ];

    const websites = [
        {
            id: 1,
            title: 'Hukuk Bürosu',
            category: 'kurumsal',
            description: 'Hukuk bürosu için modern ve profesyonel web sitesi tasarımı',
            image: '/websites/attorney.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Responsive Tasarım', 'Hukuk Alanları', 'İletişim Formu', 'Avukat Profilleri'],
            launchDate: '2025-06-20',
            views: '8.5K',
            rating: 4.9,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/attorney/',
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 2,
            title: 'Diş Kliniği',
            category: 'saglik',
            description: 'Diş kliniği için modern ve güvenilir web sitesi tasarımı',
            image: '/websites/dental.png',
            technologies: ['React', 'JavaScript', 'Bootstrap'],
            features: ['Randevu Sistemi', 'Hizmet Tanıtımı', 'Doktor Profilleri', 'İletişim Bilgileri'],
            launchDate: '2025-04-12',
            views: '12.3K',
            rating: 4.8,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/DentalClinic/',
            color: 'from-green-500 to-teal-600'
        },
        {
            id: 3,
            title: 'Radyoloji Görüntüleme',
            category: 'saglik',
            description: 'Radyoloji merkezi için profesyonel ve güvenilir web sitesi',
            image: '/websites/radiology.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Görüntüleme Hizmetleri', 'Uzman Doktor Kadrosu', 'Online Randevu', 'Sonuç Takibi'],
            launchDate: '2025-02-28',
            views: '9.7K',
            rating: 4.7,
            liveUrl: 'https://comodo-teknoloji-ticaret-ltd-sti.github.io/radiology/',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            id: 4,
            title: 'Rafting',
            category: 'eglence',
            description: 'Rafting işletmesi için eğlenceli ve interaktif web sitesi',
            image: '/websites/raft.png',
            technologies: ['React', 'JavaScript', 'Gaming API'],
            features: ['Etkinlik Paketleri', '3 Farklı Dil Desteği', 'Etkinlik Takvimi', 'Topluluk Forumu'],
            launchDate: '2025-01-15',
            views: '15.2K',
            rating: 4.9,
            liveUrl: 'https://mcraftantalya.com/',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 5,
            title: 'Yapı Denetim',
            category: 'kurumsal',
            description: 'Yapı denetim firması için kurumsal web sitesi tasarımı',
            image: '/websites/yapidenetim.png',
            technologies: ['React', 'JavaScript', 'CSS3'],
            features: ['Kurumsal Kimlik', 'Hizmet Portfolyosu', 'Proje Galerisi', 'İletişim Bilgileri'],
            launchDate: '2024-12-08',
            views: '6.8K',
            rating: 4.6,
            liveUrl: 'https://gundemydk.com/',
            color: 'from-indigo-500 to-purple-600'
        },
        {
            id: 6,
            title: 'Comodo Bee',
            category: 'comodo',
            description: 'Comodo Bee arıcılık ürünleri satış platformu',
            image: '/websites/cbee.png',
            technologies: ['React', 'JavaScript', 'E-commerce'],
            features: ['Ürün Kataloğu', 'Online Satış', 'Arıcılık Rehberi', 'Müşteri Desteği'],
            launchDate: '2024-11-03',
            views: '11.4K',
            rating: 4.8,
            liveUrl: 'https://comodobee.com/',
            color: 'from-yellow-500 to-amber-600'
        },
        {
            id: 7,
            title: 'Comodo Print',
            category: 'eticaret',
            description: 'Dijital baskı ve tasarım hizmetleri e-ticaret platformu',
            image: '/websites/cprint.png',
            technologies: ['React', 'JavaScript', 'E-commerce'],
            features: ['Online Sipariş', 'Tasarım Editörü', 'Baskı Hesaplama', 'Kargo Takibi'],
            launchDate: '2024-10-17',
            views: '18.9K',
            rating: 4.9,
            liveUrl: 'https://comodoprint.com/',
            color: 'from-purple-500 to-pink-600'
        }
    ];

    const filteredWebsites = selectedCategory === 'all'
        ? websites
        : websites.filter(website => website.category === selectedCategory);

    const openWhatsApp = () => {
        window.open('https://wa.me/905059982093?text=Merhaba, web sitesi hizmetleri hakkında bilgi almak istiyorum.', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
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
            {/* Header/Navbar */}
            <header className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-transparent border-none shadow-none'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-2 rounded-xl">
                                    <img src="/ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-12 h-12 rounded-xl" />
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
                            {/* Sadece Ana Sayfa butonu */}
                            <button
                                onClick={() => navigate('/')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${scrollY <= 50 ? 'text-white' : 'text-blue-600'}`}
                                style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
                            >
                                Ana Sayfa
                            </button>

                            {/* Products Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${scrollY <= 50 ? 'text-white' : 'text-gray-600'} hover:text-gray-900 hover:bg-gray-100`}
                                >
                                    Ürünlerimiz
                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''} ${scrollY <= 50 ? 'text-white' : 'text-gray-600'}`} />
                                </button>
                                {isProductsDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50" style={{ transform: 'translateX(0)' }}>
                                        <div className="p-2 overflow-hidden">
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
                                                            <div className="flex items-center space-x-3 min-w-0">
                                                                <div className="flex-shrink-0 text-blue-600 bg-blue-50 p-2 rounded-lg">
                                                                    {product.icon}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="font-medium truncate">{product.name}</div>
                                                                    <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                                                                    <div className="text-xs text-blue-600 font-medium mt-1 truncate">
                                                                        {product.category} • {product.price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 ml-2">
                                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            </div>
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
                                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${scrollY <= 50 ? 'text-white' : 'text-gray-600'} hover:text-gray-900 hover:bg-gray-100`}
                                >
                                    Projelerimiz
                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''} ${scrollY <= 50 ? 'text-white' : 'text-gray-600'}`} />
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
                {isMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
                        <div className="px-4 py-6 space-y-2">
                            {/* Sadece Ana Sayfa butonu */}
                            <button
                                onClick={() => navigate('/')}
                                className="block w-full text-left px-4 py-3 rounded-xl text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-blue-200 transition-all duration-300"
                            >
                                Ana Sayfa
                            </button>
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
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Profesyonel Web Siteleri
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            İşletmenizin dijital kimliğini yansıtan, modern ve kullanıcı dostu web siteleri tasarlıyoruz
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Globe className="w-4 h-4" />
                                <span>Responsive Tasarım</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Zap className="w-4 h-4" />
                                <span>Hızlı Yükleme</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Code className="w-4 h-4" />
                                <span>SEO Optimized</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Palette className="w-4 h-4" />
                                <span>Özel Tasarım</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-sm opacity-75">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Website Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWebsites.map((website) => (
                            <div
                                key={website.id}
                                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => window.open(website.liveUrl, '_blank')}
                            >

                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={website.image}
                                        alt={website.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(website.liveUrl, '_blank');
                                            }}
                                            className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-white transition-colors duration-300"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Siteyi Görüntüle</span>
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                            {categories.find(cat => cat.id === website.category)?.name}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-900">{website.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {website.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {website.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {website.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-4">
                                        {website.features.slice(0, 2).map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                                {feature}
                                            </div>
                                        ))}
                                        {website.features.length > 2 && (
                                            <div className="text-sm text-gray-500">
                                                +{website.features.length - 2} daha fazla özellik
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(website.launchDate).toLocaleDateString('tr-TR')}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{website.views} görüntülenme</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Sizin İçin Özel Tasarım Yapalım
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        İşletmenizin ihtiyaçlarına özel, modern ve etkili web sitesi tasarımı için bizimle iletişime geçin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={openWhatsApp}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>WhatsApp ile İletişim</span>
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                            <Phone className="w-5 h-5" />
                            <span>Telefon: +90 505 998 20 93</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebSites;
