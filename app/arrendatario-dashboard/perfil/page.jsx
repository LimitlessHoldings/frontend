'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Home, CheckCircle2 } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from "next/link"

// En un caso real, esto vendría de tu API
const getPerfil = (id) => {
  // Simulamos que solo existen inquilinos con IDs numéricos;
  return {
    id,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    edad: 35,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numeroPropiedades: 2,
    calificacionPromedio: 4.5,
    porcentajeCumplimiento: 98,
  }
}

export default function ArrendatarioProfile() {
  const router = useRouter()
  const [arrendatario, setArrendatario] = useState(null)
  const { user } = useAuth0()

  useEffect(() => {
    const fetchedArrendatario = getPerfil(user.sub)
    if (fetchedArrendatario) {
      setArrendatario(fetchedArrendatario)
    } else {
      router.push('/error')
    }
  }, [user, router])

  if (!arrendatario) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/arrendatario-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedaes
          </Link>
        </Button>
      </div>

      {/* Header con Avatar */}
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={arrendatario.avatar} alt={`${arrendatario.nombre} ${arrendatario.apellido}`} />
          <AvatarFallback>{arrendatario.nombre[0]}{arrendatario.apellido[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{arrendatario.nombre} {arrendatario.apellido}</h1>
          <p className="text-muted-foreground">Arrendatario</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{arrendatario.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apellido</p>
                <p className="font-medium">{arrendatario.apellido}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Correo electrónico</p>
              <p className="font-medium">{arrendatario.correo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="font-medium">{arrendatario.telefono}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Edad</p>
              <p className="font-medium">{arrendatario.edad} años</p>
            </div>
          </CardContent>
        </Card>

        {/* Información de Arrendamientos */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Arrendamientos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Número de Propiedades</p>
                <p className="text-2xl font-bold">{arrendatario.numeroPropiedades}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calificación Promedio</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{arrendatario.calificacionPromedio}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(arrendatario.calificacionPromedio)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Porcentaje de Cumplimiento</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{arrendatario.porcentajeCumplimiento}%</p>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${arrendatario.porcentajeCumplimiento}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

