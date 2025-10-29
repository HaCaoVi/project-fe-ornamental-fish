"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useMemo } from "react"
import { z } from "zod"
import { IUser } from "../../../types/model"
import { updateProfileAPI } from "@lib/api/auth"
import { notify } from "@lib/helpers/notify"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Calendar } from "@components/ui/calendar"
import { cn } from "@components/lib/utils"
import { format } from "date-fns"
import AddressCustomize from "../../lib/AddressSelectGHN"

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  birthday: z.preprocess((val: any) => {
    const date = val instanceof Date ? val : new Date(val)
    return isNaN(date.getTime()) ? undefined : date
  },
    z.date().refine((date) => date < new Date(), {
      message: "Birthday must be a past date",
    })),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address must be less than 200 characters"),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  profile: IUser
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      birthday: new Date(profile.birthday),
      gender: profile.gender,
      address: profile.address,
    },
  })

  const formValues = watch()

  const hasChanges = useMemo(() => {
    return (
      formValues.name !== profile.name ||
      formValues.birthday + "" !== new Date(profile.birthday) + "" ||
      formValues.gender !== profile.gender ||
      formValues.address !== profile.address
    )
  }, [formValues, profile])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      if (!hasChanges) {
        notify.info("No changes detected");
        return;
      }
      const res = await updateProfileAPI(data)
      if (res.statusCode === 200) {
        notify.success(res.message)
      } else {
        notify.warning(res.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Edit Profile</h3>
        <p className="mt-1 text-sm text-muted-foreground">Update your personal information below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
            Full Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                disabled={isSubmitting}
                className="mt-2 border-border focus:border-primary"
                placeholder="Enter your full name"
              />
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        {/* Email (read-only) */}
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
          <div className="mt-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <span className="text-foreground">{profile.email}</span>
            <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
          </div>
        </div>
        {/* Birthday */}
        <div>
          <Label htmlFor="birthday" className="text-sm font-medium text-muted-foreground">
            Birthday
          </Label>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full text-left", !field.value && "text-muted-foreground")}>
                    {field.value ? format(field.value, "PPP") : "Select birthday"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.birthday && <p className="mt-1 text-xs text-destructive">{errors.birthday.message}</p>}
        </div>
        {/* Gender */}
        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-muted-foreground">
            Gender
          </Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="gender" className="mt-2 border-border focus:border-primary">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && <p className="mt-1 text-xs text-destructive">{errors.gender.message}</p>}
        </div>
        {/* Address */}
        <div>
          <Label htmlFor="address" className="text-sm font-medium text-muted-foreground">
            Address
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AddressCustomize {...field} />
            )}
          />
          {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
        </div>
        {/* Action buttons */}
        {hasChanges && (
          <div className="flex gap-3 border-t border-border pt-6">
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}
