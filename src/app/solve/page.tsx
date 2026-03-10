'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Brain, CheckCircle, XCircle, Eye, Users, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

interface Puzzle {
  id: number
  creator_class: string
  creator_name: string
  question: string
  answer: string
  created_at: string
}

interface AnswerCount {
  puzzle_id: number
  correct_count: number
  total_count: number
}

export default function SolvePuzzlePage() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [answerCounts, setAnswerCounts] = useState<Map<number, AnswerCount>>(new Map())
  const [loading, setLoading] = useState(true)
  const [expandedPuzzles, setExpandedPuzzles] = useState<Set<number>>(new Set())
  const [answerForms, setAnswerForms] = useState<Map<number, { answererClass: string; answererName: string; answer: string }>>(new Map())
  const [submittedPuzzles, setSubmittedPuzzles] = useState<Set<number>>(new Set())
  const [answerResults, setAnswerResults] = useState<Map<number, { correct: boolean; message: string }>>(new Map())
  const [isSubmitting, setIsSubmitting] = useState<Set<number>>(new Set())
  const [showAnswers, setShowAnswers] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchPuzzles()
  }, [])

  const fetchPuzzles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/puzzles')
      const data = await response.json()

      if (data.success) {
        setPuzzles(data.puzzles)
        setAnswerCounts(new Map(data.puzzles.map((p: Puzzle) => [
          p.id,
          { puzzle_id: p.id, correct_count: 0, total_count: 0 }
        ])))
      }
    } catch (error) {
      console.error('Failed to fetch puzzles:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (puzzleId: number) => {
    setExpandedPuzzles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(puzzleId)) {
        newSet.delete(puzzleId)
      } else {
        newSet.add(puzzleId)
      }
      return newSet
    })
  }

  const handleAnswerFormChange = (puzzleId: number, field: string, value: string) => {
    setAnswerForms(prev => {
      const newMap = new Map(prev)
      const currentForm = newMap.get(puzzleId) || { answererClass: '', answererName: '', answer: '' }
      newMap.set(puzzleId, { ...currentForm, [field]: value })
      return newMap
    })
  }

  const handleSubmitAnswer = async (puzzleId: number) => {
    const form = answerForms.get(puzzleId)
    if (!form || !form.answererClass || !form.answererName || !form.answer) {
      alert('请填写完整信息')
      return
    }

    setIsSubmitting(prev => new Set(prev).add(puzzleId))

    try {
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          puzzleId,
          answererClass: form.answererClass,
          answererName: form.answererName,
          submittedAnswer: form.answer
        })
      })

      const result = await response.json()

      if (result.success) {
        setAnswerResults(prev => new Map(prev).set(puzzleId, {
          correct: result.isCorrect,
          message: result.message
        }))
        setSubmittedPuzzles(prev => new Set(prev).add(puzzleId))

        // 更新答题统计
        if (result.answerCount) {
          setAnswerCounts(prev => new Map(prev).set(puzzleId, result.answerCount))
        }
      } else {
        alert(result.error || '提交失败，请重试')
      }
    } catch (error) {
      alert('网络错误，请重试')
    } finally {
      setIsSubmitting(prev => {
        const newSet = new Set(prev)
        newSet.delete(puzzleId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </Link>

        {/* 页面标题 */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-3xl">我要答题</CardTitle>
                  <CardDescription className="text-base">
                    选择一道数学谜题，挑战你的智慧！
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 题目列表 */}
        <div className="max-w-4xl mx-auto space-y-6">
          {puzzles.length === 0 ? (
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="py-12 text-center">
                <p className="text-xl text-muted-foreground">
                  还没有谜题，快去创建一道吧！
                </p>
                <Link href="/create" className="inline-block mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    创建第一道谜题
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            puzzles.map((puzzle) => {
              const isExpanded = expandedPuzzles.has(puzzle.id)
              const isSubmitted = submittedPuzzles.has(puzzle.id)
              const isSubmittingThis = isSubmitting.has(puzzle.id)
              const answerCount = answerCounts.get(puzzle.id) || { correct_count: 0, total_count: 0 }
              const answerResult = answerResults.get(puzzle.id)
              const form = answerForms.get(puzzle.id) || { answererClass: '', answererName: '', answer: '' }

              return (
                <Card key={puzzle.id} className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">🧩 数学谜题 #{puzzle.id}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                          <span>出题人：{puzzle.creator_name}</span>
                          <Badge variant="outline">{puzzle.creator_class}</Badge>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>答对：{answerCount.correct_count}人</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* 题目内容 */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                      <p className="text-base leading-relaxed whitespace-pre-wrap">
                        {puzzle.question}
                      </p>
                    </div>

                    {/* 展开答题区 */}
                    {isExpanded && (
                      <div className="space-y-4 mt-4 pt-4 border-t border-border">
                        {/* 答题表单 */}
                        {!isSubmitted ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-semibold">
                                  班级 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  placeholder="例如：三年级二班"
                                  value={form.answererClass}
                                  onChange={(e) => handleAnswerFormChange(puzzle.id, 'answererClass', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-semibold">
                                  姓名 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  placeholder="你的名字"
                                  value={form.answererName}
                                  onChange={(e) => handleAnswerFormChange(puzzle.id, 'answererName', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold">
                                你的答案 <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                placeholder="输入你的答案..."
                                value={form.answer}
                                onChange={(e) => handleAnswerFormChange(puzzle.id, 'answer', e.target.value)}
                                rows={3}
                                className="min-h-[80px]"
                              />
                            </div>
                            <Button
                              onClick={() => handleSubmitAnswer(puzzle.id)}
                              disabled={isSubmittingThis}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              {isSubmittingThis ? '提交中...' : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  提交答案
                                </>
                              )}
                            </Button>
                          </div>
                        ) : (
                          /* 答题结果 */
                          <div className={`p-4 rounded-lg ${answerResult?.correct ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              {answerResult?.correct ? (
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                              )}
                              <span className="font-semibold">{answerResult?.message}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 底部按钮 */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpand(puzzle.id)}
                      >
                        {isExpanded ? '收起' : '开始答题'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!showAnswers.has(puzzle.id)) {
                            toggleExpand(puzzle.id)
                          }
                          setShowAnswers(prev => {
                            const newSet = new Set(prev)
                            if (newSet.has(puzzle.id)) {
                              newSet.delete(puzzle.id)
                            } else {
                              newSet.add(puzzle.id)
                            }
                            return newSet
                          })
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        答案
                      </Button>
                    </div>

                    {/* 显示答案 */}
                    {showAnswers.has(puzzle.id) && (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">✨ 正确答案：</p>
                        <p className="text-base text-yellow-900 dark:text-yellow-100">{puzzle.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
