'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Bed, Bath, MapPin, Users } from 'lucide-react'

export function OpenPropertyCard({ property, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={property.media[0].mediaUrl}
            alt={`Imagen de ${property.address}`}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground line-clamp-2 font-spaceGrotesk">{property.address}</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold font-inter">
              Numero Candidatos
              </h3>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-400" />
              <p className="text-xl font-bold">{property.candidates.length}</p>
            </div>
            
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center gap-4 text-sm font-inter">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span >{property.bedrooms} Dormitorio{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.bathrooms} Baño{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

