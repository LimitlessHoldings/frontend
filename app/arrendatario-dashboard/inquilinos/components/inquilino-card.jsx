import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Phone, Home, DollarSign } from 'lucide-react'
import Link from "next/link"

export function TenantCard({ tenant }) {
  return (
    <Link href={`/dashboard/tenants/${tenant.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={tenant.image} alt={`${tenant.name} ${tenant.lastName}`} />
              <AvatarFallback>{tenant.name[0]}{tenant.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{tenant.name} {tenant.lastName}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{tenant.classification}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{tenant.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span>{tenant.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              <span>{tenant.phone}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Home className="h-4 w-4 mr-2" />
              <span>{tenant.currentProperty}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium">Canon Arrendamiento</span>
            <span className="text-lg font-semibold flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {tenant.monthlyRent}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
