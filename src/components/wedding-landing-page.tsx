'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Bus, ChevronDown, Check } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function WeddingLandingPageComponent() {
  const [isSticky, setIsSticky] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const weddingDate = new Date('2025-06-21T17:30:00')

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setIsSticky(window.pageYOffset > heroBottom)
      }
    }

    const timer = setInterval(() => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const gifts = [
    { id: 1, title: "Set de Cocina", image: "/placeholder.svg?height=200&width=300", reserved: false },
    { id: 2, title: "Viaje a París", image: "/placeholder.svg?height=200&width=300", reserved: true },
    { id: 3, title: "Juego de Sábanas", image: "/placeholder.svg?height=200&width=300", reserved: false },
    { id: 4, title: "Cena Romántica", image: "/placeholder.svg?height=200&width=300", reserved: false },
    { id: 5, title: "Vajilla Completa", image: "/placeholder.svg?height=200&width=300", reserved: true },
    { id: 6, title: "Curso de Cocina", image: "/placeholder.svg?height=200&width=300", reserved: false },
  ]

  const weatherData = [
    { time: '00:00', temperature: 10, precipitation: 0.1, sunHours: 0 },
    { time: '02:00', temperature: 9, precipitation: 0.1, sunHours: 0 },
    { time: '04:00', temperature: 8, precipitation: 0.1, sunHours: 0 },
    { time: '06:00', temperature: 8, precipitation: 0.1, sunHours: 0 },
    { time: '08:00', temperature: 11, precipitation: 0.1, sunHours: 1 },
    { time: '10:00', temperature: 15, precipitation: 0.1, sunHours: 2 },
    { time: '12:00', temperature: 18, precipitation: 0.1, sunHours: 3 },
    { time: '14:00', temperature: 20, precipitation: 0.1, sunHours: 3 },
    { time: '16:00', temperature: 22, precipitation: 0.1, sunHours: 3 },
    { time: '18:00', temperature: 20, precipitation: 0.1, sunHours: 2.5 },
    { time: '20:00', temperature: 17, precipitation: 0.1, sunHours: 1 },
    { time: '22:00', temperature: 13, precipitation: 0.1, sunHours: 0 },
];


  const scrollToNextSection = () => {
    const heroSection = document.getElementById('hero-section')
    if (heroSection) {
      const nextSection = heroSection.nextElementSibling as HTMLElement
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isSticky ? 'text-gray-800' : 'text-white'}`}>María & Gonzalo</h1>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Confirmar asistencia
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4">María & Gonzalo</h1>
          <p className="text-2xl">¡Nos casamos!</p>
        </div>
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer focus:outline-none"
          aria-label="Desplazarse a la siguiente sección"
        >
          <ChevronDown className="w-12 h-12" />
        </button>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Cuenta atrás para el gran día</h2>
          <div className="flex justify-center space-x-4">
            {Object.entries(countdown).map(([unit, value]) => (
              <Card key={unit} className="w-24">
                <CardHeader className="p-2">
                  <CardTitle className="text-3xl">{value}</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm capitalize">{unit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Previsión del tiempo</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperatura (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#82ca9d" name="Precipitaciones (mm)" />
                <Line yAxisId="right" type="monotone" dataKey="sunHours" stroke="#ffc658" name="Horas de sol" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Event Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Información del evento</h2>
          <div className="flex flex-col items-center space-y-8">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <MapPin className="mr-2" /> Ceremonia
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Real Monasterio de Santa María de El Paular</p>
                <p>Rascafría, M-604</p>
                <p>17:30 horas</p>
              </CardContent>
            </Card>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <MapPin className="mr-2" /> Celebración
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Finca el robledo</p>
                <p>Carretera, M-611, Km 30, 200, 28740 Rascafría</p>
                <p>19:30 horas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Ubicaciones</h2>
          <div className="aspect-w-16 aspect-h-9">
            <img src="/placeholder.svg?height=450&width=800" alt="Mapa de ubicaciones" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* Combined Schedule Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Horarios</h2>
          <div className="flex flex-col items-center space-y-8">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Clock className="mr-2" /> Horario del evento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Clock className="mr-4" />
                    <div>
                      <p className="font-bold">17:30</p>
                      <p>Ceremonia</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-4" />
                    <div>
                      <p className="font-bold">20:00</p>
                      <p>Cóctel de bienvenida</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-4" />
                    <div>
                      <p className="font-bold">21:30</p>
                      <p>Cena</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-4" />
                    <div>
                      <p className="font-bold">23:30</p>
                      <p>Baile</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Bus className="mr-2" /> Horario de autobuses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">17:30</p>
                      <p>Salida desde Plaza Mayor</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">19:30</p>
                      <p>Salida desde la Iglesia a la Finca</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">01:00</p>
                      <p>Primera salida de vuelta</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">03:00</p>
                      <p>Última salida de vuelta</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gifts Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Lista de Regalos</h2>
          <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
            <CarouselContent>
              {gifts.map((gift) => (
                <CarouselItem key={gift.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="relative overflow-hidden">
                    {gift.reserved && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <img src={gift.image} alt={gift.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-center">{gift.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Bank Account Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Cuenta Bancaria</h2>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Para regalos monetarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Si prefieres hacer un regalo en efectivo, puedes utilizar la siguiente cuenta bancaria:</p>
              <p className="font-bold">ES12 3456 7890 1234 5678 9012</p>
              <p className="mt-2">Titular: María Maggioni Martínez y Gonzalo Fidalgo Martínez-Merello</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}