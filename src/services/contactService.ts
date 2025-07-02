import { supabase } from '../config/supabase'
import type { ContactMessage, ContactMessageInsert } from '../types/database'

export class ContactService {
  // Submit contact form
  static async submitContactMessage(message: ContactMessageInsert) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single()

    if (error) {
      console.error('Error submitting contact message:', error)
      throw new Error(`Failed to submit message: ${error.message}`)
    }

    return data as ContactMessage
  }

  // Get all messages (admin function)
  static async getAllMessages(options: {
    read?: boolean
    limit?: number
    offset?: number
  } = {}) {
    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (options.read !== undefined) {
      query = query.eq('read', options.read)
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching messages:', error)
      throw new Error(`Failed to fetch messages: ${error.message}`)
    }

    return data as ContactMessage[]
  }

  // Get unread messages count (admin function)
  static async getUnreadMessagesCount() {
    const { count, error } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('read', false)

    if (error) {
      console.error('Error fetching unread count:', error)
      throw new Error(`Failed to fetch unread count: ${error.message}`)
    }

    return count || 0
  }

  // Get message by ID (admin function)
  static async getMessageById(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching message:', error)
      throw new Error(`Failed to fetch message: ${error.message}`)
    }

    return data as ContactMessage
  }

  // Mark message as read (admin function)
  static async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error marking message as read:', error)
      throw new Error(`Failed to mark message as read: ${error.message}`)
    }

    return data as ContactMessage
  }

  // Mark message as unread (admin function)
  static async markAsUnread(id: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read: false })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error marking message as unread:', error)
      throw new Error(`Failed to mark message as unread: ${error.message}`)
    }

    return data as ContactMessage
  }

  // Delete message (admin function)
  static async deleteMessage(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting message:', error)
      throw new Error(`Failed to delete message: ${error.message}`)
    }

    return true
  }

  // Search messages (admin function)
  static async searchMessages(searchTerm: string) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%,message.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching messages:', error)
      throw new Error(`Failed to search messages: ${error.message}`)
    }

    return data as ContactMessage[]
  }
} 