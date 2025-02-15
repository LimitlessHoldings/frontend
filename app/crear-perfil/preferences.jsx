'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const inquilinoSchema = z.object({
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  presupuesto: z.string().min(1, "El presupuesto es requerido"),
  habitaciones: z.string().min(1, "El número de habitaciones es requerido"),
  areaCuadrada: z.string().min(1, "El área cuadrada es requerida"),
  duracionContrato: z.enum(["6_meses", "1_año", "2_años", "mas_2_años"]),
  mascotas: z.enum(["si", "no"]),
})

const arrendatarioSchema = z.object({
  tipoInquilino: z.enum(["estudiante", "profesional", "familia"]),
  edadPreferida: z.enum(["18-25", "26-35", "36-50", "50+"]),
  generoPreferido: z.enum(["masculino", "femenino", "indiferente"]),
  fumador: z.enum(["si", "no", "indiferente"]),
  mascotasPermitidas: z.enum(["si", "no"]),
})

export function PreferencesForm({ onNext, onBack, initialData = {}, userRole }) {
  const schema = userRole === 'Inquilino' ? inquilinoSchema : arrendatarioSchema
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  function onSubmit(values) {
    onNext(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#27317E]">
            {userRole === 'Inquilino' ? 'Preferencias de Vivienda' : 'Preferencias de Inquilinos'}
          </h2>
          <p className="text-gray-500">
            {userRole === 'Inquilino' 
              ? 'Indícanos tus preferencias para encontrar la vivienda ideal.'
              : 'Indícanos tus preferencias sobre los inquilinos.'}
          </p>
        </div>

        {userRole === 'Inquilino' ? (
          <>
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación Preferida</FormLabel>
                  <FormControl>
                    <Input placeholder="Madrid Centro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="presupuesto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presupuesto Mensual (€)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="habitaciones"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Habitaciones</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="areaCuadrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área Cuadrada Mínima (m²)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duracionContrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración del Contrato Preferida</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la duración del contrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6_meses">6 meses</SelectItem>
                      <SelectItem value="1_año">1 año</SelectItem>
                      <SelectItem value="2_años">2 años</SelectItem>
                      <SelectItem value="mas_2_años">Más de 2 años</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mascotas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Tienes Mascotas?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Sí
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="tipoInquilino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Inquilino Preferido</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de inquilino" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="estudiante">Estudiante</SelectItem>
                      <SelectItem value="profesional">Profesional</SelectItem>
                      <SelectItem value="familia">Familia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="edadPreferida"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango de Edad Preferido</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el rango de edad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 años</SelectItem>
                      <SelectItem value="26-35">26-35 años</SelectItem>
                      <SelectItem value="36-50">36-50 años</SelectItem>
                      <SelectItem value="50+">Más de 50 años</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generoPreferido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género Preferido</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el género preferido" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="indiferente">Indiferente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fumador"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Acepta fumadores?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="indiferente">Indiferente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mascotasPermitidas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Permite mascotas?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Sí
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Atrás
          </Button>
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666]" >
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

