// src/routes/test/index.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
  IndianRupee,
  Loader2,
  Save,
  Send,
  Trash2,
  Upload,
} from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

/* -------------------------------------------------- */
/* 1. Schema & Types                                   */
/* -------------------------------------------------- */
const createEventSchema = z
  .object({
    eventName: z.string().min(3).max(60),
    activityType: z.enum([
      'Hyrox',
      'Jiu Jitsu',
      'Rock Climbing',
      'Yoga',
      'Pilates',
      'Bootcamp',
      'Running',
      'Cycling',
      'Swimming',
      'Strength',
      'Other',
    ]),
    description: z.string().max(500).optional(),
    price: z.number().min(0).default(0),
    capacity: z.number().min(1).default(20),
    minCapacity: z.number().min(1).default(1),
    venueName: z.string().min(2),
    fullAddress: z.string().min(5),
    city: z.enum(['Bengaluru', 'Mumbai']),
    startDateTime: z
      .string()
      .refine((v) => new Date(v) >= new Date(), 'Start must be future'),
    endDateTime: z
      .string()
      .refine((v) => new Date(v) > new Date(), 'End must be after start'),
    status: z.enum(['draft', 'published']).default('draft'),
  })
  .refine(
    (d) =>
      new Date(d.endDateTime).getTime() - new Date(d.startDateTime).getTime() >=
      30 * 60 * 1000,
    {
      message: 'Event must be ≥ 30 min',
      path: ['endDateTime'],
    },
  )
  .refine((d) => d.minCapacity <= d.capacity, {
    message: 'Min ≤ Capacity',
    path: ['minCapacity'],
  })

type CreateEventFormData = z.infer<typeof createEventSchema>
interface ImageFile {
  id: string
  file: File
  preview: string
  isUploading?: boolean
  uploadProgress?: number
}

/* -------------------------------------------------- */
/* 2. Route Definition                                  */
/* -------------------------------------------------- */
export const Route = createFileRoute('/create/event/')({ component: Page })

function Page() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: { price: 0, capacity: 20, minCapacity: 1, status: 'draft' },
  })

  const watched = watch()
  const price = watch('price')

  /* ---------- 3. Image Handlers ---------- */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFiles(Array.from(e.dataTransfer.files))
  }
  const handleFiles = (files: File[]) => {
    const valid = files.filter(
      (f) =>
        f.type.startsWith('image/') &&
        f.size <= 5 * 1024 * 1024 &&
        images.length + files.length <= 5,
    )
    const newImgs = valid.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
      isUploading: true,
      uploadProgress: 0,
    }))
    setImages((prev) => [...prev, ...newImgs])
    newImgs.forEach((img, i) =>
      setTimeout(() => simulateUpload(img.id), i * 200),
    )
  }
  const simulateUpload = (id: string) => {
    let progress = 0
    const int = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(int)
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, isUploading: false, uploadProgress: 100 }
              : img,
          ),
        )
      } else {
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, uploadProgress } : img)),
        )
      }
    }, 100)
  }
  const removeImage = (id: string) => {
    const url = images.find((i) => i.id === id)?.preview
    if (url) URL.revokeObjectURL(url)
    setImages((prev) => prev.filter((i) => i.id !== id))
  }

  /* ---------- 4. Submit ---------- */
  const onSubmit = async (data: CreateEventFormData) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000)) // fake API
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    setImages([])
  }

  /* ---------- 5. Render ---------- */
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-linear-to-br from-purple-600 via-indigo-600 to-cyan-500 opacity-30" />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 z-50 -translate-x-1/2 glass rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <span className="font-medium text-white">Event created!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl p-6 md:p-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Create Event – Daylife
          </h1>
          <p className="mt-2 text-slate-300">
            Share your fitness passion with the community
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* LEFT - IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Cover Image
              </h3>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${dragActive ? 'border-cyan-400 bg-cyan-400/10 scale-105' : 'border-white/30 hover:border-white/50'}`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleFiles(Array.from(e.target.files))
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={images.length >= 5}
                />
                {dragActive ? (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-cyan-400" />
                    <p className="text-cyan-400 font-medium">
                      Drop images here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="text-slate-300">
                      Drop cover image here or click to browse
                    </p>
                    <p className="text-xs text-slate-400">
                      1 required, up to 5 images, max 5 MB each
                    </p>
                  </div>
                )}
              </div>

              {images.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-slate-300">
                    Uploaded Images
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        {img.isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Trash2 className="h-3 w-3 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Event Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Name *
              </label>
              <input
                {...register('eventName')}
                type="text"
                placeholder="e.g., Morning Hyrox Training"
                className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none ${errors.eventName ? 'border-red-500' : ''}`}
              />
              <div className="mt-1 flex justify-end text-xs text-slate-400">
                {watched.eventName?.length || 0}/60
              </div>
              {errors.eventName && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.eventName.message}
                </p>
              )}
            </div>

            {/* Activity Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Activity Type *
              </label>
              <Controller
                name="activityType"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className={`w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none ${errors.activityType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select activity type</option>
                      {[
                        'Hyrox',
                        'Jiu Jitsu',
                        'Rock Climbing',
                        'Yoga',
                        'Pilates',
                        'Bootcamp',
                        'Running',
                        'Cycling',
                        'Swimming',
                        'Strength',
                        'Other',
                      ].map((t) => (
                        <option key={t} value={t} className="bg-slate-800">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                )}
              />
              {errors.activityType && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.activityType.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Tell people what makes your event special..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
              />
              <div className="mt-1 flex justify-end text-xs text-slate-400">
                {watched.description?.length || 0}/500
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Price
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-slate-400">
                  <IndianRupee className="h-4 w-4" />
                  <span>₹</span>
                </div>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                {price === 0 && (
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                      Free
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Leave 0 for free events
              </p>
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Capacity
                </label>
                <input
                  {...register('capacity', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                <p className="mt-1 text-xs text-slate-400">Max attendees</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Min Capacity
                </label>
                <input
                  {...register('minCapacity', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                <p className="mt-1 text-xs text-slate-400">Min required</p>
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Venue Name *
              </label>
              <input
                {...register('venueName')}
                type="text"
                placeholder="e.g., Cult.fit Indiranagar"
                className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none ${errors.venueName ? 'border-red-500' : ''}`}
              />
              {errors.venueName && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.venueName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Address *
              </label>
              <textarea
                {...register('fullAddress')}
                rows={3}
                placeholder="Complete address with landmarks"
                className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none ${errors.fullAddress ? 'border-red-500' : ''}`}
              />
              {errors.fullAddress && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.fullAddress.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                City *
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className={`w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none ${errors.city ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select city</option>
                      {['Bengaluru', 'Mumbai'].map((c) => (
                        <option key={c} value={c} className="bg-slate-800">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                )}
              />
              {errors.city && (
                <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Date / Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Start Date & Time *
                </label>
                <input
                  {...register('startDateTime')}
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none ${errors.startDateTime ? 'border-red-500' : ''}`}
                />
                <p className="mt-1 text-xs text-slate-400">
                  Asia/Kolkata timezone
                </p>
                {errors.startDateTime && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.startDateTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  End Date & Time *
                </label>
                <input
                  {...register('endDateTime')}
                  type="datetime-local"
                  min={
                    watched.startDateTime
                      ? new Date(
                          new Date(watched.startDateTime).getTime() +
                            30 * 60 * 1000,
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ''
                  }
                  className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none ${errors.endDateTime ? 'border-red-500' : ''}`}
                />
                {errors.endDateTime && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.endDateTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    {...register('status')}
                    type="radio"
                    value="draft"
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${watched.status === 'draft' ? 'border-cyan-400 bg-cyan-400' : 'border-white/30'}`}
                  />
                  <span className="text-slate-300">Draft</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    {...register('status')}
                    type="radio"
                    value="published"
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${watched.status === 'published' ? 'border-cyan-400 bg-cyan-400' : 'border-white/30'}`}
                  />
                  <span className="text-slate-300">Publish</span>
                </label>
              </div>
            </div>
          </motion.div>
        </form>

        {/* Sticky Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="sticky bottom-0 left-0 right-0 z-20 mt-8 rounded-2xl p-4 glass"
        >
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setValue('status', 'draft')}
              disabled={isSubmitting}
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
            >
              {isSubmitting && watched.status === 'draft' ? (
                <>
                  <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 inline h-5 w-5" />
                  Save as Draft
                </>
              )}
            </button>

            <button
              type="submit"
              onClick={() => setValue('status', 'published')}
              disabled={isSubmitting || images.length === 0}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white transition hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {isSubmitting && watched.status === 'published' ? (
                <>
                  <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="mr-2 inline h-5 w-5" />
                  Publish Event
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
