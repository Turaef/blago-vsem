import { supabase } from '../config/supabase'
import type { Service, ServiceInsert, ServiceUpdate } from '../types/database'

export class ServicesService {
  // Get all active services
  static async getActiveServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error)
      throw new Error(`Failed to fetch services: ${error.message}`)
    }

    return data as Service[]
  }

  // Get all services (including inactive) - admin function
  static async getAllServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching all services:', error)
      throw new Error(`Failed to fetch all services: ${error.message}`)
    }

    return data as Service[]
  }

  // Get service by ID
  static async getServiceById(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching service:', error)
      throw new Error(`Failed to fetch service: ${error.message}`)
    }

    return data as Service
  }

  // Create new service (admin function)
  static async createService(service: ServiceInsert) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single()

    if (error) {
      console.error('Error creating service:', error)
      throw new Error(`Failed to create service: ${error.message}`)
    }

    return data as Service
  }

  // Update service (admin function)
  static async updateService(id: string, updates: ServiceUpdate) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating service:', error)
      throw new Error(`Failed to update service: ${error.message}`)
    }

    return data as Service
  }

  // Delete service (admin function)
  static async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting service:', error)
      throw new Error(`Failed to delete service: ${error.message}`)
    }

    return true
  }

  // Toggle service active status (admin function)
  static async toggleServiceStatus(id: string) {
    // First get current status
    const service = await this.getServiceById(id)
    
    // Toggle the status
    const { data, error } = await supabase
      .from('services')
      .update({ active: !service.active })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling service status:', error)
      throw new Error(`Failed to toggle service status: ${error.message}`)
    }

    return data as Service
  }
} 