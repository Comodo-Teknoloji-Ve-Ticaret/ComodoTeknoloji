import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    LineElement,
    PointElement,
    Filler,
    ArcElement
} from 'chart.js';
import { ChevronRight, Code, Globe, Smartphone, Database, Shield, Users, Award, Mail, Phone, MapPin, Menu, X, Star, CheckCircle, ArrowRight, Zap, Target, TrendingUp, Eye, Clock, Palette, Cpu, Layers, Settings, Play, Quote, Briefcase, Rocket, LineChart, MessageCircle, Send, Bot, Minimize2, Maximize2, ChevronDown, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    LineElement,
    PointElement,
    Filler,
    ArcElement
);

const Electric = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [scrollY, setScrollY] = useState(0);
    
    // Date picker states - Varsayılan olarak haftalık veri gösterimi
    const [selectedDate, setSelectedDate] = useState('2025-06-01');
    const [dateRange, setDateRange] = useState({
        startDate: '2025-06-01',
        endDate: '2025-06-30'
    });
    const [dateFilterType, setDateFilterType] = useState('range'); // Varsayılan olarak haziran ayı aralığı

    // AI Assistant States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            text: 'Merhaba! Ben Comodo AI asistanıyım. Elektrik sayaçları hakkında size nasıl yardımcı olabilirim?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // AI Assistant Functions
    const getBotResponse = async (userMessage) => {
        try {
            setIsTyping(true);
            // Simulate AI response delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const responses = [
                "Elektrik sayaçları hakkında detaylı bilgi için 'Detaylı Analiz' sekmesine bakabilirsiniz.",
                "Güç tüketimi verilerini karşılaştırmak için 'Karşılaştırma' sekmesini kullanabilirsiniz.",
                "Cihaz dağılımını görmek için 'Dağılım & Tablo' sekmesini inceleyebilirsiniz.",
                "IoT sensörler sayesinde gerçek zamanlı veri topluyoruz ve analiz ediyoruz.",
                "Anomali tespiti ve uyarı sistemi ile enerji verimliliğinizi artırabilirsiniz."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const botMessage = {
                id: Date.now(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            
            setChatMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            setIsTyping(false);
            const errorMessage = {
                id: Date.now(),
                text: 'Özür dilerim, şu anda bir hata oluştu. Lütfen tekrar deneyin.',
                sender: 'bot',
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, errorMessage]);
        }
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
        
        // Get bot response
        await getBotResponse(currentMessage);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Date filtering function
    const filterDataByDate = (data) => {
        if (!data || data.length === 0) return data;
        
        try {
            if (dateFilterType === 'single') {
                // Tek tarih seçimi için - seçilen tarihe göre filtreleme
                const selectedDateObj = new Date(selectedDate);
                
                return data.filter(item => {
                    if (item.calismaSaati) {
                        // calismaSaati formatı: "2025-06-11 12:17:45"
                        const itemDate = new Date(item.calismaSaati.split(' ')[0]);
                        return itemDate.toDateString() === selectedDateObj.toDateString();
                    }
                    return false; // Tarih bilgisi yoksa dahil etme
                });
            } else {
                // Tarih aralığı seçimi için filtreleme
                const startDate = new Date(dateRange.startDate);
                const endDate = new Date(dateRange.endDate);
                
                return data.filter(item => {
                    if (item.calismaSaati) {
                        // calismaSaati formatı: "2025-06-11 12:17:45"
                        const itemDate = new Date(item.calismaSaati.split(' ')[0]);
                        return itemDate >= startDate && itemDate <= endDate;
                    }
                    return false; // Tarih bilgisi yoksa dahil etme
                });
            }
        } catch (error) {
            console.error('Tarih filtreleme hatası:', error);
            return data; // Hata durumunda tüm veriyi döndür
        }
    };

    const handleDateFilterChange = (type, value) => {
        if (type === 'single') {
            setSelectedDate(value);
        } else if (type === 'startDate') {
            setDateRange(prev => ({ ...prev, startDate: value }));
        } else if (type === 'endDate') {
            setDateRange(prev => ({ ...prev, endDate: value }));
        }
    };

    // Sample data for demonstration


    useEffect(() => {
        // Sayfa ilk açıldığında default olarak haziran ayı verileri yüklensin
        setSelectedDate('2025-06-01');
        setDateRange({ startDate: '2025-06-01', endDate: '2025-06-30' });
        setDateFilterType('range');
        const fetchData = async () => {
            try {
                setLoading(true);

                // JSON dosyasını fetch ile okuma
                const response = await fetch('/data/energy-data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                
                // Veri kontrolü
                if (jsonData && Array.isArray(jsonData) && jsonData.length > 0) {
                    setData(jsonData);
                    console.log('Veri başarıyla yüklendi:', jsonData.length, 'adet kayıt');
                } else {
                    throw new Error('JSON dosyası boş veya hatalı format');
                }

            } catch (err) {
                console.error('Veri yükleme hatası:', err);
                setError('Veri yüklenirken hata oluştu: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const groupAndAverageByDevice = (devices) => {
        const grouped = {};
        devices.forEach(d => {
            if (!grouped[d.cihazAdi]) grouped[d.cihazAdi] = [];
            if (d.anlikGuc !== null) grouped[d.cihazAdi].push(d.anlikGuc);
        });

        const labels = Object.keys(grouped);
        const data = labels.map(label => {
            const values = grouped[label];
            const sum = values.reduce((acc, val) => acc + val, 0);
            const avgWatt = sum / values.length;
            return convertWattToKwh(avgWatt).toFixed(2);
        });

        return { labels, data };
    };

    const getTotalConsumption = (devices) => {
        return devices
            .filter(d => d.anlikGuc !== null)
            .reduce((sum, d) => sum + d.anlikGuc, 0);
    };

    // Watt'ı KWh'a çeviren fonksiyon
    const convertWattToKwh = (wattValue, hours = 24) => {
        // 1 KWh = 1000 Watt * 1 saat
        // Günlük tüketim için 24 saat varsayıyoruz
        return (wattValue * hours) / 1000;
    };

    const formatPowerValue = (value, unit = 'kWh') => {
        if (unit === 'kWh') {
            const kwhValue = convertWattToKwh(value);
            if (kwhValue >= 1000) {
                return (kwhValue / 1000).toFixed(2) + ' MWh';
            }
            return kwhValue.toFixed(2) + ' kWh';
        }
        return value.toLocaleString() + ' W';
    };

    const generateColors = (count) => {
        const colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(255, 99, 255, 0.8)',
            'rgba(99, 255, 132, 0.8)'
        ];
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 10,
                        weight: 'bold'
                    },
                    maxRotation: 90,
                    minRotation: 45,
                    callback: function (value, index, values) {
                        const label = this.getLabelForValue(value);
                        if (label.length > 15) {
                            return label.substring(0, 15) + '...';
                        }
                        return label;
                    }
                }
            }
        }
    };

    const detailedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    title: function (context) {
                        return context[0].label;
                    },
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y} W`;
                    }
                }
            }
        },
        layout: {
            padding: {
                bottom: 60
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 11
                    },
                    callback: function (value) {
                        return value + ' kWh';
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#444',
                    font: {
                        size: 9,
                        weight: '600'
                    },
                    maxRotation: 90,
                    minRotation: 45,
                    padding: 10,
                    callback: function (value, index, values) {
                        const label = this.getLabelForValue(value);
                        const parts = label.split('_');
                        if (parts.length > 1) {
                            return parts[0] + '_' + parts[1];
                        }
                        return label.length > 12 ? label.substring(0, 12) + '...' : label;
                    }
                }
            }
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        const percentage = ((context.parsed / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                        const kwhValue = convertWattToKwh(context.parsed);
                        return `${context.label}: ${kwhValue.toFixed(2)} kWh (${percentage}%)`;
                    }
                }
            }
        }
    };

    // Mobile responsive pie chart options
    const getMobilePieChartOptions = () => ({
        ...pieChartOptions,
        plugins: {
            ...pieChartOptions.plugins,
            legend: {
                position: window.innerWidth < 768 ? 'bottom' : 'right',
                labels: {
                    font: {
                        size: window.innerWidth < 640 ? 10 : 12,
                        weight: 'bold'
                    },
                    padding: window.innerWidth < 640 ? 10 : 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-700">Sayaç verileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-xl font-semibold text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    const gsrDevices = data.filter(d => d.cihazAdi.startsWith('Lara'));
    const selDevices = data.filter(d => d.cihazAdi.startsWith('Kemer'));

    // Tarih filtreleme uygula
    const filteredData = filterDataByDate(data);
    const filteredGsrDevices = filterDataByDate(gsrDevices);
    const filteredSelDevices = filterDataByDate(selDevices);

    const gsrChart = groupAndAverageByDevice(filteredGsrDevices);
    const selChart = groupAndAverageByDevice(filteredSelDevices);

    const gsrTotal = getTotalConsumption(filteredGsrDevices);
    const selTotal = getTotalConsumption(filteredSelDevices);

    // Debug bilgisi
    console.log('Toplam veri sayısı:', data.length);
    console.log('Filtrelenmiş veri sayısı:', filteredData.length);
    console.log('Lara cihazları:', gsrDevices.length);
    console.log('Kemer cihazları:', selDevices.length);
    console.log('Filtrelenmiş Lara cihazları:', filteredGsrDevices.length);
    console.log('Filtrelenmiş Kemer cihazları:', filteredSelDevices.length);
    console.log('Aktif filtre tipi:', dateFilterType);
    console.log('Seçilen tarih:', selectedDate);
    console.log('Tarih aralığı:', dateRange);

    const comparisonData = {
        labels: ['Lara Otel', 'Kemer Otel'],
        datasets: [{
            label: 'Toplam Güç Tüketimi (kWh)',
            data: [convertWattToKwh(gsrTotal), convertWattToKwh(selTotal)],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 99, 132, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
        }]
    };

    const trendData = {
        labels: [...gsrChart.labels, ...selChart.labels],
        datasets: [
            {
                label: 'Lara Otel Cihazları',
                data: gsrChart.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Kemer Otel Cihazları',
                data: [...Array(gsrChart.labels.length).fill(null), ...selChart.data],
                borderColor: 'rgb(19, 18, 18)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    // Pie chart data for first 20 devices
    const displayData = filteredData;
    const pieData = {
        labels: displayData.slice(0, 20).map(d => d.cihazAdi),
        datasets: [{
            data: displayData.slice(0, 20).map(d => d.anlikGuc),
            backgroundColor: generateColors(Math.min(displayData.length, 20)),
            borderColor: generateColors(Math.min(displayData.length, 20)).map(color => color.replace('0.8', '1')),
            borderWidth: 2
        }]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                                <div className="relative bg-white text-white p-1 sm:p-2 rounded-xl">
                                    <img src="../ComodoTeknoloji.png" alt="Comodo Teknoloji" className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Comodo
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Teknoloji</p>
                            </div>
                        </div>

                        <nav className="flex items-center space-x-2 sm:space-x-4">
                            <Link
                                to="/"
                                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-300 text-sm sm:text-base"
                            >
                                <Home className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Sayaç Okuma</span>
                            </Link>
                            <Link
                                to="/carbon-footprint"
                                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                            >
                                <Zap className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Karbon Ayakizi</span>
                            </Link>
                            <Link
                                to="/hotel-reviews"
                                className="flex items-center px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                            >
                                <Star className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Otel Yorumları</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content - Add proper top padding */}
            <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Hero Section */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-blue-100 border border-blue-200 text-xs sm:text-sm mb-4 sm:mb-6">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />
                        <span className="text-blue-700">IoT Projesi</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Uzaktan Elektrik Sayaçları
                        </span>
                        <br />
                        <span className="text-gray-900">Okuma Sistemi</span>
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                        IoT teknolojisi ile elektrik sayaçlarını uzaktan okuma ve izleme sistemi.
                        Gerçek zamanlı veri toplama, analiz ve raporlama çözümü.
                    </p>
                </div>


                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-2xl sm:text-3xl">🏨</div>
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-500">Lara Otel</p>
                                <p className="text-lg sm:text-2xl font-bold text-blue-600">
                                    {gsrTotal > 0 ? formatPowerValue(gsrTotal) : '0.00 kWh'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-pink-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-2xl sm:text-3xl">🏖️</div>
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-500">Kemer Otel</p>
                                <p className="text-lg sm:text-2xl font-bold text-pink-600">
                                    {selTotal > 0 ? formatPowerValue(selTotal) : '0.00 kWh'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-purple-500 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-2xl sm:text-3xl">⚡</div>
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-500">Toplam Güç</p>
                                <p className="text-lg sm:text-2xl font-bold text-purple-600">
                                    {(gsrTotal + selTotal) > 0 ? formatPowerValue(gsrTotal + selTotal) : '0.00 kWh'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Picker Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">📅</span>
                            <h3 className="text-lg font-semibold text-gray-800">Tarih Filtresi</h3>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                            {/* Filter Type Toggle */}
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setDateFilterType('single')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        dateFilterType === 'single'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    Tek Tarih
                                </button>
                                <button
                                    onClick={() => setDateFilterType('range')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        dateFilterType === 'range'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    Tarih Aralığı
                                </button>
                            </div>

                            {/* Date Inputs */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                {dateFilterType === 'single' ? (
                                    <div className="flex flex-col">
                                        <label className="text-xs text-gray-600 mb-1">Tarih Seç</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => handleDateFilterChange('single', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-600 mb-1">Başlangıç Tarihi</label>
                                            <input
                                                type="date"
                                                value={dateRange.startDate}
                                                onChange={(e) => handleDateFilterChange('startDate', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-600 mb-1">Bitiş Tarihi</label>
                                            <input
                                                type="date"
                                                value={dateRange.endDate}
                                                onChange={(e) => handleDateFilterChange('endDate', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Quick Date Buttons */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        const today = new Date().toISOString().split('T')[0];
                                        setSelectedDate(today);
                                        setDateFilterType('single');
                                    }}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-200"
                                >
                                    Bugün
                                </button>
                                <button
                                    onClick={() => {
                                        const today = new Date();
                                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                                        setDateRange({
                                            startDate: weekAgo.toISOString().split('T')[0],
                                            endDate: today.toISOString().split('T')[0]
                                        });
                                        setDateFilterType('range');
                                    }}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium hover:bg-green-200 transition-colors duration-200"
                                >
                                    Bu Hafta
                                </button>
                                <button
                                    onClick={() => {
                                        const today = new Date();
                                        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                                        setDateRange({
                                            startDate: monthAgo.toISOString().split('T')[0],
                                            endDate: today.toISOString().split('T')[0]
                                        });
                                        setDateFilterType('range');
                                    }}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-200 transition-colors duration-200"
                                >
                                    Bu Ay
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Date Filter Info */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Aktif Filtre:</span> {' '}
                            {dateFilterType === 'single' 
                                ? `${new Date(selectedDate).toLocaleDateString('tr-TR')} tarihli veriler (${filteredData.length} adet kayıt)`
                                : `${new Date(dateRange.startDate).toLocaleDateString('tr-TR')} - ${new Date(dateRange.endDate).toLocaleDateString('tr-TR')} arasındaki veriler (${filteredData.length} adet kayıt)`
                            }
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 sm:mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide">
                            {[
                                {
                                    id: 'overview',
                                    label: 'Genel Bakış',
                                    icon: '📊',
                                    shortLabel: 'Genel'
                                },
                                {
                                    id: 'detailed',
                                    label: 'Detaylı Analiz',
                                    icon: '🔍',
                                    shortLabel: 'Detaylı'
                                },
                                {
                                    id: 'comparison',
                                    label: 'Karşılaştırma',
                                    icon: '⚖️',
                                    shortLabel: 'Karşılaştırma'
                                },
                                {
                                    id: 'distribution',
                                    label: 'Dağılım & Tablo',
                                    icon: '🥧',
                                    shortLabel: 'Dağılım'
                                }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-colors duration-200 whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.shortLabel}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center">
                                <span className="mr-2">⚖️</span>
                                Tesis Karşılaştırması
                            </h3>
                            <div className="h-64 sm:h-80">
                                <Bar data={comparisonData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Project Features Overview */}
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                                <span className="mr-2">🔧</span>
                                Proje Özellikleri
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">IoT sensörlerle otomatik okuma</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">Gerçek zamanlı veri izleme</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">Mobil uygulama desteği</span>
                                    </div>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">Anomali tespiti ve uyarı sistemi</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">Otomatik fatura hesaplama</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">Veri analizi ve raporlama</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'detailed' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">🏨 Lara Otel - Detaylı Analiz</h3>
                            <div className="h-64 sm:h-80 md:h-96">
                                <Bar data={{
                                    labels: gsrChart.labels,
                                    datasets: [{
                                        label: 'Ortalama Günlük Tüketim (kWh)',
                                        data: gsrChart.data,
                                        backgroundColor: generateColors(gsrChart.labels.length),
                                        borderColor: generateColors(gsrChart.labels.length).map(color => color.replace('0.8', '1')),
                                        borderWidth: 2,
                                        borderRadius: 8,
                                        borderSkipped: false,
                                    }]
                                }} options={detailedChartOptions} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">🏖️ Kemer Otel - Detaylı Analiz</h3>
                            <div className="h-64 sm:h-80 md:h-96">
                                <Bar data={{
                                    labels: selChart.labels,
                                    datasets: [{
                                        label: 'Ortalama Günlük Tüketim (kWh)',
                                        data: selChart.data,
                                        backgroundColor: generateColors(selChart.labels.length),
                                        borderColor: generateColors(selChart.labels.length).map(color => color.replace('0.8', '1')),
                                        borderWidth: 2,
                                        borderRadius: 8,
                                        borderSkipped: false,
                                    }]
                                }} options={detailedChartOptions} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">📈 Trend Analizi</h3>
                            <div className="h-64 sm:h-80 md:h-96">
                                <Line data={trendData} options={{
                                    ...chartOptions,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    plugins: {
                                        ...chartOptions.plugins,
                                        filler: {
                                            propagate: false,
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'distribution' && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* Pie Chart */}
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">🥧 Güç Tüketimi Dağılımı</h3>
                            <div className="h-64 sm:h-80 md:h-96">
                                <Pie data={pieData} options={getMobilePieChartOptions()} />
                                <p className="mt-2 text-xs text-gray-500">İlk 20 cihaz gösteriliyor.</p>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">📋 Detaylı Tüketim Tablosu</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cihaz Adı
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                Seri No
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                                Marka
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                                Voltaj (V)
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                                Akım (A)
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Günlük Tüketim (kWh)
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                                Toplam Günlük Tüketim (kWh)
                                            </th>
                                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                                                Son Güncelleme
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {displayData.slice(0, 20).map((device, index) => (
                                            <tr key={device.cihazId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 ${device.cihazAdi.startsWith('Kemer') ? 'bg-blue-500' : 'bg-pink-500'
                                                            }`}></div>
                                                        <span className="truncate max-w-[120px] sm:max-w-none">{device.cihazAdi}</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                                                    {device.seriNumarasi}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                                                    {device.marka}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                                                    {device.voltajlar}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                                                    {device.akimlar}
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${convertWattToKwh(device.anlikGuc) > 50 ? 'bg-red-100 text-red-800' :
                                                        convertWattToKwh(device.anlikGuc) > 30 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                        {convertWattToKwh(device.anlikGuc).toFixed(2)} kWh
                                                    </span>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                                                    {convertWattToKwh(device.toplamTuketim).toFixed(2)} kWh
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">
                                                    {device.calismaSaati}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-2 text-xs text-gray-500">İlk 20 cihaz gösteriliyor.</p>
                            </div>
                        </div>

                        {/* Summary Statistics */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="text-xl sm:text-2xl text-blue-600">📊</div>
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">Toplam Cihaz</p>
                                        <p className="text-lg sm:text-2xl font-bold text-gray-900">{displayData.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="text-xl sm:text-2xl text-green-600">📈</div>
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">Ortalama Günlük Tüketim</p>
                                        <p className="text-sm sm:text-2xl font-bold text-gray-900">
                                            {displayData.length > 0 ? (convertWattToKwh(displayData.reduce((sum, d) => sum + d.anlikGuc, 0) / displayData.length)).toFixed(2) : '0'} kWh
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="text-xl sm:text-2xl text-red-600">🔥</div>
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">En Yüksek Günlük Tüketim</p>
                                        <p className="text-sm sm:text-2xl font-bold text-gray-900">
                                            {displayData.length > 0 ? convertWattToKwh(Math.max(...displayData.map(d => d.anlikGuc))).toFixed(2) : '0'} kWh
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="text-xl sm:text-2xl text-blue-600">❄️</div>
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">En Düşük Günlük Tüketim</p>
                                        <p className="text-sm sm:text-2xl font-bold text-gray-900">
                                            {displayData.length > 0 ? convertWattToKwh(Math.min(...displayData.map(d => d.anlikGuc))).toFixed(2) : '0'} kWh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Assistant Chat */}
            {
                isChatOpen && (
                    <div className={`fixed bottom-4 right-4 z-[200] transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'
                        } bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
                        <div className="h-full flex flex-col">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Comodo AI</h3>
                                        <p className="text-xs text-blue-100">Elektrik Sayaçları Uzmanı</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
                                    >
                                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setIsChatOpen(false)}
                                        className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Chat Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-2xl">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
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
                        className="fixed bottom-4 right-4 z-[200] w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    >
                        <Bot className="w-6 h-6" />
                    </button>
                )
            }

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-3 rounded-xl">
                            <Code className="w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-2xl font-bold">Comodo Teknoloji</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">Dijital Dönüşüm Partneri</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-base">&copy; 2025 Comodo Teknoloji. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default Electric;