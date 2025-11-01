"use client"

import { X } from "lucide-react"
import { Button } from "@components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { IOrder } from "../../../../types/model"
import Image from "next/image"
import { updateStatusOrderAPI } from "@lib/api/order"
import { notify } from "@lib/helpers/notify"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  data?: IOrder | null
}

export function OrderDetailsModal({ isOpen, onClose, data }: OrderDetailsModalProps) {
  if (!isOpen || !data) return null

  const subtotal = data.orderItems.reduce((sum, item) => {
    return sum + ((item.price - item.discount) * item.quantity)
  }, 0)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-800"
      case "UNPAID":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleConfirmOrder = async (orderId: string) => {
    try {
      const res = await updateStatusOrderAPI(orderId, "APPROVED");
      if (res.statusCode === 200) {
        notify.success(res.message)
      } else {
        notify.warning(res.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full md:w-2xl max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-visible">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 md:px-8 md:py-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <div className="flex items-center gap-3 mt-2">
              <code className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">{data.code}</code>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(data.status)}`}>
                {data.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 md:px-8 space-y-6">
          {/* Customer Section */}
          <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={data.user.avatar || "/user-avatar.jpg"} />
                <AvatarFallback className="bg-blue-100 text-blue-700">{getInitials(data.fullname)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{data.fullname}</p>
                <p className="text-sm text-gray-600 mt-1">📞 {data.phone}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Email</p>
                <p className="text-gray-900">{data.user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Delivery Address</p>
                <p className="text-gray-900">{data.address.location.split("-").join(", ")}</p>
              </div>
              <div className="flex gap-6 pt-2">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Payment Method</p>
                  <p className="font-medium text-gray-900">{data.payment.method}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Payment Status</p>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(data.payment.status)}`}
                  >
                    {data.payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {data.orderItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="relative h-16 w-24 overflow-hidden rounded-md">
                        <Image
                          src={item.product.mainImageUrl || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          sizes="100px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div>
                          <p className="font-semibold text-gray-900">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.product.code}</p>
                        </div>
                        <p className="font-semibold text-gray-900 whitespace-nowrap">
                          {formatCurrency((item.price - item.discount) * item.quantity)}
                        </p>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mt-2">
                        <span>
                          <span className="font-medium">{item.quantity}</span> × {formatCurrency(item.price)}
                        </span>
                        {item.discount > 0 && <span className="text-orange-600">-{formatCurrency(item.discount)}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t-2 border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>{formatCurrency(data.shippingFee)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-blue-600">{formatCurrency(data.totalAmount + data.shippingFee)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 md:px-8 md:py-6 flex gap-3 sticky bottom-0">
          <Button onClick={onClose} variant="outline" className="flex-1 rounded-lg bg-transparent">
            Cancel
          </Button>
          <Button onClick={() => {
            handleConfirmOrder(data._id)
            onClose()
          }} className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
