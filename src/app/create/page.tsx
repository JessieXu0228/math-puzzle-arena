'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreatePuzzlePage() {
  const [formData, setFormData] = useState({
    creatorClass: '',
    creatorName: '',
    question: '',
    answer: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/puzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: 'success', text: '✅ 谜题发布成功！快去挑战别人吧！' })
        setFormData({ creatorClass: '', creatorName: '', question: '', answer: '' })
      } else {
        setMessage({ type: 'error', text: result.error || '发布失败，请重试' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误，请重试' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </Link>

        {/* 页面标题 */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-3xl">我要出题</CardTitle>
                  <CardDescription className="text-base">
                    创造一道有趣的数学谜题，挑战其他小朋友
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 出题表单 */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 出题人信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creatorClass" className="text-base font-semibold">
                      班级 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="creatorClass"
                      name="creatorClass"
                      placeholder="例如：三年级二班"
                      value={formData.creatorClass}
                      onChange={handleChange}
                      required
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creatorName" className="text-base font-semibold">
                      姓名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="creatorName"
                      name="creatorName"
                      placeholder="你的名字"
                      value={formData.creatorName}
                      onChange={handleChange}
                      required
                      className="text-base"
                    />
                  </div>
                </div>

                {/* 题面 */}
                <div className="space-y-2">
                  <Label htmlFor="question" className="text-base font-semibold">
                    数学谜题题面 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="question"
                    name="question"
                    placeholder="输入你的数学谜题..."
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="text-base min-h-[120px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    💡 小提示：题目要有趣、有挑战性哦！
                  </p>
                </div>

                {/* 正确答案 */}
                <div className="space-y-2">
                  <Label htmlFor="answer" className="text-base font-semibold">
                    正确答案 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="answer"
                    name="answer"
                    placeholder="输入正确答案..."
                    value={formData.answer}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="text-base min-h-[80px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    🔒 这个答案会保密，只有点击"答案"按钮才能看到
                  </p>
                </div>

                {/* 消息提示 */}
                {message && (
                  <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                    {message.text}
                  </div>
                )}

                {/* 提交按钮 */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                >
                  {isSubmitting ? (
                    '发布中...'
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      发布谜题
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
