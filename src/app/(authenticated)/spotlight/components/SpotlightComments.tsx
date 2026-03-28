"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Text, Flex, Button, Input, Form } from '@fet/theme/ui'
import { SpotlightCommentSdk } from '../sdk'
import { SpotlightComment } from '../types'

type Props = {
    spotlightId: string
    currentUserId?: string
}

export default function SpotlightComments({ spotlightId, currentUserId }: Props) {
    const [comments, setComments] = useState<SpotlightComment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newComment, setNewComment] = useState('')

    const fetchComments = async () => {
        try {
            const res = await SpotlightCommentSdk.getAll(spotlightId)
            // @ts-ignore - SDK type definition SuccessItemsResponse<T> vs runtime array
            setComments(res.items || [])
        } catch (error) {
            console.error('Failed to fetch comments:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [spotlightId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setIsSubmitting(true)
        try {
            const res = await SpotlightCommentSdk.create(spotlightId, { content: newComment.trim() })
            if (res.success) {
                setNewComment('')
                if (res.item) {
                    setComments(prev => [res.item as SpotlightComment, ...prev])
                }
            }
        } catch (error) {
            console.error('Failed to submit comment:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (commentId: string) => {
        if (!confirm('Czy na pewno chcesz usunąć ten komentarz?')) return
        try {
            await SpotlightCommentSdk.delete(spotlightId, commentId)
            setComments(prev => prev.filter(c => c.id !== commentId))
        } catch (error) {
            console.error('Failed to delete comment:', error)
        }
    }

    return (
        <div className="space-y-6">
            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="bg-white/[0.02] rounded-3xl p-6 border border-white/[0.05] flex flex-col gap-4 shadow-inner">
                <Text as="h3" className="text-xl font-bold text-white tracking-tight">Napomknij słówko</Text>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Podziel się swoimi wrażeniami z tego miejsca..."
                        className="flex-1 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-blue-500/50 px-5 transition-colors"
                        disabled={isSubmitting}
                    />
                    <Button 
                        type="submit" 
                        disabled={isSubmitting || !newComment.trim()} 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-[0_5px_15px_-3px_rgba(37,99,235,0.4)] disabled:shadow-none active:scale-95 transition-all rounded-xl px-8 h-12 font-bold whitespace-nowrap"
                    >
                        {isSubmitting ? '⏳ Wysyłanie...' : 'Opublikuj 💬'}
                    </Button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <Text className="text-gray-500 text-center py-8 animate-pulse">Ładowanie komentarzy...</Text>
                ) : comments.length === 0 ? (
                    <Text className="text-gray-500 text-center py-8">Brak komentarzy. Bądź pierwszy!</Text>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.05] group">
                            <Flex className="justify-between items-start mb-2">
                                <Flex className="items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                                        <span className="text-blue-400 text-sm">👤</span>
                                    </div>
                                    <div>
                                        <Link href={`/spotlight/user/${c.userId}`} className="font-semibold text-gray-200 hover:text-white hover:underline transition-colors block mb-0.5">
                                            {c.userName}
                                        </Link>
                                        <Text className="text-xs text-gray-500">
                                            {new Date(c.createdAt).toLocaleDateString('pl-PL', { 
                                                day: 'numeric', month: 'long', year: 'numeric', 
                                                hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </Text>
                                    </div>
                                </Flex>
                                {currentUserId === c.userId && (
                                    <button 
                                        onClick={() => handleDelete(c.id)}
                                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm cursor-pointer"
                                        title="Usuń komentarz"
                                    >
                                        ✕
                                    </button>
                                )}
                            </Flex>
                            <Text className="text-gray-300 mt-3 whitespace-pre-wrap ml-13">
                                {c.content}
                            </Text>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
